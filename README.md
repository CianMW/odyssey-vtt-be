# Odyssey Virtaul Tabletop Back-End  

**Live at** : COMING SOON

## Description  
This is the back end for Odyssey, it includes the REST API in tandem with Socket IO. 
A virtual tabletop focusing on support for Old-School Renaissance tabletop roleplaying games and indie developers.  
OSR support includes a integrated character sheets, dice rollers, live chat, secondary personal chat and scheduling options.
Support for indie developers includes the upload and propogation of personal rule sets, creature libraries and library entries.
## Objectives 
- REST API 
- Test-Driven development ensuring reliablility
- Minimal dependencies
- User validation
- Socket Connection to the Frontend via Socket IO
- Connection to MongoDB for storage.
## What I Learned
- My long term planning and design skills improved by leaps and bounds while writing the tests for this application. 
- Taking in the big picture and breaking it into manageable conclusive tasks was key to developing my own testing routine.
- Improved my MongoDB Querying.
- Improved my knowledge of Socket IO and websockets.

## Endpoints   
  Endpoints listed below are incomplete and in development:  
>  ### /user
>> #### GET /user 
>> Returns a list of all the users in the database
>> #### Post / user
>> Creates a new user , essentially used for sign up  
> ### /user/me
>> #### GET /user/me 
>> Returns the logged in user , used for verification and log in  
>> #### PUT /user/me 
>> Updates the information for the logged in user , Returns the updated user without credentials 
>> #### DELETE /user/me 
>> Deletes the logged in user , Returns verification    
> ### /user/:userId
>> #### GET /user/:userId
>> Returns a specific user, *only available to admins*
>> #### PUT /user/:userId
>> Updates the information for the matching id , Returns the updated user without credentials , *Only available to admins*
>> #### Delete /user/:userId  
>> Deletes a specific user and removes from the Database, *only available to admins*  
  
  
> ### /game
>> #### GET /game
>> Returns a array of all the games in the database including owners, players, characters and ruleset used.
>> #### POST /game  
>> Creates a new game and saves it to the database
> ### /game/me  
>> #### GET /game/me
>> Returns an array of all the users games , both owned games and player games
> ### /game/:gameId  
>> #### GET /game/:gameId  
>> returns a specific game matched by id
>> #### DELETE /game/:gameId  
>> Deletes all player connections top a specific game and removes it from the database
> ### /game/:gameId/addUser/:userId  
>> #### PUT /game/:gameId/addUser/:userId 
>> adds a user , as specified as a player to the specified game
> ### /game/:gameId/removeUser/:userId 
>> #### PUT /game/:gameId/removeUser/:userId  
>> Removes a user from the specified game

  **character**  
  /character
        
  **dice**  
  /dice

## Tech Used  
- Javascript
- JEST
- Express.js
- Babel
- Socket IO
- Mongoose 
- Bcrypt
