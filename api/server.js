// Import app (Express with all routes defined)
const app = require("./app");

// Define the port we'll be exposing our API through.
const port = process.env.PORT || 8080;

// App initialization
app.listen(port, () => {
  console.log(`Server is listenning on ${port}! (http://localhost:${port})`);
});
