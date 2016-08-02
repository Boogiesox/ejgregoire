function Typist(config) {
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