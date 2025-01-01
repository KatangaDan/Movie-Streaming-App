document.addEventListener("DOMContentLoaded", function(){

    var imgBtn= document.getElementById("upload-img");
    var saveBtn= document.getElementById("save");

    // imgBtn.addEventListener("click", function(event) {
    //     event.preventDefault();
    //     var fileInput = document.createElement("input");
    //     fileInput.type = "file";
    //     fileInput.accept = "image/*";
    //     fileInput.onchange = function(event) {
    //         var file = event.target.files[0];
    //         if (file) {
    //             var reader = new FileReader();
    //             reader.onload = function(e) {
    //                 var img = document.createElement("img");
    //                 img.src = e.target.result;
    //                 document.body.appendChild(img);
    //             };
    //             reader.readAsDataURL(file);
    //         }
    //     };
    //     fileInput.click();
    // });
})