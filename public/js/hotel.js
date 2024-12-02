function addHotel() {
    var response = "";
    var jsonData = {
        hotelName: document.getElementById("hotelName").value,
        hotelLocation: document.getElementById("hotelLocation").value,
        hotelDescription: document.getElementById("hotelDescription").value,
        hotelOwner: document.getElementById("hotelOwner").value
    };

    if (jsonData.hotelName === "" || jsonData.hotelLocation === "" || jsonData.hotelDescription === "" || jsonData.hotelOwner === "") {
        document.getElementById("errorMessage").innerHTML = 'All fields are required!';
        document.getElementById("errorMessage").setAttribute("class", "text-danger");
        return;
    }

    if (!jsonData.hotelOwner.includes('@') || !jsonData.hotelOwner.includes('.')) {
        document.getElementById("errorMessage").innerHTML = 'Please enter a valid email!';
        document.getElementById("errorMessage").setAttribute("class", "text-danger");
        return;
    }

    var request = new XMLHttpRequest();
    request.open("POST", "/add-hotel", true);
    request.setRequestHeader('Content-Type', 'application/json');
    request.onload = function () {
        response = JSON.parse(request.responseText);
        if (!response.message) {
            document.getElementById("errorMessage").innerHTML = 'Added Hotel!';
            document.getElementById("errorMessage").setAttribute("class", "text-success");
            document.getElementById("hotelName").value = "";
            document.getElementById("hotelLocation").value = "";
            document.getElementById("hotelDescription").value = "";
            document.getElementById("hotelOwner").value = "";
            viewHotels(); 
        } else {
            document.getElementById("errorMessage").innerHTML = 'Unable to add hotel!';
            document.getElementById("errorMessage").setAttribute("class", "text-danger");
        }
    };

    request.send(JSON.stringify(jsonData));
}



