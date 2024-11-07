document.addEventListener("DOMContentLoaded", () => {
  document
    .getElementById("addTravelPackage")
    .addEventListener("click", async event => {
      event.preventDefault();
      const tourPackage = {
        host: document.getElementById("host").value,
        location: document.getElementById("location").value,
        packageName: document.getElementById("packageName").value,
        category: document.getElementById("category").value,
        duration: document.getElementById("duration").value,
        phone: document.getElementById("phone").value,
        email: document.getElementById("email").value,
        price: document.getElementById("price").value
      };

      try {
        const response = await fetch("http://localhost:5050/add-tour", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(tourPackage)
        });

        const errorMessages = [];
        const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

        const validationField = (fieldName, fieldValue) => {
          switch (fieldName) {
            case "host":
              if (!fieldValue) errorMessages.push("Host is required.");
              break;
            case "location":
              if (!fieldValue) errorMessages.push("Location is required.");
              break;
            case "packageName":
              if (!fieldValue) errorMessages.push("Package name is required.");
              break;
            case "category":
              if (fieldValue === "category") errorMessages.push("Category is required.");
              break;
            case "duration":
              if (!fieldValue) errorMessages.push("Duration is required.");
              break;
            case "phone":
              if (!fieldValue || isNaN(fieldValue))
                errorMessages.push("A valid phone number is required.");
              break;
            case "email":
              if (!fieldValue || !emailRegex.test(fieldValue))
                errorMessages.push("A valid email is required.");
              break;
            case "price":
              if (!fieldValue || isNaN(fieldValue))
                errorMessages.push("A valid price is required.");
              break;
            default:
              break;
          }
        };

        Object.keys(tourPackage).forEach((key) => validationField(key, tourPackage[key]));

        if (errorMessages.length > 0) {
          document.getElementById("message").innerHTML =
            "Please fill all the fields";
          document
            .getElementById("message")
            .setAttribute("class", "text-danger");
        } else {
          const result = await response.json();
          console.log("Data posted successfully:", result);
          window.location.href = "index.html";
        }
      } catch (error) {
        console.error("There was an error posting data:", error);
        document.getElementById("message").innerHTML =
          "Unable to add resource!";
        document.getElementById("message").setAttribute("class", "text-danger");
      }
    });
});
