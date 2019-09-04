"use strict";

/*This ready function does four(ish) things. 1. It calls the server to get the information to add into the input fields
*
* 2. When the user clicks the remove button (on the modal), it deletes the member.
*
* 3. this is what happens when the user clicks the edit button. 
* 3a. it validates the information to make sure everything is filled out and has the member still meets the team requirements. 
* 3b. if it is all correct, it does an ajax put request (which contains options for a success and an error)
*
* 4. When the user clicks the cancel button, it sends them back to the details page for that team
*
* @param - data =  this comes from the server and contains all the details about a specific member on a specific team
*/
$(function ()
{
    //this pulls the teamId and memberId from the URL
    let urlParams = new URLSearchParams(location.search);
    let teamId = urlParams.get("teamId");
    let memberId = urlParams.get("memberId");

    //see 1 above
    let memberInfo;
    $.getJSON("/api/teams/" + teamId + "/members/" + memberId, function (data)
    {
        memberInfo = data;
        addMemberDetailsToPage(memberInfo);
    });

    //see 2 above
    $("#remove").on("click", function ()
    {
        $.ajax(
            {
                url: "/api/teams/" + teamId + "/members/" + memberId,
                method: 'DELETE',
                //this is "success" because for some reason, "done" does not work for me
                success: function () 
                {
                    location.href = `details.html?teamId=${teamId}`;
                },
                //this is "error" because for some reason, "fail" does not work for me
                error: function ()
                {
                    location.href = `editmember.html?teamId=${teamId}&memberId=${memberId}`;
                }
            });
    });
    
    //see 3 above
    $("#edit").on("click", function ()
    {
        //see 3a above
        let isok = validateMember();
        if (isok == false)
        {
            return;
        }
        let memberIsOk = validateEditedMember(memberInfo);
        if (memberIsOk == false)
        {
            return;
        }
        //see 3b above
        $.ajax(
            {
                url: "/api/teams/" + teamId + "/members",
                method: 'PUT',
                data: `memberid=${memberId}&${$("#editMemberForm").serialize()}`,
                //this is "success" because for some reason, "done" does not work for me
                success: function () 
                {
                    $("#errorMessages").empty();
                    $("#msgDiv").html("Update Successful!");
                    $("#edit").prop("disabled", true)
                    $("#areYouSure").hide();
                    $("#cancel").hide();
                    $("#backToDetails").show();
                    $("#backToDetails").prop("href", "details.html?teamId=" + teamId);
                },
                //this is "error" because for some reason, "fail" does not work for me
                error: function ()
                {
                    $("#msgDiv").html("Something went wrong. Please try again");
                }
            });
    })

    //see 4 above
    $("#cancel").on("click", function ()
    {
        location.href = `details.html?teamId=${teamId}`;
    });
});

/* This function adds the member details to the inputs on the page.
* 
* @param - member =  this is passed from the call to the function above. the data comes from the server and has all the details about a specific member on a specific team
*/
function addMemberDetailsToPage(member)
{
    //this adds the team id into that input field
    let urlParams = new URLSearchParams(location.search);
    let teamId = urlParams.get("teamId");
    $("#TeamId").val(teamId);

    //this dynamically creates the age dropdown
    for (let i = 1; i <= 100; i++)
    {
        let newOption = $("<option>", { value: i, text: i });
        $("#age").append(newOption);
    }

    //this puts the member info into the input fields
    $("#membername").val(member.MemberName);
    $("#contactname").val(member.ContactName);
    $("#email").val(member.Email);
    $("#phone").val(member.Phone);
    $("#age").val(Number(member.Age));
    $(`input[name='gender'][value='${member.Gender}']`).prop("checked", true);
}