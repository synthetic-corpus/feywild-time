# feywild-time

I like to play Dungeons and Dragons and one of the most important things you can do, is keep track of time in game.

This project will allow Dungeon Masters to login and create a calendars for their game. There will be two types of calendars the normal world Calendar (aka the "Prime Material Calendar") which will be based on a fictional in game Calendar of Harptos.

The other calenders will be user created and user customized. These calendars record time spent in the alternate world aka (aka the "Fey Wild").

Users will be able to automatically advanced time within game in increments of 24 hours. The trick is 24 hours spent in Fey Wild might not equal 24 hours spent in the Prime Material world.
For instance, if the players spend 24 hours in particular village in the Fey Wild, they will find that random amount of days betwe 2-7 have passed in the harptos Calendar.

# Technical Specifications

This project will use AWS Lambda functions and Serverless to create a Rest API. It will rely on DynamoDB (per class specifications), also through AWS, to store data. Authentication will be done with Auth0. Longer term projections for this project will be to switch to MongoDB, and do login with Patreon or some other freemium service.

There will be no front end app for this project at this, but the client will contain a Javascript object with methods such as getCalendars(), saveCalendars(), advanceTime() etc that will
simulate a requests from a front end.

Users will be able to upload images and icons representing particular locations or zones.
