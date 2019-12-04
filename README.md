# code-and-circuit
Alexa hack night with the code and circuit folks.

## Overview

This is intended to be a quick and fun way to get introduced to code via building a custom Alexa Skill. Each student should already have a skill created from them in the Rocket Alexa account. You will see the skill with your name on it :) If anyone cannot find just ask for help.

The skill should already be working in that you can click the "test" tab and type in the command "Sonja movie game" and the skill should respond, playing you a movie clip and prompting you for an answer. Below are some suggested next steps to flesh out the skill. If you get stuck you can always checkout the "feature/complete" branch to see the fully working code.

## Next Steps

1. Change the intro text to reflect your personality a bit. Perhaps just change the message to say "welcome to xxxxx movie game". Hit deploy, go back test and make sure it works.

2. Start checking to see if the user got the answer right. Note that you can store the correct answer, and really any information in the session.

3. So far we have only played one movie quote. Lets pick at random one of the three movie quotes. Lets also make sure we get the answer right.

4. Lets augment the skill to ask a follow up question after the first one. Remember to leave the session open. Make sure you don't play the same clip twice.

5. Make sure to tell the user once all of the questions have been asked.

## Other challenges

1. Update the model to include additional utterances. Go crazy!

2. Change your invocation name to anything you want.

## How to add additional movie clips

1. Find your clip on youtube and paste it into [here](https://www.kapwing.com/tools/convert-video). 

2. Download the MP3 file to your desktop. Alexa is very particular about the bitrate, so we need to encode it to the correct specification. You can do that [here](http://www.rocketinsights.com/voice/alexa-encoding-tool/). Note that you may want to increase the volume before doing so. If so, and you have FFMPEG installed you can run this command. `ffmpeg -i input.wav -filter:a "volume=1.5" output.wav`

3. Next we need to get the files on a publicly hosted URL that is served over https. We typically use Amazon's S3 service for this. We'll take care of this for you.
