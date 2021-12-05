let activeSheet = 0;
let addSheet = document.querySelector(".add-sheet_container");
let limit = 0;
let sheetsList = []; 
sheetsList.push(document.querySelector(".sheet"));

let sheetDiv = document.querySelector(".sheets-list");
let sheetLength = 1;

addSheet.addEventListener("click",function(){
    limit++;
    if(limit >= 5) return;
    sheetLength++;

    sheetsList[activeSheet].classList.remove("active-sheet");

    initDB();
    UnSetUI();

    activeSheet = sheetLength-1;
    let newSheet = document.createElement("div");
    newSheet.setAttribute("class", "sheet");
    newSheet.setAttribute("sheetidx", sheetLength-1);
    newSheet.textContent = `Sheet ${sheetLength}`;
    sheetsList.push(newSheet);
    sheetsList[activeSheet].classList.add("active-sheet");
    sheetDiv.appendChild(newSheet);

    console.log(sheetsList);
    console.log(sheetsDB.length)
    // console.log(sheetsDB);

    for(let i = 0;i<sheetLength;i++)
    {
        sheetsList[i].addEventListener("click",function (e)
        {
            sheetsList[activeSheet].classList.remove("active-sheet");
            initDB();
            activeSheet = i;
            sheetsList[activeSheet].classList.add("active-sheet");
            UnSetUI();
            db = sheetsDB[i];
            setUINOS();
            
        })
    }
})