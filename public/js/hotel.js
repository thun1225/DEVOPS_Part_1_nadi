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

// function viewHotels() {
//     var response = '';
//     var request = new XMLHttpRequest();
//     request.open('GET', '/view-hotels', true);
//     request.setRequestHeader('Content-Type', 'application/json');
//     request.onload = function () {
//         response = JSON.parse(request.responseText);
//         var html = '';
//         for (var i = 0; i < response.length; i++) {
//             html += '<tr>' +
//                 '<td>' + (i + 1) + '</td>' +
//                 '<td>' + response[i].name + '</td>' +
//                 '<td>' + response[i].location + '</td>' +
//                 '<td>' + response[i].description + '</td>' +
//                 '<td>' + response[i].owner + '</td>' +
//                 '<td>' +
//                 '<button type="button" class="btn btn-warning" onclick="editHotel(\'' + 
//                 JSON.stringify(response[i]).replaceAll('\"', '&quot;') + '\')">Edit</button> ' +
//                 '<button type="button" class="btn btn-danger" onclick="deleteHotel(' + 
//                 response[i].id + ')">Delete</button>' +
//                 '</td>' +
//             '</tr>';
//         }
//         document.getElementById('tableContent').innerHTML = html;
//     };
//     request.send();
// }

function viewHotels() {
    var response = '';
    var request = new XMLHttpRequest();
    request.open('GET', '/view-hotels', true);
    request.setRequestHeader('Content-Type', 'application/json');
    request.onload = function () {
        response = JSON.parse(request.responseText);
        var html = '';
        for (var i = 0; i < response.length; i++) {
            html += `
                <div class="col-md-4 mb-4">
                    <div class="card text-center">
                        <img src="images/hotel.jpg" class="card-img-top" alt="Hotel Image">
                        <div class="card-body">
                            <h5 class="card-title">${response[i].name}</h5>
                            <button class="btn btn-primary">Book now</button>
                        </div>
                    </div>
                </div>
            `;
        }
        document.getElementById('hotelGrid').innerHTML = html;
    };
    request.send();
}

