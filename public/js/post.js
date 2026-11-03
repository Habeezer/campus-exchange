const form = document.getElementById("post-form");

form.addEventListener("submit", async function(event) {
  event.preventDefault(); // Stop page reload

  // 1. Create a FormData object (this is required for file uploads)
  const formData = new FormData();

  // 2. Append all the text fields
  formData.append("title", document.getElementById("title").value);
  formData.append("price", document.getElementById("price").value);
  formData.append("category", document.getElementById("category").value);
  formData.append("condition", document.getElementById("condition").value);

  // 3. Append the file (if the user selected one)
  const imageFile = document.getElementById("image").files[0];
  if (imageFile) {
    formData.append("image", imageFile);
  }

  try {
    // 4. Send the FormData to the backend
    const response = await fetch("/api/listings", {
      method: "POST",
      // IMPORTANT: Do NOT set the Content-Type header. 
      // The browser automatically sets it to 'multipart/form-data' with the correct boundary.
      body: formData
    });

    if (response.ok) {
      alert("Listing published successfully!");
      window.location.href = "/marketplace.html";
    } else {
      alert("Something went wrong.");
    }
  } catch (error) {
    console.error("Error:", error);
  }
});