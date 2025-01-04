document.addEventListener("DOMContentLoaded", function(){

    var imgBtn= document.getElementById("upload-img");
    var submitBtn= document.getElementById("submit-btn");
    var imgSection= document.getElementById("img-section");
    var uploadedImg= document.getElementById("uploaded-img");
    var alertBox=document.getElementById("alert");
    var successBox=document.getElementById("success");

    let username;
    let childProfile;
    let imgUrl ;

    imgBtn.addEventListener("click", function(event) {
        event.preventDefault();
        var fileInput = document.createElement("input");
        fileInput.type = "file";
        fileInput.accept = "image/*";
        fileInput.onchange = function(event) {
            var file = event.target.files[0];
            if (file) {
                var reader = new FileReader();
                reader.onload = function(e) {
                    imgUrl = e.target.result;
                    // console.log(imgURL);                    
                    uploadedImg.src = imgUrl ;
                    imgSection.classList.add("flex");
                    imgSection.style.display = "block";
                };
                reader.readAsDataURL(file);
            }
        };
        fileInput.click();
    });

    submitBtn.addEventListener("click", function(event){

        event.preventDefault();

        username= document.getElementById("username").value;
        childProfileToggle= document.getElementById("child-profile-toggle");

        if(!username ||  username==""){
            alertBox.style.display= "block";
            alertBox.innerHTML= "Please enter a username";
        }

        const isChildProfile = childProfileToggle.checked; // returns true or false
        // console.log(isChildProfile); 
        
        // // Store the data in localStorage
        // const userProfile = { username, imgUrl  };
        // const profiles = JSON.parse(localStorage.getItem("profiles")) || [];
        // profiles.push(userProfile);
        // localStorage.setItem("profiles", JSON.stringify(profiles));

        // successBox.style.display= "block";
        // successBox.innerHTML= "Profile sucessfully created. Redirecting ...";

        // // Redirect to home.html
        // setTimeout(function(){
        //     window.location.href= "/home"
        // }, 3000);

        fetch('/profiles/addProfile', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({
            username: username,
            imgUrl: imgUrl,
            isChildProfile: isChildProfile
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
            successBox.style.display = "block";
            successBox.innerHTML = "Profile successfully created. Redirecting ...";
            setTimeout(function() {
                window.location.href = "/home";
            }, 3000);
            } else {
            alertBox.style.display = "block";
            alertBox.innerHTML = "Error creating profile: " + data.message;
            }
        })
        .catch(error => {
            alertBox.style.display = "block";
            alertBox.innerHTML = "Error creating profile: " + error.message;
        });
        

    })
})