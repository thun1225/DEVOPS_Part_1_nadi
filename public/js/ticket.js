function addTrainTicket() {
  var response = "";
  var jsonData = new Object();

  jsonData.name = document.getElementById("name").value;
  jsonData.email = document.getElementById("email").value;
  jsonData.phoneNumber = document.getElementById("phoneNumber").value;
  jsonData.quantity = document.getElementById("quantity").value;
  jsonData.location = document.getElementById("location").value;
  //jsonData.dateOfBooking = document.getElementById("dateOfBooking").value;
  jsonData.dateOfTravel = document.getElementById("dateOfTravel").value;
  jsonData.time = document.getElementById("time").value;
  jsonData.cardNumber = document.getElementById("cardNumber").value;



  if (
    jsonData.name == "" ||
    jsonData.email == "" ||
    jsonData.phoneNumber == "" ||
    jsonData.quantity == "" ||
    jsonData.location == "" ||
    jsonData.dateOfTravel == "" ||
    jsonData.time == "" ||
    jsonData.cardNumber == ""
 
  ) {
    document.getElementById("message").innerHTML = "All fields are required!";
    document.getElementById("message").setAttribute("class", "text-danger");
    return;
  }
  var request = new XMLHttpRequest();
  request.open("POST", "/add-ticket-booking", true);
  request.setRequestHeader("Content-Type", "application/json");
  request.onload = function () {
    response = JSON.parse(request.responseText);
    console.log(response);
    if (response.message == undefined) {
      document.getElementById("message").innerHTML =
        "Created ticket booking: " + jsonData.name + "!";
      document.getElementById("message").setAttribute("class", "text-success");



      
document.getElementById("name").value = "";
 document.getElementById("email").value= "";
 document.getElementById("phoneNumber").value = "";
  document.getElementById("quantity").value = "";
document.getElementById("location").value = "";
 document.getElementById("time").value = "";
  document.getElementById("dateOfTravel").value = "";
 document.getElementById("cardNumber").value = "";


 alert("Booking successful please check your email for more information!")








    } else {
      document.getElementById("message").innerHTML = "Unable to add resource!";
      document.getElementById("message").setAttribute("class", "text-danger");
      document.getElementById("message").setAttribute("class", "text-danger");
    }
  };
  request.send(JSON.stringify(jsonData));
}
