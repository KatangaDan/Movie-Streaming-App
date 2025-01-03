document.addEventListener("DOMContentLoaded", function(){

    var alertBox=document.getElementById("alert");
    var successBox=document.getElementById("success");
    var submitBtn= document.getElementById("submit-btn");

    let email;
    let password;
    let toggleBtn;

    submitBtn.addEventListener("click", function(event){

        event.preventDefault();

        email = document.getElementById("email").value;
        password= document.getElementById("psw").value;
        toggleBtn= document.getElementById("remember-me");
        
        if(!email || email=="" || !password || password==""){
            alertBox.style.display = "block";
            alertBox.innerHTML = "Please fill in both an email address and password";
            return;
        }

        alertBox.style.display = "none";
        const rememberMe = toggleBtn.checked; // returns true or false
        
        fetch('/auth/login', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({
            email: email,
            password: password,
            rememberMe: rememberMe
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
        
    })

})