document.addEventListener("DOMContentLoaded", function (){

    var continueBtn= document.getElementById("continue");
    var finishBtn= document.getElementById("continue-2");
    var alertBox=document.getElementById("alert");
    var successBox=document.getElementById("success");
    var firstForm= document.getElementById("email-form");
    var nextForm = document.getElementById("passwords-form");

    let email;
    let password;

    continueBtn.addEventListener("click", function(event){

        event.preventDefault();

        email = document.getElementById("email").value;
        
        if(!email || email==""){
            alertBox.style.display = "block";
            alertBox.innerHTML = "Please fill in an appropriate email address";
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
            alertBox.innerHTML = "Please fill in both password fields";
            return;
        }

        if(psw != confirm_psw){
            alertBox.style.display = "block";
            alertBox.innerHTML = "Passwords do not match";
            return;
        }

        password= psw;

        alertBox.style.display = "none";
        // successBox.style.display = "block";
        // successBox.innerHTML = "Everything good so far!";

        // console.log(email);
        // console.log(password);
        

        fetch('/auth/register', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({
            email: email,
            password: password
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                alertBox.style.display = "block";
                alertBox.innerHTML = data.error || "An error occurred";                     
            } else {
                successBox.style.display = "block";          
                successBox.innerHTML = data.message;
                console.log(data.message);

            // Redirect or perform other actions 
                setTimeout(function() {
                    window.location.href = "/home";
                }, 3000); // 3-second delay
                }
        })
        .catch(error => {
            alertBox.style.display = "block";
            alertBox.innerHTML = "An error occurred: " + error.message;
        });
    });
})