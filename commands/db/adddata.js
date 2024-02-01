const { SlashCommandBuilder } = require('discord.js');
const { adddata, itemlist } = require('db.js');
const { adminid } = process.env;

module.exports = {
  data: new SlashCommandBuilder()
    .setName('adddata')
    .setDescription('選択したアイテムのテーブルにデータを追加します。 (ownerロールがついてるアカウントでのみ実行可能)')
    .addStringOption(option =>
      option
        .setName('item')
        .setDescription('アイテムを指定します')
        .setRequired(true)
        .addChoices(
          { name: 'test', value: 'test' },
          { name: 'beef_hotdog', value: 'beef_hotdog' },
          { name: 'pork_hotdog', value: 'pork_hotdog' },
          { name: 'chicken_hotdog', value: 'chicken_hotdog' },
          { name: 'rum_hotdog', value: 'rum_hotdog' },
          { name: 'lievre_hotdog', value: 'lievre_hotdog' },
          { name: 'healing_splash_potion', value: 'healing_splash_potion' },
          { name: 'regeneration_splash_potion', value: 'regeneration_splash_potion' },
          { name: 'strength_splash_potion', value: 'strength_splash_potion' },
          { name: 'speed_splash_potion', value: 'speed_splash_potion' }
        )
    )

    .addIntegerOption(option =>
      option
        .setName('mre')
        .setDescription('mreを指定します')
        .setRequired(true)
    )

    .addIntegerOption(option =>
      option
        .setName('price')
        .setDescription('値段を指定します')
        .setRequired(true)
    )

    .addStringOption(option =>
      option
        .setName('owner')
        .setDescription('オーナーを指定します')
        .setRequired(true)
    ),

  async execute(interaction) {
    const item = interaction.options.getString('item');
    if (!interaction.member.roles.cache.some(role => role.id === adminid)) {
      return interaction.reply({
        content: 'このコマンドはownerロールのあるアカウントでのみ実行可能です。',
        ephemeral: true
      });
    }

    const getlist = await itemlist(0);
    if (!getlist.rows.map(row => row.tablename).includes(item)) {
      return interaction.reply({
        content: `${item}が見つかりませんでした。`,
        ephemeral: true
      });
    }

    const getmre = interaction.options.getInteger('mre');
    const getprice = interaction.options.getInteger('price');
    const getowner = interaction.options.getString('owner');

    try {
      await adddata(item, getmre, getprice, getowner);
      await interaction.reply({
        content: `${item}のデータを追加しました。\nitem:${item}\nmre:${getmre}\nprice:${getprice}\nowner:${getowner}`,
        ephemeral: true
      });
    } catch (err) {
      console.log(err);
      await interaction.reply({
        content: `${item}のデータを追加できませんでした。`,
        ephemeral: true
      });
    }
  }
};
