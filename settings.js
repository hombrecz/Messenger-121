const settings = {
    mongo: {
        address: process.env.MONGO_ADDRESS
    },
    server: {
        port: process.env.SERVER_PORT
    }
};
// const settings = {
//   mongo: {
//     address: 'mongodb://localhost/messenger-121-db'
//   },
//   server: {
//     port: 3000
//   }
// };

module.exports = settings;