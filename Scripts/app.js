/* custom JavaScript goes here */

//IIFE - Immediately Invoked Function Expression
//AKA - Anonymous Self-Executing Function
//Closure - limits scope leak

// created a core namespace
"use strict";

((core) =>
{
    function displayHome()
    {
        let paragraphOneText =
          "This is a simple site to demonstrate DOM Manipulation for ICE 1";

        let paragraphOneElement = document.getElementById("paragraphOne");

        paragraphOneElement.textContent = paragraphOneText;
        paragraphOneElement.className = "fs-5";

        // Step 1. document.createElement
        let newParagraph = document.createElement("p");
        // Step 2. configure the element
        newParagraph.setAttribute("id", "paragraphTwo");
        newParagraph.textContent = "...And this is paragraph two";
        // Step 3. select the parent element
        let mainContent = document.getElementsByTagName("main")[0];
        // Step 4. Add / Insert the element
        mainContent.appendChild(newParagraph);

        newParagraph.className = "fs-6";

        // another way of injecting content
        let paragraphDiv = document.createElement("div");
        let paragraphThree = `<p id="paragraphThree" class="fs-7 fw-bold">And this is the Third Paragraph</p>`;
        paragraphDiv.innerHTML = paragraphThree;

        // insertions

        // example of inserting before a node
        //newParagraph.before(paragraphDiv);

        // example of inserting after a node
        newParagraph.after(paragraphDiv);

        // deletions

        // example of removing a single element
        //paragraphOneElement.remove();

        // example of removeChild
        mainContent.removeChild(paragraphOneElement);

        // update / modification
        //mainContent.firstElementChild.textContent = "Welcome Home!";

        mainContent.innerHTML = `<h1 id="firstHeading">Welcome to WEBD6201 - Lab 1</h1>
         <p id="paragraphOne" class="fs-3 fw-bold">This is my first Paragraph</p>
        `;
        
    }

    function displayAbout()
    {

    }

    function displayProjects()
    {

    }

    function displayServices()
    {

    }


    function testFullName()
    {
      let fullNamePattern = /[A-Z][a-z]+(\s|,)[A-Z][a-z]{1,50}/;
      let messageArea = $("#messageArea").hide();
      $("#fullName").on("blur", function()
      {
        if(!fullNamePattern.test($(this).val()))
        {
          $(this).trigger("focus").trigger("select");
          messageArea.show().addClass("alert alert-danger").text("Please enter an appropriate name. A first name and last name are required with a minimum length of 2 characters each.");
        }
        else
        {
            messageArea.removeAttr("class").hide();
        }
      });
    }

    function testContactNumber()
    {
      let contactNumberPattern = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;
      let messageArea = $("#messageArea");
      $("#contactNumber").on("blur", function()
      {
        if(!contactNumberPattern.test($(this).val()))
        {
          $(this).trigger("focus").trigger("select");
          messageArea.show().addClass("alert alert-danger").text("Please enter a valid contact number.");
        }
        else
        {
            messageArea.removeAttr("class").hide();
        }
      });

    }


    function testEmailAddress()
    {
      let emailAddressPattern = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6})*$/;
      let messageArea = $("#messageArea");
      $("#emailAddress").on("blur", function()
      {
        if(!emailAddressPattern.test($(this).val()))
        {
          $(this).trigger("focus").trigger("select");
          messageArea.show().addClass("alert alert-danger").text("Please enter a valid email address.");
        }
        else
        {
            messageArea.removeAttr("class").hide();
        }
      });
    }


    function formValidation()
    {
      testFullName();
      testContactNumber();
      testEmailAddress();
    }

    function displayContact()
    {
        $("#messageArea").hide();

        // form validation

        $("#fullName").on("blur", function()
        {
          if($(this).val().length < 2)
          {
              $(this).trigger("focus").trigger("select");
              $("#messageArea").show().addClass("alert alert-danger").text("Please enter an appropriate name");
          }
          else
          {
             $("#messageArea").removeAttr("class").hide();
          }
        });


        $("#sendButton").on("click", (event)=>
        {
          if($("#subscribeCheckbox")[0].checked)
          {
          let contact = new core.Contact(fullName.value, contactNumber.value, emailAddress.value);

          if(contact.serialize())
          {
            localStorage.setItem((localStorage.length + 1).toString(), contact.serialize());
          }
        }
        });
    }

    function displayContactList() 
    {

      if (localStorage.length > 0) 
      {
        let contactList = document.getElementById("contactList");

        let data = "";

        let keys = Object.keys(localStorage);

        let index = 1; // sentinel variable
        // returns an array of keys from localStorage
        
        for (const key of keys) {
          let contactData = localStorage.getItem(key);

          let contact = new core.Contact();
          contact.deserialize(contactData);

          data += `<tr>
          <th scope="row" class="text-center">${index}</th>
          <td>${contact.FullName}</td>
          <td>${contact.ContactNumber}</td>
          <td>${contact.EmailAddress}</td>
          <td class="text-center"><button value="${key}" class="btn btn-primary btn-sm edit"><i class="fas fa-edit fa-sm"></i> Edit</button></td>
          <td class="text-center"><button value="${key}" class="btn btn-danger btn-sm delete"><i class="fas fa-trash-alt fa-sm"></i> Delete</button></td>
          </tr>`;

          index++;
        }

        contactList.innerHTML = data;

        $("button.edit").on("click", function()
        {
          location.href ="edit.html#" + $(this).val();
        });

         $("button.delete").on("click", function()
         {
           if(confirm("Are you sure?"))
           {
            localStorage.removeItem($(this).val());
           }
           location.href = "contact-list.html"; // refresh the page
         });

         $("#addButton").on("click", function()
         {
            location.href = "edit.html";
         })
      }
    }


    function displayEdit()
    {
      let key = location.hash.substring(1);
      let contact = new core.Contact();

      // check to ensure that the key is not empty
      if(key != "")
      {
        
        // get contact info from localStorage
        contact.deserialize(localStorage.getItem(key));

        // display contact information in the form
        $("#fullName").val(contact.FullName);
        $("#contactNumber").val(contact.ContactNumber);
        $("#emailAddress").val(contact.EmailAddress);
      }
      else
      {
        // modify the page so that it shows "Add Contact" in the header
        $("main>h1").text("Add Contact");

        // modify the edit button so that it shows "Add" as well as the appropriate icon
        $("#editButton").html(`<i class="fas fa-plus-circle fa-lg"></i> Add`);
      }
     
      // form validation
      formValidation();

      $("#editButton").on("click", function() 
      {

        if(key == "")
        {
          // create a new key based on the First initial of the FullName and the Date.now() in ms
          key = contact.FullName.substring(0, 1) + Date.now();
        }

        // copy contact info from the form to the contact object
        contact.FullName =  $("#fullName").val();
        contact.ContactNumber = $("#contactNumber").val();
        contact.EmailAddress = $("#emailAddress").val();

        // add or edit the contact ifo in localStorage
        localStorage.setItem(key, contact.serialize());

        // return to the contact-list page
        location.href = "contact-list.html";
      });

      $("#cancelButton").on("click", function()
      {
        // return to the contact-list page
        location.href = "contact-list.html";
      });
      
    }


    function displayLogin()
    {
      let messageArea = $("#messageArea");
      messageArea.hide();

      $("#loginButton").on("click", function() 
      {
        let username = $("#username");
        let password = $("#password");
        let success = false;
        let newUser = new core.User();

        // use ajax to access the json file
        $.get("./Data/users.json", function(data)
        {
          // check each user in the users.json file  (linear search)
          for (const user of data.users) 
          {
            if(username.val() == user.Username && password.val() == user.Password)
            {
              newUser.fromJSON(user);
              success = true;
              break;
            }
          }

          // if username and password matches - success... then perform login
          if(success)
          {
            // add user to session storage
            sessionStorage.setItem("user", newUser.serialize());

            // hide any error message
            messageArea.removeAttr("class").hide();

            // redirect user to secure area - contact-list.html
            location.href = "contact-list.html";
          }
          else
          {
            // display an error message
            username.trigger("focus").trigger("select");
            messageArea.show().addClass("alert alert-danger").text("Error: Invalid login information");
          }
        });
      });

      $("#cancelButton").on("click", function()
      {
        // clear the login form
        document.forms[0].reset();
        // return to the home page
        location.href = "index.html";
      });
    }

    function displayRegister()
    {

    }

    function toggleLogin()
    {
      // if user is logged in
      if(sessionStorage.getItem("user"))
      {
        // swap out the login link for logout
        $("#login").html(
        `<a id="logout" class="nav-link" aria-current="page" href="#"><i class="fas fa-sign-out-alt"></i> Logout</a>`
        );

        $("#logout").on("click", function()
        {
          // perform logout
          sessionStorage.clear();

          // redirect back to login
          location.href = "login.html";
        });
       
        $(`<li class="nav-item">
        <a id="contactListLink" class="nav-link" aria-current="page" href="contact-list.html"><i class="fas fa-users fa-lg"></i> Contact List</a>
      </li>`).insertBefore("#login");
      
      }
    }

    function Start()
    {
        console.log("App Started...");

        switch (document.title) 
        {
          case "Home":
              displayHome();
            break;
          case "About":
              displayAbout();
            break;
          case "Projects":
              displayProjects();
            break;
          case "Services":
              displayServices();
            break;
          case "Contact":
              displayContact();
            break;
          case "Contact-List":
            displayContactList();
          break;
          case "Edit":
            displayEdit();
            break;
          case "Login":
            displayLogin();
          break;
          case "Register":
            displayRegister();
          break;
        }
        
        // toggle login/logout
       toggleLogin();
    }

    window.addEventListener("load", Start);

    core.Start = Start;

})(core || (core = {}));