"use strict";

/*This ready function does four things. 1. it calls locations to dynamically load a dropdown.
* 2. when the user clicks the create team button, it calls the function createTeam
* 3. links the cancel button and sends it back to the search page
*
* @param - data - in this case, this refers to the data from the server.js
*/
$(function ()
{
    let leagues;
    
    //see 1 above
    $.getJSON("/api/leagues", function (data)
    {
        leagues = data;
        for (let i = 0; i < leagues.length; i++)
        {
            let newOption = $("<option>", { text: leagues[i].Name, value: leagues[i].Code });
            $("#leaguecode").append(newOption);
        }
    });

    //see 2 above
    $("#makeTeam").on("click", createTeam);

    //see 3 above
    $("#cancel").on("click", function ()
    {
        document.location.href = "search.html";
    });
})

/* This function allows the user to add a team to a specific location (league) */
function createTeam()
{
    //calls the validation function from validate.js. if it doesn't return any errors, it continues to the next step
    let isokay = validateTeam();
    if (isokay == false)
    {
        return;
    }

    //this is the post request to add the team into the array of teams
    $.post("/api/teams", $("#newteamForm").serialize(), function(data)
    {
        data = JSON.parse(data);
        
        $("#errorMessages").empty();
        $("#msgDiv").html("We're glad you're here!");
        $("#makeTeam").hide();
        $("#cancel").hide();
        $("#backToSearch").show();
        $("#toTeamDetails").show();
        $("#backToSearch").prop("href", "search.html");
        $("#toTeamDetails").prop("href", "details.html?teamId=" + data.TeamId);
    })
}