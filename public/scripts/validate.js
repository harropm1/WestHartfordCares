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
    let emailPattern = /^\w+[\w-\.]*\@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
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
    if (phonePattern.test(phoneNumber.trim()) == false)
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
    for (let i = 0; i < errMsg.length; i++)
    {
        $("<li>" + errMsg[i] + "</li>").appendTo($("#errorMessages"));
    }
    return false;
}

/* This function validates if a member being added to a team violates the age rules or gender rules of the team.
* @param - data = this is passed in from details.js, and comes from the server 
*/
function validateNewMemberViolation(data)
{
    let errMsg = [];
    
    //validates if person is within the correct ages set by the team manager
    if (Number($("#age").val()) < data.MinMemberAge || Number($("#age").val()) > data.MaxMemberAge)
    {
        errMsg[errMsg.length] = "You are not within the age limit for this team.";
    }

    //validates if person fits the gender set by the team manager
    if (data.TeamGender != "Any" && ($(`input[name='gender']:checked`).val()) != data.TeamGender)
    {
        errMsg[errMsg.length] = "This team has a gender restriction that you do not meet.";
    }

    if (errMsg.length == 0)
    {
        return true;
    }

    $("#errorMessages").empty();
    for (let i = 0; i < errMsg.length; i++)
    {
        $("<li>" + errMsg[i] + "</li>").appendTo($("#errorMessages"));
    }
    return false;
}

/* This function validates an edited member's age and gender against the team's rules 
* @param - data = this is passed in from editmember.js, and comes from the server
*/
function validateEditedMember(data)
{
    let errMsg = [];
    
    //validates if person is within the correct ages set by the team manager
    if (Number($("#age").val()) < data.MinMemberAge || Number($("#age").val()) > data.MaxMemberAge)
    {
        errMsg[errMsg.length] = "You are not within the age limit for this team.";
    }

    //validates if person fits the gender set by the team manager
    if (data.TeamGender != "Any" && ($(`input[name='teamgender']:checked`).val()) != data.TeamGender)
    {
        errMsg[errMsg.length] = "This team has a gender restriction that you do not meet.";
    }

    if (errMsg.length == 0)
    {
        return true;
    }

    $("#errorMessages").empty();
    for (let i = 0; i < errMsg.length; i++)
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
    if (phonePattern.test(phoneNumber.trim()) == false)
    {
        errMsg[errMsg.length] = "Manager's Phone must be in a patten similar to 555-555-5555";
    }

    //email error
    let email = $("#manageremail").val();
    let emailPattern = /^\w+[\w-\.]*\@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
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
    if ($("#minmemberage").val().trim() == "")
    {
        errMsg[errMsg.length] = "Minimum Volunteer Age is required";
    }

    //max member age error
    if ($("#maxmemberage").val().trim() == "")
    {
        errMsg[errMsg.length] = "Maximum Volunteer Age is required";
    }

    if (errMsg.length == 0)
    {
        return true;
    }

    $("#errorMessages").empty();
    for (let i = 0; i < errMsg.length; i++)
    {
        $("<li>" + errMsg[i] + "</li>").appendTo($("#errorMessages"));
    }
    return false;
}

/* This function checks four things: 1. if the edited amount of  team members is smaller than the current registered members
* 2. if the edited team minimum age is greater than the youngest registered member
* 3. if the edited team maximum age is less than the oldest registered member
* 4. if the edited team gender will allow all members to stay on the team
* @param - data = this is passed in from editteaminfo.js, and comes from the server
*/
function validateEditTeam(data)
{
    let errMsg = [];

    //see 1 above
    if (Number($("#maxteammembers").val()) >= data.maxteammembers)
    {
        errMsg[errMsg.length] = "You have too many members for that team size";
    }

    //see 2 above
    if (Number($("#minmemberage").val()) > getMinAgeOfMember(data))
    {
        errMsg[errMsg.length] = "There is a member on this team that is younger than the new minimum age you have chosen.";
    }

    //see 3 above
    if (Number($("#maxmemberage").val()) < getMaxAgeOfMember(data))
    {
        errMsg[errMsg.length] = "There is a member on this team that is older than the new maximum age you have chosen.";
    }

    //see 4 above
    if (areThereAnyGenderChangeConflicts($(`input[name='teamgender']:checked`).val(), data))
    {
        errMsg[errMsg.length] = "You cannot change the gender of this team, because there is a member that is not that gender.";
    }

    if (errMsg.length == 0)
    {
        return true;
    }

    $("#errorMessages").empty();
    for (let i = 0; i < errMsg.length; i++)
    {
        $("<li>" + errMsg[i] + "</li>").appendTo($("#errorMessages"));
    }
    return false;
}

/*This function gets the youngest registered team member and compares it to the edited maximum age
* @param - team = this is passed in from editteaminfo.js, and comes from the server
*/
function getMinAgeOfMember(team)
{
    let minAge = 100000;
    for (let i = 0; i < team.Members.length; i++)
    {
        if (Number(team.Members[i].Age) < minAge) 
        {
            minAge = Number(team.Members[i].Age);
        }
    }
    return minAge;
}

/*This function gets the oldest registered team member and compares it to the edited maximum age
* @param - team = this is passed in from editteaminfo.js, and comes from the server
*/
function getMaxAgeOfMember(team)
{
    let maxAge = -1;
    for (let i = 0; i < team.Members.length; i++)
    {
        if (Number(team.Members[i].Age) > maxAge) 
        {
            maxAge = Number(team.Members[i].Age);
        }
    }
    return maxAge;
}

/*This function gets the gender of the current team and compares it to the edited team gender.
* @param - team = this is passed in from editteaminfo.js, and comes from the server
*/
function areThereAnyGenderChangeConflicts(newTeamGender, team)
{
    if (newTeamGender == "Any")
    {
        // No conflict w/ team switching to coed
        return false;
    }

    let conflictGender = newTeamGender == "Male" ? "Female" : "Male";
    for (let i = 0; i < team.Members.length; i++)
    {
        // look for member whose gender would conflict with new team gender
        if (team.Members[i].Gender == conflictGender) 
        {
            return true;  // found a conflict!
        }
    }
    return false; // no conflicts
}