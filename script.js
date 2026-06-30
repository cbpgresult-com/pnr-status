const subjects = [

{

code:"221005",

title:"BOTANY (MAJOR 1)",

paper:"Archegoniates & Plant Architecture",

theoryObt:48,
theoryMax:75,

sessionalObt:24,
sessionalMax:25,

practicalObt:"",
practicalMax:"",

total:69,

grade:"B+",

credit:"28.00"

},

{

code:"221006",

title:"",

paper:"Land Plants Architecture",

theoryObt:"",
theoryMax:"",

sessionalObt:24,
sessionalMax:25,

practicalObt:63,
practicalMax:75,

total:87,

grade:"A+",

credit:"18.00"

}

];

const tbody = document.getElementById("marksBody");

tbody.innerHTML = "";

subjects.forEach(function(sub){

tbody.innerHTML += `

<tr>

<td>${sub.code}</td>

<td>

${sub.title ? `<b>${sub.title}</b><br>` : ""}

<span class="paper-name">

${sub.paper}

</span>

</td>

<td>${sub.theoryObt}</td>
<td>${sub.theoryMax}</td>

<td>${sub.sessionalObt}</td>
<td>${sub.sessionalMax}</td>

<td>${sub.practicalObt}</td>
<td>${sub.practicalMax}</td>

<td><b>${sub.total}</b></td>
<td>100</td>

<td>${sub.grade}</td>

<td>${sub.credit}</td>

<td></td>

</tr>

`;

});
/* ==========================================
   API URL
========================================== */

const API_URL =
"https://script.google.com/macros/s/AKfycbwcuRt0wI_st92B8kKVYjYbc_K80_ZU8QAAlFQ32-NpBUwYFnYHtWRWndosFzQxUc5U/exec";

/* ==========================================
   SEARCH
========================================== */

async function searchResult(){

const roll=document.getElementById("roll").value.trim();

const father=document.getElementById("father").value.trim();

const year=document.getElementById("year").value;

const exam=document.getElementById("examType").value;

const course=document.getElementById("course").value;

const sem=document.getElementById("sem").value;

if(!roll || !father){

alert("Enter Roll Number & Father Name");

return;

}

const url=

API_URL+

"?year="+year+

"&roll="+roll+

"&examType="+exam+

"&course="+course+

"&sem="+sem+

"&father="+encodeURIComponent(father);

try{

const res=await fetch(url);

const data=await res.json();

if(data.status!="found"){

alert("Result Not Found");

return;

}

fillMarksheet(data);

}
catch(e){

alert("Server Error");

console.log(e);

}

}

/* ==========================================
   FILL DATA
========================================== */

function fillMarksheet(data){

document.getElementById("studentName").innerHTML=data.student;

document.getElementById("fatherName").innerHTML=data.father;

document.getElementById("motherName").innerHTML=data.mother;

document.getElementById("rollNo").innerHTML=data.roll;

document.getElementById("enrolNo").innerHTML=data.enrollment;

document.getElementById("examType").innerHTML=data.examType;

document.getElementById("courseTitle").innerHTML=data.courseName;

document.getElementById("semesterTitle").innerHTML=data.semesterName;

document.getElementById("collegeName").innerHTML=data.college;

document.getElementById("serialNo").innerHTML=data.serial;

document.getElementById("sgpa").innerHTML=data.sgpa;

document.getElementById("cgpaValue").innerHTML=data.cgpa;

document.getElementById("creditPoints").innerHTML=data.credit;

document.getElementById("totalMarks").innerHTML=data.total;

document.getElementById("resultDate").innerHTML=data.resultDate;

document.getElementById("resultStatus").innerHTML=data.result;

/* QR */

document.getElementById("qrImage").src=data.qr;

/* TABLE */

loadSubjects(data.subjects);

}

/* ==========================================
   SUBJECT TABLE
========================================== */

function loadSubjects(subjects){

const body=document.getElementById("marksBody");

body.innerHTML="";

subjects.forEach(function(s){

body.innerHTML+=`

<tr>

<td>${s.code}</td>

<td>

<b>${s.subject}</b>

<br>

<span class="paper-name">

${s.paper}

</span>

</td>

<td>${s.theoryObt}</td>

<td>${s.theoryMax}</td>

<td>${s.sessionalObt}</td>

<td>${s.sessionalMax}</td>

<td>${s.practicalObt}</td>

<td>${s.practicalMax}</td>

<td>

<b>

${s.total}

</b>

</td>

<td>

${s.max}

</td>

<td>

${s.grade}

</td>

<td>

${s.credit}

</td>

<td></td>

</tr>

`;

});

}

/* ==========================================
   PRINT
========================================== */

function printMarksheet(){

window.print();

}

/* ==========================================
   DOWNLOAD PDF
========================================== */

function downloadPDF(){

window.print();

}
