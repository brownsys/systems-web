// List of banner images
const bannerImages = [
    // 'assets/banner1.jpg',
    'assets/banner2.jpg'
    // 'assets/banner3.jpg'
];

// Select the header element
const header = document.getElementById('dynamic-header');

// Function to pick a random image
function setRandomBanner() {
    const randomIndex = Math.floor(Math.random() * bannerImages.length);
    header.style.backgroundImage = `url(${bannerImages[randomIndex]})`;
}
// Call the function on page load
setRandomBanner();
