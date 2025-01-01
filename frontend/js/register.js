document.addEventListener("DOMContentLoaded", function (){

    var continueBtn= document.getElementById("continue");
    var finishBtn= document.getElementById("continue-2");
    var alertBox=document.getElementById("alert");
    var successBox=document.getElementById("success");
    var firstForm= document.getElementById("email-form");
    var nextForm = document.getElementById("passwords-form");

    continueBtn.addEventListener("click", function(event){

        event.preventDefault();

        var email = document.getElementById("email").value;
        
        if(!email || email==""){
            alertBox.style.display = "block";
            alertBox.textContent = "Please fill in an appropriate email address";
            return;
        }
        
        alertBox.style.display = "none";
        firstForm.style.display = "none";
        nextForm.style.display = "flex";
        
    });

    finishBtn.addEventListener("click", function(event){

        event.preventDefault();

        var psw= document.getElementById("psw").value;
        var confirm_psw= document.getElementById("confirm-psw").value;

        if(!psw || psw=="" || !confirm_psw || confirm_psw==""){
            alertBox.style.display = "block";
            alertBox.textContent = "Please fill in both password fields";
            return;
        }

        if(psw != confirm_psw){
            alertBox.style.display = "block";
            alertBox.textContent = "Passwords do not match";
            return;
        }

        alertBox.style.display = "none";
        successBox.style.display = "block";
        successBox.textContent = "Everything good so far!";
    });
})