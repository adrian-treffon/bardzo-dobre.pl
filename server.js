const app = require("./app");

app.set('port', process.env.NODE_PORT || 8080);

const server = app.listen(app.get("port"), () => {
  console.log(`Listening on port: ${server.address().port}`);
});