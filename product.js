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

/*
Liya Aji - Search Function
*/

$("#searchBtn").click(function () {

    let searchId = $("#searchId").val();

    if (product.productId === searchId) {
        $("#jsonOutput").text(JSON.stringify(product, null, 4));
    } else {
        $("#jsonOutput").text("Product not found");
    }

});