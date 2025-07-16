function hideloader(){
     // For loader 
    var loader = document.getElementById("loader-cstm");
    loader.style.display = "none"   

}

function showLoader(){
    var loader = document.getElementById("loader-cstm");
    loader.style.display = "block"
}

window.hideloader = hideloader;
window.showLoader = showLoader;