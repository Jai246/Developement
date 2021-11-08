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
let current_cell = "";
address_box.setAttribute("contentEditable","true");
formulae_box.setAttribute("contentEditable","true");

console.log(AllFonts);
// console.log(font_Input.value);


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
for(let i = 1;i<=100;i++)
{
    let div = document.createElement("div");
    div.setAttribute("class","cellRows")
    for(let j = 0;j<26;j++)
    {
        {
            let div2 = document.createElement("div");
            div2.setAttribute("class","cell");
            div2.setAttribute("rid",i);
            div2.setAttribute("cid",j);
            div2.setAttribute("contentEditable","true");
            div2.style.fontSize = 7;
            div2.style.fontFamily = '"Dancing Script"';
            div.appendChild(div2); 

            if(i == 1 && j == 0){
                div2.click();
                current_cell = div2;
                div2.style.border = "2px solid #1B9CFC";
                address_box.innerHTML = "A1";
            }
            
        }
    }
    cellsContainer.appendChild(div);
}

let AllGridCells = document.querySelectorAll(".cellRows .cell");

for (let i = 0; i < AllGridCells.length; i++) {
    AllGridCells[i].addEventListener("click", function (e) {
        current_cell = AllGridCells[i];
        let fontOfCurrentCell = current_cell.style.fontFamily;

        let idx = 0;
        for(let k = 0;k<AllFonts.length;k++)
        {
            if(AllFonts[k].value == fontOfCurrentCell)
            {
                idx = k;
                break;
            }
        }
        font_Input.selectedIndex = idx;


        let sizeOfCurrentFont = current_cell.style.font_Size;
        let idx2 = 0;

        for(let k = 0;k<AllFontSizes.length;k++)
        {
            if(AllFontSizes[k].value == sizeOfCurrentFont)
            {
                idx2 = k;
                break;
            }
        }
        font_Size.selectedIndex = idx2;

        let prevAddress = address_box.innerText;
        if (prevAddress != "") {
            let ridcidObj = getRidCidFromAddress(prevAddress);

            let prevCell = document.querySelector(`.cellRows .cell[rid='${ridcidObj.rid}'][cid='${ridcidObj.cid}']`);
            prevCell.style.border ="0.1px solid gray";
            // console.log(prevCell);
        }

        let rid = AllGridCells[i].getAttribute("rid");
        let cid = AllGridCells[i].getAttribute("cid");
        //    get -> always returns a string 
        rid = Number(rid);
        cid = Number(cid);

        address_box.innerHTML = String.fromCharCode(cid + 65) + (rid);
        let cCell = AllGridCells[i];
        cCell.style.border = "2px solid #1B9CFC";
    })
}

font_Input.addEventListener('change',(event)=>{
    let newFont = event.target.value;
    current_cell.style.fontFamily = newFont;
})

font_Size.addEventListener('change',(event)=>{
    let newFont = event.target.value;
    current_cell.style.font_Size = newFont;
})

function getRidCidFromAddress(address) {
    // A-Z, 1-100
    // B
    let AsciiValue = address.charCodeAt(0);
    let cid = AsciiValue - 65;
    let rid = Number(address.substring(1));
    return {
        rid: rid, cid: cid
    }

}

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


