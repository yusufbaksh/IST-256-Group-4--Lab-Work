/*
Person 1: Yusuf Baksh
Task: Form Data Collection
*/

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("shopperForm");
  const output = document.getElementById("output");

  if (!form) {
    console.log("Form not found");
    return;
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const email = document.getElementById("shopperEmail").value.trim();
    const name = document.getElementById("shopperName").value.trim();
    const phone = document.getElementById("shopperPhone").value.trim();
    const age = document.getElementById("shopperAge").value.trim();
    const address = document.getElementById("shopperAddress").value.trim();

    if (email === "" || name === "" || age === "" || address === "") {
      alert("Please fill out all required fields.");
      return;
    }

    output.textContent =
      "Email: " + email + "\n" +
      "Name: " + name + "\n" +
      "Phone: " + phone + "\n" +
      "Age: " + age + "\n" +
      "Address: " + address;
  });
});