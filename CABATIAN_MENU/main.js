document.addEventListener('DOMContentLoaded', (event) => {
    function updateQuantity(item, change) {
        let quantityElement = document.getElementById('quantity-' + item);
        let quantity = parseInt(quantityElement.innerText);

        if (change === -1 && quantity > 0) {
            quantity--;
        } else if (change === 1 && quantity < 10) {
            quantity++;
        } else if (change === 1 && quantity === 10) {
            alert("Maximum quantity reached.");
        } else if (quantity === 0 && change === -1) {
            alert("Please add quantity for the desired item.");
        }

        quantityElement.innerText = quantity;
        calculateTotal();
    }

    function calculateTotal() {
        let checkboxes = document.querySelectorAll('input[type="checkbox"]');
        let totalPrice = 0;

        checkboxes.forEach(checkbox => {
            if (checkbox.checked) {
                let itemId = checkbox.closest('.content').id;
                let quantity = parseInt(document.getElementById('quantity-' + itemId).innerText);
                let price = parseFloat(checkbox.getAttribute('data-price'));
                totalPrice += quantity * price;
            }
        });

        document.getElementById('totalPrice').innerText = 'Php ' + totalPrice.toFixed(2);

        let showTotalBtn = document.getElementById('showTotalBtn');
        let totalPriceDisplay = document.getElementById('totalPriceDisplay');
        
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
                let itemId = checkbox.closest('.content').id;
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
            alert("Order complete. Enjoy your food!");
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

    window.updateQuantity = updateQuantity;
});
