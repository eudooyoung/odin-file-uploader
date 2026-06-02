import config from "./config/env.config.js";
import { createServer } from "./server.js";

const server = createServer();

server.listen(config.port, (error) => {
  if (error) {
    console.error(error);
  }
  console.log(`App listening on port ${config.port} `);
});
