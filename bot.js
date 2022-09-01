const Telegraf = require('telegraf');

const bot = new Telegraf('');

// Documentation link
// https://telegraf.js.org/index.html

// Telegraf provide a wrapper method of the actual Telegram method which sometime requires a lot more information need
// Wrap to Telegram actual method: https://telegraf.js.org/interfaces/Scenes.WizardContext.html#reply


// Call when user interact with a bot with any type of updates\
// Middleware handles the flow of the program knowing which function to call when a text is passed.
// This is shown best with next command.
bot.use((ctx, next) =>{
    logger(ctx);

    // Example of Telegraf wrapper
    // ctx.reply("Use bot.", {
    //     parse_mode: "Markdown",
    //     disable_notification: true
    // });

    // bot.telegram.sendMessage(ctx.char.id, "Use bot.", {
    //     parse_mode: "Markdown",
    //     disable_notification: true
    // })

    // a 'state' is a portion of ctx that we can modify to add extra information.
    ctx.state.nameOfInfo = "practice state";
    next(ctx);
})

bot.command("image", (ctx) => {
    // console.log("Chat ID: " + ctx.update.message.message_id);
    // // console.log(ctx);
    // bot.telegram.pinChatMessage(ctx.chat.id, ctx.update.message.message_id + 1);


    // Response with an image then pin it!!
    bot.telegram.sendPhoto(ctx.chat.id, "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg", {
        caption:"Silhouette of beatiful tree from Pixabay.com."
    }).then((m) =>{
        bot.telegram.pinChatMessage(ctx.chat.id, m.message_id);
    });
    
    
    // console.log(id.pinChatMessage());
    // bot.telegram.pinChatMessage(ctx.chat.id, id);
})

// Handle '/start' command
bot.start((ctx) => {
    ctx.reply("You have enter start command.");
    ctx.reply(ctx.state.nameOfInfo);
})

// Handle '/help' command
bot.help((ctx) =>{
    ctx.reply("You have enter help command.");
})

// Handle '/settings' command
bot.settings((ctx) => {
    ctx.reply("You have enter setting command.");
})

// Create new commands using command() function
bot.command(["test", "Test"], (ctx) => {
    ctx.reply("Hello world.");
});

// Operate text messages
// For this to work in group chat, we need to disable group privacy in botFather
bot.hears(["cat", "Cat"], (ctx) =>{
    ctx.reply("Meow");
})

// Handle types of message passed
// bot.on("text", (ctx) =>{
//     ctx.reply("This is text.");
// })

bot.on("sticker", (ctx) =>{
    ctx.reply("This is sticker.");
})


// Other Methods
bot.mention("hackathon", (ctx) =>{
    ctx.reply("mention something");
})

bot.hashtag("hash", (ctx) =>{
    ctx.reply("there's a hashtage");
})

bot.phone("+1 604 726-4992", (ctx) =>{
    ctx.reply("there's a phone number");
})

// Logger system - alert when user uses our bot
function logger(ctx){
    console.log("Someone uses your bot.");
}
bot.launch();   // run the bot and getting updates
