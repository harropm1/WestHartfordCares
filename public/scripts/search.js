"use strict";

/*This ready function does three things. First it calls categories to dynamically load a dropdown.
* Next, it loads a table of teams based on what the user selected.
* Third, it loads all of the teams, if the user clicked that button.
*
* @param - data - in each case, this refers to the data from the server.js
*/
$(function ()
{
    let league;

    $("thead").hide();
    $("#addTeam").hide();

    /* generates the dropdown */
    $.getJSON("api/leagues", function (data)
    {
        league = data;
        for (let i = 0; i < league.length; i++)
        {
            let newOption = $("<option>", { text: league[i].Name, value: league[i].Code })
            $("#locationSelect").append(newOption);
        }
    });

    /* generates a table by location selection */
    $("#locationSelect").on("change", function ()
    {
        let teams;
        if ($("#locationSelect").val() == "Choose one")
        {
            $("thead").hide();
            $("#addTeam").hide();
            $("#tableBody").empty();
        }
        else
        {
            $("thead").show();
            $("#addTeam").show();
            $.getJSON("/api/teams/byleague/" + $("#locationSelect").val(), function (data)
            {
                teams = data;
                $("#tableBody").empty();
                createSearchByLocationTable(teams);
            });
        }
    });

    /* generates a table with all teams */
    let allTeams;
    $("#viewAll").on("click", function ()
    {
        $("thead").show();
        $("#addTeam").show();
        $.getJSON("/api/teams", function (data)
        {
            allTeams = data;
            $("#tableBody").empty();
            createSearchByLocationTable(allTeams);
        });
    });

    $("#addTeam").on("click", function ()
    {
        $("#addTeam").prop("href", "addcourse.html");
    });
});

/* This function loops through the entire course list from server.js to know what to put into the table 
*
* @param - teamsList = this is what is passed from the ready functions and the server
*/
function createSearchByLocationTable(teamsList)
{
    for (let i = 0; i < teamsList.length; i++)
    {
        insertTableData(teamsList[i]);
    }
}

/* This function creates the table with a small amount of data.
* It is used in both the all courses table and selection courses table.
*
* @param - team = this is what is passed from the ready functions and the server
* @param - data = this is what is passed from the server and is allowing me to use the league name in this list.
*/
function insertTableData(team)
{
    $.getJSON("/api/leagues/" + team.League, function (data)
    {
        let league = data;
        let rowBeingEntered = "<tr><td>" + league.Name +
            "</td><td>" + team.TeamName +
            "</td><td>" + team.ManagerName +
            "</td><td><a target='_self' class='green' href='details.html?teamId=" + team.TeamId +
            "'>Details</a></td></tr>";

        $("#tableBody").append(rowBeingEntered);
    });
}