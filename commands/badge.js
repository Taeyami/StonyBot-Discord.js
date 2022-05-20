
const { MessageEmbed } = require('discord.js');

const moment = require('moment');

let badges = require('../utils/badges.json');

module.exports = {
	name: 'badge',
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
		let zaebis_glavnoe_rabotaet = message.mentions.users.first() || message.guild.members.cache.get(args[0]) || message.author;
		let member = zaebis_glavnoe_rabotaet

		const embed = new MessageEmbed()
		    .setColor("2f3136")
		    .setAuthor(`${member.username}'s Open badge shop`)
		    .setFooter(`Badge shop on ${message.guild.name}`, message.guild.iconURL())
			.addFields({
				name: `**Badges**`,
		        value: `${badges}`
			})

		message.channel.send({ embeds: [embed] })
	},
};
