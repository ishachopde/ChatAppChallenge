/**
 * Create express server and initialises socket.io
 * @author  Isha CHopde
 */
import app from "./app";
import * as http from "http";
import config from "./config";
import * as socket from "socket.io";
import ChatController from "./controllers/chatController";
import * as  socketioJwt from "socketio-jwt";

/**
 * Get port from environment and store in Express.
 */
const port = normalizePort(process.env.PORT || config.appConfig.port || "3000");
app.set("port", port);

/**
 * Create HTTP server.
 */
const server = http.createServer(app);
const io = socket(server);

// Using socketJwt authorize the socket connection.
// set authorization for socket.io
io.use(socketioJwt.authorize({
    secret: config.secret,
    handshake: true,
}));

// On Socket Connection.
io.on("connection", (socket) => {
    // Allow chat if socket is authenticated.
    const chatController = new ChatController();

    // Get User from decode Token provided by socketio-jwt.
    const user = socket.decoded_token.user;

    // Define all the listeners.
    chatController.on(io, socket, user);

    if (user) {
        // Connect user to the server.
        chatController.userConnected(socket, user);
    }

    socket.on("disconnect", () => {
        // When client disconnects.
        chatController.userDisconnected(socket, user);
    });
});

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on("error", onError);
server.on("listening", onListening);
console.log("\x1b[32m", "\n Server running on port" + port);
/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
    const port = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
    if (error.syscall !== "listen") {
        throw error;
    }

    const bind = typeof port === "string" ?
        "Pipe " + port :
        "Port " + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case "EACCES":
            console.error(bind + " requires elevated privileges");
            process.exit(1);
            break;
        case "EADDRINUSE":
            console.error(bind + " is already in use");
            process.exit(1);
            break;
        default:
            throw error;
    }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
    const addr = server.address();
    const bind = typeof addr === "string" ?
        "pipe " + addr :
        "port " + addr.port;
}
