
const { MessageActionRow, MessageButton, MessageEmbed, MessageAttachment } = require('discord.js');

const dataBase = require('nippy.db');

const ms = dataBase('./data/message.sqlite')

const vc = dataBase('./data/voice.sqlite')

const cn = dataBase('./data/coin.sqlite')

const moment = require('moment');

module.exports = {
	name: 'messageTop',
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
		if (interaction.isButton() && interaction.customId == "messageTop") {

        let dataMessage = ms.get(`${interaction.guild.id}`) || [0];

        const topMessage = Object.keys(dataMessage).map(id => {
            return {
                userID: id,
                data: Object.values(dataMessage[id].channel || {}).reduce((a, b) => a + b, 0)
            }
        }).sort((a, b) => b.data - a.data).slice(0, 10).map((data, index) => `**#${index + 1}. ${interaction.guild.members.cache.get(data.userID)}:** ${data.data} Messages \n\ `).join(" ")

        const row = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setCustomId('voiceTop')
                    .setLabel('Voice')
                    .setStyle('SECONDARY'),
                new MessageButton()
                    .setCustomId('coinsTop')
                    .setLabel(`Coins`)
                    .setStyle('SECONDARY'),
                new MessageButton()
                    .setCustomId('deleteMessage')
                    .setEmoji('973656470526758932') 
                    .setStyle('DANGER'),
            )

        const test = Object.keys(dataMessage).map(id => {
            return {
                userID: id,
                data: Object.values(dataMessage[id].channel || {}).reduce((a, b) => a + b, 0)
            }
        }).sort((a, b) => b.data - a.data)

        let yourData = []

        for (var i = test.length - 1; i >= 0; i--) {
            if (test[i].userID === interaction.member.id) {
                yourData.push(test[i], i + 1)
            }
        }
     
        if (yourData.length === 0) {
            yourData.push({ userID: interaction.member.id, data: 0 }, test.length + 1)
        }

        const embed = new MessageEmbed()
            .setColor(`2f3136`)
            .setTitle(`**Messages | Top 10**`)
            .setDescription(`${topMessage} ⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯ \n\ **#${yourData[1]}.** <@${yourData[0].userID}>**:** ${yourData[0].data} Messages` )
            .setFooter({
                text:`${interaction.message.guild.name}`,
                iconURL: interaction.message.guild.iconURL()
            })


        interaction.message.edit({ embeds: [embed], components: [row] })

        interaction.deferUpdate()
		}
	},
};
