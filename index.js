const fs = require("fs");

require('dotenv').config()

const Discord = require('discord.js')

const { Client, Intents, Collection } = require("discord.js");

const client = new Client({ intents: new Discord.Intents(32767) });

client.commands = new Collection();
client.buttons = new Collection();
client.aliases = new Collection();
client.interactions = new Collection();

fs.readdir("./commands/", async (err, files) => {
  const commandHandler = require("./handler/commandHandler");
  await commandHandler(err, files, client);
});

fs.readdir("./events/", (err, files) => {
  const eventHandler = require("./handler/eventHandler");
  eventHandler(err, files, client);
});

fs.readdir("./buttons/", (err, files) => {
  const buttonsHandler = require("./handler/buttonsHandler");
  buttonsHandler(err, files, client);
});

client.login(process.env.TOKEN);
