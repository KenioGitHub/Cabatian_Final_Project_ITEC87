document.addEventListener('DOMContentLoaded', (event) => {
    function updateStock(item, change) {
        let stockElement = document.getElementById('stock-' + item);
        let quantityElement = document.getElementById('quantity-' + item);
        let stock = parseInt(stockElement.innerText);
        let quantity = parseInt(quantityElement.innerText);

        if (change === -1 && stock > 0) {
            stock--;
            quantity++;
        } else if (change === 1 && quantity > 0) {
            stock++;
            quantity--;
        } else if (stock === 0) {
            alert("No stock available.");
        } else if (quantity === 0) {
            alert("Please add quantity for the desired item.");
        }

        stockElement.innerText = stock;
        quantityElement.innerText = quantity;
        calculateTotal();

        // Update stock in localStorage
        localStorage.setItem('stock-' + item, stock);
    }

    function calculateTotal() {
        let checkboxes = document.querySelectorAll('input[type="checkbox"]');
        let totalPrice = 0;

        checkboxes.forEach(checkbox => {
            if (checkbox.checked) {
                let itemId = checkbox.closest('.stock-item').id;
                let quantity = parseInt(document.getElementById('quantity-' + itemId).innerText);
                let price = parseFloat(checkbox.getAttribute('data-price'));
                totalPrice += quantity * price;
            }
        });

        document.getElementById('totalPrice').innerText = 'Php ' + totalPrice.toFixed(2);

        if (totalPrice > 0) {
            showTotalBtn.style.display = 'block';
            totalPriceDisplay.style.display = 'block';
        } else {
            showTotalBtn.style.display = 'none';
            totalPriceDisplay.style.display = 'none';
        }

        updateDiscountedPrice();
    }

    function showReceipt() {
        let receiptItems = document.getElementById('receiptItems');
        receiptItems.innerHTML = '';
        let checkboxes = document.querySelectorAll('input[type="checkbox"]');
        let totalPrice = 0;

        checkboxes.forEach(checkbox => {
            if (checkbox.checked) {
                let itemName = checkbox.getAttribute('name');
                let itemId = checkbox.closest('.stock-item').id;
                let quantity = parseInt(document.getElementById('quantity-' + itemId).innerText);
                let price = parseFloat(checkbox.getAttribute('data-price'));
                totalPrice += quantity * price;

                let itemElement = document.createElement('p');
                itemElement.innerText = `${itemName} (x${quantity})`;
                receiptItems.appendChild(itemElement);
            }
        });

        document.getElementById('modalTotalPrice').innerText = 'Php ' + totalPrice.toFixed(2);
        document.getElementById('discountedPrice').innerText = 'Php ' + totalPrice.toFixed(2);
        document.getElementById('receiptModal').style.display = 'block';
    }

    function applyDiscount() {
        let discountRadios = document.querySelectorAll('input[name="discount"]');
        let totalPrice = parseFloat(document.getElementById('modalTotalPrice').innerText.replace('Php ', ''));
        let discount = 0;
        let discountSelected = false;

        discountRadios.forEach(radio => {
            if (radio.checked) {
                discount = parseFloat(radio.value);
                discountSelected = true;
            }
        });

        if (discountSelected) {
            let discountedPrice = totalPrice - (totalPrice * discount);
            document.getElementById('discountedPrice').innerText = 'Php ' + discountedPrice.toFixed(2);
            alert("Your purchase is complete. Thank you for shopping with Spree!");
        } else {
            alert("Please select type of discount.");
        }
    }

    function updateDiscountedPrice() {
        let discountRadios = document.querySelectorAll('input[name="discount"]');
        let totalPrice = parseFloat(document.getElementById('totalPrice').innerText.replace('Php ', ''));
        let discount = 0;

        discountRadios.forEach(radio => {
            if (radio.checked) {
                discount = parseFloat(radio.value);
            }
        });

        let discountedPrice = totalPrice - (totalPrice * discount);
        document.getElementById('discountedPrice').innerText = 'Php ' + discountedPrice.toFixed(2);
    }

    let checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', calculateTotal);
    });

    document.getElementById('showTotalBtn').addEventListener('click', showReceipt);

    document.querySelector('.close').addEventListener('click', () => {
        document.getElementById('receiptModal').style.display = 'none';
    });

    document.getElementById('placeOrderBtn').addEventListener('click', () => {
        applyDiscount();
    });

    let discountRadios = document.querySelectorAll('input[name="discount"]');
    discountRadios.forEach(radio => {
        radio.addEventListener('change', updateDiscountedPrice);
    });

    window.updateStock = updateStock;

    let stockItems = [
        'jeans1', 'jeans2', 'jeans3', 'jeans4', 
        'shirt1', 'shirt2', 'shirt3', 'shirt4', 
        'perfume1', 'perfume2', 'perfume3', 'perfume4',
        'sando1', 'sando2', 'sando3', 'sando4',
        'toys1', 'toys2', 'toys3', 'toys4'
    ];
    stockItems.forEach(item => {
        let stock = localStorage.getItem('stock-' + item);
        if (stock !== null) {
            document.getElementById('stock-' + item).innerText = stock;
        }
    });
});
