const { SlashCommandBuilder } = require('discord.js');
const { itemlist } = require('../../db.js')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('itemlist')
    .setDescription('このサービスに登録されているアイテムの一覧を表示します。'),
  
  async execute(interaction) {
    const glembed = await itemlist(1);
    await interaction.reply({
      embeds: [glembed],
      ephemeral: true
    });
  }
}