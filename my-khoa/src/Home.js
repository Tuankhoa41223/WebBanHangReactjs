
function showSlides(type, n) {
    const products = document.querySelectorAll(`.${type} .col`);
    let numProductsToShow;
    // Determine the number of products to show based on screen width
    if (window.matchMedia("(max-width: 767px)").matches) { // Mobile
      numProductsToShow = 2;
    } else if (window.matchMedia("(max-width: 1024px)").matches) { // Tablet
      numProductsToShow = 3;
    } else { // Laptop and larger devices
      numProductsToShow = 5;
    }
  
    // Adjust slideIndex if out of range
    if (n > products.length - numProductsToShow + 1) {
      slideIndexes[type] = 1;
    } else if (n < 1) {
      slideIndexes[type] = products.length - numProductsToShow + 1;
    }
  
    // Hide all products
    for (let i = 0; i < products.length; i++) {
      products[i].style.display = "none";
    }
  
    // Show the appropriate number of products
    for (let i = 0; i < numProductsToShow; i++) {
      if (products[slideIndexes[type] + i - 1]) {
        products[slideIndexes[type] + i - 1].style.display = "block";
      }
    }
  }
  
  function plusSlides(type, n) {
    showSlides(type, slideIndexes[type] += n);
  }
  // Initialize the slides
showSlides('iphone', slideIndexes.Iphone);

// Automatically change slides every 2 seconds
setInterval(() => {
    showSlides('iphone', slideIndexes.Iphone += 1);
    console.log("vdfvb")
  }, 2000);