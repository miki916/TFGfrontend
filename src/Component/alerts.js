export default function Alert(msg){

    var snackbar = document.getElementById("snackbar")
    snackbar.innerText = msg
    snackbar.className = "show"
    console.log("pepepe")
    setTimeout(function(){ snackbar.className = snackbar.className.replace("show", ""); }, 3000);

}

