const { MessageEmbed } = require('discord.js');

const dataBase = require('nippy.db');

const ms = dataBase('./data/message.sqlite');

const vc = dataBase('./data/voice.sqlite');

const cn = dataBase('./data/coin.sqlite');

const bg = dataBase('./data/badge.sqlite');

const pr = dataBase('./data/privateRoom.sqlite');

const st = dataBase('./data/status.sqlite');

const moment = require('moment');

const mdf = require('moment-duration-format');

moment.locale('uk');

module.exports = {
	name: 'me',
	description: 'Show youir statistic',
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

		console.log(message.author)

		// voice

		let dataVoice = vc.get(`${message.guild.id}.${member.id}.channel`) || [ 0 ];

		let voiceData = Object.keys(dataVoice).map(id => {
		    return {
		        channelID: id,
		        totalVoice: dataVoice[id]
		    }
		}).sort((a, b) => b.totalVoice - a.totalVoice);

		let totalVoice = voiceData.filter(data => (Date.now())).reduce((a, b) => a + b.totalVoice, 0);

		//messsages

		let dataMessage = ms.get(`${message.guild.id}.${member.id}.channel`) || [ 0 ];

		let messageData = Object.keys(dataMessage).map(id => {
		    return {
		        channelID: id,
		        totalMessage: dataMessage[id]
		    }
		}).sort((a, b) => b.totalMessage - a.totalMessage);

		let totalMessage = messageData.filter(data => (Date.now())).reduce((a, b) => a + b.totalMessage, 0);

		//coins

		let dataCoins = cn.get(`${message.guild.id}.${member.id}.coins`) || [ 0 ];

		//badge 

		let dataBadge = bg.get(`${message.guild.id}.${member.id}.badges`) || null;

		//status 

		let dataStatus = st.get(`${message.guild.id}.${member.id}.status`) || null;

		// privat rooms
		
		let channelid = pr.get(`${message.guild.id}.channel`)
		let rooms;
		let topVoice = voiceData[0].totalVoice ? voiceData[0].channelID : null
		if (topVoice == 'privatRooms') {
			rooms = `<#${channelid}>` || '**Voice Channel:**'
		} else {
			rooms = voiceData[0].totalVoice ? `<#${voiceData[0].channelID}>` : '**Voice Channel:**'
		}

		let i = voiceData.length
		while (i > 0) {
			i--;
			if (!client.channels.cache.has(voiceData[i].channelID)) {
				if (voiceData[i].channelID !== 'privatRooms') {
					vc.add(`${message.guild.id}.${member.id}.channel.privatRooms`, voiceData[i].totalVoice) 
					vc.delete(`${message.guild.id}.${member.id}.channel.${voiceData[i].channelID}`) 
				}
			}
		}

		// send message

		const embed = new MessageEmbed()
		    .setColor("2f3136")
		    .setThumbnail(member.avatarURL({ dynamic: true }))
			.setDescription(`${dataStatus ? `${dataStatus}` : ''}`)
			.addFields({
		        name: `**All stats**`,
		        value: `**Chat:** ${totalMessage} message \n\ **Voice:** ${moment.duration(totalVoice).format("H [Hour], mm [minutes]")} \n\ **Coins:** ${dataCoins} Stones`,
		        inline: true
		      }, {
		        name: `**Channel stats**`,
		        value: `${messageData[0].totalMessage ? `<#${messageData[0].channelID}>` : "**Text Channel:**"} ${messageData[0] ? messageData[0].totalMessage : 0} message \n\ ${rooms} ${voiceData[0] ? moment.duration(voiceData[0].totalVoice).format("h [hours], m [minutes]") : '0 minutes'}`,
		        inline: true
		      }
			)
			.addFields({
				name: `**Badges**`,
		        value: `${dataBadge ? `${dataBadge}` : 'No badges'}`
			})
			.setAuthor({
				name: member.tag,
				iconURL: member.displayAvatarURL({dynamic:true , size :2048})
			})
			.setFooter({
				text:`Joined at ${moment(member.joinedAt).format("DD/MM/YYYY")}`,
				iconURL: message.guild.iconURL()
			})
		
		message.channel.send({ embeds: [embed] })
	}
};
