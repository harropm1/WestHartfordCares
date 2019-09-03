"use strict";

/*This ready function loads when the page loads.
*
* @param - courseId - string = this is pulled from the course that the user selected on the course page
*/
$(function ()
{
    let urlParams = new URLSearchParams(location.search);
    let teamId = urlParams.get("teamId");
    $("#TeamId").val(teamId);

    //this dynamically creates the age dropdown
    for (let i = 1; i <= 100; i++)
    {
        let newOption = $("<option>", { value: i, text: i });
        $("#age").append(newOption);
    }

    /* when the user clicks the sign me up button, it calls the function sendMemberInfo */
    $("#signMeUp").on("click", sendMemberInfo);
    $("#cancel").prop("href", "details.html?teamId=" + teamId);
});

/* This function validates and sends the new member's info.
* If the information the user enters is not valid, it will populate error messages 
* (these are created in validate.js in the validateMember and validateMemberViolation functions)
*/
function sendMemberInfo()
{
    //sets the team id variable
    let urlParams = new URLSearchParams(location.search);
    let teamId = urlParams.get("teamId");
    $("#TeamId").val(teamId);

    /* call to the server to get the team id.
    * It calls the validation function from validate.js. if it doesn't return any errors, it continues to the next step
    * It then validates if the new member can be added to the team, with no age discrepancies or gender discrepancies.
    */
    let teamInfo;
    $.getJSON("api/teams/" + teamId, function (data)
    {
        teamInfo = data;
        let isOkay = validateMember();
        if (isOkay == false)
        {
            return;
        }
        let isAlsoOkay = validateNewMemberViolation(teamInfo);
        if (isAlsoOkay == false)
        {
            return;
        }
        //sends the member info
        $.post("/api/teams/" + teamId + "/members", $("#signupForm").serialize(), function (data)
        {
            $("#errorMessages").empty();
            $("#msgDiv").html("Thanks for volunteering!");
            $("#signMeUp").prop("disabled", true);
            $("#cancel").hide();
            $("#backToDetails").show();
            $("#backToDetails").prop("href", "details.html?teamId=" + teamId);
        });
    });
}