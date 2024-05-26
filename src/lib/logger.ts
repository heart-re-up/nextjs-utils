import { createLogger, format, transports } from "winston";
// import BrowserConsole from "winston-transport-browserconsole";
// import { isClient } from "./env";

// const consoleTransport = new transports.Console({
//   level: "info",
//   handleExceptions: false,
//   // json: true,
//   // colorize: true,
//   format: format.printf((i) => `${i.message}`),
// });

// const browserTransport = new BrowserConsole({
//   format: format.simple(),
//   level: "debug",
// });

// const logger = createLogger({
//   level: "debug",
//   format: format.combine(
//     format.timestamp({
//       format: "YYYY-MM-DD HH:mm:ss",
//     }),
//     format.errors({ stack: true }),
//     format.splat(),
//     format.json(),
//   ),
//   defaultMeta: { service: "nextjs-utils" },
//   // transports: [consoleTransport],
// });
const logger = createLogger({
  level: "info",
  format: format.json(),
  // transports: [new transports.Console()],
});
export default logger;
