const { SlashCommandBuilder } = require("discord.js");
const {helpembed} = require("../../embeds.js");

module.exports = {
  data: new SlashCommandBuilder()
  .setName('help')
  .setDescription('ヘルプメニューを表示します。'),
  async execute(interaction) {
    const hembed = await helpembed();
    await interaction.reply({
      embeds: [hembed],
      ephemeral: true
    });
  }
}
