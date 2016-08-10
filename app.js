(function() {
    'use-strict'
    
    // Prevent transitions on load
    window.onload = function() {
        document.querySelector('body').className = "";
    };

    // Instantiate a new typist.js control
    new Typist({
        element: '.typist',
        delay: 1000,
        display: 'inline'
    });
    
    // Instantiate new excerptRandomizer.js control
    new ExcerptRandomizer({
        "interval": 7000,
        "excerpts": {
            "attribute": "excerpt",
            "targetSelector": ".testimonial-excerpt"
        },
        "testimonials": {
            "elementSelector": ".testimonial",
            "linkSelector": ".testimonial-link",
            "highlightClass": "highlight"
        }
    });
})();