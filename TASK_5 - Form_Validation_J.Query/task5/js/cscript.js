

$('#upload').change(function(){
    $('#resume').val($('#upload')[0].files[0].name);
})

$('#onsubmit').click(function(){
    if( ($('#name').val().trim().length<1) || ($('#email').val().trim().length<1)){
        $('#notify,#name-r').show();$('#str').hide()
        $('#email-r').text('Email is required')

    }
    else if( ($('#name').val().trim().length>1) || ($('#email').val().trim().length>1)){
        alert('Submission Successful');
        $('input[type=text]').val('');
        $('#notify,#name-r').hide();
        $('#email-r').text("*")
    }
    else{
        $('#notify').hide();
    }
})