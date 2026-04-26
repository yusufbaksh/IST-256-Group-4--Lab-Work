/*
Person 2: Yusuf Baksh
Task: Frontend + AJAX UI Integration
Connected shopper page to backend API (CRUD + live display)
*/

$(document).ready(function () {

    const API_URL = "http://localhost:3004/shopper";

    loadShoppers();

    // CREATE SHOPPER
    $("#shopperForm").submit(function (e) {
        e.preventDefault();

        let shopper = {
            name: $("#shopperName").val(),
            email: $("#shopperEmail").val(),
            address: $("#shopperAddress").val()
        };

        $.ajax({
            url: API_URL,
            type: "POST",
            data: JSON.stringify(shopper),
            contentType: "application/json",
            success: function () {
                alert("Shopper added!");
                loadShoppers();
            }
        });
    });

    // READ SHOPPERS
    function loadShoppers() {
        $.get(API_URL, function (data) {
            $("#jsonOutput").text(JSON.stringify(data, null, 4));
        });
    }

});
