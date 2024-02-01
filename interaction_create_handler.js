const Discord = require("discord.js");
/**
 * インタラクション受信時の処理
 */
exports.call = async function(client) {
  client.on("interactionCreate", async interaction => {

    // コマンド実行時
    if (interaction.type === Discord.InteractionType.ApplicationCommand) {

      // 指定されたコマンドが見つからなければ中断
      const command = client.commands.get(interaction.commandName);
      if (!command) return;
      // コマンドを実行する
      await command.execute(interaction, client);
    }
    
  });
}