document.getElementById("reset").addEventListener("click",clearForm);//Clear the page
document.getElementById("state").addEventListener("change",selectState);//State Selection
//Alert for Female
document.getElementById("female").addEventListener("change", function (){ setTimeout( function(){ alert("Hello Madam")}, 100 )});
//Alert for Male
document.getElementById("male").addEventListener("change", function (){ setTimeout( function(){ alert("Hello Sir")}, 100 )});
var notice=0;; //Flag bit for submit
var Name =document.getElementById("name"); //name input 
var Email =document.getElementById("email"); //email input
var Org =document.getElementById("org"); //Organisation input
document.getElementById("submit").addEventListener("click",onSubmit); //On clicking the submit button
document.getElementById("name").addEventListener("input",isValidName); // Name Validation
document.getElementById("org").addEventListener("input",isValidOrg); //Org Number Validation
document.getElementById("email").addEventListener("input",isValidMail); //Email Validation


//Clearing the form
 function clearForm(){
     var elements= document.getElementById("form_id").getElementsByTagName("*");
    var req=document.getElementsByClassName("required");
    for (var j of req){
        j.innerHTML="*";
    }
    document.getElementsByClassName("notify")[0].innerHTML="";
     for (var i of elements){
        if (i.tagName === "INPUT"){
            if (i.type === "text"){
                i.value="";
            }
            if (i.type === "radio"){
                i.checked =false;
            }
        }
        else if (i.tagName === "OPTION"){
            i.selected=false;
        }
        else if (i.tagName==="TEXTAREA"){
            i.value="";
        }
    }          
 }
 //Selecting the state from drop down
 function selectState(){
    let d = document.getElementById("state").value;
    document.getElementById("promo-code").value = d + " " + "-PROMO";
    if (d == " "){
        document.getElementById("promo-code").value =" "
    }
 }
 //Submit
 function onSubmit(){
    notice=1;
    var name= document.getElementById("name").value;
    var email= document.getElementById("email").value;
    var org= document.getElementById("org").value;
    if ((name.trim().length < 1) || (email.trim().length <1) || (org.trim().length <1)){
        document.getElementsByClassName("notify")[0].innerHTML="Please fill all the required fields below";
    }
    else{
        document.getElementsByClassName("notify")[0].innerHTML="";
    }
    if(name.trim().length <1){
        document.getElementById("name-r").innerHTML="Name is required"  
    }
    if(email.trim().length <1){
        document.getElementById("email-r").innerHTML="Email is required"  
    }
    if(org.trim().length <1){
        document.getElementById("org-r").innerHTML="Organization Number is required"
    }  
    if(((name.trim().length > 1) || (email.trim().length >1) || (org.trim().length >1))){
        window.alert("Submission Successful");
        clr();
    }
}
//Name validation
function isValidName(){
    if(notice){;
    if((Name.value.trim().length>=1) && (Email.value.trim().length>=1) && (Org.value.trim().length >= 1)){
        document.getElementsByClassName("notify")[0].innerHTML="";
    }
    else{
        document.getElementsByClassName("notify")[0].innerHTML="Please fill all the required fields";
    }
}
    if (Name.value.trim().trim().length < 1){
        document.getElementById("name-r").innerHTML="Name is required"
    }
    else{
        document.getElementById("name-r").innerHTML="*"   
    }
}
//Organization number validation
function isValidOrg(){
var name= document.getElementById("org").value;
if(notice){;
    if((Name.value.trim().length>=1) && (Email.value.trim().length>=1) && (Org.value.trim().length >= 1)){
    
        document.getElementsByClassName("notify")[0].innerHTML="";
    }
    else{
        document.getElementsByClassName("notify")[0].innerHTML="Please fill all the required fields";
    }
}
    if (name.trim().length < 1){
        document.getElementById("org-r").innerHTML="Org Number is required"
    }
    else{
        document.getElementById("org-r").innerHTML="*"   
    }  
}
//Email Validation
function isValidMail(){
var name= document.getElementById("email").value;
var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-])*$/;
if(notice){;
    console.log("n");
    if((Name.value.trim().length>=1) && (Email.value.trim().length>=1) && (Org.value.trim().length >=1)){
    
        document.getElementsByClassName("notify")[0].innerHTML="";
    }
    else{
        document.getElementsByClassName("notify")[0].innerHTML="Please fill all the required fields";
    }
}
    if (name.trim().length < 1){
        document.getElementById("email-r").innerHTML="Email is required"
    }
    else if ((name.trim().length >=1) && (!(name.match(validRegex)))){
        document.getElementById("email-r").innerHTML="Please enter a valid email"; 
    }
    else{
        document.getElementById("email-r").innerHTML="*"
    }  
}

//state dropdown
let states = [ "Andhra Pradesh",
                "Arunachal Pradesh",
                "Assam",
                "Bihar",
                "Chhattisgarh",
                "Goa",
                "Gujarat",
                "Haryana",
                "Himachal Pradesh",
                "Jammu and Kashmir",
                "Jharkhand",
                "Karnataka",
                "Kerala",
                "Madhya Pradesh",
                "Maharashtra",
                "Manipur",
                "Meghalaya",
                "Mizoram",
                "Nagaland",
                "Odisha",
                "Punjab",
                "Rajasthan",
                "Sikkim",
                "Tamil Nadu",
                "Telangana",
                "Tripura",
                "Uttarakhand",
                "Uttar Pradesh",
                "West Bengal",
                "Andaman and Nicobar Islands",
                "Chandigarh",
                "Dadra and Nagar Haveli",
                "Daman and Diu",
                "Delhi",
                "Lakshadweep",
                "Puducherry"]
var drop = document.getElementById("state");
for(let i in states){
    var opt= new(Option);
    let st=states[i];
    opt.text= st;
    opt.value= st;
    drop.appendChild(opt);
    
}
