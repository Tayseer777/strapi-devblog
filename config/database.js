const path = require("path");

module.exports = ({ env }) => ({
  connection: {
    client: "sqlite",
    connection: {
      filename: path.join(
        __dirname,
        "..",
        env("DATABASE_FILENAME", ".tmp/data.db")
      ),
    },
    useNullAsDefault: true,
  },
});

// connection: {
//     client: "sqlite",
//     connection: {
//       filename: path.join(
//         __dirname,
//         "..",
//         env("DATABASE_FILENAME", ".tmp/data.db")
//       ),
//     },
//     useNullAsDefault: true,
//   },

//DATABASE=mongodb+srv://naffasyapp:aJf5gHLzbd8BJ7zR@cluster0.htjsslj.mongodb.net/test
// DATABASE_PASSWORD=aJf5gHLzbd8BJ7zR
