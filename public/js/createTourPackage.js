document.addEventListener("DOMContentLoaded", () => {
  document
    .getElementById("addTravelPackage")
    .addEventListener("click", async event => {
      event.preventDefault();

      // Collecting form values
      const tourPackage = {
        host: document.getElementById("host").value,
        officeLocation: document.getElementById("officeLocation").value,
        packageName: document.getElementById("packageName").value,
        category: document.getElementById("category").value,
        duration: document.getElementById("duration").value,
        phone: document.getElementById("phone").value,
        emailAddress: document.getElementById("emailAddress").value,
        price: document.getElementById("price").value
      };

      // Validation
      let isValid = true;
      let errorMessage = "";

      switch (true) {
        case !tourPackage.host:
          isValid = false;
          errorMessage += "Host is required. ";
          break;
        case !tourPackage.officeLocation:
          isValid = false;
          errorMessage += "Office Location is required. ";
          break;
        case !tourPackage.packageName:
          isValid = false;
          errorMessage += "Package Name is required. ";
          break;
        case (tourPackage.category === "category" ||!tourPackage.category):
          isValid = false;
          errorMessage += "Category is required. ";
          break;
        case !tourPackage.duration:
          isValid = false;
          errorMessage += "Duration is required. ";
          break;
        case !tourPackage.phone:
          isValid = false;
          errorMessage += "Phone is required. ";
          break;
        case !tourPackage.emailAddress:
          isValid = false;
          errorMessage += "Email Address is required. ";
          break;
        case !/\S+@\S+\.\S+/.test(tourPackage.emailAddress): // Check if email format is valid
          isValid = false;
          errorMessage += "Email Address is not valid. ";
          break;
        case !tourPackage.price ||
          isNaN(tourPackage.price) ||
          tourPackage.price <= 0:
          isValid = false;
          errorMessage += "Price must be a positive number. ";
          break;
        default:
          break;
      }

      if (!isValid) {
        // If validation fails, show error message
        document.getElementById("error-message").innerText = errorMessage;
        document
          .getElementById("error-message")
          .setAttribute("class", "text-danger");
        return; // Stop form submission
      }

      try {
        const response = await fetch("http://localhost:5050/add-tour", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(tourPackage)
        });

        const result = await response.json();
        console.log("Data posted successfully:", result);
        window.location.href = "index.html"; // Redirect after successful posting
      } catch (error) {
        console.error("There was an error posting data:", error);
        document.getElementById("error-message").innerText =
          "Unable to add resource!";
        document
          .getElementById("error-message")
          .setAttribute("class", "text-danger");
      }
    });
});
