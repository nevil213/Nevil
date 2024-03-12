$(document).ready(function () {
    var itemsMainDiv = ('.MultiCarousel');
    var itemsDiv = ('.MultiCarousel-inner');
    var itemWidth = "";

    $('.leftLst, .rightLst').click(function () {
        var condition = $(this).hasClass("leftLst");
        if (condition)
            click(0, this);
        else
            click(1, this)
    });

    ResCarouselSize();




    $(window).resize(function () {
        ResCarouselSize();
    });

    //this function define the size of the items
    function ResCarouselSize() {
        var incno = 0;
        var dataItems = ("data-items");
        var itemClass = ('.item');
        var id = 0;
        var btnParentSb = '';
        var itemsSplit = '';
        var sampwidth = $(itemsMainDiv).width();
        var bodyWidth = $('body').width();
        $(itemsDiv).each(function () {
            id = id + 1;
            var itemNumbers = $(this).find(itemClass).length;
            btnParentSb = $(this).parent().attr(dataItems);
            itemsSplit = btnParentSb.split(',');
            $(this).parent().attr("id", "MultiCarousel" + id);


            if (bodyWidth >= 1200) {
                incno = itemsSplit[3];
                itemWidth = sampwidth / incno;
            }
            else if (bodyWidth >= 992) {
                incno = itemsSplit[2];
                itemWidth = sampwidth / incno;
            }
            else if (bodyWidth >= 768) {
                incno = itemsSplit[1];
                itemWidth = sampwidth / incno;
            }
            else {
                incno = itemsSplit[0];
                itemWidth = sampwidth / incno;
            }
            $(this).css({ 'transform': 'translateX(0px)', 'width': itemWidth * itemNumbers });
            $(this).find(itemClass).each(function () {
                $(this).outerWidth(itemWidth);
            });

            $(".leftLst").addClass("over");
            $(".rightLst").removeClass("over");

        });
    }


    //this function used to move the items
    function ResCarousel(e, el, s) {
        var leftBtn = ('.leftLst');
        var rightBtn = ('.rightLst');
        var translateXval = '';
        var divStyle = $(el + ' ' + itemsDiv).css('transform');
        var values = divStyle.match(/-?[\d\.]+/g);
        var xds = Math.abs(values[4]);
        if (e == 0) {
            translateXval = parseInt(xds) - parseInt(itemWidth * s);
            $(el + ' ' + rightBtn).removeClass("over");

            if (translateXval <= itemWidth / 2) {
                translateXval = 0;
                $(el + ' ' + leftBtn).addClass("over");
            }
        }
        else if (e == 1) {
            var itemsCondition = $(el).find(itemsDiv).width() - $(el).width();
            translateXval = parseInt(xds) + parseInt(itemWidth * s);
            $(el + ' ' + leftBtn).removeClass("over");

            if (translateXval >= itemsCondition - itemWidth / 2) {
                translateXval = itemsCondition;
                $(el + ' ' + rightBtn).addClass("over");
            }
        }
        $(el + ' ' + itemsDiv).css('transform', 'translateX(' + -translateXval + 'px)');
    }

    //It is used to get some elements from btn
    function click(ell, ee) {
        var Parent = "#" + $(ee).parent().attr("id");
        var slide = $(Parent).attr("data-slide");
        ResCarousel(ell, Parent, slide);
    }

});

function search() {
let filter = document.getElementById('find').value.toUpperCase();
let item = document.querySelectorAll('.product');
console.log(item);
let l = document.getElementsByTagName('p');
for(var i = 0;i<=l.length;i++){
let a=item[i].getElementsByTagName('p')[0];
let value=a.innerHTML || a.innerText || a.textContent;
if(value.toUpperCase().indexOf(filter) > -1) {
item[i].style.display="";
}
else
{
item[i].style.display="none";
}
}
}

