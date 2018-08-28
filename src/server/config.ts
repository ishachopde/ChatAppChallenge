/*
 * Configuration file for easy deployment.
 * @author  Isha CHopde
 */

var config = {
    'development': {
        'appConfig': {
            'port': '3000'
        },
        'dbConfig': {
            'dbUrl': '',
            'dbType': ''
        },
        'connectionString': "mongodb://localhost/node-mongo-registration-login-api",
        'secret': "THIS IS USED TO SIGN AND VERIFY JWT TOKENS, REPLACE IT WITH YOUR OWN SECRET, IT CAN BE ANY STRING"
    },
    'testing': {

    },
    'production': {

    },
};


var env = process.env.NODE_ENV || "development";
export default config[env];