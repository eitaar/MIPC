const { SlashCommandBuilder } = require("discord.js");
const { newitem, itemlist } = require("db.js");
const { adminid } = process.env;

module.exports = {
  data: new SlashCommandBuilder()
    .setName("newitem")
    .setDescription("入力したアイテム名のテーブルを追加します。 (ownerロールがついてるアカウントでのみ実行可能)")
    .addStringOption(option =>
      option
        .setName("item")
        .setDescription("アイテム名を指定します")
        .setRequired(true)
    ),
  
  async execute(interaction) {
    const item = interaction.options.getString("item");
    if (!interaction.member.roles.cache.some(role => role.id === adminid)) {
      return interaction.reply({
        content: "このコマンドはownerロールのあるアカウントでのみ実行可能です。",
        ephemeral: true
      });
    }
    const gilist = await itemlist(0);
    if (gilist.rows.map(row => row.tablename).includes(item)) {
      return interaction.reply({
        content: `${item}は既に登録されています。`,
        ephemeral: true
      });
    }
    try {
      await newitem(item);
      await interaction.reply({
        content: `${item}を登録しました。`,
        ephemeral: true
      });
    } catch (err) {
      console.log(err);
      await interaction.reply({
        content: `${item}を登録できませんでした。`,
        ephemeral: true
      });
    }
  }
}