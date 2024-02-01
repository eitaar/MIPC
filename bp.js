const { SlashCommandBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder} = require("discord.js");
const { bestprice } = require("/home/runner/MIPC-with-db/db.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName('bestprice')
    .setDescription('選択されたアイテムの最安値を表示します。')
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
    const item = interaction.options.getString('item');
    const next = new ButtonBuilder()
      .setCustomId('next')
      .setLabel('次のショップ')
      .setEmoji('➡️')
      .setStyle(ButtonStyle.Primary);
    const button = new ActionRowBuilder()
      .addComponents(next);

    try {
      const bp = await bestprice(item, 1, 1);
      const reply = await interaction.reply({
        components: [button],
        embeds: [bp],
        ephemeral: true
      });

      const filter = i => i.customId === 'next' && i.user.id === interaction.user.id;

      try {
        const click = await reply.awaitMessageComponent({ filter: filter, time: 60_000 });

        await click.deferUpdate();
        
        if (click.customId === 'next') {
          const nbp = await bestprice(item, 2, 1);
          await reply.edit({
            embeds: [nbp]
          });
        }
      } catch (err) {
        console.log(err);
        interaction.editReply({
          content: 'timeout',
          ephemeral: true
        });
      }
    } catch (err) {
      console.log(err);
      await interaction.reply({
        content: `${item}は存在しません。`,
        ephemeral: true
      });
    }
  }
};
