
# User Support Chat Application.

This Chat Application allow users to connect to the support agents.

[Demo](https://user-support-chat-app.herokuapp.com/)

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

What things you need to install the software and how to install them

    > Install Mongo DB - 
    https://docs.mongodb.com/manual/administration/install-community/

    Mac - https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x/?_ga=2.72773907.1410341941.1535649337-970892403.1535649337


### Installing

A step by step series of examples that tell you how to get a development env running

> npm install

Note - make sure your MongoDB is running, before starting the app.

Optional - set process.env.MONGODB_URI - with user Mongo server Uri.

> npm start

## Built With

* [React](https://reactjs.org/) - The web framework used
* [Redux](https://redux.js.org/) - State Management
* [Node](https://nodejs.org/en/) - Server used.
* [Express](https://nodejs.org/en/) - FOr Api creation.
* [Socket.io](https://socket.io/) - Communication between server and client.
* [MongoDb](https://www.mongodb.com/) - Used to store user data.

## Server architecture
![server architecture](https://github.com/ishachopde/ChatAppChallenge/blob/master/architecture/ChatAppArchitectureDiagram.png "Server Architecture")

## Client architecture
![client architecture](https://github.com/ishachopde/ChatAppChallenge/blob/master/architecture/ClientArchitecture.png "Client Architecture")

## Feature - 
    * User can send messages to support.
    * Support can talk to many users at the same time.
    * Support is notified if he dont reply to the user.
    * Last message counter is provided.
    * All the APi and socket connection needs valid JWT token before user can access them.
    * Login, Register, Logout functionality.
    * User sudden disconnect handled.
    * Chat more than your screen handled using horizontal scroll view.

## Assumption - 
    * when user joins the system, random support is allocated to him. 
    * Support should be online first, before any user joins the system.

## Limitations - 
    * if same user logs in multiple windows, user connection data is not persisted.
    

