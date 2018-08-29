/**
 * Create express server and initialises socket.io
 * @author  Isha CHopde
 */
import app from "./app";
import * as http from "http";
import config from "./config";
import * as socket from "socket.io";
import chatController from "./controllers/chatController";
import * as  socketioJwt from "socketio-jwt";
/**
 * Get port from environment and store in Express.
 */

const port = normalizePort(config.appConfig.port || "3000");
app.set("port", port);

/**
 * Create HTTP server.
 */
const server = http.createServer(app);
const io = socket(server);

io.use(socketioJwt.authorize({
    secret: config.secret,
    handshake: true,
}));

// set authorization for socket.io
io.on("connection", (socket) => {
    // Allow chat if socket is authenticated.
    new chatController().on(io, socket);
    socket.on("disconnect", () => {
        // When client disconnects.
    });
});

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on("error", onError);
server.on("listening", onListening);
console.log("Server running on port" + port);
/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
    var port = parseInt(val, 10);

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

    var bind = typeof port === "string" ?
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