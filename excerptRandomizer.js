/**
    * @function ExcerptRandomizer - Defines an ExcerptRandomizer constructor for displaying testimonial excerpts.
    * @param {object} config - The instance of the ExcerptRandomizer being configured.
    * @param {number} config.interval - The time (ms) in between each excerpt being rendered.
    * @param {string} config.excerpts.attribute - The attribute that is added to elements to mark excerpts.
    * @param {string} config.excerpts.targetSelector - The selector pattern for where to display the excerpts.
    * @param {string} config.testimonials.elementSelector - The selector pattern for testimonial elements.
    * @param {string} config.testimonials.linkSelector - The selector pattern for testimonial links.
    * @param {string} config.testimonials.highlightClass - The class name to append to the testimonial-associated-with-the-excerpt's link.
*/
function ExcerptRandomizer(config) {
    'use-strict';

    var ERRORS = {
        "EXCERPT_TARGET": "config.excerpts.targetSelector may be invalid or undefined",
        "EXCERPT_ATTRIBUTE": "config.excerpts.attribute may be invalid or undefined",
        "INTERVAL_NAN": "config.interval must be an integer, 0, or not defined",
        "TESTIMONIALS_ELEMENT": "config.testimonials.elementSelector may be invalid or undefined",
        "TESTIMONIALS_LINK": "config.testimonials.linkSelector may be invalid or undefined"
    }

    var excerptTarget = document.querySelector(config.excerpts.targetSelector) || throwError(ERRORS.EXCERPT_TARGET),
        excerpts = (document.querySelectorAll('span[' + config.excerpts.attribute + ']').length > 0)
            ? document.querySelectorAll('span[' + config.excerpts.attribute + ']')
            : throwError(ERRORS.EXCERPT_ATTRIBUTE),
        testimonials = (document.querySelectorAll(config.testimonials.elementSelector).length > 0)
            ? document.querySelectorAll(config.testimonials.elementSelector)
            : throwError(ERRORS.TESTIMONIALS_ELEMENT),
        interval = (Number.isInteger(config.interval))
            ? config.interval 
            : throwError(ERRORS.INTERVAL_NAN),
        previousExcerptIndex;

    activate();

    function activate() {
        getAndDisplayRandomExcerpt();
        if(config.interval) {
            setInterval(getAndDisplayRandomExcerpt, interval);
        }
    }
    
    function getAndDisplayRandomExcerpt() {
        var random = Math.floor(Math.random() * (excerpts.length)),
            randomExcerpt = excerpts[random];

        (random === previousExcerptIndex && excerpts.length > 1)
            ? getAndDisplayRandomExcerpt()
            : render(randomExcerpt, excerptTarget);

        previousExcerptIndex = random;
    }
    
    function clearHighlights() {
        testimonials.forEach(function(testimonial) {
            var testimonialLink = testimonial.querySelector(config.testimonials.linkSelector) || throwError(ERRORS.TESTIMONIALS_LINK);
            testimonialLink.classList.remove(config.testimonials.highlightClass);
        });
    }
    
    function render(excerpt, el) {
        if(config.testimonials.highlightClass) {
            clearHighlights();
            excerpt.closest(config.testimonials.elementSelector).querySelector(config.testimonials.linkSelector).classList.add(config.testimonials.highlightClass);
        }

        el.innerHTML = '"' + excerpt.innerHTML + '"';
    }

    function throwError(errorMsg) {
        throw new Error(errorMsg);
    }
}