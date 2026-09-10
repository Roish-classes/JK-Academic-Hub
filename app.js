let supabaseClient=null;
const isConfigured=window.SUPABASE_URL && !window.SUPABASE_URL.includes("PASTE_");
if(isConfigured && window.supabase) supabaseClient=window.supabase.createClient(window.SUPABASE_URL,window.SUPABASE_ANON_KEY);

document.getElementById("year").textContent=new Date().getFullYear();
document.getElementById("menuBtn").addEventListener("click",()=>document.getElementById("navLinks").classList.toggle("open"));
document.querySelectorAll("#navLinks a").forEach(a=>a.addEventListener("click",()=>document.getElementById("navLinks").classList.remove("open")));

const filter=document.getElementById("resourceFilter"), search=document.getElementById("resourceSearch"), grid=document.getElementById("resourceGrid"), empty=document.getElementById("resourceEmpty");
MECHANICAL_SUBJECTS.forEach(s=>filter.insertAdjacentHTML("beforeend",`<option value="${s.name}">${s.name}</option>`));

let resources=[...DEMO_RESOURCES];
async function loadResources(){
 if(supabaseClient){
   const {data,error}=await supabaseClient.from("resources").select("*").order("created_at",{ascending:false});
   if(!error && data && data.length) resources=data;
 }
 renderResources();
 renderGS();
}
function resourceMatches(r){
 const q=search.value.trim().toLowerCase(), f=filter.value;
 const hay=[r.title,r.subject,r.section,r.resource_type,r.description||""].join(" ").toLowerCase();
 return (!q||hay.includes(q)) && (f==="all"||r.subject===f);
}
function renderResources(){
 const list=resources.filter(resourceMatches);
 grid.innerHTML=list.map(r=>{
   const has=r.file_url;
   return `<article class="resource-card">
     <span class="type">${(r.resource_type||"RESOURCE").toUpperCase()}</span>
     <h3>${escapeHtml(r.title)}</h3><p>${escapeHtml(r.description||"Student learning resource")}<br><b>${escapeHtml(r.subject||"")}</b></p>
     <div class="resource-actions">${has?`<button onclick='openResource(${JSON.stringify(r)})'>View</button><a class="resource-actions" href="${r.file_url}" target="_blank" rel="noopener"><button>Open</button></a>`:`<button onclick="alert('This is a starter placeholder. Upload a real file from the Admin Dashboard.')">How to add</button>`}</div>
   </article>`}).join("");
 empty.hidden=!!list.length;
}
function renderGS(){
 const active=document.querySelector(".gs-tabs button.active").dataset.gs;
 const list=active==="all"?GS_SHELVES:GS_SHELVES.filter(x=>x.id===active);
 document.getElementById("gsGrid").innerHTML=list.map(x=>`<article class="gs-card"><span class="badge">${x.tag}</span><h3>${x.title}</h3><p>${x.desc}</p><div class="resource-list"><span class="badge">Notes</span><span class="badge">Reference</span><span class="badge">Videos</span></div></article>`).join("");
}
document.getElementById("gsTabs").addEventListener("click",e=>{if(e.target.tagName!=="BUTTON")return;document.querySelectorAll(".gs-tabs button").forEach(b=>b.classList.remove("active"));e.target.classList.add("active");renderGS()});
search.addEventListener("input",renderResources);filter.addEventListener("change",renderResources);

function escapeHtml(v){return String(v??"").replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m]));}
function openResource(r){
 const modal=document.getElementById("resourceModal"), content=document.getElementById("modalContent"), type=(r.resource_type||"").toLowerCase();
 if(type==="pdf"||r.file_url?.toLowerCase().includes(".pdf")) content.innerHTML=`<iframe class="modal-content-frame" src="${r.file_url}"></iframe>`;
 else if(type==="video"||/\.(mp4|webm|ogg)(\?|$)/i.test(r.file_url||"")) content.innerHTML=`<video class="modal-video" controls autoplay src="${r.file_url}"></video>`;
 else if(type==="infographic"||/\.(png|jpg|jpeg|webp)(\?|$)/i.test(r.file_url||"")) content.innerHTML=`<img class="modal-img" src="${r.file_url}" alt="${escapeHtml(r.title)}">`;
 else content.innerHTML=`<iframe class="modal-content-frame" src="${r.file_url}"></iframe>`;
 modal.hidden=false;
}
document.getElementById("modalClose").onclick=()=>document.getElementById("resourceModal").hidden=true;
document.getElementById("resourceModal").addEventListener("click",e=>{if(e.target.id==="resourceModal")e.currentTarget.hidden=true});

document.getElementById("feedbackForm").addEventListener("submit",async e=>{
 e.preventDefault();const status=document.getElementById("feedbackStatus"), data=Object.fromEntries(new FormData(e.target).entries());
 if(!supabaseClient){status.textContent="Demo mode: connect Supabase in config.js to store feedback.";e.target.reset();return;}
 const {error}=await supabaseClient.from("feedback").insert([data]);
 status.textContent=error?"Could not submit feedback. Please try again.":"Thank you! Your feedback has been submitted."; if(!error)e.target.reset();
});

// MCQ engine
let qIndex=0, answers=Array(QUIZ_QUESTIONS.length).fill(null), submitted=false;
function renderQuiz(){
 const q=QUIZ_QUESTIONS[qIndex];document.getElementById("quizCount").textContent=`${qIndex+1} / ${QUIZ_QUESTIONS.length}`;
 document.getElementById("quizQuestion").textContent=q.q;
 document.getElementById("quizOptions").innerHTML=q.o.map((x,i)=>`<button class="option ${answers[qIndex]===i?"selected":""}" data-i="${i}">${String.fromCharCode(65+i)}. ${x}</button>`).join("");
 document.querySelectorAll(".option").forEach(b=>b.onclick=()=>{if(submitted)return;answers[qIndex]=Number(b.dataset.i);renderQuiz()});
 document.getElementById("prevQ").disabled=qIndex===0;document.getElementById("nextQ").textContent=qIndex===QUIZ_QUESTIONS.length-1?"Submit Test":"Next →";
}
document.getElementById("prevQ").onclick=()=>{if(qIndex>0){qIndex--;renderQuiz()}};
document.getElementById("nextQ").onclick=()=>{
 if(qIndex<QUIZ_QUESTIONS.length-1){qIndex++;renderQuiz();return}
 submitted=true;let score=answers.reduce((n,a,i)=>n+(a===QUIZ_QUESTIONS[i].a?1:0),0);
 const r=document.getElementById("quizResult");r.hidden=false;r.innerHTML=`<strong>${score}/${QUIZ_QUESTIONS.length}</strong><p>${score>=4?"Excellent work.":"Keep practising — review the explanations and try again."}</p>`;
 document.getElementById("nextQ").disabled=true;document.getElementById("prevQ").disabled=true;
};
renderQuiz();loadResources();