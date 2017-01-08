Messenger 121
-------------
This is an example app for the Advanced Web Applications course. It is a simple chat build on MERN stack in isomorphic style (same application for client and server).

Application allows user to choose his chat name (by "Sign Up") and then send messages to any thread available. It is also possible to create new threads.

Used technologies:
- Node.js and Express.js for server
- Mongoose for connecting to MongoDB
- Socket.io for communication between server and client
- React.js and React Bootstrap for client layout

Possible enhancement would be using Redux for controlling state of client side. There is also a lot of room for various new functions.

Function, tha could be implemented:
- user authentication
- private threads restricted for invited users
- various small UI features
...etc.

Available:
    Github: https://github.com/hombrecz/Messenger-121
    Docker image: https://hub.docker.com/r/hombre/messenger-121/
    Online on Heroku: https://messenger-121.herokuapp.com/
    Apiary blueprint: http://docs.messenger121v1.apiary.io/

Run locally:
    - have running MongoDB instance
    - use npm commands:
        npm install
        npm run build
        npm run start (with ENV properies:
                            MONGODB_URI=<adress of your MongoDB>
                            PORT=<port on which the app will run & listen>
                      )
