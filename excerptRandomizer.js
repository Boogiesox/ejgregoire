/**
    * @function ExcerptRandomizer - Defines an ExcerptRandomizer constructor for displaying testimonial excerpts.
    * @param {object} config - The instance of the ExcerptRandomizer being configured.
    * @param {number} config.interval - The time (ms) in between each excerpt being rendered.
    * @param {string} config.excerpts.attribute - The attribute that is added to elements to mark excerpts.
    * @param {string} config.excerpts.targetSelector - The selector pattern for where to display the excerpts.
    * @param {string} config.testimonials.elementSelector - The selector pattern for testimonial elements.
    * @param {string} config.testimonials.highlightClass - The class name to append to the testimonial-associated-with-the-excerpt's link.
    * @param {string} config.testimonials.testimonialBodyDIsplay - The class used to display the testimonial body.
    * @param {string} config.testimonials.testimonialBody - The selector pattern for testimonial body element.
    * @param {string} config.testimonials.testimonialClose - The selector pattern for testimonial close element.
*/
function ExcerptRandomizer(config) {
    'use-strict';

    var ERRORS = {
        "EXCERPT_TARGET": "config.excerpts.targetSelector may be invalid or undefined",
        "EXCERPT_ATTRIBUTE": "config.excerpts.attribute may be invalid or undefined",
        "INTERVAL_NAN": "config.interval must be an integer, 0, or not defined",
        "TESTIMONIALS_ELEMENT": "config.testimonials.elementSelector may be invalid or undefined",
        "TESTIMONIALS_CLOSE": "config.testimonials.testimonialClose may be invalid or undefined"
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
        var randomIndex = Math.floor(Math.random() * (excerpts.length)),
            randomExcerpt = excerpts[randomIndex];

        (randomIndex !== previousExcerptIndex && excerpts.length > 1)
            ? render(randomExcerpt, excerptTarget)
            : getAndDisplayRandomExcerpt();
            
        testimonials.forEach(function(testimonial) {
            testimonial.querySelector("div:not(" + config.testimonials.testimonialBody + ")").onclick = function(e) {
                handleTestimonialClick(e, testimonial);
            }
            testimonial.querySelector(config.testimonials.testimonialClose).onclick = function(e) {
                handleTestimonialClick(e, testimonial);
            }
        });

        previousExcerptIndex = randomIndex;
    }
    
    function clearHighlights() {
        testimonials.forEach(function(testimonial) {
            testimonial.classList.remove(config.testimonials.highlightClass);
        });
    }
    
    function addHighlight(testimonial) {
        testimonial.classList.add(config.testimonials.highlightClass);
    }
    
    function handleTestimonialClick(e, testimonial) {
        var testimonialBody = testimonial.querySelector(config.testimonials.testimonialBody);
        
        (testimonialBody.classList.contains(config.testimonials.testimonialBodyDisplay))
            ? testimonialBody.classList.remove(config.testimonials.testimonialBodyDisplay)
            : testimonialBody.classList.add(config.testimonials.testimonialBodyDisplay);
            
        (document.body.classList.contains('show-testimonial'))
            ? document.body.classList.remove('show-testimonial')
            : document.body.classList.add('show-testimonial');
    }
    
    function render(excerpt, el) {
        if(config.testimonials.highlightClass) {
            clearHighlights();
            addHighlight(excerpt.closest(config.testimonials.elementSelector));
        }

        el.innerHTML = '"' + excerpt.innerHTML + '"';
    }

    function throwError(errorMsg) {
        throw new Error(errorMsg);
    }
}