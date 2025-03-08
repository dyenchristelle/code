document.addEventListener("DOMContentLoaded", function() {
    var signIn = document.getElementById("signIn");
    var button = document.getElementById("startButton");
    var hiddenDiv = document.getElementById("rsrv");

    button.addEventListener("click", function() {
        signIn.style.display = "none";
        hiddenDiv.style.display = "block";
        setTimeout(function() {
            hiddenDiv.classList.add("signIn");
        }, 10);
    });
});
document.addEventListener("DOMContentLoaded", function() {
    var view = document.getElementById("viewRsrv");
    var signIn = document.getElementById("signIn");
    var button = document.getElementById("viewButton");

    button.addEventListener("click", function() {
        signIn.style.display = "none";
        view.style.display = "block";
    });
});
document.addEventListener("DOMContentLoaded", function() {
    var view = document.getElementById("viewRsrv");
    var signIn = document.getElementById("signIn");
    var button = document.getElementById("doneButton");

    button.addEventListener("click", function() {
        signIn.style.display = "block";
        view.style.display = "none";
    });
});