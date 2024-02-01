const { SlashCommandBuilder } = require("discord.js");
const {list} = require("db.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("list")
    .setDescription("選択されたアイテムのすべての登録された情報を表示します")
    .addStringOption(option =>
        option
            .setName('item')
            .setDescription('アイテムを指定します')
            .setRequired(true) 
            .addChoices(
              { name: 'test', value: 'test' },
              { name: 'beef_hotdog', value: 'beef_hotdog'},
              {name:  'pork_hotdog', value:'pork_hotdog'},
              {name: 'chicken_hotdog', value: 'chicken_hotdog'},
              {name: 'rum_hotdog', value: 'rum_hotdog'},
              {name: 'lievre_hotdog', value: 'lievre_hotdog'},
              {name: 'healing_splash_potion', value: 'healing_splash_potion'},
              {name: 'regeneration_splash_potion', value: 'regeneration_splash_potion'},
              {name: 'strength_splash_potion', value: 'strength_splash_potion'},
              {name: 'speed_splash_potion', value: 'speed_splash_potion'}
            )
    ),
  async execute(interaction) {
    const glist = await list(interaction.options.getString('item'), 1);
    await interaction.reply({
      embeds: [glist],
      ephemeral: true
    });
  },
};