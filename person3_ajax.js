/*   Martin Shestani - AJAX transport and REST API integration */
 

function sendCartToAPI(cartData) {

    console.log("Sending cart data to API:", cartData);

    $.ajax({
        url: "https://your-api-endpoint.com/api/cart",
        type: "POST",
        data: JSON.stringify(cartData),
        contentType: "application/json",
        dataType: "json",

        success: function (response) {
            console.log("API Success:", response);
            $("#ajax-status")
                .removeClass("alert-danger")
                .addClass("alert alert-success")
                .text("Cart successfully submitted to server!")
                .show();
        },

        error: function (xhr, status, error) {
            console.error("API Error - Status:", status);
            console.error("API Error - Message:", error);
            console.error("API Error - Response:", xhr.responseText);
            $("#ajax-status")
                .removeClass("alert-success")
                .addClass("alert alert-danger")
                .text("Error submitting cart: " + error)
                .show();
        }
    });
}
