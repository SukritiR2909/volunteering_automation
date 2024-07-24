import winston from 'winston';

export class LoggerFile {
  private static instance: winston.Logger;
  private logger: winston.Logger;

  private constructor() {
    this.logger = winston.createLogger({
      level: 'info',
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple(),
      ),
      transports: [
        new winston.transports.Console(),
        // Add other transports as needed, e.g., log to a file
        // new winston.transports.File({ filename: 'test.log' })
      ],
    });
  }

  public static getInstance(): winston.Logger {
    if (!LoggerFile.instance) {
        LoggerFile.instance = new LoggerFile().logger;
    }
    return LoggerFile.instance;
  }
}