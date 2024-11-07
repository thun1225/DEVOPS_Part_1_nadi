const viewTour = () => {
    fetch('/view-tour', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
    })
    .then(responseData  => {
        let html = '';
        responseData.forEach((tour, index) => {
            html += `
                <tr>
                    <td>${index + 1}</td>
                    <td>${tour.host}</td>
                    <td>${tour.location}</td>
                    <td>${tour.packageName}</td>
                    <td>${tour.category}</td>
                    <td>${tour.duration}</td>
                    <td>${tour.phone}</td>
                    <td>${tour.email}</td>
                    <td>${tour.price}</td>
                </tr>
            `;
        });
        document.getElementById('tableContent').innerHTML = html;
    })
}