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

});

function insertData(team)
{
    $("#TeamName").html(team.TeamName);

    let managerInfo = `
        <h3 class="card-title text-center">Volunteer Team Manager</h3>
        <p class="card-text text-center" id="ManagerInfo">${team.ManagerName}
        <br>${team.ManagerPhone}
        <br>${team.ManagerEmail}</p>`;
    $("#teamManager").append(managerInfo);

    let teamInfo = `
        <h3 class="card-title text-center">Team Details</h3>
        <p class="card-text text-center" id="teamInfo">Maximum Team Members: ${team.MaxTeamMembers}
        <br>Volunteer Age Range: ${team.MinMemberAge} - ${team.MaxMemberAge}
        <br>Team Gender: ${team.TeamGender}</p>`;
    $("#teamDetails").append(teamInfo);

    
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