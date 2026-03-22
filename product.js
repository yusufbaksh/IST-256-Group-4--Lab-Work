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

    // 🔍 Person 1: Liya Aji (Search)
    $("#searchBtn").click(function () {
        let searchId = $("#searchId").val().trim();

        if (product.productId === searchId) {
            $("#jsonOutput").text(JSON.stringify(product, null, 4));
        } else {
            $("#jsonOutput").text("Product not found");
        }
    });

    /*
    Author: Yusuf Baksh
    Task: Save / JSON
    */
    let productList = [];

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
            productId: productId,
            productDescription: productDescription,
            productCategory: productCategory,
            unitMeasure: unitMeasure,
            productPrice: "$" + Number(productPrice).toFixed(2),
            productWeight: productWeight === "" ? "N/A" : productWeight
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
