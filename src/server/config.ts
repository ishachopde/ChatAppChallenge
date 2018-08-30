/*
 * Configuration file for easy deployment.
 * @author  Isha CHopde
 */

const config = {
    development: {
        appConfig: {
            port: "3000",
        },
        dbConfig: {
            dbUrl: "",
            dbType: "",
        },
        connectionString: "mongodb://localhost/node-mongo-registration-login-api",
        secret: "THIS IS ISHA CHOPDE'S SECRET ;-)",
    },
    testing: {

    },
    production: {

    },
};

const env = process.env.NODE_ENV || "development";
export default config[env];
