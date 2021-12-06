let topRow = document.querySelector(".top_row");
let leftcol = document.querySelector(".left_column");
let grid_container = document.querySelector(".grid_container");
let cellsContainer = document.querySelector(".cells");
let address_box = document.querySelector(".address_input");
let formulae_box = document.querySelector(".formulae_input");
let AllFonts = document.querySelectorAll(".font_family_input option");
let AllFontSizes = document.querySelectorAll(".font_size_input option");
let font_Input = document.querySelector(".font_family_input");
let font_Size = document.querySelector(".font_size_input");
let alignment = document.querySelector(".alignment_container");
let textColorHInput = document.querySelector(".text_color");
let textColorInput = document.querySelector(".fa-tint");
let backgroundHInput = document.querySelector(".background_color");
let backgroundInput = document.querySelector(".fa-fill-drip");
let bui = document.querySelector(".bui");
let formulaeInput = document.querySelector(".formulae_input_text");
let current_cell = "";
address_box.setAttribute("contentEditable","true");
formulae_box.setAttribute("contentEditable","true");

for(let i = 0;i<=26;i++){
    if(i == 0)
    {
        let div = document.createElement("div");
        div.setAttribute("class","delimiterCell");
        topRow.appendChild(div);
        continue;
    }
    let div = document.createElement("div");
    div.setAttribute("class","cell");
    div.textContent = String.fromCharCode(65+i-1);
    topRow.appendChild(div);
}

for(let i = 0;i<100;i++)
{
    let div = document.createElement("div");
    div.setAttribute("class","cellRows")
    for(let j = 0;j<26;j++)
    {
        {
            let div2 = document.createElement("div");
            div2.setAttribute("class","cell");
            div2.setAttribute("formulae","");
            div2.setAttribute("children","");
            div2.setAttribute("rid",i);
            div2.setAttribute("cid",j);
            div2.setAttribute("textAlign","left");
            div2.setAttribute("contentEditable","true");
            div2.innerText = "";
            div2.style.color = "black";
            div2.style.backgroundColor = "white";
            div2.style.fontSize = 14 + "px";
            div2.style.fontFamily = '"Dancing Script"';
            // div2.style.textAlign = "left";
            div2.classList.add("doLeft");
            div2.click();
            div.appendChild(div2); 

            if(i == 0 && j == 0){
                div2.click();
                current_cell = div2;
                div2.style.border =  "1.6px solid indigo";
                address_box.innerHTML = "A1";
            }
            
        }
    }
    cellsContainer.appendChild(div);
}

let AllGridCells = document.querySelectorAll(".cellRows .cell");

