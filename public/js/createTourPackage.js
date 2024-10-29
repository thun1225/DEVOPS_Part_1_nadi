document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("addTourPackage").addEventListener("click", addResource);
});

const addResource = (event) => {
    event.preventDefault(); // Prevent the default form submission

    const messageElement = document.getElementById("message");
    const jsonData = {
        host: document.getElementById("host").value,
        location: document.getElementById("location").value,
        packageName: document.getElementById("packageName").value,
        category: document.getElementById("category").value,
        duration: document.getElementById("duration").value,
        phone: document.getElementById("phone").value,
        email: document.getElementById('email').value,
        price: document.getElementById('price').value
    };

    // Send data using fetch
    fetch("/add-tour", {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(jsonData)
    })
    .then(response => response.json())
    .then(response => {
        if (!response.message) {
            messageElement.innerHTML = `Added Resource: ${jsonData.packageName}!`;
            messageElement.setAttribute("class", "text-success");

            // Clear form fields
            document.getElementById("host").value = "";
            document.getElementById("location").value = "";
            document.getElementById("packageName").value = "";
            document.getElementById("category").value = "category";
            document.getElementById("duration").value = "";
            document.getElementById("phone").value = "";
            document.getElementById("email").value = "";
            document.getElementById('price').value = "";

            // Optionally redirect to index page (if desired)
            // window.location.href = 'index.html';
        } else {
            messageElement.innerHTML = 'Unable to add resource!';
            messageElement.setAttribute("class", "text-danger");
        }
    })
    .catch(error => {
        console.error("Error:", error);
        messageElement.innerHTML = 'Error occurred while adding resource!';
        messageElement.setAttribute("class", "text-danger");
    });
}
