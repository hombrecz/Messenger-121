// const settings = {
//   mongo: {
//     address: process.env.MONGO_ADDRESS
//   },
//   socketIo: {
//     port: process.env.SOCKET_IO_PORT,
//     address: process.env.SOCKET_IO_ADDRESS
//   },
//   server: {
//     port: process.env.SERVER_PORT
//   }
// };
const settings = {
  mongo: {
    address: 'mongodb://localhost/messenger-121-db'
  },
  socketIo: {
    port: 8383,
    address: 'http://localhost',
    server: 3000
  },
  server: {
    port: 3000
  }
};

module.exports = settings;