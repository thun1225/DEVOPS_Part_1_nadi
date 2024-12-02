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
                            <h5 class="card-title">${response[i].hotelName}</h5>
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