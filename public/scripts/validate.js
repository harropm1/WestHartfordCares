"use strict";

function validateMember()
{
    let errMsg = [];

    //member name error
    if ($("#membername").val().trim() == "")
    {
        errMsg[errMsg.length] = "Volunteer Name is required";
    }

    //contact name error
    if ($("#contactname").val().trim() == "")
    {
        errMsg[errMsg.length] = "Contact Name is required, but can be the same as Volunteer Name";
    }

    //email error
    let email = $("#email").val();
    let emailPattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    if (email.trim() == "")
    {
        errMsg[errMsg.length] = "Email is required";
    }
    if (emailPattern.test(email.trim()) == false)
    {
        errMsg[errMsg.length] = "Email is in an improper format";
    }
    
    //phone error
    let phoneNumber = $("#phone").val();
    let phonePattern = /^(?:\([2-9]\d{2}\)\ ?|[2-9]\d{2}(?:\-?|\ ?))[2-9]\d{2}[- ]?\d{4}$/;
    if (phoneNumber.trim() == "")
    {
        errMsg[errMsg.length] = "Phone Number is required";
    }
    if (phonePattern.test(phoneNumber.trim()) ==  false)
    {
        errMsg[errMsg.length] = "Phone Number must be in a patten similar to 555-555-5555";
    }

    //age error
    if ($("#age").val().trim() == "chooseOne")
    {
        errMsg[errMsg.length] = "Age is required";
    }

    if (errMsg.length == 0)
    {
        return true;
    }

    $("#errorMessages").empty();
    for(let i=0; i < errMsg.length; i++)
    {
        $("<li>" + errMsg[i] + "</li>").appendTo($("#errorMessages"));
    }
    return false;
}