function convertToUpper(s) {
    return s.charAt(0).toUpperCase() + s.slice(1);
}



document.getElementById("submitButton").addEventListener("click", function (event) {
    event.preventDefault();

    let registration = {};

    registration.Id = document.getElementById("Id").value;
    registration.Name = document.getElementById("Name").value;
    registration.Address = document.getElementById("Address").value;
    registration.status = document.getElementById("status").value;

    // making sure the user entered details
    if (registration.Id.length === 0) {
        document.getElementById("validation").textContent = "Please enter ID"
        return;
    }
    if (registration.Address.length === 0) {
        document.getElementById("validation").textContent = "Please enter Address"
        return;
    }
    if (registration.Name.length === 0) {
        document.getElementById("validation").textContent = "Please enter Name"
        return;
    }
    if (isNaN(Number(registration.Id))) {
        document.getElementById("validation").textContent = "Invalid Input, Id should be a number."
        return;
    }


    fetch('https://sportregistrationbackend.onrender.com/register', {
        method: "POST",
        body: JSON.stringify(registration),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })
        .then(function (response) {
            console.log(response)
            return response.json();
        })
        .then(function (json) {
            registerUser(json);
        });
})

function registerUser(object) {
    console.log(object);
    console.log('added a user')

    document.getElementById("registerForm").style.display = "none";
    let headerEle = document.createElement("h2");
    headerEle.textContent = "Registration successful.";

    let Id = document.createElement("p");
    Id.textContent = `ID: ${object.Id}`;

    let Name = document.createElement("p");
    Name.textContent = `Name: ${object.Name}`;

    let Address = document.createElement("p");
    Address.textContent = `Address: ${object.Address}`;

    let status = document.createElement("p");
    status.textContent = `Status: ${convertToUpper(object.status)}`;

    let price = document.createElement("p");
    price.textContent = `Price: $${object.price}`;

    // let registrationDetails = document.getElementById("registrationDetails");

    // userInformation.appendChild(headerEle);
    // userInformation.appendChild(Id);
    // userInformation.appendChild(Name);
    // userInformation.appendChild(Address);
    // userInformation.appendChild(status);
    // userInformation.appendChild(price);

    let registrationDetails = document.getElementById("registrationDetails");

    registrationDetails.appendChild(headerEle);
    registrationDetails.appendChild(Id);
    registrationDetails.appendChild(Name);
    registrationDetails.appendChild(Address);
    registrationDetails.appendChild(status);
    registrationDetails.appendChild(price);

}