/*
Person 1: Yusuf Baksh
Task: Form Data Collection
Person 2: Liya Aji
Task: JSON Object/Shopper Document Creation
Person 3: Martin Shestani
Task: Display JSON on the web page after submit
*/

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("shopperForm");

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
    document.getElementById("jsonOutput").textContent = jsonOutput;

  });
});


/*
Person 2: Yusuf Baksh
Task: Frontend + AJAX UI Integration Add-On
This add-on keeps the original shopper form work above and adds backend API connection,
GET/POST/DELETE actions, and a live table display from MongoDB.
*/

document.addEventListener("DOMContentLoaded", function () {
  const SHOPPER_API_URL = "http://localhost:3004/shopper";
  const container = document.querySelector(".container");

  if (container && !document.getElementById("shopperApiSection")) {
    container.insertAdjacentHTML("beforeend", `
      <hr>
      <div id="shopperApiSection">
        <h3>Shopper Data From Backend</h3>
        <div id="shopperStatus" class="alert" style="display:none;"></div>
        <button type="button" id="viewShoppersBtn" class="btn btn-secondary mb-3">View Shoppers</button>
        <table class="table table-bordered table-striped">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Address</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody id="shopperTableBody"></tbody>
        </table>
      </div>
    `);
  }

  function showShopperStatus(message, type) {
    const status = document.getElementById("shopperStatus");
    if (!status) return;
    status.className = "alert alert-" + type;
    status.textContent = message;
    status.style.display = "block";
  }

  function renderShoppers(shoppers) {
    const tableBody = document.getElementById("shopperTableBody");
    if (!tableBody) return;

    tableBody.innerHTML = "";
    shoppers.forEach(function (shopper) {
      tableBody.insertAdjacentHTML("beforeend", `
        <tr>
          <td>${shopper.name || ""}</td>
          <td>${shopper.email || ""}</td>
          <td>${shopper.address || ""}</td>
          <td>
            <button type="button" class="btn btn-danger btn-sm deleteShopperBtn" data-id="${shopper._id}">Delete</button>
          </td>
        </tr>
      `);
    });

    document.getElementById("jsonOutput").textContent = JSON.stringify(shoppers, null, 4);
  }

  function loadShoppersFromAPI() {
    fetch(SHOPPER_API_URL)
      .then(function (response) { return response.json(); })
      .then(function (data) { renderShoppers(data); })
      .catch(function () { showShopperStatus("Error loading shoppers from backend.", "danger"); });
  }

  const viewBtn = document.getElementById("viewShoppersBtn");
  if (viewBtn) {
    viewBtn.addEventListener("click", loadShoppersFromAPI);
  }

  const form = document.getElementById("shopperForm");
  if (form) {
    form.addEventListener("submit", function () {
      const shopper = {
        name: document.getElementById("shopperName").value.trim(),
        email: document.getElementById("shopperEmail").value.trim(),
        address: document.getElementById("shopperAddress").value.trim()
      };

      fetch(SHOPPER_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(shopper)
      })
        .then(function (response) { return response.json(); })
        .then(function () {
          showShopperStatus("Shopper saved to backend successfully.", "success");
          loadShoppersFromAPI();
        })
        .catch(function () { showShopperStatus("Shopper displayed locally, but backend save failed.", "danger"); });
    });
  }

  document.addEventListener("click", function (e) {
    if (!e.target.classList.contains("deleteShopperBtn")) return;
    const id = e.target.getAttribute("data-id");
    if (!confirm("Delete this shopper from the backend?")) return;

    fetch(SHOPPER_API_URL + "/" + id, { method: "DELETE" })
      .then(function (response) { return response.json(); })
      .then(function () {
        showShopperStatus("Shopper deleted from backend.", "success");
        loadShoppersFromAPI();
      })
      .catch(function () { showShopperStatus("Error deleting shopper from backend.", "danger"); });
  });

  loadShoppersFromAPI();
});
