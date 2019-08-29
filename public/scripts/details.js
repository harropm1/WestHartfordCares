"use strict";

/*This ready function calls the insert table data function.
* It also adds a register button that connects a user to the register page for this course
*
* @param - courseId - string = this is pulled from the course that the user selected on the course page
*/
$(function ()
{
    let urlParams = new URLSearchParams(location.search);
    let teamId = urlParams.get("teamId");

    /* this is the call to the server */
    let teamInfo;
    $.getJSON("api/teams/" + teamId, function (data)
    {
        teamInfo = data;
        insertData(teamInfo);
        insertMemberTable(teamInfo);

        $("#signUp").prop("href", "signup.html?teamId=" + teamInfo.TeamId);
    });

    

    //this links the back to teams page 
    $("#backToTeams").on("click", function ()
    {
        $("#backToTeams").prop("href", "search.html");
    });

    /*this links to the edit course page associated with the specific course
    $("#editClass").on("click", function ()
    {
        $("#editClass").prop("href", "editcourse.html?courseId=" + team.CourseId);
    }); */
});

function insertData(team)
{
    $("#TeamName").html(team.TeamName);

    $("#ManagerName").html("Manager's Name: " + team.ManagerName);
    $("#ManagerPhone").html("Manager's Phone Number: " + team.ManagerPhone);
    $("#ManagerEmail").html("Manager's Email: " + team.ManagerEmail)

    $("#MaxTeamMembers").html("Maximum Number of Volunteers: " + team.MaxTeamMembers);
    $("#MinMemberAge").html("Minimum Volunteer Age: " + team.MinMemberAge);
    $("#MaxMemberAge").html("Maximum Volunteer Age: " + team.MaxMemberAge);
    $("#TeamGender").html("Team Gender: " + team.TeamGender);
}

function insertMemberTable(team)
{
    if (team.Members.length == 0)
    {
        let noMembers = "<tr><td>No volunteers yet!</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>"
        $("#memberTableBody").append(noMembers);
    }
    else
    {
        for (let i = 0; i < team.Members.length; i++)
        {
            let memberName = team.Members[i].MemberName;
            let contact = team.Members[i].ContactName;
            let email = team.Members[i].Email;
            let phone = team.Members[i].Phone;
            let age = team.Members[i].Age;
            let gender = team.Members[i].Gender;

            let htmlString = `
                <tr>
                    <td>${memberName}</td>
                    <td>${contact}</td>
                    <td>${email}</td>
                    <td>${phone}</td>
                    <td>${age}</td>
                    <td>${gender}</td>
                </tr>`;

            $("#memberTableBody").append(htmlString);
        }
    }
}