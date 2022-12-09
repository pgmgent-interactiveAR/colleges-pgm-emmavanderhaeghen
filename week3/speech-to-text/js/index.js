/*
 * Web Speech API is only fully supported by Chrome for desktop and Chrome for Android
 */
var SpeechRecognition = window.webkitSpeechRecognition;

/*
 * instantiation of the speech recognition interface
 */
var recognition = new SpeechRecognition();
recognition.continuous = false;

/*
 * text for display after the speech is converted to text.
 */
var Textbox = $('#textbox');
var instructions = $('instructions');

var Content = '';

/*
 * the speech to text conversion should be done instantaneously and pauses in speech are to be ignored.
 */
recognition.continuous = true;

/*
 * event onresult holds all the values of speech converted to text so far 
 */
recognition.onresult = function(event) {

  var current = event.resultIndex;

  var transcript = event.results[current][0].transcript;

    Content += transcript;
    Textbox.val(Content);
  
};

recognition.onstart = function() { 
  instructions.text('Voice recognition is ON.');
}

recognition.onspeechend = function() {
  instructions.text('No activity.');
}

recognition.onerror = function(event) {
  if(event.error == 'no-speech') {
    instructions.text('Try again.');  
  }
}

/*
 * start the speech listening on the button click
 */
$('#start-btn').on('click', function(e) {
  if (Content.length) {
    Content += ' ';
  }
  recognition.start();
});

/*
 * if the user clicks on the stop button, the speech recognition stops
 */
$('#stop-btn').on('click', function(e) {
  recognition.stop();
  instructions.text('Voice recognition is stopped.');
})

Textbox.on('input', function() {
  Content = $(this).val();
})