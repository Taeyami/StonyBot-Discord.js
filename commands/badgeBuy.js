
const { MessageEmbed } = require('discord.js');

const dataBase = require('nippy.db');

const cn = dataBase('./data/coin.sqlite')

const bg = dataBase('./data/badge.sqlite')

const moment = require('moment');

let badges = require('../utils/badges.json');

module.exports = {
	name: 'badgebuy',
	description: 'Just a test command',
	aliases: [],
	usage: '',
	guildOnly: false,
	args: true,
	permissions: {
		bot: [],
		user: [],
	},
	execute: (message, args, client) => {

		let userCoins = cn.get(`${message.guild.id}.${message.member.id}.coins`) || 0;

		let userBadge = bg.get(`${message.guild.id}.${message.author.id}.badges`) || `none`;

		if (userCoins >= 0) {
			if (badges.includes(args[0])) {
				if (!userBadge.includes(args[0])) {
					bg.push(`${message.guild.id}.${message.author.id}.badges`, args[0])
					const embed = new MessageEmbed()
            		    .setColor("GREEN")
            		    .setDescription(`✅ You bought ${args[0]}`);
            		message.channel.send({ embeds: [embed] });	
				} else {
					const embed = new MessageEmbed()
            		    .setColor("RED")
            		    .setDescription(`❌ You already have this badge`);
            		message.channel.send({ embeds: [embed] });					
				}		
			} else {
				const embed = new MessageEmbed()
            	    .setColor("RED")
            	    .setDescription(`❌ Wrong arg`);
            	message.channel.send({ embeds: [embed] });
			}
		} else {
			const embed = new MessageEmbed()
                .setColor("RED")
                .setDescription(`❌ You need more coins`);
            message.channel.send({ embeds: [embed] });
		}


	},
};
