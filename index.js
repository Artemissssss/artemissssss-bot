const TelegramApi = require('node-telegram-bot-api')

const token = "5125423018:AAE0SKzZXz6W9VcbjIDf5k0rfNtpmMI2sHQ"

const bot = new TelegramApi(token, {polling:true})


const start = () => {
    bot.setMyCommands([
        {command:"/start", description:"Hello!"},
        {command:"/info", description:"About me"},
    ])
    let banWords = ['путин топ', "россия великая", "россия", "слава россии", "безмамный", "блять", "артем лох", "хз"]
    function forbiden(b){
for(let i = 0; i< banWords.length;i++){
    let a = b.toLowerCase()
    if(a.indexOf(banWords[i]) !== -1){
        return true;
    }
}
    }
    bot.on("message", async msg =>{
        const text = msg.text;
        const chatId = msg.chat.id;
        console.log(msg)
        if(msg.left_chat_participant !== undefined || msg.new_chat_participant !== undefined){
            var msgId = msg.message_id;
            bot.deleteMessage(chatId,msgId);
        }else if(text !== undefined && forbiden(text) == true){
            var msgId = msg.message_id;
            bot.deleteMessage(chatId,msgId);
        }
    })
}
start()