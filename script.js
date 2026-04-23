// 1. SCROLL REVEAL
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('active');
    });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// 2. RAZORPAY PAYMENT
function payNow(amount) {
    const options = {
        "key": "rzp_test_SgELjQDk9aQyun", // Your Test Key
        "amount": amount * 100, 
        "currency": "INR",
        "name": "Nexora Web",
        "description": "Service Package Payment",
        "handler": function (response) {
            alert("Payment Successful! ID: " + response.razorpay_payment_id);
        },
        "theme": { "color": "#0070f3" }
    };
    const rzp = new Razorpay(options);
    rzp.open();
}

// 3. CONTACT FORM (GMAIL VIA RENDER)
document.getElementById('contact-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const btn = e.target.querySelector('button');
    const data = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        message: document.getElementById('message').value
    };

    btn.innerText = "Sending...";

    try {
        // ADDED /contact TO THE END OF THE URL
        const renderURL = 'https://portfolio-site-fbcd.onrender.com/contact'; 

        const response = await fetch(renderURL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            alert("Success! I'll get back to you soon.");
            e.target.reset();
        } else {
            alert("Server error. Please try again.");
        }
    } catch (err) {
        console.error(err);
        alert("Error connecting to server.");
    } finally {
        btn.innerText = "Send Message";
    }
}); // THE CLOSING BRACKET MUST BE HERE AT THE VERY END

function toggleMenu() {
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('nav-links');
    
    // This toggles the 'active' class we created in CSS
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
}