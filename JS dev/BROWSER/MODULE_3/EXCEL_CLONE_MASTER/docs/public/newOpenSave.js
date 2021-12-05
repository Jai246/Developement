let downloadBtn = document.querySelector(".fa-save");
let openBtn = document.querySelector(".fa-envelope-open");
let openInput = document.querySelector(".open_input");
let newInput = document.querySelector(".fa-plus-circle");

downloadBtn.addEventListener("click", function (e) 
{
    initDB();
    // anchor create
    let a = document.createElement("a");
    // file put -> db array 
    var StringCode = encodeURIComponent(JSON.stringify(sheetsDB[activeSheet]));
    // console.log(StringCode);
    var dataStr = "data:text/json;charset=utf-8," + StringCode;
    a.href = dataStr;
    a.download = "file.json";
    // // anchor click
    a.click();
    // styling -> pass
    // var ws = XLSX.utils.json_to_sheet(db);
    // var wb = XLSX.utils.book_new();
    // XLSX.utils.book_append_sheet(wb, ws, "sheet1");
    // XLSX.writeFile(wb, "file.xlsx");
})
openBtn.addEventListener("click", function (e) {
    openInput.click();
})
openInput.addEventListener("change", function (e) {
    // files array
    let filesArr = openInput.files;
    // console.log(filesArr);
    // first file select
    // first file get  
    let file = filesArr[0];
    // fileReader -> browser inbuilt
    const reader = new FileReader();
    // read as text 
    reader.readAsText(file);
    reader.addEventListener('load', (event) => {
        // img.src = event.target.result;
        let JSONdata = JSON.parse(event.target.result);
        sheetsDB[activeSheet] = JSONdata;
        db = sheetsDB[activeSheet];
        // console.log(db);
        setUINOS();
        // console.log(db);

    });
})
newInput.addEventListener("click", function () {
    // set db to empty
    db = [];

    UnSetUI();
})

function UnSetUI() {
    for (let i = 0; i < 100; i++) {
        for (let j = 0; j < 26; j++) {
            let tobeChangedCell = document.querySelector(`.cellRows .cell[rid='${i}'][cid='${j}']`);
            tobeChangedCell.style.color= "black";
            tobeChangedCell.style.backgroundColor= "white";
            tobeChangedCell.style.fontFamily= "'Dancing Script'";
            tobeChangedCell.style.fontSize= 14 + "px";
            tobeChangedCell.classList.add("doLeft");
            tobeChangedCell.innerText= "";
            tobeChangedCell.formula= "";
            tobeChangedCell.children= [];
        }
    }
}

function setUINOS() {
    for (let i = 0; i < 100; i++) {
        for (let j = 0; j < 26; j++) {
            let cellDetails = db[i][j];
            // console.log(db[i][j]);
            let tobeChangedCell = document.querySelector(`.cellRows .cell[rid='${i}'][cid='${j}']`);
            // console.log(tobeChangedCell);
            tobeChangedCell.style.color= cellDetails.color;
            tobeChangedCell.style.backgroundColor= cellDetails.backgroundColor;
            tobeChangedCell.style.fontFamily= cellDetails.fontFamily;
            tobeChangedCell.style.fontSize= cellDetails.fontSize;
            // Alignment
            let align =  cellDetails.halign;
            if(align == "left") tobeChangedCell.classList.add(doLeft);
            else if(align == "right") tobeChangedCell.classList.add(doRight);
            else if(align == "justify") tobeChangedCell.classList.add(doJustify);
            else if(align == "center") tobeChangedCell.classList.add(doCenter);

            //  bold italic underline
            if(cellDetails.italic) tobeChangedCell.classList.add("doItalic");
            if(cellDetails.underline) tobeChangedCell.classList.add("doUnderline");
            if(cellDetails.bold) tobeChangedCell.classList.add("doBold");

            tobeChangedCell.innerText= cellDetails.value;
            tobeChangedCell.setAttribute("formulae",cellDetails.formulae);
            // console.log(cellDetails.formulae);
            tobeChangedCell.setAttribute("children",cellDetails.children);
        }
    }
}