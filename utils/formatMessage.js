const moment  = require('moment');

function formatMsg(username, msg){
    return {
        msg : msg,
        username : username,
        time : moment().format('h:mm a')
    }
}

module.exports = formatMsg;