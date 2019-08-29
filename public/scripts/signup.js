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

function sendMemberInfo()
{
    let urlParams = new URLSearchParams(location.search);
    let teamId = urlParams.get("teamId");
    $("#TeamId").val(teamId);

    $.post("/api/teams/" + teamId + "/members", $("#signupForm").serialize(), function (data)
    {
        $("#msgDiv").html("Thanks for volunteering!");
        $("#signMeUp").prop("disabled", true);
        $("#cancel").hide();
        $("#backToDetails").show();
        $("#backToDetails").prop("href", "details.html?teamId=" + teamId);
    })
}