import winston from "winston";
import winstonDaily from "winston-daily-rotate-file";

const formatMeta = (meta: any) => {
  const splat = meta[Symbol.for('splat')];
  if (splat && splat.length) {
    return splat.length === 1 ? JSON.stringify(splat[0]) : JSON.stringify(splat);
  }
  return '';
}

const customFormat = winston.format.printf(({
  timestamp,
  level,
  message,
  label = '',
  ...meta
}) => `[${timestamp}] ${level} ${label} ${message} ${formatMeta(meta)}`)

const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp({ format: "MMM D, YYYY HH:mm:ss.SSSZZ"}),
    customFormat,
  ),
  transports: [
    new winstonDaily({
      filename: "./logs/application-%DATE%.log",
      datePattern: "YYYY-MM-DD",
      zippedArchive: true,
      maxSize: "20m",
      maxFiles: "7d",
    }),
  ],
});

export default logger;
