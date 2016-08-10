/**
    * @function Typist - Defines an Typist constructor for displaying testimonial excerpts.
    * @param {object} config - The instance of the Typist control being configured.
    * @param {number} config.element - The element selector in which to apply the typist functionality.
    * @param {string} config.delay - The time to wait before beginning the typist cycle.
    * @param {string} config.display - The CSS display property for the typist control when rendered.
*/
function Typist(config) {
  'use-strict';
  
  var index = 0,
      elements = document.querySelectorAll(config.element),
      messageIndex = Math.floor(Math.random() * (elements.length));
      msg = elements[messageIndex].innerHTML;
  
  prepElement(elements[messageIndex]);
  setTimeout(pressChars, config.delay);

  function pressChars() {
    var random = Math.random() * 200,
        msgArr = msg.split(''); 

    setTimeout(function() {
      elements[messageIndex].innerHTML += msgArr[index];

      if(index < msg.length - 1) {
        index++;
        pressChars();
      }
    }, random);
  }

  function prepElement(element) {
    element.innerHTML = '';
    element.style.display = config.display || 'inline-block';
  }
}