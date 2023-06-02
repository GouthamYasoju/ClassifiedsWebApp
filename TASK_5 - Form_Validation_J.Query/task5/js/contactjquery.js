$(document).ready(function() {
    $('#notify').hide();
    $('#name-r').hide();    
    var Name= $('#name');
    var Email= $('#email');
    var validmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-])*$/;
    var Org= $('#org');
//name validation
    $('#name').on('input', function() {
        if( Name.val().trim().length < 1) {
            $("#name-r").show(); $('#str').hide();  
        }
        else{
            $("#name-r").hide();$('#str').show();
        }
    })
    //Male and female alert
    $('#male').change (function (){ setTimeout( function(){ alert("Hello Sir")}, 100 )});
    $('#female').change (function (){ setTimeout( function(){ alert("Hello Madam")}, 100 )});
//state promo
    $('#state').change( function(){
        if($('#state').val() === " "){
        $('#promo-code').val(' ');
        $('#state').val("");
        }
        else{
        $('#promo-code').val( $('#state').val()+ ' -PROMO');
        }
    });
    //email validation
   Email.on('input', function(){   
       if(Email.val().trim().length < 1){
        $("#email-r").text("email is required");   
       }
       
       else if((Email.val().trim().length >=1) && (!(Email.val().match(validmail)))){
        $("#email-r").text("enter a valid email");   
       }
       else{
        document.getElementById("email-r").innerHTML="*"
    } 
    })
    //org validation
    Org.on('input',function(){
        if (Org.val().trim().length <1){
            $('#org-r').text('Organization Name is required');
        }
        else{
            $('#org-r').text("*");
        }
    })
    //clear form
    $('#reset').click(function clr(){
    $('input[type=text],textarea').val("");
    $('#email-r').text("*");
    $('#name-r').hide(); $("#str").show();
    $('#notify').hide();
    $('#org-r').text("*");
    $('input').prop('checked',false);
    $('option').prop('selected',false);
    })
//submit
    $('#submit').click(function(){
        var name= $('#name').val()
        var email= $('#email').val()
        var org= $('#org').val()
        if ((name.trim().length < 1) || (email.trim().length <1) || (org.trim().length <1)){
            $('#notify').show()
        }
        else{
            $('#notify').text("")   
        }
        if(name.trim().length <1){
            $('#name-r').show();$('#str').hide(); 
        }
        if(email.trim().length <1){
           $('#email-r').text("Email is required");  
        }
        if(org.trim().length <1){
           $('#org-r').text("Organization name is required");  
       
        }  
        if(((name.trim().length > 1) && (email.trim().length >1) && (org.trim().length >1))){
            alert("Submission Successful");
            $('#reset').click();
            
        }
    })
    ///
    let states = [ "Andhra Pradesh","Arunachal Pradesh","Assam","Bihar","Chhattisgarh","Goa","Gujarat","Haryana","Himachal Pradesh","Jammu and Kashmir","Jharkhand","Karnataka","Kerala","Madhya Pradesh","Maharashtra","Manipur","Meghalaya","Mizoram","Nagaland","Odisha","Punjab","Rajasthan","Sikkim","Tamil Nadu","Telangana","Tripura","Uttarakhand","Uttar Pradesh","West Bengal","Andaman and Nicobar Islands","Chandigarh","Dadra and Nagar Haveli","Daman and Diu","Delhi","Lakshadweep","Puducherry"]
$.each(states, function(i, p) {
    $('#state').append($('<option></option>')
                .val(p).html(p));
});
});