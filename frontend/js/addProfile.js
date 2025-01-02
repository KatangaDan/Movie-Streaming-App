window.addEventListener("DOMContentLoaded", function () {
    const profiles = JSON.parse(localStorage.getItem("profiles")) || [];
    const profilesContainer = document.getElementById("profile-list");

    profiles.forEach(({ username, imgUrl }) => {
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

        link.appendChild(img);

        const label = document.createElement("label");
        label.htmlFor = `user-${username}`;
        label.className = "text-white text-2xl";
        label.textContent = username;

        const button = document.createElement("button");
        button.className = "mt-2 px-4 py-2 bg-red-600 text-white rounded";
        button.textContent = "View Profile";
        button.onclick = function () {
            showPopup(username);
        };

        profileDiv.appendChild(link);
        profileDiv.appendChild(label);
        profileDiv.appendChild(button);

        // Append to profiles container
        profilesContainer.appendChild(profileDiv);

        console.log("profile container succesfully created");
        
    });

    document.getElementById("clearProfiles").addEventListener("click", function () {
        localStorage.removeItem("profiles");
        location.reload();
    });
});
