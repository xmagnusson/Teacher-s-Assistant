/**********************************************************************************************
*   automatically set dark mode according to current hour of the day on window load
**********************************************************************************************/
window.onload = setColorModeAuto;

function setColorModeAuto(){
    var currentDateTime = new Date();
    var currentHour = currentDateTime.getHours();
            
    if(currentHour < 7 || currentHour > 20){
        changeColorMode();
    }

}

/**********************************************************************************************
*   calculate percentage for all and add them to the list to be displayed
**********************************************************************************************/
document.querySelector("#hero button").addEventListener("click",calculatePercentages);

document.querySelector("#totalScore").addEventListener("keydown",function(event){
    if(event.key === "Enter"){
        calculatePercentages();
    }
});

function calculatePercentages(){
    var form = document.querySelector("#totalScore");
    var scoreInputValid = form.reportValidity();
    
    var totalScore = Math.floor(document.getElementById("totalScore").value * 100)/100;

    if (scoreInputValid && totalScore > 0 && totalScore <= 100){
        document.querySelector("#hero").classList.add("displayNone");
        document.querySelector("#topMenu").classList.remove("displayNone");
        document.querySelector("#accordionFooterSection").classList.remove("displayNone");

        document.querySelector("#maxPoints").innerHTML = totalScore;

        var htmlContent = (totalScore % 1 === 0)? "" : createTopOfAccordion(totalScore);

        document.getElementById("accordionScore").innerHTML="";
        for(var i = totalScore - (totalScore % 1); i>=0; i--){
            htmlContent += '<button class="myAccordion"' + ((i === totalScore && (totalScore % 1) === 0)? 'tabindex="-1"':'') + '><span class="myAcc_points"><strong>' + i + '</strong></span> <span class="myAcc_text">'+ ((i===1)?'point&nbsp':'points') +' = </span><span class="myAcc_percentages"><strong>' + (Math.floor((i/totalScore)*10000)/100).toFixed(2) + '%</strong></span></button>';
            
            var decimalPercentages = "";
            
            if (i>=1){
                for (var k = 0.25; k <= 0.75; k = k + 0.25){
                    decimalPercentages +='<li><span class="myAcc_points"><strong>' + (i-k) + '</strong></span> <span class="myAcc_text">'+ ((i===1)?'point&nbsp':'points') +' = </span><span class="myAcc_percentages"><strong>' + (Math.floor(((i-k)/totalScore)*10000)/100).toFixed(2) + '%</strong></span></li>';
                
                }
                htmlContent += '<div class="panel"><ul>'+ decimalPercentages +'</ul></div>';
            }
        }
        document.getElementById("accordionScore").innerHTML = htmlContent;

        document.querySelectorAll("#accordionScore .myAccordion")[0].classList.add("myAcc_first");
        
        addMyAccordionFunctionality();
    }
}

document.querySelector("#changeButton").addEventListener("click",function (){
    document.querySelector("#hero").classList.remove("displayNone");
    document.querySelector("#topMenu").classList.add("displayNone");
    document.querySelector("#accordionFooterSection").classList.add("displayNone");
});

/**********************************************************************************************
*   create top of the accordion to corectly show decimal max points(e.g 19.25)
**********************************************************************************************/
function createTopOfAccordion(maxEnteredPoints){

    var htmlPartialContent = '<button class="myAccordion" tabindex="-1"><span class="myAcc_points" style="width: 4rem;"><strong>' + ((maxEnteredPoints % 1 === 0.5)? (maxEnteredPoints + "0") : maxEnteredPoints) + '</strong></span> <span class="myAcc_text" style="width: 2.8rem; margin-left: 0.6rem;"> pts = </span><span class="myAcc_percentages" style="width: 4.8rem;"><strong>' + (Math.floor((maxEnteredPoints/maxEnteredPoints)*10000)/100).toFixed(2) + '%</strong></span></button>';
        
    var decimalPercentages = "";
    for (var k = 0.25; k < (maxEnteredPoints % 1); k = k + 0.25){
        decimalPercentages +='<li><span class="myAcc_points"><strong>' + (maxEnteredPoints-k) + '</strong></span> <span class="myAcc_text">'+ ((maxEnteredPoints===1)?'point&nbsp':'points') +' = </span><span class="myAcc_percentages"><strong>' + (Math.floor(((maxEnteredPoints-k)/maxEnteredPoints)*10000)/100).toFixed(2) + '%</strong></span></li>';
    }

    htmlPartialContent += '<div class="panel"><ul>'+ decimalPercentages +'</ul></div>';

    return htmlPartialContent;
}

/**********************************************************************************************
*   accordion functionality - collapse / uncollapse
**********************************************************************************************/
function addMyAccordionFunctionality(){
    var acc = document.getElementsByClassName("myAccordion");
    var i;

    for (i = 1; i < acc.length; i++) {
    acc[i].addEventListener("click", function() {
        var j;
        for (j = 1; j < acc.length; j++) {
            if (acc[j] !== this){
            acc[j].classList.remove("myAcc_active");
            var panel = acc[j].previousElementSibling;
            panel.style.maxHeight = null;}
        }
        this.classList.toggle("myAcc_active");
        var panel = this.previousElementSibling;
        if (panel.style.maxHeight) {
        panel.style.maxHeight = null;
        } else {
        panel.style.maxHeight = panel.scrollHeight + "px";
        } 
    });
    }
}

/**********************************************************************************************
*   add functionality to be able to toggle manually color mode
**********************************************************************************************/
document.querySelector(".changeModeIcon").addEventListener("click", changeColorMode);

function changeColorMode(){
    if (document.body.getAttribute("data-bs-theme") === "dark"){
        document.body.setAttribute("data-bs-theme","light");
        document.querySelector(".changeModeIcon").querySelector("img").setAttribute("src","./icons/moon-stars-fill.svg");
    }else{
        document.body.setAttribute("data-bs-theme","dark");
        document.querySelector(".changeModeIcon").querySelector("img").setAttribute("src","./icons/sun-fill.svg");
    }
}

