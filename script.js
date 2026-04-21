// Reveal Animation on Scroll
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// Handle Form Submission to Backend
document.getElementById('contact-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        message: document.getElementById('message').value
    };

    const response = await fetch('http://localhost:3000/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
    });

    const result = await response.json();
    document.getElementById('response-msg').innerText = result.status;
});
function payNow(amount) {
    const options = {
        "key": "rzp_test_SgELjQDk9aQyun", // Enter your Key ID here
        "amount": amount * 100, // Razorpay works in paise (7000 * 100)
        "currency": "INR",
        "name": "Nexora Web",
        "description": "Freelance Web Development Services",
        "image": "https://your-logo-url.com/logo.png", // Optional: link to your logo
        "handler": function (response) {
            // This runs AFTER a successful payment
            alert("Payment Successful! ID: " + response.razorpay_payment_id);
            // You can also send this ID to your backend to save it
        },
        "prefill": {
            "name": "", // Leave empty so customer fills it
            "email": "",
            "contact": ""
        },
        "theme": {
            "color": "#0070f3" // Matches your Nexora Blue
        }
    };

    const rzp1 = new Razorpay(options);
    rzp1.open();
}