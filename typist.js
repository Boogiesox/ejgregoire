function Typist(config) {
  var index = 0,
      element = document.querySelector(config.element),
      msg = element.innerHTML;
      
  clearText(element);
  setTimeout(pressChars, config.delay);

  function pressChars() {
    var random = Math.random() * 200,
        msgArr = msg.split('');

    setTimeout(function() {
      element.innerHTML += msgArr[index];

      if(index < msg.length -1) {
        index++;
        pressChars();
      }
    }, random);
  }

  function clearText() {
    element.innerHTML = '';
  }
}