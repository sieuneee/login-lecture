const {createLogger, transports, format} = require("winston");
const {combine, timestamp, label, printf, simple, colorize} = format;

const printFormat = printf(({timestamp, label, level, message})=>{
    return `${timestamp} [${label}] ${level} : ${message}`;
});

const printLogFormat = {
    file: combine(
        label({
            label: "백엔드"
        }),
        timestamp({
            format: "YYYY-MM-DD HH:mm:dd"
        }),
        printFormat
    ),
    console: combine(
        colorize(),
        simple(),
    )
}

const opts = {
    file: new transports.File({
        filename: "access.log",
        dirname: "./logs",
        level: "info",
        format: printLogFormat.file,
    }), //파일로 로그 저장
    console: new transports.Console({
        level: "info",
        format: printLogFormat.console,
    }), //콘솔에 로그 출력
}

const logger = createLogger({
    transports: [opts.file],
});

if(process.env.NODE_ENV !== "production"){
    logger.add(opts.console)
}

logger.stream = {
    write: (message) => logger.info(message),
}

module.exports = logger;