for (let i = 0; i < AllGridCells.length; i++) {
    AllGridCells[i].addEventListener("click", function () {
        current_cell = AllGridCells[i];
        // formulae_box.textContent = current_cell.getAttribute("formulae");
        /* left right justify center*/
        let classes = current_cell.classList.value.split(" ");
        let left = false;
        let right = false;
        let justify = false;
        let center = false;

        formulaeInput.value = current_cell.getAttribute("formulae");

        for(let i = 0;i<classes.length; i++)
        {
            if(classes[i] == "doLeft") left = true;
            if(classes[i] == "doRight") right = true;
            if(classes[i] == "doJustify") justify = true;
            if(classes[i] == "doCenter") center = true;
        }

        if(left) document.querySelector(".fa-align-left").classList.add("shadow");
        else if(!left) document.querySelector(".fa-align-left").classList.remove("shadow");

        if(right) document.querySelector(".fa-align-right").classList.add("shadow");
        else if(!right) document.querySelector(".fa-align-right").classList.remove("shadow");

        if(justify) document.querySelector(".fa-align-justify").classList.add("shadow");
        else if(!justify) document.querySelector(".fa-align-justify").classList.remove("shadow");

        if(center) document.querySelector(".fa-align-center").classList.add("shadow");
        else if(!center) document.querySelector(".fa-align-center").classList.remove("shadow");

        /*bold italic underline*/
        let bold = false;
        let italic = false;
        let underline = false;

        for(let i = 0;i<classes.length; i++)
        {
            if(classes[i] == "doBold") bold = true;
            if(classes[i] == "doItalic") italic = true;
            if(classes[i] == "doUnderline") underline = true;
        }

        if(bold) document.querySelector(".fa-bold").classList.add("shadow");
        else if(!bold) document.querySelector(".fa-bold").classList.remove("shadow");

        if(italic) document.querySelector(".fa-italic").classList.add("shadow");
        else if(!italic) document.querySelector(".fa-italic").classList.remove("shadow");

        if(underline) document.querySelector(".fa-underline").classList.add("shadow");
        else if(!underline) document.querySelector(".fa-underline").classList.remove("shadow");

        // font family
        let fontOfCurrentCell = current_cell.style.fontFamily;
        let idx = 0;
        for(let k = 0;k<AllFonts.length;k++)
        {
            if(AllFonts[k].value == fontOfCurrentCell){
                idx = k;
                break;
            }
        }
        font_Input.selectedIndex = idx;


        // font size
        let sizeOfCurrentFont = current_cell.style.fontSize;
        let idx2 = 0;
        for(let k = 0;k<AllFontSizes.length;k++)
        {
            if(AllFontSizes[k].value + "px" == sizeOfCurrentFont){
                idx2 = k;
                break;
            }
        }
        font_Size.selectedIndex = idx2;


        // selection border
        let prevAddress = address_box.innerText;
        ////console.log(prevAddress);
        if (prevAddress != "") {
            let ridcidObj = getRidCidFromAddress(prevAddress);
            //console.log(ridcidObj);
            let prevCell = document.querySelector(`.cellRows .cell[rid='${ridcidObj.rid}'][cid='${ridcidObj.cid}']`);
            prevCell.style.border ="0.1px solid gray";
        }

        let rid = AllGridCells[i].getAttribute("rid");
        let cid = AllGridCells[i].getAttribute("cid");
        //    get -> always returns a string 
        rid = Number(rid);
        cid = Number(cid);

        address_box.innerHTML = String.fromCharCode(cid + 65) + (rid+1);
        let cCell = AllGridCells[i];
        cCell.style.border = "1.6px solid indigo";
    })
}


function getRidCidFromAddress(address) {
    // A-Z, 1-100
    // B
    let AsciiValue = address.charCodeAt(0);
    let cid = AsciiValue - 65;
    let rid = Number(address.substring(1))-1;
    return {
        rid: rid, cid: cid
    }
}


font_Input.addEventListener('change',(event)=>{
    let newFont = event.target.value;
    current_cell.style.fontFamily = newFont;
})

font_Size.addEventListener('change',(event)=>{
    let newFontSize = event.target.value;
    //console.log(newFontSize);
    current_cell.style.fontSize = newFontSize + "px";
})

textColorInput.addEventListener("click", function (e) {
    //dom help hidden click trigger 
    textColorHInput.click();
    // //console.log("clicked");
})
textColorHInput.addEventListener("change", function (e) {
    let color = textColorHInput.value;
    // //console.log(color);
    let tobeChangedCell = current_cell;
    tobeChangedCell.style.color = color;
})
backgroundInput.addEventListener("click", function (e) {
    //   dom help hidden click trigger 
    backgroundHInput.click();
    //console.log("clicked");
})
backgroundHInput.addEventListener("change", function (e) {
    let color = backgroundHInput.value;
    // //console.log(color);
    let tobeChangedCell = current_cell;
    tobeChangedCell.style.backgroundColor = color;
})

