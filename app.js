// Prevent transitions on load
window.onload = function() {
    document.querySelector('body').className = "";
};

// Instantiate a new typist.js control
new Typist({
    element: '.typist',
    delay: 1000
});