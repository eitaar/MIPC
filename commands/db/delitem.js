const { SlashCommandBuilder } = require("discord.js");
const { delitem, itemlist } = require("/home/runner/MIPC-with-db/db.js");
const { adminid } = process.env;

module.exports = {
  data: new SlashCommandBuilder()
    .setName("delitem")
    .setDescription("入力したアイテムのテーブルを削除します。 (ownerロールがついてるアカウントでのみ実行可能)")
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
    if (!gilist.rows.map(row => row.tablename).includes(item)) {
      return interaction.reply({
        content: `${item}は登録されていません。`,
        ephemeral: true
      });
    }
    try {
      await delitem(item);
      await interaction.reply({
        content: `${item}を削除しました。`,
        ephemeral: true
      });
     } catch (err) {
      console.log(err);
      await interaction.reply({
        content: `${item}を削除できませんでした。`,
        ephemeral: true
      });
    }
  }
}
