const { EmbedBuilder } = require('discord.js');

async function listembed(item, list) {
  const listembed = new EmbedBuilder()
    .setColor("Random")
    .setTitle(`${item}`)
    .setThumbnail("https://i.imgur.com/AfFp7pu.png")
    .setDescription(`List of place selling ${item}`)
    .setTimestamp()
    .setFooter({ text: 'Some information might be wrong or old.' })
    .addFields({ name: 'list', value: list });
  return listembed;
}

async function helpembed() {
  const helpembed = new EmbedBuilder()
    .setColor("Random")
    .setTitle('Help Menu')
    .setDescription('ver:1.0')
    .setTimestamp()
    .addFields({ name: 'コマンド一覧', value: "**/help** - この埋め込みを開きます\n**/bestprice <item>** - 選択されたアイテムの最安値を表示します\n**/itemlist** - このサービスに登録されているすべてのアイテムを表示します\n**/list <item>** - 選択されたアイテムの登録されたすべての情報を表示します\n**/ping** - 🏓ポン！！" });
  return helpembed;
}
async function itemlistembed(items) {
  const itemlistembed = new EmbedBuilder()
    .setColor("Random")
    .setTitle('List of Item availible')
    .setDescription('some information might be wrong or old')
    .setTimestamp()
    .addFields({ name: 'List of Items', value: items });
  return itemlistembed;
}

async function bpembed(item, mre, price, owner, cn, tn) {
  const bpembed = new EmbedBuilder()
    .setColor("Random")
    .setThumbnail('https://i.imgur.com/AfFp7pu.png')
    .setTitle(`${item} の最安値: ${price}円`)
    .setDescription(`${cn}/${tn}`)
    .setTimestamp()
    .addFields({ name: "futher information", value: `\n**mre**:${mre}\n\n**Owner:**${owner}\n\n**Price:**${price}円` },
      { name: '\u200B', value: '\u200B' },
      { name: 'Command', value: `\`\`\`/mre tp ${mre} \`\`\`` })
    .setFooter({ text: 'これらの情報は古いまたは間違っている可能性があります' });

  return bpembed;
}



module.exports = {
  listembed, helpembed, itemlistembed, bpembed
}