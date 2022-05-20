
const { MessageActionRow, MessageButton, MessageEmbed, MessageAttachment } = require('discord.js');

const dataBase = require('nippy.db');

const ms = dataBase('./data/message.sqlite')

const vc = dataBase('./data/voice.sqlite')

const cn = dataBase('./data/coin.sqlite')

const moment = require('moment');

module.exports = {
	name: 'Previous',
	description: 'Just a test command',
	aliases: [],
	usage: '',
	guildOnly: false,
	args: false,
	permissions: {
		bot: [],
		user: [],
	},
	execute: (interaction, args, client) => {
		if (interaction.isButton() && interaction.customId == "Previous") {

			let dataMessage = ms.get(`${interaction.guild.id}`) || {};
		
    		let dataVoice = vc.get(`${interaction.guild.id}`) || {};
		
    		let dataCoins = cn.get(`${interaction.guild.id}`) || {};
		
		
    		const topMessagee = Object.keys(dataMessage).map(id => {
    		    return {
    		        userID: id,
    		        data: Object.values(dataMessage[id].channel || {}).reduce((a, b) => a + b, 0)
    		    }
    		}).sort((a, b) => b.data - a.data).slice(0, 10).map((data, index) => `**${index + 1}. ${interaction.guild.members.cache.get(data.userID)}:** ${data.data} message \n\ `)
    		
    		let topMessage = topMessagee.join(" ")
		
    		const topVoicee = Object.keys(dataVoice).map(id => {
    		    return {
    		        userID: id,
    		        data: Object.values(dataVoice[id].channel || {}).reduce((a, b) => a + b, 0)
    		    }
    		}).sort((a, b) => b.data - a.data).slice(0, 10).map((data, index) => `**${index + 1}. ${interaction.guild.members.cache.get(data.userID)}:** ${moment.duration(data.data).format("h [hours], m [minutes]")} \n\ `)
    		
    		let topVoice = topVoicee.join(" ")
		
    		const topCoinss = Object.keys(dataCoins).map(id => {
    		    return {
    		        userID: id,
    		        data: Object.values(dataCoins[id] || {}).reduce((a, b) => a + b, 0)
    		    }
    		}).sort((a, b) => b.data - a.data).slice(0, 10).map((data, index) => `**${index + 1}. ${interaction.guild.members.cache.get(data.userID)}:** ${data.data} coins \n\ `)
    		
    		let topCoins = topCoinss.join(" ")

			let pageNum = interaction.message.components[0].components[1].label.slice(0,-3) - 0
	
        	let embedNum = interaction.message.components[0].components[1].label.slice(0,-3) - 1
	
        	if (pageNum === 1) {
        	    pageNum += 3
        	    embedNum += 3
        	}
	
        	pageNum -= 1
        	embedNum -= 1
	
	
        	const row = new MessageActionRow()
        	    .addComponents(
        	        new MessageButton()
        	            .setCustomId('Previous')
        	            .setEmoji('909282764291977226')
        	            .setStyle('PRIMARY'),
        	        new MessageButton()
        	            .setCustomId('Numbers')
        	            .setLabel(`${pageNum} / 3`)
        	            .setStyle('SECONDARY'),
        	        new MessageButton()
        	            .setCustomId('Next')
        	            .setEmoji('909282735112208424') 
        	            .setStyle('PRIMARY'),
        	    )
	
        	const embedMsg = new MessageEmbed()
        	    .setColor(`2f3136`)
        	    .setTitle(`**Message | Top 10**`)
        	    .setDescription(`${topMessage}` )
	
        	const embedVc = new MessageEmbed()
        	    .setColor(`2f3136`)
        	    .setTitle(`**Voice | Top 10**`)
        	    .setDescription(`${topVoice}` )
	
        	const embedCn = new MessageEmbed()
        	    .setColor(`2f3136`)
        	    .setTitle(`**Coins | Top 10**`)
        	    .setDescription(`${topCoins}` )
	
        	let embedsArray = []
	
        	embedsArray.push(embedMsg,embedVc,embedCn)
	
        	interaction.message.edit({ embeds: [embedsArray[embedNum]], components: [row] })

        	interaction.deferUpdate()
		}
	},
};
