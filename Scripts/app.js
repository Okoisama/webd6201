/* custom JavaScript goes here*/

const { start } = require("@popperjs/core");

(function()
{
    "use strict";

function displayHomePage()
{
    let paragraphOneContent = "This is my first paragraph";

    // selection
    let paragraphOne = document.getElementById("paragraphOne");
    paragraphOne.textContent = paragraphOneContent;

    // STEP 1 - Create a new Element
    let paragraphTwo = document.createElement("p");
    // STEP 2 - configure the new Element
    paragraphTwo.setAttribute("id", "paragraphTwo");
    paragraphTwo.textContent = "This is my second paragraph";
    paragraphTwo.className = "fs-4 fw-bold";
    // STEP 3 - Target the Parent Element
    let mainContent = document.querySelector("main");
    // STEP 4 - append the new element to the parent
    mainContent.appendChild(paragraphTwo);

    let newDivTag = document.createElement("div");
    newDivTag.innerHTML = 
    `<h2>This is my second heading</h2>
    <p id="paragraphThree"> This is the Third Paragraph </p>`;

    mainContent.append(newDivTag);
    
}

function displayAboutPage()
{

}


function displayContactPage()
{
    let sendButton = document.querySelector("button#sendButton");

        let fullName = document.getElementById("fullName");
        fullName.addEventListener("blur", function(event)
        {
            if(fullName.value.length < 2)
            {
                fullName.focus();
                fullName.select();
                
            }
        });

        sendButton.addEventListener("click", function(event)
         {
            event.preventDefault();

            console.log(fullName.value);
            console.log(contactNumber.value);
            console.log(emailAddress.value);
        });

}


function displayProductsPage()
{

}


function displayServicesPage()
{

}

    function Start()
    {
        console.log("App Started...");

        switch(document.title)
        {
            case 'Home':
                displayHomePage();
                break;
            case 'About':
                displayAboutPage();
                break;
            case 'Products':
                displayProductsPage();
                break;
            case 'Services':
                displayServicesPage();
                break;
            case 'Contact':
                displayContactPage();
                break;
        }
        
    }

window.addEventListener("load", start);
})

();
