document.addEventListener("DOMContentLoaded", function(){

    var logoutBtn=document.getElementById('logout');

    logoutBtn.addEventListener("click", function(event){

        event.preventDefault();

        fetch('/auth/logout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            if (response.ok) {
                window.location.href = '/login';
            } else {
                console.error('Logout failed');
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    })
})