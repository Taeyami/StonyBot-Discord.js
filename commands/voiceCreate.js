
const dataBase = require('nippy.db');

const pr = dataBase('./data/privateRoom.sqlite')

const { MessageActionRow, MessageButton, Discord, MessageEmbed } = require('discord.js');

module.exports = {
	name: 'voice',
	description: 'Just a test command',
	aliases: [],
	usage: '',
	guildOnly: false,
	args: false,
	permissions: {
		bot: [],
		user: [],
	},
	execute: (message, args, client) => {

        function getLimit() {
            if (args[0] === undefined) {
                return 0;
            } else {
                return parseInt(args[0]);
            }
        }

        let dataPrivat = pr.get(`${message.guild.id}`) || undefined;

        const category = message.guild.channels.cache.find(c => c.name === "Privat Rooms" && c.type === "GUILD_CATEGORY");

        const channel = message.guild.channels.cache.find(c => c.name === "Create room [+]" && c.type === "GUILD_VOICE" && c.userLimit === getLimit());

        if (category === undefined) {
            message.guild.channels.create('Privat Rooms', {
                type: 'GUILD_CATEGORY',
                permissionOverwrites: [
                  {
                      id: message.guild.id,
                      allow: ['VIEW_CHANNEL'],
                  }]
              }).then(cat => {
                message.guild.channels.create('Create room [+]', {
                    userLimit: getLimit(),
                    type: 'GUILD_VOICE',
                    parent: cat,
                    permissionOverwrites: [
                        {
                            id: message.guild.id,
                            allow: ['VIEW_CHANNEL'],
                        }]
                    })
              })
        } else {
            if (channel === undefined) {
                message.guild.channels.create('Create room [+]', {
                    userLimit: getLimit(),
                    type: 'GUILD_VOICE',
                    parent: category,
                    permissionOverwrites: [
                        {
                            id: message.guild.id,
                            allow: ['VIEW_CHANNEL'],
                        }]
                    })
            } else {
                const errorEmbed = new MessageEmbed()
                    .setColor("RED")
                    .setDescription(`ERROR`);
                message.channel.send({ embeds: [errorEmbed] })  
                return;
            }            
        }

        function save() {
            let data = getLimit()
            const category = message.guild.channels.cache.find(c => c.name === "Privat Rooms" && c.type === "GUILD_CATEGORY");
    
            const channel = message.guild.channels.cache.find(c => c.name === "Create room [+]" && c.type === "GUILD_VOICE" && c.userLimit === getLimit());
            if (dataPrivat === undefined) {
                pr.set(`${message.guild.id}.category`, `${category.id}`)
                pr.set(`${message.guild.id}.${data}`, `${channel.id}`)  
            } else {
               pr.set(`${message.guild.id}.${data}`, `${channel.id}`)  
            } 
  
            const voiceEmbed = new MessageEmbed()
                .setColor("GREEN")
                .setDescription(`✅ Категория создана`);
            message.channel.send({ embeds: [voiceEmbed] })               
        }

        setTimeout(save, 1000)

//    pr.push(`${message.guild.id}.channel`, channel.id) 
        //function getLimit() {
        //    if (args[0] === undefined) {
        //        return 0;
        //    } else return args[0];
        //}
//
        //let dataPrivat = pr.get(`${message.guild.id}`) || undefined;
//
        //const category = message.guild.channels.cache.find(c => c.name === "Privat Rooms" && c.type === "GUILD_CATEGORY");
//
        //const channel = message.guild.channels.cache.find(c => c.name === "Create room [+]" && c.type === "GUILD_VOICE" && c.userLimit === getLimit());
//
        //function save() {
//
        //    if (dataPrivat === undefined) {
        //        pr.set(`${message.guild.id}`,{  category: `${category.id}`, channel: [`${channel.id}`]}) 
        //    } else {
        //        pr.set(`${message.guild.id}`,{  category: `${category.id}`, channel: [`${channel.id}`]}) 
        //    } 
//
        //    const voiceEmbed = new MessageEmbed()
        //        .setColor("GREEN")
        //        .setDescription(`✅ Категория создана`);
        //    message.channel.send({ embeds: [voiceEmbed] }) 
        //}
//
//
        //if (dataPrivat === undefined) {
        //    message.guild.channels.create('Privat Rooms', {
        //        type: 'GUILD_CATEGORY',
        //        permissionOverwrites: [
        //          {
        //              id: message.guild.id,
        //              allow: ['VIEW_CHANNEL'],
        //          }]
        //      }).then(cat => {
        //        message.guild.channels.create('Create room [+]', {
        //            userLimit: getLimit(),
        //            type: 'GUILD_VOICE',
        //            parent: cat,
        //            permissionOverwrites: [
        //                {
        //                    id: message.guild.id,
        //                    allow: ['VIEW_CHANNEL'],
        //                }]
        //            })
        //      })
        //} else {
        //    if (channel === undefined) {
//
        //        message.guild.channels.create('Create room [+]', {
        //            userLimit: getLimit(),
        //            type: 'GUILD_VOICE',
        //            parent: category,
        //            permissionOverwrites: [
        //                {
        //                    id: message.guild.id,
        //                    allow: ['VIEW_CHANNEL'],
        //                }]
        //            })
        //    } else {
        //        const errorEmbed = new MessageEmbed()
        //            .setColor("RED")
        //            .setDescription(`ERROR`);
        //        message.channel.send({ embeds: [errorEmbed] })  
        //        return;
        //    }
        //}
//
        //setTimeout(save(), 1000);
	},
};
