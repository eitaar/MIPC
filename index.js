const http = require('http');
const { bestprice } = require('./db.js');
const { token } = process.env;
const { Client, GatewayIntentBits } = require('discord.js');
const deploy_commands = require("./other/deploy-commands.js");
const interaction_create_handler = require("./other/interaction_create_handler.js");
const load_commands = require("./other/load_commands.js");

const bot = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMessages
    ]
});

interaction_create_handler.call(bot);
deploy_commands.start();

http.createServer(function (request, response) {
    response.writeHead(200, { 'Content-Type': 'text/plain' });
    response.end('Bot is online!');
}).listen(3000);

bot.on('ready', async () => {
    bot.user.setActivity('/help');
    load_commands.start(bot);
    bot.channels.cache.get('1174045804906938368').send('再起動');
});

bot.on('messageCreate', async (msg) => {
    if (msg.author.bot) return;
    if (msg.content.startsWith('!test')) {
        const item = msg.content.split(' ')[1];
        const get = await bestprice(item, 1, 0);
        const a = get[1][2];
        console.log(a);
        msg.channel.send(`mre: ${a}`);
    }
});

bot.login(token);
