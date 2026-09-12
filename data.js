const MECHANICAL_SUBJECTS = [
 {id:"mechanics",name:"Engineering Mechanics",icon:"⚖",desc:"Forces, equilibrium, friction and dynamics"},
 {id:"graphics",name:"Engineering Graphics",icon:"📐",desc:"Projection, sections, visualization and CAD"},
 {id:"mom",name:"Mechanics of Materials",icon:"🔩",desc:"Stress, strain, bending, torsion and failure"},
 {id:"vibration",name:"Mechanical Vibration",icon:"〰",desc:"Free/forced vibration, damping and resonance"},
 {id:"fem",name:"Finite Element Method",icon:"▦",desc:"Formulation, meshing, FEM and applications"},
 {id:"thermo",name:"Thermodynamics",icon:"♨",desc:"Properties, laws, entropy and cycles"},
 {id:"heat",name:"Heat Transfer",icon:"♨",desc:"Conduction, convection, radiation and exchangers"},
{id:"basic",name:"Basics of Mechanical Engineering",icon:"⚙️",desc:"Core concepts of mechanical engineering"},
{id:"eme",name:"Elements of Mechanical Engineering (EME)",icon:"🔧",desc:"Fundamental concepts of mechanical engineering"},
{id:"solar",name:"Solar Energy Engineering",icon:"☀️",desc:"Solar thermal and photovoltaic systems"},
 {id:"renewable",name:"Renewable Energy",icon:"♻",desc:"Solar, wind, hybrid systems and sustainability"}
];

const GS_SHELVES = [
 {id:"GS1",tag:"GS 1",title:"Indian Heritage, History & Geography",desc:"Culture, history, society and geography notes."},
 {id:"GS2",tag:"GS 2",title:"Polity, Governance & Social Justice",desc:"Constitution, governance, institutions, schemes and IR."},
 {id:"GS3",tag:"GS 3",title:"Economy, S&T, Environment & Security",desc:"Economy, science-tech, environment, disaster management and security."},
 {id:"GS4",tag:"GS 4",title:"Ethics, Integrity & Aptitude",desc:"Ethics concepts, case studies and answer-writing support."},
 {id:"CA",tag:"CA",title:"Current Affairs Desk",desc:"Daily/monthly current affairs, government reports and exam-oriented analysis."}
];

const DEMO_RESOURCES = [
 {id:"demo-1",section:"Mechanical Engineering",subject:"Thermodynamics",title:"Thermodynamics — Resource Shelf",resource_type:"PDF",file_url:"",description:"Upload your PDF notes from the Admin Dashboard to activate the View button."},
 {id:"demo-2",section:"Mechanical Engineering",subject:"Finite Element Method",title:"FEM — Notes & Visual Explanations",resource_type:"Reference",file_url:"",description:"Add notes, reference books and your own explanatory material here."},
 {id:"demo-3",section:"General Studies",subject:"GS 3",title:"Current Affairs / Environment",resource_type:"PDF",file_url:"",description:"Upload monthly current affairs PDFs and GS 3 environment material."}
];

const QUIZ_QUESTIONS = [
 {q:"For an ideal gas, which property is primarily a function of temperature only?",o:["Internal energy","Enthalpy and internal energy","Entropy only","Specific volume only"],a:1,e:"For an ideal gas, both internal energy and enthalpy depend on temperature only."},
 {q:"The efficiency of an Otto cycle increases when the compression ratio:",o:["Decreases","Remains constant","Increases","Becomes zero"],a:2,e:"For an ideal Otto cycle with fixed specific-heat ratio, efficiency increases with compression ratio."},
 {q:"The SI unit of thermal conductivity is:",o:["W/m·K","J/kg·K","W/m²·K","N/m²"],a:0,e:"Thermal conductivity is measured in watt per metre-kelvin (W/m·K)."},
 {q:"In FEM, the domain is commonly divided into smaller units called:",o:["Nodes only","Elements","Controls","Contours"],a:1,e:"The physical domain is discretized into finite elements connected at nodes."},
 {q:"The second law of thermodynamics is associated directly with the concept of:",o:["Mass only","Energy conservation only","Entropy and direction of processes","Pressure only"],a:2,e:"The second law introduces entropy and establishes the direction/feasibility of processes."}
];