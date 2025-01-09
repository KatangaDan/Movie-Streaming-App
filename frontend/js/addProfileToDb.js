window.addEventListener("DOMContentLoaded", function (event) {

    event.preventDefault();

    // Fetch profiles data
    fetch('/profiles/getProfiles')
        .then(response => response.json())
        .then(data => {
            console.log("Profiles fetched:", data);

            const profilesContainer = document.getElementById("profile-list");

            // Clear existing profiles (if any)
            // profilesContainer.innerHTML = '';

            data.profiles.forEach(({ username, imgUrl }) => {
                // Create the profile element
                const profileDiv = document.createElement("div");
                profileDiv.className = "flex flex-col items-center border-b-2 border-black rounded";

                const link = document.createElement("a");
                link.href = "#";

                const img = document.createElement("img");
                img.id = `user-${username}`;
                img.src = imgUrl;
                img.alt = `Profile of ${username}`;
                img.className = "w-32 h-32 rounded-full border-4 border-white inline-block";
                img.onclick = function () {
                    showPopup(username);
                };

                link.appendChild(img);

                const label = document.createElement("label");
                label.htmlFor = `user-${username}`;
                label.className = "text-white text-2xl";
                label.textContent = username;

                const deleteProfileBtn = document.createElement("deleteProfileBtn");
                deleteProfileBtn.className = "mt-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-400";
                deleteProfileBtn.textContent = "Delete Profile";
                deleteProfileBtn.onclick = 
                function () {
                    fetch('/profiles/deleteProfile', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ username: username })
                    })
                    .then(response => response.json())
                    .then(data => {
                        if (data.success) {
                            // Remove the profile from the DOM
                            profileDiv.remove();
                            console.log(`Profile ${username} deleted successfully.`);
                        } else {
                            console.error(`Failed to delete profile ${username}:`, data.message);
                        }
                    })
                    .catch(error => {
                        console.error('Error deleting profile:', error);
                    });
                }

                profileDiv.appendChild(link);
                profileDiv.appendChild(label);
                profileDiv.appendChild(deleteProfileBtn);

                // Append to profiles container
                profilesContainer.appendChild(profileDiv);

                console.log("Profile container successfully created for:", username);
            });

        })
        .catch(error => {
            console.error('Error fetching profiles:', error);
        });

    // Add event listener to the "Clear Profiles" button
    document.getElementById("clearProfiles").addEventListener("click", function () {
        localStorage.removeItem("profiles");
        location.reload();
    });
});


function showPopup(profileName) {
    // Update the popup content dynamically
    document.getElementById('popup-title').innerText = `Profile: ${profileName}`;

    //get info stored about user in the database
    document.getElementById('popup-content').innerText = `Details about ${profileName}.`;
    
    // Show the popup
    document.getElementById('popup').classList.remove('hidden');
    document.getElementById('popup').classList.add('flex');
}

function hidePopup() {
    // Hide the popup
    document.getElementById('popup').classList.add('hidden');
}
