const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('🏓ポン！！'),
  async execute(interaction, client) {
      await interaction.reply({
      content: `Ping:${client.ws.ping}ms`,
       ephemeral: true
    });
  }
}
