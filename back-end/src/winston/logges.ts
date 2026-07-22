import winston from "winston";

const { printf, combine, timestamp, colorize  } = winston.format;

const formatLogger = printf(({timestamp, level, message}) => {
    return `[${timestamp}] ${level}: ${message}`
})

const logger = winston.createLogger({
    level: "info",
    format: combine(
        timestamp(),
        formatLogger
    ),

    transports: [
        new winston.transports.Console({
            format: combine(
                colorize(),
                timestamp(),
                formatLogger
            )
        }),

        new winston.transports.File({
            filename: "logs/error.log",
            level: "error"
        }),

        new winston.transports.File({
            filename: "logs/combined.log"
        })
    ]
})

export default logger;