const { dbuser, dbpassword, dburl } = process.env
const { bpembed, listembed, itemlistembed } = require('./embeds.js');
const { Pool } = require("pg")
const db = new Pool({
  user: dbuser,
  host: dburl,
  database: dbuser,
  password: dbpassword,
  port: 5432,
})

async function newitem(item) {
  query = `CREATE TABLE ${item} (mre int, price int, owner text)`;
  await db.query(query);
  return
}

async function delitem(item) {
  query = `DROP TABLE ${item}`;
  await db.query(query);
  return
}

async function itemlist(embed) {
  try {
    query = "select tablename from pg_tables where schemaname not in('pg_catalog','information_schema')order by tablename;"
    itemlist = await db.query(query)
    if (embed == 0) {
      return itemlist;
    } else {
      const items = itemlist.rows.map(row => row.tablename).join("\n");
      const ilembed = await itemlistembed(items);
      return ilembed;
    }
  } catch (error) {
    console.error(error);
    // Handle the error
  }
}


async function adddata(item, mre, price, owner) {
  query = `INSERT INTO ${item} (mre, price, owner) VALUES (${mre}, ${price}, '${owner}')`;
  await db.query(query);
}

async function bestprice(item, cn, embed) {
  query = `SELECT * FROM ${item} WHERE price = (SELECT MIN(price)FROM ${item});`;
  tmp = await db.query(query);
  query = `SELECT * FROM ${item} WHERE ${tmp.rows[0].price} = price`;
  gbp = await db.query(query);
  let res = [[gbp.rowCount]];
  //only one item
  if (gbp.rowCount == 1) {
    if (embed == 0) {
      res.push([gbp.rows[0].mre, gbp.rows[0].price, gbp.rows[0].owner]);
      return res;
    } else {
      const bpe = await bpembed(item, gbp.rows[0].mre, gbp.rows[0].price, gbp.rows[0].owner, 1, 1);
      return bpe;
    }
    //more than one
  } else {
    for (i = 0; i < gbp.rowCount; i++) {
      put = [gbp.rows[i].mre, gbp.rows[i].price, gbp.rows[i].owner];
      res.push(put);
      if (embed == 0) {
        return res;
      } else {
        const bpe = await bpembed(item, gbp.rows[cn].mre, gbp.rows[cn].price, gbp.rows[cn].owner, cn, gbp.rowCount);
        return bpe;
    }
  }
}}

async function deldata(item, mre, owner) {
  query = `DELETE FROM ${item} WHERE mre = ${mre} AND owner = '${owner}'`;
  await db.query(query);
}
async function list(item, embed) {
  query = `SELECT * FROM ${item} ORDER BY price ASC;`;
  list = await db.query(query);
  if (embed == 0) {
    return list;
  } else {
    let slist = "\n"
    for (let i = 0; i < list.rowCount; i++) {
      slist = `${slist} ${i + 1} **owner:** ${list.rows[i].owner} **ID:** ${list.rows[i].mre} **price:** ${list.rows[i].price}\n\n`;
    }
    const glistembed = await listembed(item, slist);
    return glistembed;
  }
}


module.exports = {
  newitem, delitem, itemlist, adddata, bestprice, list, deldata

}