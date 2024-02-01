  const { SlashCommandBuilder } = require('@discordjs/builders');
  const { itemlist, deldata } = require('db.js');
  const { adminid } = process.env;

  module.exports = {
    data: new SlashCommandBuilder()
      .setName('deldata')
      .setDescription('指定されたアイテムのテーブル内の指定したデータを削除します。 (ownerロールがついてるアカウントでのみ実行可能)')
      .addStringOption(option =>
        option
          .setName('item')
          .setDescription('アイテムを検索するためのアイテム名を指定します')
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
      )
      .addIntegerOption(option =>
        option
          .setName('mre')
          .setDescription('削除するデータのmreを指定します')
          .setRequired(true)
      )
      .addStringOption(option =>
        option
          .setName('owner')
          .setDescription('削除するデータのownerを指定します')  
          .setRequired(true)
      ),
    async execute(interaction) {
      if (!interaction.member.roles.cache.has(adminid)) {
        return await interaction.reply({
          content: 'このコマンドはownerロールのあるアカウントでのみ実行可能です。',
          ephemeral: true
        });
      } 

      const item = interaction.options.getString('item');
      const getlist = await itemlist(0);

      try {
        if (!getlist.rows.map(row => row.tablename).includes(item)) {
          return await interaction.reply({
            content: `${item}が見つかりませんでした。`,
            ephemeral: true
          });
        }

        const owner = interaction.options.getString('owner'); 
        const mre = interaction.options.getInteger('mre'); 

        await deldata(item, mre, owner);
        await interaction.reply({
          content: `${item}のmre:${mre}\nowner:${owner}\nのデータを削除しました。`,
          ephemeral: true
        });
      } catch (err) {
        console.log(err);
        await interaction.reply({
          content: `${item}のmre:${mre}\nowner:${owner}\nのデータを削除できませんでした。`,
          ephemeral: true
        });
      }
    }
  };
