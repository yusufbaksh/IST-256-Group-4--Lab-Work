/*
Person 1: Liya Aji
Task:Capture form data, Convert to JSON, Display JSON, Calculate total
*/

$(document).ready(function () {

    let cart = [];

    $("#clearCartBtn").click(function() {
    
        if(cart.length === 0) {
        alert("Cart is already empty.");
        return;
    }

    if(confirm("Are you sure you want to clear the entire cart?")) {
        cart = []; // empty the cart array
        renderCart(); // re-render table, totals, and JSON
    }
    });

    $("#addBtn").click(function () {

        let selectedText = $("#productSelect option:selected").text();
        let price = parseFloat($("#productSelect").val());

        let productName = selectedText.split(" - ")[0];

        let item = {
            productName: productName,
            price: price,
            quantity: 1,
            total: price
        };

        cart.push(item);

        renderCart();
    });

    function renderCart() {

    let table = "";
    let grandTotal = 0;

    cart.forEach(function (item, index) {
        grandTotal += item.total;
        table += `
            <tr>
                <td>${item.productName}</td>
                <td>$${item.price.toFixed(2)}</td>
                <td>
                    <input type="number" class="qtyInput" data-index="${index}" value="${item.quantity}" min="1">
                </td>
                <td>$${item.total.toFixed(2)}</td>
                <td>
                    <button class="btn btn-danger btn-sm removeBtn" data-index="${index}">Remove</button>
                </td>
            </tr>
        `;
    });

    $("#cartTable").html(table);
    $("#grandTotal").text(grandTotal.toFixed(2));
    $("#jsonOutput").text(JSON.stringify(cart, null, 4));

    
    $(".qtyInput").on("change", function() {
        let idx = $(this).data("index");
        let val = parseInt($(this).val());
        if(val < 1) val = 1;
        cart[idx].quantity = val;
        cart[idx].total = val * cart[idx].price;
        renderCart();
    });

    $(".removeBtn").on("click", function() {
        let idx = $(this).data("index");
        if(confirm(`Remove ${cart[idx].productName} from cart?`)) {
            cart.splice(idx, 1); 
            renderCart();        
        }
    });
    }

    
    window.updateQuantity = function (index, qty) {

        qty = parseInt(qty);

        if (qty < 1) return;

        cart[index].quantity = qty;
        cart[index].total = qty * cart[index].price;

        renderCart();
    };
    $("#checkoutBtn").click(function () {
    if (cart.length === 0) {
        alert("Your cart is empty.");
        return;
    }

    sendCartToAPI(cart); 
    });

    });


