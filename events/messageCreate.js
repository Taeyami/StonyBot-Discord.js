const { MessageEmbed } = require("discord.js");

const { prefix } = require("../utils/config.json");

const dataBase = require('nippy.db');

const ms = dataBase('./data/message.sqlite')

module.exports = {
  event: "messageCreate",
  execute: async (message, client) => {

    ms.add(`${message.guild.id}.${message.author.id}.channel.${message.channel.id}`, 1);

    let dataMessage = ms.get(`${message.guild.id}.${message.author.id}.channel`) || [ 0 ];

    let messageData = Object.keys(dataMessage).map(id => {
        return {
            channelID: id,
            totalMessage: dataMessage[id]
        }
    }).sort((a, b) => b.totalMessage - a.totalMessage);

    let totalMessage = messageData.filter(data => (Date.now())).reduce((a, b) => a + b.totalMessage, 0);


    let constant = 100;
    while (totalMessage >= constant) {
      constant *= 2;
    }

    if (totalMessage === constant) { cn.add(`${oldState.guild.id}.${oldState.id}.coins`, Math.floor(Math.random() * 100) + 1) }




    const args = message.content.slice(prefix.length).split(/ +/);
    const commandName = args.shift().toLowerCase();
    const command =
      client.commands.get(commandName) ||
      client.commands.find(
        (cmd) => cmd.aliases && cmd.aliases.includes(commandName)
      );

    if (!command) return;

    if (command.guildOnly && message.channel.type !== "text") {
      return message.reply("I can't execute that command inside DMs!");
    }

    if (command.args && !args.length) {
      let reply = `You didn't provide any arguments, ${message.author}!`;
      if (command.usage) {
        reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
      }
      return message.channel.send(reply);
    }

    try {
      command.execute(message, args, client);
    } catch (error) {
      console.error(error);
      message.reply("There was an error trying to execute that command!");
    }

    if (!message.content.startsWith(prefix) || message.author.bot) return;
    
  },
};
