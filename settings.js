const settings = {
    mongo: {
        address: process.env.MONGO_ADDRESS
    },
    server: {
        port: process.env.SERVER_PORT
    }
};

module.exports = settings;