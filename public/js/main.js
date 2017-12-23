$("#buy").on('click', function(e) {                         
    e.preventDefault();            
    var registerForm = document.forms["registerForm"];            
    var from = registerForm.elements["from"].value;            
    var to = registerForm.elements["to"].value;
    var date = registerForm.elements["date"].value;             
    $.ajax({                
        type: "POST",
                        url: "/ToTable",
                        data: JSON.stringify({
            nameStart: from,
            nameTo: to,
            dateStart: date
        }),
                        dataType: "json",
                        contentType: "application/json",
                        success: function(data) {                    
            console.log(data);               
        },
                        
    });        
});