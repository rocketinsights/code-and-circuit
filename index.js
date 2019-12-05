const alexa = require('alexa-app');
const _ = require('lodash')
const app = new alexa.app();

var answer;
var movies = ["https://rocket-code-and-circuit.s3.amazonaws.com/blade_of_glory.mp3", "https://rocket-code-and-circuit.s3.amazonaws.com/oldschool.mp3", "https://rocket-code-and-circuit.s3.amazonaws.com/anchorman.mp3"]
var answers = ["blades of glory", "old school", "anchorman"]
var playMovieQuote;

function setNewMovie(){
    var random = Math.floor((Math.random())*movies.length)
    console.log(random);
    playMovieQuote = movies[random];
    answer = answers[random];
}

function sayNewMovie(){
    setNewMovie();
    return `Next Quote: <audio src="${playMovieQuote}" />`
}

app.launch(function(req,res) {
    setNewMovie();
  res
    .shouldEndSession(false)
    .say(`Welcome to the movie trivia game! Listen to a quote, and then guess what movie it came from. <audio src="${playMovieQuote}" />`)
    .send()
});
//asd
app.intent('GuessIntent', function(req, res) {
  const guess = req.slot('movie')
  console.log(`The user guessed ${guess} and the answer was ${answer}`)
  var correct;
  if(guess == answer){
      correct = "Correct";
  }else{
      correct = "Incorrect";
  }
  var oldMovie = _.cloneDeep(answer);
  var newMovie = sayNewMovie();
  res
    .shouldEndSession(false)
    .say(correct + ", The answer was: " + oldMovie + ".")
    .say(newMovie)
    .send()
})

app.sessionEnded(function(req, res) {
  res.say('time is up. good bye.').send();
})

app.error = function(exception, req, res) {
  console.log(exception)
  res.say('Oh no, something went wrong.').send()
}

exports.handler = app.lambda()
