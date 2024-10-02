document.addEventListener('DOMContentLoaded', () => {
    const slider = document.querySelector('.slider');

    let count1 = 0;
    function changeImage() {
        const imagecon = ["images/slider1.jpg", "images/slider2.jpg"];
        count1 = (count1 + 1) % imagecon.length;
        slider.style.backgroundImage = `url('${imagecon[count1]}')`;
    }

    // Change image every 3 seconds
    setInterval(changeImage, 3000);

    // Image click event for '.change' class images
    const changes = document.querySelectorAll('.change');
    changes.forEach(change => {
        change.addEventListener('click', () => {
            if (change.src.includes('black.png')) {
                change.src = 'Heart.png';
                alert('Image changed!');
            } else {
                change.src = 'black.png';
            }
        });
    });
});



const redirectWithZoom = (targetUrl) => {
    document.body.classList.add('zoom-out-active');
    setTimeout(() => {
        window.location.href = targetUrl;
    }, 500); // Match this duration with the CSS transition duration
};



const onam = document.querySelector('.row11');
if (onam) {
    onam.addEventListener('click', function() {
        redirectWithZoom("onam1.html");
    });
}

const diwali = document.querySelector('.class31');
if (diwali) {
    diwali.addEventListener('click', function() {
        redirectWithZoom("diwali1.html");
    });
}



