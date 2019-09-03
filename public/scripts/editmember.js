$(function ()
{
    let urlParams = new URLSearchParams(location.search);
    let teamId = urlParams.get("teamId");
    let memberId = urlParams.get("memberId");

    ///api/teams/:id/members
    /* this is the call to the server */
    let memberInfo;
    $.getJSON("/api/teams/" + teamId + "/members/" + memberId, function (data)
    {
        memberInfo = data;
        addMemberDetailsToPage(memberInfo);
    });

    /* this is what happens on the edit button. 
    * first it validates the information to make sure everything is filled out.
    * if it is all correct, it does an ajax put request (which contains options for a success and an error)
    */
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

    $("#edit").on("click", function()
    {
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

        $.ajax(
            {
                url: "/api/teams/" + teamId + "/members",
                method: 'PUT',
                data: `memberid=${memberId}&${$("#editMemberForm").serialize()}`,
                //this is "success" because for some reason, "done" does not work for me
                success: function () 
                {
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

    $("#cancel").on("click", function ()
    {
        location.href = `details.html?teamId=${teamId}`;
    });
});

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