var user;
window.onload = function() {
    $.ajax({                
        type: "GET",
                        url: "/UserInfo",
                        success: function(data) {                    
            console.log(data);        
            user = data;       
        },
                      
    });

      
}      



$("#table").on("click", function(e) {
    e.preventDefault();
    var registerForm = document.forms["card"];
    var cardCode = registerForm.elements["cardCode"].value;
    var cardNumber = registerForm.elements["cardNumber"].value;
    var cardTime = registerForm.elements["cardTime"].value;
    $.ajax({
        type: "POST",
        url: "/AddCard",
        data: JSON.stringify({
            Card: {
                cardCode: cardCode,
                cardNumber: cardNumber,
                cardTime: cardTime
            }
        }),
        dataType: "json",
        contentType: "application/json",
        success: function(data) {
            console.log(data);
        },
    });
    window.location = window.location.origin + "/html/table.html"   
});