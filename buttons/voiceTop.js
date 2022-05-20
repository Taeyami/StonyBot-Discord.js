
const { MessageActionRow, MessageButton, MessageEmbed, MessageAttachment } = require('discord.js');

const dataBase = require('nippy.db');

const ms = dataBase('./data/message.sqlite')

const vc = dataBase('./data/voice.sqlite')

const cn = dataBase('./data/coin.sqlite')

const moment = require('moment');

module.exports = {
	name: 'voiceTop',
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
		if (interaction.isButton() && interaction.customId == "voiceTop") {

        let dataVoice = vc.get(`${interaction.guild.id}`) || [0];

        const topVoice = Object.keys(dataVoice).map(id => {
            return {
                userID: id,
                data: Object.values(dataVoice[id].channel || {}).reduce((a, b) => a + b, 0)
            }
        }).sort((a, b) => b.data - a.data).slice(0, 10).map((data, index) => `**#${index + 1}. ${interaction.guild.members.cache.get(data.userID)}: **${moment.duration(data.data).format("d [day], h [hr]")} \n\ `).join(" ")

        const row = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setCustomId('coinsTop')
                    .setLabel('Coins')
                    .setStyle('SECONDARY'),
                new MessageButton()
                    .setCustomId('messageTop')
                    .setLabel(`Messages`)
                    .setStyle('SECONDARY'),
                new MessageButton()
                    .setCustomId('deleteMessage')
                    .setEmoji('973656470526758932') 
                    .setStyle('DANGER'),
            )

        const test = Object.keys(dataVoice).map(id => {
            return {
                userID: id,
                data: Object.values(dataVoice[id].channel || {}).reduce((a, b) => a + b, 0)
            }
        }).sort((a, b) => b.data - a.data)

        let yourData = []

        for (var i = test.length - 1; i >= 0; i--) {
            if (test[i].userID === interaction.member.id) {
                yourData.push(test[i], i + 1)
            }
        }
     
        if (yourData.length === 0) {
            yourData.push({ userID:interaction.member.id, data: 0 }, test.length + 1)
        }



        const embed = new MessageEmbed()
            .setColor(`2f3136`)
            .setTitle(`**Voice | Top 10**`)
            .setDescription(`${topVoice} ⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯ \n\ **#${yourData[1]}.** <@${yourData[0].userID}>**:** ${moment.duration(yourData[0].data).format("d [day], h [hr]")}` )
            .setFooter({
                text:`${interaction.message.guild.name}`,
                iconURL: interaction.message.guild.iconURL()
            })


        interaction.message.edit({ embeds: [embed], components: [row] })

        interaction.deferUpdate()
		}
	},
};
