/*
Person 1: Liya Aji
Task: Search
*/

let product = {
    productId: "101",
    productDesc: "Engine Tune",
    productCategory: "Engine",
    productUOM: "Each",
    productPrice: "399.00",
    productWeight: "10"
};

$(document).ready(function () {
    let productList = [];

    // 🔍 Person 1: Liya Aji (Search)
    $("#searchBtn").click(function () {
    let searchId = $("#searchId").val().trim();

    // Look inside saved products
    let foundProduct = productList.find(function(p) {
        return p.productId === searchId;
    });

    // If found in saved list
    if (foundProduct) {
        $("#jsonOutput").text(JSON.stringify(foundProduct, null, 4));
    } 
    // If not found, check the original product
    else if (product.productId === searchId) {
        $("#jsonOutput").text(JSON.stringify(product, null, 4));
    } 
    // If not found anywhere
    else {
        $("#jsonOutput").text("Product not found");
    }
});

    /*
    Author: Yusuf Baksh
    Task: Save / JSON
    */

    $("#saveBtn").click(function () {

        let productId = $("#productId").val().trim();
        let productDescription = $("#productDescription").val().trim();
        let productCategory = $("#productCategory").val();
        let unitMeasure = $("#unitMeasure").val();
        let productPrice = $("#productPrice").val().trim();
        let productWeight = $("#productWeight").val().trim();

        // Validation
        if (
            productId === "" ||
            productDescription === "" ||
            productCategory === "" ||
            unitMeasure === "" ||
            productPrice === ""
        ) {
            alert("Please fill in all required fields.");
            return;
        }

        if (isNaN(productPrice)) {
            alert("Price must be a number.");
            return;
        }

        if (productWeight !== "" && isNaN(productWeight)) {
            alert("Weight must be a number.");
            return;
        }
        let productObject = {
            name: productDescription,
            description: productDescription,
            price: Number(productPrice)
        };

        productList.push(productObject);

        $("#jsonOutput").text(JSON.stringify(productList, null, 4));
    });
/*
  Author: Martin 
  Person 3: Update
  Task: Locate existing product by ID, replace its values
        with updated form inputs, refresh the JSON display.
*/
$("#updateBtn").click(function () {

    let updateId       = $("#updateId").val().trim();
    let updateDesc     = $("#updateDescription").val().trim();
    let updateCat      = $("#updateCategory").val();
    let updateUnit     = $("#updateUnit").val();
    let updatePrice    = $("#updatePrice").val().trim();
    let updateWeight   = $("#updateWeight").val().trim();

   
    if (updateId === "") {
        alert("Please enter the Product ID you want to update.");
        return;
    }
    if (updateDesc === "" || updateCat === "" || updateUnit === "" || updatePrice === "") {
        alert("Please fill in all required fields (Description, Category, Unit, Price).");
        return;
    }
    if (isNaN(updatePrice)) {
        alert("Price must be a number.");
        return;
    }
    if (updateWeight !== "" && isNaN(updateWeight)) {
        alert("Weight must be a number.");
        return;
    }

   
    let indexInList = productList.findIndex(function (p) {
        return p.productId === updateId;
    });

   
    let foundInSingle = (product.productId === updateId);

    if (indexInList === -1 && !foundInSingle) {
        $("#jsonOutput").text("Product ID \"" + updateId + "\" not found. Nothing was updated.");
        return;
    }

   
    let updatedProduct = {
        productId:          updateId,
        productDescription: updateDesc,
        productCategory:    updateCat,
        unitMeasure:        updateUnit,
        productPrice:       "$" + Number(updatePrice).toFixed(2),
        productWeight:      updateWeight === "" ? "N/A" : updateWeight
    };


    if (indexInList !== -1) {
        productList[indexInList] = updatedProduct;
    }

  
    if (foundInSingle) {
        product.productId       = updatedProduct.productId;
        product.productDesc     = updatedProduct.productDescription;
        product.productCategory = updatedProduct.productCategory;
        product.productUOM      = updatedProduct.unitMeasure;
        product.productPrice    = updatedProduct.productPrice;
        product.productWeight   = updatedProduct.productWeight;
    }

  
  
    if (productList.length > 0) {
        $("#jsonOutput").text(JSON.stringify(productList, null, 4));
    } else {
        $("#jsonOutput").text(JSON.stringify(product, null, 4));
    }

    alert("Product \"" + updateId + "\" updated successfully!");
});
});


/*
Person 2: Yusuf Baksh
Task: Frontend + AJAX UI Integration Add-On
This add-on keeps Liya's search work, Yusuf's save section, and Martin's update section above.
It adds backend API connection, live MongoDB display, create/update/delete actions, and screenshot-ready output.
*/

