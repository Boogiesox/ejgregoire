(function() {
    'use-strict'
    
    // Prevent transitions on load
    window.onload = function() {
        document.querySelector('body').className = "";
    };

    // Instantiate a new typist.js control
    new Typist({
        "element": "header.hero .typist",
        "delay": 1000,
        "display": "inline"
        // "callback": function() {}
    });
    
    // Instantiate new excerptRandomizer.js control
    new ExcerptRandomizer({
        "interval": 5000,
        "excerpts": {
            "attribute": "excerpt",
            "targetSelector": ".testimonial-excerpt"
        },
        "testimonials": {
            "elementSelector": ".testimonial",
            "highlightClass": "highlight",
            "testimonialBody": ".testimonial-body",
            "testimonialBodyDisplay": "show",
            "testimonialClose": ".testimonial-close"
        }
    });
})();