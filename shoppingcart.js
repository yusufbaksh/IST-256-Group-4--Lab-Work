/*
Person 2: Yusuf Baksh
Task: Frontend + AJAX UI Integration
Connects Shopping Cart page to NodeJS REST API using AJAX.
Supports Create, Read, Update, and Delete with MongoDB.
*/

$(document).ready(function () {

    const API_URL = "http://localhost:3004/cart";
    let cart = [];

    loadCartFromAPI();

    // ADD ITEM TO CART - POST
    $("#addBtn").click(function () {
        let selectedText = $("#productSelect option:selected").text();
        let price = parseFloat($("#productSelect").val());
        let productName = selectedText.split(" - ")[0];

        let item = {
            productName: productName,
            price: price,
            quantity: 1
        };

        $.ajax({
            url: API_URL,
            type: "POST",
            data: JSON.stringify(item),
            contentType: "application/json",
            success: function () {
                showStatus("Item added to cart successfully!", "success");
                loadCartFromAPI();
            },
            error: function () {
                showStatus("Error adding item to cart.", "danger");
            }
        });
    });

    // LOAD CART FROM DATABASE - GET
    function loadCartFromAPI() {
        $.ajax({
            url: API_URL,
            type: "GET",
            success: function (data) {
                cart = data;
                renderCart();
            },
            error: function () {
                showStatus("Error loading cart from database.", "danger");
            }
        });
    }

    // DISPLAY CART TABLE
    function renderCart() {
        let table = "";
        let grandTotal = 0;

        cart.forEach(function (item) {
            let itemTotal = item.price * item.quantity;
            grandTotal += itemTotal;

            table += `
                <tr>
                    <td>${item.productName}</td>
                    <td>$${Number(item.price).toFixed(2)}</td>
                    <td>
                        <input 
                            type="number" 
                            class="form-control qtyInput" 
                            data-id="${item._id}" 
                            data-product="${item.productName}"
                            data-price="${item.price}"
                            value="${item.quantity}" 
                            min="1">
                    </td>
                    <td>$${itemTotal.toFixed(2)}</td>
                    <td>
                        <button class="btn btn-danger btn-sm deleteBtn" data-id="${item._id}">
                            Delete
                        </button>
                    </td>
                </tr>
            `;
        });

        $("#cartTable").html(table);
        $("#grandTotal").text(grandTotal.toFixed(2));
        $("#jsonOutput").text(JSON.stringify(cart, null, 4));
    }

    // UPDATE QUANTITY - PUT
    $(document).on("change", ".qtyInput", function () {
        let id = $(this).data("id");
        let productName = $(this).data("product");
        let price = parseFloat($(this).data("price"));
        let quantity = parseInt($(this).val());

        if (quantity < 1 || isNaN(quantity)) {
            quantity = 1;
        }

        let updatedItem = {
            productName: productName,
            price: price,
            quantity: quantity
        };

        $.ajax({
            url: `${API_URL}/${id}`,
            type: "PUT",
            data: JSON.stringify(updatedItem),
            contentType: "application/json",
            success: function () {
                showStatus("Cart item updated successfully!", "success");
                loadCartFromAPI();
            },
            error: function () {
                showStatus("Error updating cart item.", "danger");
            }
        });
    });

    // DELETE ONE ITEM - DELETE
    $(document).on("click", ".deleteBtn", function () {
        let id = $(this).data("id");

        if (confirm("Are you sure you want to delete this item?")) {
            $.ajax({
                url: `${API_URL}/${id}`,
                type: "DELETE",
                success: function () {
                    showStatus("Cart item deleted successfully!", "success");
                    loadCartFromAPI();
                },
                error: function () {
                    showStatus("Error deleting cart item.", "danger");
                }
            });
        }
    });

    // CLEAR CART - DELETE ALL ITEMS
    $("#clearCartBtn").click(function () {
        if (cart.length === 0) {
            alert("Cart is already empty.");
            return;
        }

        if (confirm("Are you sure you want to clear the entire cart?")) {
            cart.forEach(function (item) {
                $.ajax({
                    url: `${API_URL}/${item._id}`,
                    type: "DELETE"
                });
            });

            setTimeout(function () {
                showStatus("Cart cleared successfully!", "success");
                loadCartFromAPI();
            }, 500);
        }
    });

    // CHECKOUT BUTTON
    $("#checkoutBtn").click(function () {
        if (cart.length === 0) {
            alert("Your cart is empty.");
            return;
        }

        showStatus("Checkout successful! Cart data is connected to MongoDB.", "success");
        $("#jsonOutput").text(JSON.stringify(cart, null, 4));
    });

    // STATUS MESSAGE
    function showStatus(message, type) {
        $("#ajax-status")
            .removeClass("alert-success alert-danger alert-warning")
            .addClass(`alert alert-${type}`)
            .text(message)
            .show();
    }

});
