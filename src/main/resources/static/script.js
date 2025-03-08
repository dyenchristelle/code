// document.addEventListener("DOMContentLoaded", function() {
//     var signIn = document.getElementById("signIn");
//     var startButtonb = document.getElementById("startButton");
//     var hiddenDiv = document.getElementById("rsrv");

//     startButton.addEventListener("click", function() {
//         signIn.style.display = "none";
//         hiddenDiv.style.display = "block";
//         setTimeout(function() {
//             hiddenDiv.classList.add("signIn");
//         }, 10);
//     });
// });
document.addEventListener("DOMContentLoaded", function() {
    var view = document.getElementById("viewRsrv");
    var signIn = document.getElementById("signIn");
    var viewButton = document.getElementById("viewButton");

    viewButton.addEventListener("click", function() {
        signIn.style.display = "none";
        view.style.display = "block";
    });
});
document.addEventListener("DOMContentLoaded", function() {
    var view = document.getElementById("viewRsrv");
    var signIn = document.getElementById("signIn");
    var doneButton = document.getElementById("doneButton");

    doneButton.addEventListener("click", function() {
        signIn.style.display = "block";
        view.style.display = "none";
    });
});
document.getElementById("confirmation").addEventListener("submit", function(event) {
    event.preventDefault(); 

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const selectedDays = Array.from(document.querySelectorAll('input[name="days"]:checked'))
                              .map(checkbox => checkbox.value);

    if (selectedDays.length === 0){
        alert("select a day");
        return;
    }
    const userConfirmed = confirm("Are you sure you want to reserve tickets for" +day+ "?");
    if (!userConfirmed) return;

    fetch("/api/submitChoice", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, days: selectedDays })  
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert("Reservation successful!");
            document.getElementById("rsrv").style.display = "none";
            document.getElementById("signIn").style.display = "block";
        } else {
            alert("Reservation failed.");
        }
    })
    .catch(error => {
        console.error("Error submitting reservation:", error);
        alert("An error occurred. Please try again.");
    });
});

document.getElementById("startButton").addEventListener("click",async function(event) {
    event.preventDefault();

    var signIn = document.getElementById("signIn");
    var startButtonb = document.getElementById("startButton");
    var rsrv = document.getElementById("rsrv");
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const emailError = document.getElementById("emailError");

    if (!name || !email) {
        alert("Both Name and Email are required.");
        return;
    }

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailRegex.test(email)) {
        alert("Please enter a valid email address.");
        emailError.style.display = "block";
        return;
    } else {
        emailError.style.display = "none";
    }

    try {
        let isExists = await checkIfExists(name, email);
        if (isExists) {
            alert("You have already made a reservation.");
            return;
        } 
            signIn.style.display = "none";
            rsrv.style.display = "block";
        
    } catch(error) {
        alert("An error occurred. Please try again later.");
    }
});

async function checkIfExists(name, email) {
    try {
        const response = await fetch(`/api/checkReservation?name=${name}&email=${email}`);
        const data = await response.json();
        console.log("API Response: ", data)
        return data.exists;
    } catch (error) {
        console.error("Error checking reservation:", error);
        return false;
    }
}