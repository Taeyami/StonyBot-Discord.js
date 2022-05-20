
const { MessageAttachment, MessageActionRow, MessageButton, Discord, MessageEmbed } = require('discord.js');

const dataBase = require('nippy.db');

const gp = dataBase('./data/gamePlayer.sqlite')

module.exports = {
	name: 'profile',
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

		let profileData = gp.get(`${message.guild.id}.${message.author.id}.profile`)

		console.log(profileData)

		if (profileData === undefined || profileData === null) {
			let deckArr = []
			for (let i = 0; i < 16; i++) {
				let randomNum = Math.floor((Math.random() * 8) + 1);
   				deckArr.push(randomNum)
			}
			gp.set(`${message.guild.id}.${message.author.id}.profile`, { HP: "30", Defence: "5", Strength: "10", Energy: "3", Money: "100", Items: "", Deck:deckArr});
		}

        const embed = new MessageEmbed()
        	.addFields({
        		name:`${message.author.username}'s profile`,
        		value:`ok`
        	})
            .setColor("2f3136")
            .setFooter({
            	text:`${message.author.username} | Profile`,
            	iconURL: message.guild.iconURL()
            })
            .setImage('https://media.discordapp.net/attachments/875763456891060315/960626641363677224/unknown.png')
	
		message.channel.send({ embeds: [embed] });
	},
};
