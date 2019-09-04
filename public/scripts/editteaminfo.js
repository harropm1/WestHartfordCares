"use strict";

/*This ready function does four(ish) things. 1a. It calls the server to get the information to add into the input fields
* 1b. It adds the member info into the table.
*
* 2. this is what happens when the user clicks the confirm edit button. 
* 2a. it validates the information to make sure everything is filled out and the members still meet the team requirements. 
* 2b. if it is all correct, it does an ajax put request (which contains options for a success and an error)
*
* 3. When the user clicks the remove button (on the modal), it deletes the team.
*
* 4. When the user clicks the cancel button, it sends them back to the details page for that team
*
* @param - data =  this comes from the server and contains all the details about a specific team
*/
$(function ()
{
    //this pulls the teamId from the URL
    let urlParams = new URLSearchParams(location.search);
    let teamId = urlParams.get("teamId");

    //see 1a and 1b above
    let teamInfo;
    $.getJSON("api/teams/" + teamId, function (data)
    {
        teamInfo = data;

        addTeamDetailsToPage(teamInfo);
        insertMemberTable(teamInfo);
    });

    //see 2 above
    $("#confirmEdit").on("click", function ()
    {
        //see 2a above
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
        //see 2b above
        $.ajax(
            {
                url: '/api/teams',
                method: 'PUT',
                data: `teamid=${teamId}&${$("#editTeamForm").serialize()}`,
                //this is "success" because for some reason, "done" does not work for me
                success: function () 
                {
                    $("#errorMessages").empty();
                    $("#msgDiv").html("Update Successful!");
                    $("#confirmEdit").hide();
                    $("#cancel").hide();
                    $("#areYouSure").hide();
                    $("#toTeamDetails").show();
                    $("#toTeamDetails").prop("href", "details.html?teamId=" + teamId);
                },
                //this is "error" because for some reason, "fail" does not work for me
                error: function ()
                {
                    $("#msgDiv").html("Something went wrong. Please try again.");
                }
            });
    });

    //see 3 above
    $("#remove").on("click", function ()
    {
        $.ajax(
            {
                url: '/api/teams/' + teamId,
                method: 'DELETE',
                //this is "success" because for some reason, "done" does not work for me
                success: function () 
                {
                    location.href = `search.html`;
                },
                //this is "error" because for some reason, "fail" does not work for me
                error: function ()
                {
                    location.href = `editteaminfo.html?teamId=${teamId}`;
                }
            });
    });

    //see 4 above
    $("#cancel").on("click", function ()
    {
        location.href = `details.html?teamId=${teamId}`;
    });
});

/* This function adds the team data from the details page into the input
*
* @param - team = this is the data that is passed from the ready function
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
* @param - team = this is the data that is passed from the ready function
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
            let memberId = team.Members[i].MemberId;
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
                    <td><button type="button" class="btn btn-light blueBackground" id="edit${memberId}">Edit</button></td>
                    <td><button type="button" class="btn btn-secondary" id="remove${memberId}">Remove</button></td>
                </tr>`;

            $("#memberTableBody").append(htmlString);

            $(`#remove${memberId}`).on("click", function ()
            {
                location.href = "editmember.html?teamId=" + team.TeamId + "&memberId=" + memberId;
            });
            $(`#edit${memberId}`).on("click", function()
            {
                location.href = "editmember.html?teamId=" + team.TeamId + "&memberId=" + memberId;
            })
        }
    }
}