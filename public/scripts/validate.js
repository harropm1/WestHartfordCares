"use strict";

/*This function validates if fields are empty, if emails follow a specific pattern, 
* and if phone numbers fit a correct pattern. 
* This function is used when members are added or edited.
*/
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

/*This function validates if fields are empty, if emails follow a specific pattern, 
* and if phone numbers fit a correct pattern. 
* This function is used when teams are added or edited.
*/
function validateTeam()
{
    let errMsg = [];

    //team name error
    if ($("#teamname").val().trim() == "")
    {
        errMsg[errMsg.length] = "Team Name is required";
    }

    //league select error
    if ($("#leaguecode").val().trim() == "")
    {
        errMsg[errMsg.length] = "Volunteer Location is required";
    }

    //manager name error
    if ($("#managername").val().trim() == "")
    {
        errMsg[errMsg.length] = "Manager's Name is required";
    }

    //phone error
    let phoneNumber = $("#managerphone").val();
    let phonePattern = /^(?:\([2-9]\d{2}\)\ ?|[2-9]\d{2}(?:\-?|\ ?))[2-9]\d{2}[- ]?\d{4}$/;
    if (phoneNumber.trim() == "")
    {
        errMsg[errMsg.length] = "Manager's Phone is required";
    }
    if (phonePattern.test(phoneNumber.trim()) ==  false)
    {
        errMsg[errMsg.length] = "Manager's Phone must be in a patten similar to 555-555-5555";
    }

    //email error
    let email = $("#manageremail").val();
    let emailPattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    if (email.trim() == "")
    {
        errMsg[errMsg.length] = "Manager's email is required";
    }
    if (emailPattern.test(email.trim()) == false)
    {
        errMsg[errMsg.length] = "Manager's email is in an improper format";
    }
    
    //max team members error
    if ($("#maxteammembers").val().trim() == "")
    {
        errMsg[errMsg.length] = "Maximum Number of Volunteers is required";
    }

    //min member age error
    if ($("#minmemberage").val().trim() == "" )
    {
        errMsg[errMsg.length] = "Minimum Volunteer Age is required";
    }

    //max member age error
    if ($("#maxmemberage").val().trim() == "" )
    {
        errMsg[errMsg.length] = "Maximum Volunteer Age is required";
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