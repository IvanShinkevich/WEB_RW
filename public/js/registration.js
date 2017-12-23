$("#table").on("click", function(e) {
    alert("fgj")
    e.preventDefault();
    var registerForm = document.forms["PersonData"];
    var Surname = registerForm.elements["Surname"].value;
    var Name = registerForm.elements["Name"].value;
    var Passport = registerForm.elements["Passport"].value;
    var TimePass = registerForm.elements["TimePass"].value;
    var Email = registerForm.elements["Email"].value;
    var PhoneNumber = registerForm.elements["PhoneNumber"].value;
    alert("ghk")
    $.ajax({
        type: "POST",
        url: "/user",
        data: JSON.stringify({
            Surname: Surname,
            Name: Name,
            Passport: Passport,
            TimePass: TimePass,
            Email: Email,
            PhoneNumber: PhoneNumber
        }),
        dataType: "json",
        contentType: "application/json",
        success: function(data) {
            console.log(data);
        },
    });
    window.location = window.location.origin + "/html/place.html"
});