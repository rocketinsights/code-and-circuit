const _ = require('lodash')
const alexa = require('alexa-app');
const app = new alexa.app();

const movies = [
    {
        name: 'anchorman',
        url: 'https://rocket-code-and-circuit.s3.amazonaws.com/anchorman.mp3'
    },
    {
        name: 'blades of glory',
        url: 'https://rocket-code-and-circuit.s3.amazonaws.com/blade_of_glory.mp3'
    },
    {
        name: 'old school',
        url: 'https://rocket-code-and-circuit.s3.amazonaws.com/oldschool.mp3'
    }
]

app.launch((req,res) => {
    const clips = _.shuffle(movies)
    const clip = clips.pop()
    const session = req.getSession()
    session.set('name', clip.name)
    session.set('clips', JSON.stringify(clips))
           
    res
        .shouldEndSession(false)
        .say(`Hello blank, to your movie game. Here is your first movie. <audio src="${clip.url}" /> What is the movie?`)
        .send()
});

app.intent('GuessIntent', (req, res) => {
    const guess = req.slot('movie')
    const session = req.getSession()
    const answer = session.get('name')
    const clips = JSON.parse(session.get('clips'))
    const clip = clips.pop()
    let shouldEndSession

    console.log(`The user guessed ${guess} and the answer was ${answer}`)

    let msg = (guess.toLowerCase() === answer.toLowerCase()) ? '<audio src="https://song-game.s3.amazonaws.com/correct.mp3" />' : '<audio src="https://song-game.s3.amazonaws.com/buzzer.mp3" />'
    if (clip) {
        msg = `${msg} Your next movie is. <audio src="${clip.url}" /> What is the movie?`
        session.set('name', clip.name)
        session.set('clips', JSON.stringify(clips))
        shouldEndSession = false
    } else {
        msg = `${msg} Thanks for playing!`
        shouldEndSession = true
    }

    res
        .shouldEndSession(shouldEndSession)
        .say(msg)
        .send()
})

app.sessionEnded((req, res) => {
    res.say('time is up. good bye.').send();
})

app.error = (exception, req, res) => {
    console.log(exception)
    res.say('Oh no, something went wrong.').send()
}

exports.handler = app.lambda()
