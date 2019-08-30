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

        addTeamDetailsToPage(teamInfo);
        insertMemberTable(teamInfo);
    });

    /* this is what happens on the confirm edit button. 
    * first it validates the information to make sure everything is filled out.
    * if it is all correct, it does an ajax put request (which contains options for a success and an error)
    */
    $("#confirmEdit").on("click", function ()
    {
        let isok = validateTeam();
        if (isok == false)
        {
            return;
        }
        let teamIsOkay = validateEditTeam(teamInfo);
        if (teamIsOkay == false)
        {
            return;
        }
        $.ajax(
            {
                url: '/api/teams',
                method: 'PUT',
                data: `teamid=${teamId}&${$("#editTeamForm").serialize()}`,
                //this is "success" because for some reason, "done" does not work for me
                success: function () 
                {
                    $("#msgDiv").html("Update Successful!");
                    $("#confirmEdit").hide();
                    $("#cancel").hide();
                    $("#toTeamDetails").show();
                    $("#toTeamDetails").prop("href", "details.html?teamId=" + teamId);
                },
                //this is "error" because for some reason, "fail" does not work for me
                error: function ()
                {
                    $("#msgDiv").html("Something went wrong.");
                }
            });
    });

    $("#cancel").on("click", function()
    {
        location.href = `details.html?teamId=${teamId}`;
    })
});

/* This function adds the team data from the details page into the input
*
* @param - team = this is the data that is passed from the load function
*/
function addTeamDetailsToPage(team)
{
    /* generates the location dropdown */
    let league;
    $.getJSON("api/leagues", function (data)
    {
        league = data;
        for (let i = 0; i < league.length; i++)
        {
            let newOption = $("<option>", { text: league[i].Name, value: league[i].Code })
            $("#leaguecode").append(newOption);
        }
        //this puts the team info into the input fields
        $("#teamname").val(team.TeamName);
        $("#leaguecode").val(team.League);
        $("#managername").val(team.ManagerName);
        $("#managerphone").val(team.ManagerPhone);
        $("#manageremail").val(team.ManagerEmail);
        $("#maxteammembers").val(team.MaxTeamMembers);
        $("#minmemberage").val(team.MinMemberAge);
        $("#maxmemberage").val(team.MaxMemberAge);
        $(`input[name='teamgender'][value='${team.TeamGender}']`).prop("checked", true);

    });
}

/* This function adds the names and info for each of the members of the team into the tables
*
* @param - team = this is the data that is passed from the load function
*/
function insertMemberTable(team)
{
    //if no members on the team yet
    if (team.Members.length == 0)
    {
        let noMembers = "<tr><td>No volunteers yet!</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>"
        $("#memberTableBody").append(noMembers);
    }
    //otherwise, add these details and buttons
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
                    <td><a role="button" class="btn btn-light blueBackground" id="edit" href="#">Edit</a></td>
                    <td><a role="button" class="btn btn-secondary" id="remove" href="#">Remove</a></td>
                </tr>`;

            $("#memberTableBody").append(htmlString);
        }
    }
}