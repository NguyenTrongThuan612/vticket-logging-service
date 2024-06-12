const SystemLog = require("../models/system_log")

const save_system_log = (data) => {
    try {
        const new_log = new SystemLog(
            {
                logContent: data
            }
        )
        new_log.save()
    }
    catch(err)
    {
        console.log(err)
    }
}

module.exports = {
    save_system_log
}