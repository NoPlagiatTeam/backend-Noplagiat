const {format} = require ("date-fns");
const fs = require("fs");

const timestampToDate = (timestamp) => {
    const date = new Date(timestamp)
    return format(date,'yyy-MM-dd HH:mm:ss')
}

const directoryExist = (directory) => {
    if (!fs.existsSync(directory)) {
        fs.mkdirSync(directory, { recursive: true });
    }
}

module.exports = directoryExist