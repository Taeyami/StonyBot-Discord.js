
const { MessageActionRow, MessageButton, Discord, MessageEmbed, MessageSelectMenu } = require('discord.js');

const dataBase = require('nippy.db');

const ms = dataBase('./data/message.sqlite');

const vc = dataBase('./data/voice.sqlite');

const cn = dataBase('./data/coin.sqlite');

const moment = require('moment');

const mdf = require('moment-duration-format');

moment.locale('uk');

module.exports = {
	name: 'leaderboard',
	description: 'Just a test command',
	aliases: [`led`],
	usage: '',
	guildOnly: false,
	args: false,
	permissions: {
		bot: [],
		user: [],
	},
	execute: (message, args, client) => {

        const dataVoice = vc.get(`${message.guild.id}`) || [0];

        const topVoice = Object.keys(dataVoice).map(id => {
            return {
                userID: id,
                data: Object.values(dataVoice[id].channel || {}).reduce((a, b) => a + b, 0)
            }
        }).sort((a, b) => b.data - a.data).slice(0, 10).map((data, index) => `**#${index + 1}. ${message.guild.members.cache.get(data.userID)}: **${moment.duration(data.data).format("d [day], h [hr]")} \n\ `).join(" ")

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
            if (test[i].userID === message.author.id) {
                yourData.push(test[i], i + 1)
            }
        }

        if (yourData.length === 0) {
            yourData.push({ userID: message.author.id, data: 0 }, test.length + 1)
        }

        const embed = new MessageEmbed()
            .setColor(`2f3136`)
            .setTitle(`**Voice | Top 10**`)
            .setDescription(`${topVoice} ⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯ \n\ **#${yourData[1]}.** <@${yourData[0].userID}>**:** ${moment.duration(yourData[0].data).format("d [day], h [hr]")}` )
            .setFooter({
                text:`${message.guild.name}`,
                iconURL: message.guild.iconURL()
            })

        message.channel.send({ embeds: [embed], components: [row] })

	},
};
