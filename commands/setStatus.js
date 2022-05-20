
const { MessageEmbed } = require('discord.js');

const dataBase = require('nippy.db');

const st = dataBase('./data/status.sqlite')

module.exports = {
	name: 'status',
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

		let input = args.join(" ")

		let status = st.get(`${message.guild.id}.${message.author.id}.status`)

		if (input.length < 50) {
			if (1 > 0) {
				if (status !== input) {
					st.set(`${message.guild.id}.${message.author.id}.status`, `${input}`)
					const embed = new MessageEmbed()
            		    .setColor("GREEN")
            		    .setDescription(`✅ Status set`);
            		message.channel.send({ embeds: [embed] });	
				} else {
					const embed = new MessageEmbed()
            		    .setColor("RED")
            		    .setDescription(`❌ Its same status`);
            		message.channel.send({ embeds: [embed] });	
				}
			} else {
				message.delete()
				const embed = new MessageEmbed()
            	    .setColor("RED")
            	    .setDescription(`❌ Links is forbidden`);
            	message.channel.send({ embeds: [embed] });	
			}
		} else {
			const embed = new MessageEmbed()
                .setColor("RED")
                .setDescription(`❌ To much letters`);
            message.channel.send({ embeds: [embed] });	
		}
	},
};
