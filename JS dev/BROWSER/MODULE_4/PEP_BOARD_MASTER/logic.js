    let canvasBoard = document.querySelector("canvas");
    let rectTool = document.querySelector(".fa-square");
    let lineTool = document.querySelector(".fa-grip-lines-vertical");
    let body = document.querySelector("body");
    let cTool = "rectTool";
    // default height width is smaller 
    // canvasBoard.height = 50000;
    // canvasBoard.width = 1000;
    // this line gives you the tool to draw on that canvas
    let tool = canvasBoard.getContext("2d");

    // tool change logic
    rectTool.addEventListener("click", function () {
        console.log("hello")
        cTool = "rectTool";
        // drawingMode = !drawingMode;
    })
    lineTool.addEventListener("click", function () {
        cTool = "lineTool";
        // drawingMode = !drawingMode;
    })
    // canavas board -> top point kitna niche hai 
    let boardTop = canvasBoard.getBoundingClientRect().top;
    // canavas board -> left  point kitna aage  hai 
    let boardLeft = canvasBoard.getBoundingClientRect().left;
    let drawingMode = true;
    let iX, iY, fX, fY;
    
    body.addEventListener("mousedown",function (e)
    {
        console.log(e);
        drawingMode = true;
        iX = e.clientX+boardLeft;
        iY = e.clientY -boardTop;
    })

    body.addEventListener("mouseup", function (e) 
    {
        console.log(e);
        fX = e.clientX+boardLeft;;
        fY = e.clientY - boardTop;
        let width = fX - iX;
        let height = fY - iY;
        if (cTool == "rectTool") 
        {
            tool.strokeRect(iX, iY, width, height);
        } 
        else 
        {
            tool.beginPath();
            tool.moveTo(iX, iY);
            tool.lineTo(fX, fY);
            tool.stroke();
            console.log("Pencil tool is pending")
        }
        drawingMode = false;
    })

    body.addEventListener("mousemove", function (e) {

        console.log(e);
        if (drawingMode == false)
            return;
        fX = e.clientX - boardLeft;
        fY = e.clientY - boardTop;
        tool.lineTo(fX, fY);
        tool.stroke();
        iX = fX;
        iY = fY;
    })
