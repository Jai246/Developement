
for (let i = 0; i < AllGridCells.length; i++) {
    AllGridCells[i].addEventListener("blur", function cellHelper(e) {
        let content = AllGridCells[i].textContent;
        let address = address_box.textContent;
        let { rid, cid } = getRidCidFromAddress(address);
        let cellObject = document.querySelector(`.cellRows .cell[rid='${rid}'][cid='${cid}']`).getAttribute("formulae");
        // set self ui as well as children new values and ui
        setUI(content, rid, cid);
    })
}



formulaeInput.addEventListener("keydown", function (e)
{
    if (e.key == "Enter" && formulaeInput.value != "") 
    {
        let cFormulae = formulaeInput.value;
        let addressOfTheCell = address_box.textContent;
        let { rid, cid } = getRidCidFromAddress(addressOfTheCell);
        let formulaeOfCell = document.querySelector(`.cellRows .cell[rid='${rid}'][cid='${cid}']`).getAttribute("formulae");
        // //console.log(formulaeOfCell);
        if (formulaeOfCell != cFormulae) 
        {
            removeFormulae(addressOfTheCell, formulaeOfCell);
        }
        let value = evaluateFormulae(cFormulae);
        setUI(value, rid, cid);
        document.querySelector(`.cellRows .cell[rid='${rid}'][cid='${cid}']`).setAttribute("formulae",cFormulae);
        setFormulae(addressOfTheCell, cFormulae);
    }
})


function evaluateFormulae(formulae) {
    // //console.log(formulae);
    // ( A1 + A2 ) -> ( 10 + 20 )
    let formulaEntities = formulae.split(" ");
    // [(,A1,+,A2,)]
    // //console.log(formulaEntities);
    for (let i = 0; i < formulaEntities.length; i++) {
        let ascii = formulaEntities[i].charCodeAt(0);
        if (ascii >= 65 && ascii <= 90) {
            // address -> rid cId
            // //console.log(formulaEntities[i]);
            let cellrcObj = getRidCidFromAddress(formulaEntities[i]);
            // //console.log(cellrcObj);
            let value = document.querySelector(`.cellRows .cell[rid='${cellrcObj.rid}'][cid='${cellrcObj.cid}']`).textContent;
            // replace in formula
            formulae = formulae.replace(formulaEntities[i], value);
            // ( A1 + A2 ) -> ( 10 + 20 )
        }
    }
    // //console.log(formula);
    // eval -> evaluate-> inbuilt 
    let result = eval(formulae);
    return result;
}


function setUI(value, rid, cid) 
{
    let tobeChangedCell = document.querySelector(`.cellRows .cell[rid='${rid}'][cid='${cid}']`);
    tobeChangedCell.textContent = value;

    // change your children -> re-evaulate -> set ui

    let childrenArr = document.querySelector(`.cellRows .cell[rid='${rid}'][cid='${cid}']`).getAttribute("children");
    childrenArr = childrenArr.split(" ");

    // B1
    // starting with 1 to handle empty string at the starting og the array
    for (let i = 1; i < childrenArr.length-1; i++) {
        if(childrenArr[i]!='')
        {
            let chriciobj = getRidCidFromAddress(childrenArr[i]);
            // //console.log(chriciobj);
            let chCellObj = document.querySelector(`.cellRows .cell[rid='${chriciobj.rid}'][cid='${chriciobj.cid}']`);
            //console.log(chCellObj.getAttribute("formulae"));
            let value = evaluateFormulae(chCellObj.getAttribute("formulae"));
            setUI(value, chriciobj.rid, chriciobj.cid);
        }
    }
}


//  to set a cell as children of a cell jispe depenedent 
function setFormulae(address, formulae) {
    // //console.log(formula);
    // ( A1 + A2 ) -> ( 10 + 20 )
    let formulaeEntities = formulae.split(" ");
    // [(,A1,+,A2,)]
    // //console.log(formulaEntities);
    for (let i = 0; i < formulaeEntities.length; i++) {
        let ascii = formulaeEntities[i].charCodeAt(0);
        if (ascii >= 65 && ascii <= 90) {
            // address -> rid cId
            let parentObj = getRidCidFromAddress(formulaeEntities[i]);
            parentObj = document.querySelector(`.cellRows .cell[rid='${parentObj.rid}'][cid='${parentObj.cid}']`);
            let children = parentObj.getAttribute("children");
            children = children.split(" ");
            //console.log(children);
            children.push(address);
            // //console.log(children);
            // replace in formula
            let temp = "";
            for(let i = 0 ;i < children.length; i++)
            {
                temp += children[i] + " ";
            }
            // //console.log(temp);
            parentObj.setAttribute("children",temp);
        }
    }
    // //console.log(formulae);
}


//  to set a cell as children of a cell jispe depenedent 
function removeFormulae(address, formulae) {
    // //console.log(formula);
    // ( A1 + A2 ) -> ( 10 + 20 )
    let formulaeEntities = formulae.split(" ");
    // [(,A1,+,A2,)]
    // console.log(formulaEntities);
    for (let i = 0; i < formulaeEntities.length; i++) {
        let ascii = formulaeEntities[i].charCodeAt(0);
        if (ascii >= 65 && ascii <= 90) {
            // address -> rid cId
            let parentObj = getRidCidFromAddress(formulaeEntities[i]);
            parentObj = document.querySelector(`.cellRows .cell[rid='${parentObj.rid}'][cid='${parentObj.cid}']`);
            let children = parentObj.getAttribute("children");
            children = children.split(" ");
            for(let i = 0;i<children.length; i++)
            {
                if(children[i] == address)
                {
                    children.splice(i,1);
                }
            }
            console.log(children);
            let temp = "";
            for(let i = 0 ;i < children.length; i++)
            {
                temp += children[i] + " ";
            }
            parentObj.setAttribute("children",temp);
        }
    }
    // //console.log(formulae);
}