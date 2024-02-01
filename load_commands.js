const fs = require("fs");
const Discord = require("discord.js");
const commandFolders = fs.readdirSync("./commands");

/**
 * スラッシュコマンド読み込み処理
 */
exports.start = async function(client) {
  client.commands = new Discord.Collection();
  console.log("スラッシュコマンドの読み込み処理を開始します。")
  // commandsフォルダの中のサブフォルダを読み込む
  for (const folder of commandFolders) {
    const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith(".js"));
    console.log(`===== ${folder} =====`);
    // サブフォルダの中から1ファイルずつ処理する
    for (const file of commandFiles) {
      const command = require(`../commands/${folder}/${file}`);
      try {
        // コマンド登録処理
        await client.commands.set(command.data.name, command);
        console.log(`${command.data.name}が読み込まれました。`);
      } catch (error) {
        console.log(error);
      }
    }
  }
  // 処理完了
  console.log("---------------");
  console.log("スラッシュコマンドの読み込み処理が完了しました。\n Bot is Ready!!");
}