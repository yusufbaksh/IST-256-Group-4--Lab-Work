/*
Person 1: Yusuf Baksh
Task: Form Data Collection
Person 2: Liya Aji
Task: JSON Object/Shopper Document Creation
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

/*
Liya Aji - JSON Object Creation
*/

    const shopperJSON = {
        shopperEmail: email,
        shopperName: name,
        shopperPhone: phone,
        shopperAge: age,
        shopperAddress: address
    };
    const jsonOutput = JSON.stringify(shopperJSON, null, 4);

  });
});
