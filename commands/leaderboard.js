
const { MessageActionRow, MessageButton, Discord, MessageEmbed, MessageSelectMenu } = require('discord.js');

const dataBase = require('nippy.db');

const ms = dataBase('./data/message.sqlite')

const vc = dataBase('./data/voice.sqlite')

const cn = dataBase('./data/coin.sqlite')

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

        let dataVoice = vc.get(`${message.guild.id}`) || [0];

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








		//let dataMessage = ms.get(`${message.guild.id}`) || [0];
//
        //let dataVoice = vc.get(`${message.guild.id}`) || [0];
//
        //let dataCoins = cn.get(`${message.guild.id}`) || [0]
//
        //const topMessage = Object.keys(dataMessage).map(id => {
        //    return {
        //        userID: id,
        //        data: Object.values(dataMessage[id].channel || {}).reduce((a, b) => a + b, 0)
        //    }
        //}).sort((a, b) => b.data - a.data).slice(0, 10)
//
        //const topVoice = Object.keys(dataVoice).map(id => {
        //    return {
        //        userID: id,
        //        data: Object.values(dataVoice[id].channel || {}).reduce((a, b) => a + b, 0)
        //    }
        //}).sort((a, b) => b.data - a.data)
//
        //const topCoins = Object.keys(dataCoins).map(id => {
        //    return {
        //        userID: id,
        //        data: Object.values(dataCoins[id] || {}).reduce((a, b) => a + b, 0)
        //    }
        //}).sort((a, b) => b.data - a.data)
//
        //console.log(topVoice)
        //let voiceArray = []
//
        //for (var i = 0; i < topMessage.length; i++) {
        //    let objVoice = topVoice.find(data => data.userID === topVoice[i].userID);
        //    let objCoins = topCoins.find(data => data.userID === topCoins[i].userID);
        //    if (objVoice !== undefined) {
        //        topMessage[i].datav = objVoice.data
        //    } else {
        //        topMessage[i].datav = 0
        //    }
        //    if (objVoice !== undefined) {
        //        topVoice[i].datac = objCoins.data
        //    } else {
        //        topVoice[i].datac = 0
        //    }
//
        //}
//
        //let topMessage0 = topVoice.map((data, index) => `**${index + 1}. <@${data.userID}>:**\n\ **Messages:** ${data.data} **|** **Voice:** ${moment.duration(data.datav).format("h [h], m [m]")} **|** **Coins:** ${data.datac}   \n\ `).join(" ")
//
//
        //
//
        //const row = new MessageActionRow()
        //    .addComponents(
        //        new MessageButton()
        //            .setCustomId('Previous')
        //            .setEmoji('909282764291977226')
        //            .setStyle('PRIMARY'),
        //        new MessageButton()
        //            .setCustomId('Numbers')
        //            .setLabel(`1 / 3`)
        //            .setStyle('SECONDARY'),
        //        new MessageButton()
        //            .setCustomId('Next')
        //            .setEmoji('909282735112208424') 
        //            .setStyle('PRIMARY'),
        //    )
//
        //const roww = new MessageActionRow()
        //    .addComponents(
        //        new MessageSelectMenu()
        //            .setCustomId('select')
        //            .setPlaceholder('Nothing selected')
        //            .addOptions([
        //                {
        //                    label: 'Select me',
        //                    description: 'This is a description',
        //                    value: 'first_option',
        //                },
        //                {
        //                    label: 'You can select me too',
        //                    description: 'This is also a description',
        //                    value: 'second_option',
        //                },
        //            ]),
        //    );
        //
        //const test = Object.keys(dataMessage).map(id => {
        //    return {
        //        userID: id,
        //        data: Object.values(dataMessage[id].channel || {}).reduce((a, b) => a + b, 0)
        //    }
        //})
//
        //let yourData = []
//
        //for (var i = test.length - 1; i >= 0; i--) {
        //    if (test[i].userID === message.author.id) {
        //        yourData.push(test[i])
        //    }
        //}
//
        //const embedMsg = new MessageEmbed()
        //    .setColor(`2f3136`)
        //    .setThumbnail('https://i.imgur.com/AfFp7pu.png')
        //    .setTitle(`**Message | Top 10 :medal:**`)
        //    .setDescription(`${topMessage0} ----------------------------\n\ **You** ${message.author}**:** ${yourData[0].data} messages` )
//
        //const embedVc = new MessageEmbed()
        //    .setColor(`2f3136`)
        //    .setTitle(`**Voice | Top 10**`)
        //    .setDescription(`${topVoice} ----------------------------\n\ **You** ${message.author}**:** ${yourData[0].data} messages` )
//
        //const embedCn = new MessageEmbed()
        //    .setColor(`2f3136`)
        //    .setTitle(`**Coins | Top 10**`)
        //    .setDescription(`${topCoins}` )
//
//
        //let embedsArray = []
//
        //embedsArray.push(embedMsg,embedVc,embedCn)
//
        //message.channel.send({ embeds: [embedsArray[0]], components: [roww, row] })
	},
};
