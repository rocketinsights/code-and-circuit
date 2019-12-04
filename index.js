const alexa = require('alexa-app');
const app = new alexa.app();

app.launch(function(req,res) {
  res
    .shouldEndSession(false)
    .session('answer', 'anchorman')
    .say('Hello blank, to your movie game. Here is your first movie. <audio src="https://rocket-code-and-circuit.s3.amazonaws.com/anchorman.mp3" />')
    .send()
});

app.intent('GuessIntent', function(req, res) {
  const guess = req.slot('movie')
  const answer = req.session('answer')
  console.log(`The user guessed ${guess} and the answer was ${answer}`)
  res
    .shouldEndSession(false)
    .say('Yahoo, things are working! <amazon:effect name="whispered">Sort of</amazon:effect>')
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
