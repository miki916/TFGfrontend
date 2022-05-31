export default function showAlert(msg){

    var snackbar = document.getElementById("snackbar")
    snackbar.innerText = msg
    snackbar.className = "show"
    setTimeout(function(){ snackbar.className = snackbar.className.replace("show", ""); }, 3000);

}