function toggleSearchInput() {
    var searchInput = document.querySelector('.search-input');
    searchInput.style.display = (searchInput.style.display === 'none' || searchInput.style.display === '') ? 'block' : 'none';
  }

  function toggle1() {
    var searchInput = document.querySelector('.term');
    searchInput.style.display = (searchInput.style.display === 'none' || searchInput.style.display === '') ? 'block' : 'none';
  }
  function toggle2() {
    var searchInput = document.querySelector('.policy');
    searchInput.style.display = (searchInput.style.display === 'none' || searchInput.style.display === '') ? 'block' : 'none';
  }
  function toggle3() {
    var searchInput = document.querySelector('.email1');
    searchInput.style.display = (searchInput.style.display === 'none' || searchInput.style.display === '') ? 'block' : 'none';
  }
  function toggle4() {
    var searchInput = document.querySelector('.email2');
    searchInput.style.display = (searchInput.style.display === 'none' || searchInput.style.display === '') ? 'block' : 'none';
  }
  function toggle5() {
    var searchInput = document.querySelector('.faq3');
    searchInput.style.display = (searchInput.style.display === 'none' || searchInput.style.display === '') ? 'block' : 'none';
  }
  function toggle6() {
    var searchInput = document.querySelector('.faq4');
    searchInput.style.display = (searchInput.style.display === 'none' || searchInput.style.display === '') ? 'block' : 'none';
  }
      // Sample Cart Object
     var cart = [];

// Function to add items to the cart
function addToCart(itemName, price) {
    var item = {
        name: itemName,
        price: price,
        quantity: 1
    };

    // Check if the item is already in the cart
    var existingItem = cart.find(cartItem => cartItem.name === itemName);

    if (existingItem) {
        // If item already exists, increase quantity
        existingItem.quantity++;
    } else {
        // If item doesn't exist, add it to the cart
        cart.push(item);
    }

    updateCart();
}

// Function to update the cart display
function updateCart() {
    var cartList = document.getElementById("cart-list");
    cartList.innerHTML = ""; // Clear the existing content

    var totalPrice = 0;

    for (var i = 0; i < cart.length; i++) {
        var listItem = document.createElement("li");
        listItem.innerHTML = `
            <span>${cart[i].name} - ₹${cart[i].price} x ${cart[i].quantity}</span>
            <button class="quantity-btn" onclick="decrementQuantity(${i})">-</button>
            <button class="quantity-btn" onclick="incrementQuantity(${i})">+</button>
        `;
        cartList.appendChild(listItem);

        totalPrice += parseFloat(cart[i].price) * cart[i].quantity;
    }

    // Display total price
    var totalElement = document.getElementById("total-price");
    totalElement.textContent = "Total: ₹" + totalPrice.toFixed(2);
}

// Function to increment quantity
function incrementQuantity(index) {
    cart[index].quantity++;
    updateCart();
}

// Function to decrement quantity
function decrementQuantity(index) {
    if (cart[index].quantity > 1) {
        cart[index].quantity--;
    } else {
        // Remove the item if quantity is 1
        cart.splice(index, 1);
    }
    updateCart();
}

// Example of how to call addToCart function when "add" button is clicked
var addButton = document.querySelectorAll(".add");
addButton.forEach(function (button, index) {
    button.addEventListener("click", function () {
        // Get product details
        var productName = document.querySelectorAll(".fname")[index].textContent;
        var productPrice = document.querySelectorAll(".row.product p")[index * 3 + 1].textContent.slice(1);

        // Add to cart
        addToCart(productName, productPrice);
    });
});


    
    let button = document.getElementById("button");
    let makepdf = document.getElementById("cart");
 
    button.addEventListener("click", function () {
        let mywindow = window.open("", "PRINT", 
                "height=400,width=600");
 
        mywindow.document.write(makepdf.innerHTML);
 
        mywindow.document.close();
        mywindow.focus();
 
        mywindow.print();
        mywindow.close();
 
        return true;
    });
