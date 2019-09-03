"use strict";

/*This ready function does three(ish) things. 1. It calls the server to get the information to add into the input fields
*
* 2. When the user clicks back to teams, this links them back to the teams page
*
* 3. When the user clicks editteam, this links them to the edit team page for that particular team 
*
* @param - data =  this comes from the server and contains all the details about a specific member on a specific team
*/
$(function ()
{
    //this pulls the teamId from the URL
    let urlParams = new URLSearchParams(location.search);
    let teamId = urlParams.get("teamId");

    //see 1 above
    let teamInfo;
    $.getJSON("api/teams/" + teamId, function (data)
    {
        teamInfo = data;
        insertData(teamInfo);
        insertMemberTable(teamInfo);

        $("#signUp").prop("href", "signup.html?teamId=" + teamInfo.TeamId);
    });

    //see 2 above
    $("#backToTeams").on("click", function ()
    {
        $("#backToTeams").prop("href", "search.html");
    });

    $("#editTeam").on("click", function()
    {
        $("#editTeam").prop("href", "editteaminfo.html?teamId=" + teamInfo.TeamId);
    });

});

/* This function inserts the data about a specific team into two different cards.
*
* @param - member =  this is passed from the call to the function above. It has the details about a specific team
*/
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

/* This function inserts the data about a specific team's members into a table.
*
* @param - member =  this is passed from the call to the function above. It has the details about the members on a specific team
*/
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