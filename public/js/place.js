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


$("#card").on("click", function(e) {    
    e.preventDefault();                          
    var num = 1;          
    $.ajax({                
        type: "POST",
                        url: "/userandplace",
                        data: JSON.stringify({
            user: user,
            place: num,
        }),
                        dataType: "json",
                        contentType: "application/json",
                        success: function(data) {                    
            console.log(data);               
        },
                        
    });     
    window.location = window.location.origin + "/html/kard.html"   
});