bui.addEventListener("click", function (e){
    let target = e.target;
    let classes = current_cell.classList.value.split(" ");
    let bold = false;
    let italic = false;
    let underline = false;

    for(let i = 0;i<classes.length; i++)
    {
        if(classes[i] == "doBold") bold = true;
        if(classes[i] == "doItalic") italic = true;
        if(classes[i] == "doUnderline") underline = true;
    }
    if(target!=bui)
    {
        if(target.classList[1].split("-")[1] == "bold" && !bold)
        {
            current_cell.classList.add("doBold");
            target.classList.add("shadow");
            //console.log(classes["doBold"]);
        }
        else if(target.classList[1].split("-")[1] == "bold" && bold){
            current_cell.classList.remove("doBold");
            target.classList.remove("shadow");
        }

        if(target.classList[1].split("-")[1] == "italic" && !italic)
        {
            current_cell.classList.add("doItalic");
            target.classList.add("shadow");
        }
        else if(target.classList[1].split("-")[1] == "italic" && italic){
            current_cell.classList.remove("doItalic");
            target.classList.remove("shadow");
        }

        if(target.classList[1].split("-")[1] == "underline" && !underline)
        {
            current_cell.classList.add("doUnderline");
            target.classList.add("shadow");
        }
        else if(target.classList[1].split("-")[1] == "underline" && underline){
            current_cell.classList.remove("doUnderline");
            target.classList.remove("shadow");
        }
    }
})

alignment.addEventListener("click", function (e){
    let target = e.target;
    let classes = current_cell.classList.value.split(" ");
    let left = false;
    let right = false;
    let justify = false;
    let center = false;

    //console.log(classes);
    for(let i = 0;i<classes.length; i++)
    {
        if(classes[i] == "doLeft"){
            current_cell.classList.remove("doLeft");
            document.querySelector(".fa-align-left").classList.remove("shadow");
        }
        else if(classes[i] == "doRight") {
            current_cell.classList.remove("doRight");
            document.querySelector(".fa-align-right").classList.remove("shadow");
        }
        else if(classes[i] == "doJustify") {
            current_cell.classList.remove("doJustify");
            document.querySelector(".fa-align-justify").classList.remove("shadow");
        }
        else if(classes[i] == "doCenter"){
            current_cell.classList.remove("doCenter");
            document.querySelector(".fa-align-center").classList.remove("shadow");
        }
    }
    if(target!=alignment)
    {
        if(target.classList[1].split("-")[2] == "left" && !left)
        {
            current_cell.classList.add("doLeft");
            target.classList.add("shadow");
        }
        else if(target.classList[1].split("-")[2] == "right" && !right)
        {
            current_cell.classList.add("doRight");
            target.classList.add("shadow");
        }
        else if(target.classList[1].split("-")[2] == "justify" && !justify)
        {
            current_cell.classList.add("doJustify");
            target.classList.add("shadow");
        }
        else if(target.classList[1].split("-")[2] == "center" && !center)
        {
            current_cell.classList.add("doCenter");
            target.classList.add("shadow");
        }
    }

})



for(let i = 0;i<=100;i++)
{
    if(i == 0)
    {
        let div = document.createElement("div");
        div.setAttribute("class","delimiterCell");
        leftcol.appendChild(div);
        continue;
    }
    let div = document.createElement("div");
    div.setAttribute("class","leftCell");
    div.textContent = i;
    leftcol.appendChild(div);
}


let sheetsDB = [[[]]];
function initDB()
{
    let db = [];
    for (let i = 0; i < 100; i++) {
        let rowArr = [];
        for (let j = 0; j < 26; j++) {
            let cellDetails = document.querySelector(`.cellRows .cell[rid='${i}'][cid='${j}']`);
            let list = cellDetails.classList;
            // console.log(list);
            let cellObject = 
            {
                color: cellDetails.style.color,
                backgroundColor: cellDetails.style.backgroundColor,
                fontFamily: cellDetails.style.fontFamily,
                fontSize: cellDetails.style.fontSize,
                halign: (list.contains("doLeft")) ? "left" : (list.contains("doRight")) ?"right" : (list.contains("doJustify")) ? "justify" : (list.contains("doCenter")) ? "center" : "",
                italic: (list.contains("doItalic")) ? true : false,
                underline: (list.contains("doUnderline")) ? true : false,
                bold: (list.contains("doBold")) ? true : false,
                value: cellDetails.textContent,
                formulae: cellDetails.getAttribute("formulae"),
                children: cellDetails.getAttribute("children")
            }
            rowArr.push(cellObject)
        }
        db.push(rowArr);
    }
    sheetsDB[activeSheet] = db;
}

let db = sheetsDB[0];