$(document).ready(function () {
    const PRODUCT_API_URL = "http://localhost:3004/products";

    if ($("#productApiSection").length === 0) {
        $("#jsonOutput").after(`
            <hr>
            <div id="productApiSection">
                <h4>Product Data From Backend</h4>
                <div id="productStatus" class="alert" style="display:none;"></div>
                <button type="button" id="viewProductsBtn" class="btn btn-secondary mb-3">View Products</button>
                <table class="table table-bordered table-striped">
                    <thead>
                        <tr>
                            <th>Mongo ID</th>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Price</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody id="productTableBody"></tbody>
                </table>
                <p class="small text-muted">Use the Mongo ID shown above in the update/search ID field when testing backend update or search.</p>
            </div>
        `);
    }

    function showProductStatus(message, type) {
        $("#productStatus")
            .removeClass("alert-success alert-danger alert-warning alert-secondary")
            .addClass("alert alert-" + type)
            .text(message)
            .show();
    }

    function renderProductsFromAPI(products) {
        let rows = "";
        products.forEach(function (product) {
            rows += `
                <tr>
                    <td>${product._id || ""}</td>
                    <td>${product.name || ""}</td>
                    <td>${product.description || ""}</td>
                    <td>$${Number(product.price || 0).toFixed(2)}</td>
                    <td>
                        <button type="button" class="btn btn-danger btn-sm deleteProductBtn" data-id="${product._id}">Delete</button>
                    </td>
                </tr>
            `;
        });
        $("#productTableBody").html(rows);
        $("#jsonOutput").text(JSON.stringify(products, null, 4));
    }

    function loadProductsFromAPI() {
        $.ajax({
            url: PRODUCT_API_URL,
            type: "GET",
            success: function (data) {
                renderProductsFromAPI(data);
            },
            error: function () {
                showProductStatus("Error loading products from backend.", "danger");
            }
        });
    }

    $("#viewProductsBtn").on("click", loadProductsFromAPI);

    // Person 2: Yusuf Baksh - Add backend POST without removing the original local Save/JSON code.
    $("#saveBtn").on("click", function () {
        let productDescription = $("#productDescription").val().trim();
        let productPrice = $("#productPrice").val().trim();

        if (productDescription === "" || productPrice === "" || isNaN(productPrice)) {
            return; // Original validation above already alerts the user.
        }

        let apiProduct = {
            name: productDescription,
            description: productDescription,
            price: Number(productPrice)
        };

        $.ajax({
            url: PRODUCT_API_URL,
            type: "POST",
            data: JSON.stringify(apiProduct),
            contentType: "application/json",
            success: function () {
                showProductStatus("Product saved to backend successfully.", "success");
                loadProductsFromAPI();
            },
            error: function () {
                showProductStatus("Product displayed locally, but backend save failed.", "danger");
            }
        });
    });

    // Person 2: Yusuf Baksh - Add backend search by MongoDB ID without removing Liya's local search.
    $("#searchBtn").on("click", function () {
        let searchId = $("#searchId").val().trim();
        if (searchId === "") return;

        $.ajax({
            url: PRODUCT_API_URL + "/" + searchId,
            type: "GET",
            success: function (data) {
                $("#jsonOutput").text(JSON.stringify(data, null, 4));
                showProductStatus("Product loaded from backend.", "success");
            },
            error: function () {
                showProductStatus("Backend product not found. Local search result may still appear above.", "warning");
            }
        });
    });

    // Person 2: Yusuf Baksh - Add backend PUT without removing Martin's local update code.
    $("#updateBtn").on("click", function () {
        let updateId = $("#updateId").val().trim();
        let updateDesc = $("#updateDescription").val().trim();
        let updatePrice = $("#updatePrice").val().trim();

        if (updateId === "" || updateDesc === "" || updatePrice === "" || isNaN(updatePrice)) {
            return; // Original validation above already alerts the user.
        }

        let updatedProduct = {
            name: updateDesc,
            description: updateDesc,
            price: Number(updatePrice)
        };

        $.ajax({
            url: PRODUCT_API_URL + "/" + updateId,
            type: "PUT",
            data: JSON.stringify(updatedProduct),
            contentType: "application/json",
            success: function () {
                showProductStatus("Product updated in backend successfully.", "success");
                loadProductsFromAPI();
            },
            error: function () {
                showProductStatus("Local update may have worked, but backend update failed. Use the Mongo ID from the table.", "danger");
            }
        });
    });

    // Person 2: Yusuf Baksh - DELETE product from backend using MongoDB ID.
    $(document).on("click", ".deleteProductBtn", function () {
        let id = $(this).data("id");
        if (!confirm("Delete this product from the backend?")) return;

        $.ajax({
            url: PRODUCT_API_URL + "/" + id,
            type: "DELETE",
            success: function () {
                showProductStatus("Product deleted from backend.", "success");
                loadProductsFromAPI();
            },
            error: function () {
                showProductStatus("Error deleting product from backend.", "danger");
            }
        });
    });

    loadProductsFromAPI();
});
