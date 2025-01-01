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
