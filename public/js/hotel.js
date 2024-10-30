// function addHotel() {
//     var response = "";
//     var jsonData = new Object();
//     jsonData.name = document.getElementById("name").value;
//     jsonData.location = document.getElementById("location").value;
//     jsonData.description = document.getElementById("description").value;
//     jsonData.owner = document.getElementById("owner").value;

//     if (jsonData.name == "" || jsonData.location == "" || jsonData.description == "") {
//         document.getElementById("message").innerHTML = 'All fields are required!';
//         document.getElementById("message").setAttribute("class", "text-danger");
//         return;
//     }

//     var request = new XMLHttpRequest();
//     request.open("POST", "/add-hotel", true);
//     request.setRequestHeader('Content-Type', 'application/json');
//     request.onload = function () {
//         response = JSON.parse(request.responseText);
//         console.log(response);

//         if (response.message == undefined) {
//             document.getElementById("message").innerHTML = 'Added Hotel: ' + jsonData.name + '!';
//             document.getElementById("message").setAttribute("class", "text-success");
//             document.getElementById("name").value = "";
//             document.getElementById("location").value = "";
//             document.getElementById("description").value = "";
//             document.getElementById("owner").value = "";
//             window.location.href = 'index.html';
//         } else {
//             document.getElementById("message").innerHTML = 'Unable to add hotel!';
//             document.getElementById("message").setAttribute("class", "text-danger");
//         }
//     };

//     request.send(JSON.stringify(jsonData));
// }

// Function to add a new hotel
function addHotel() {
    var response = "";
    var jsonData = {
        name: document.getElementById("name").value,
        location: document.getElementById("location").value,
        description: document.getElementById("description").value,
        owner: document.getElementById("owner").value
    };

    if (jsonData.name === "" || jsonData.location === "" || jsonData.description === "" || jsonData.owner === "") {
        document.getElementById("message").innerHTML = 'All fields are required!';
        document.getElementById("message").setAttribute("class", "text-danger");
        return;
    }

    var request = new XMLHttpRequest();
    request.open("POST", "/add-hotel", true);
    request.setRequestHeader('Content-Type', 'application/json');
    request.onload = function () {
        response = JSON.parse(request.responseText);
        if (!response.message) {
            document.getElementById("message").innerHTML = 'Added Hotel: ' + jsonData.name + '!';
            document.getElementById("message").setAttribute("class", "text-success");
            document.getElementById("name").value = "";
            document.getElementById("location").value = "";
            document.getElementById("description").value = "";
            document.getElementById("owner").value = "";
            viewHotels(); // Refresh the table after adding
        } else {
            document.getElementById("message").innerHTML = 'Unable to add hotel!';
            document.getElementById("message").setAttribute("class", "text-danger");
        }
    };

    request.send(JSON.stringify(jsonData));
}

// Function to view all hotels
function viewHotels() {
    var request = new XMLHttpRequest();
    request.open("GET", "/view-hotels", true);
    request.onload = function () {
        var hotels = JSON.parse(request.responseText);
        var tableContent = "";
        hotels.forEach(function (hotel) {
            tableContent += "<tr>";
            tableContent += "<td>" + hotel.id + "</td>";
            tableContent += "<td>" + hotel.name + "</td>";
            tableContent += "<td>" + hotel.location + "</td>";
            tableContent += "<td>" + hotel.description + "</td>";
            tableContent += "<td>" + hotel.owner + "</td>";
            tableContent += "</tr>";
        });
        document.getElementById("tableContent").innerHTML = tableContent;
    };
    request.onerror = function () {
        alert("Unable to load hotels. Please try again.");
    };
    request.send();
}



