const slider = document.querySelector('.slider');
let count1 = 0;

function changeImage() {
    const imagecon = ["images/slider1.jpg", "images/slider2.jpg","images/story1.jpg"];
    count1 = (count1 + 1) % imagecon.length;
    slider.style.backgroundImage = `url('${imagecon[count1]}')`;
}
fetch('navbar.html')
.then(response=>response.text())
.then(data=>{
    document.querySelector(`.nav`).innerHTML=data;
    runafterattach();
   
   
})


setInterval(changeImage, 3000);
function runafterattach(){
    fetch('carttab.html')
        .then(response => response.text())
        .then(data => {
            document.querySelector(`.cart`).innerHTML = data;

            let iconCart = document.querySelector('.icon-cart');
            let body = document.querySelector('body');
            let closeCart = document.querySelector('.close');

            // Toggle cart open/close
            iconCart.addEventListener('click', () => {
                body.classList.toggle('showCart');
            });

            closeCart.addEventListener('click', () => {
                body.classList.toggle('showCart');

                // Ensure cart is saved on close
                localStorage.setItem('cart', JSON.stringify(cart));
            });

            // Load cart from localStorage on the front page
            const savedCart = JSON.parse(localStorage.getItem('cart'));
            if (savedCart) {
                cart = savedCart;
                addCartToHTML(); // Render the cart
            }
        });
// Change heart icon functionality
const changes = document.querySelectorAll('.change');
changes.forEach(change => {
    change.addEventListener('click', () => {
        change.src = change.src.includes('black.png') ? 'Heart.png' : 'black.png';
    });
});

// Redirect with zoom effect
const redirectWithZoom = (targetUrl) => {
    document.body.classList.add('zoom-out-active');
    setTimeout(() => {
        window.location.href = targetUrl;
    }, 500); // Match this duration with the CSS transition duration
};

// Navbar redirection
const directTra = document.getElementById('tra');
if (directTra) {
    directTra.addEventListener('click', () => redirectWithZoom("shopping.html"));
}
const story = document.querySelector('.more');
if (story) {
    story.addEventListener('click', () => redirectWithZoom("stories.html"));
}
let home = document.querySelector('.logo');
if (home) {
    home.addEventListener("click", () => {
        window.location.href = "index.html";
    });
}
const loginpg = document.getElementById('login');
if (loginpg) {
    loginpg.addEventListener('click', () => redirectWithZoom("loginpg.html"));
}
const wedding = document.querySelector('.wedding');
if (wedding) {
    wedding.addEventListener('click', () => redirectWithZoom("wedding.html"));
}
const stories = document.getElementById('story');
if (stories) {
    stories.addEventListener('click', () => redirectWithZoom("stories.html"));
}

}

const storyelement = document.querySelectorAll('.stories1');
const videocontainer = document.querySelector('.video-frame-container');
const videoSource = document.getElementById('video-source'); // Reference the video source tag
const videoElement = document.getElementById('story-video'); // Reference the video element
const closeBtn = document.getElementById('close-btn');

storyelement.forEach(story => {
    story.addEventListener('click', () => {
        const videoSrc = story.getAttribute('data-video'); // Fetch the video URL from data-video attribute
        if (videoSrc) {
            videoSource.src = videoSrc; // Set the source of the video
            videoElement.load(); // Reload the video with the new source
            videocontainer.classList.remove('hidden'); // Show the video container
        }
    });
});

closeBtn.addEventListener('click', () => {
    videocontainer.classList.add('hidden'); // Hide the video container
    videoElement.pause(); // Pause the video
    videoSource.src = ''; // Clear the video source
});
const onamBoxes = document.querySelectorAll(".box");
const closeBtn1 = document.getElementById("close-btn1");
const frameOverlay = document.getElementById("frame");
const contentFrame = document.getElementById("content-frame");

// Loop through each box and add the click event listener
onamBoxes.forEach(box => {
    box.addEventListener("click", () => {
        const fileToLoad = box.getAttribute("data-file"); // Get the HTML file from the data attribute
        frameOverlay.style.display = "flex";
        contentFrame.src = fileToLoad; // Load the corresponding HTML file into the iframe
    });
});

// Close the overlay when the close button is clicked
closeBtn1.addEventListener("click", () => {
    frameOverlay.style.display = "none";
    contentFrame.src = ""; // Clear the iframe content
});








