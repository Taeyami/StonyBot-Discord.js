
const { MessageActionRow, MessageButton, MessageEmbed, MessageAttachment } = require('discord.js');

const Canvas = require('canvas');

module.exports = {
	name: 'deckRight',
	description: 'Just a test command',
	aliases: [],
	usage: '',
	guildOnly: false,
	args: false,
	permissions: {
		bot: [],
		user: [],
	},
	execute: async (interaction, args, client) => {

		let monsterSrt = interaction.message.components[1].components[2].customId

		let monsterArr = Array.from(monsterSrt.split(','),Number);

        let deckStr = interaction.message.components[1].components[0].customId

        let shuffled = Array.from(deckStr.split(','),Number);

		const canvasThree = Canvas.createCanvas(400, 149);
		const contextThree = canvasThree.getContext('2d');
		contextThree.fillStyle = "#232427";
		contextThree.fillRect(0, 0, canvasThree.width, canvasThree.height);

        const card11 = await Canvas.loadImage('./images/card' + `${shuffled[4]}` + '.png');
        contextThree.drawImage(card11, 0, 0, 96, canvasThree.height);
        const card22 = await Canvas.loadImage('./images/card' + `${shuffled[5]}` + '.png');
        contextThree.drawImage(card22, 100, 0, 96, canvasThree.height);
        const card33 = await Canvas.loadImage('./images/card' + `${shuffled[6]}` + '.png');
        contextThree.drawImage(card33, 200, 0, 96, canvasThree.height);
        const card44 = await Canvas.loadImage('./images/card' + `${shuffled[7]}` + '.png');
        contextThree.drawImage(card44, 300, 0, 96, canvasThree.height);

		const attachmentThree = new MessageAttachment(canvasThree.toBuffer(), 'CardsTwo.jpg');

        const embedInt = new MessageEmbed()
            .setColor("2f3136")
            .setImage(interaction.message.embeds[0].image.url)
         	.setTitle('**Fight in the woods**')

        const embedCard = new MessageEmbed()
            .setColor("2f3136")
            .setFooter({
            	text:`Fight started by ${interaction.member.username} | Completed 0/1`,
            	iconURL: interaction.guild.iconURL()
            })
            .setImage('attachment://CardsTwo.jpg')

         const row = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setCustomId('card1')
                    .setLabel('CARD 1')
                    .setStyle('SECONDARY'),
                new MessageButton()
                    .setCustomId('card2')
                    .setLabel('CARD 2') 
                    .setStyle('SECONDARY'),
                new MessageButton()
                    .setCustomId('card3')
                    .setLabel('CARD 3') 
                    .setStyle('SECONDARY'),
                new MessageButton()
                    .setCustomId('card4')
                    .setLabel('CARD 4') 
                    .setStyle('SECONDARY'),
                new MessageButton()
                    .setCustomId('Next')
                    .setLabel('gameNext') 
                    .setStyle('SECONDARY'),
            )

        const row2 = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setCustomId(shuffled.toString())
                    .setLabel('DECK')
                    .setDisabled(true)
                    .setStyle('SECONDARY'),
                new MessageButton()
                    .setCustomId('deckLeft')
                    .setLabel('<')
                    .setStyle('SECONDARY'),
                new MessageButton()
                    .setCustomId(monsterArr.toString())
                    .setLabel('.') 
                    .setStyle('SECONDARY'),
                new MessageButton()
                    .setCustomId('deckRight')
                    .setLabel('>') 
                    .setDisabled(true)
                    .setStyle('SECONDARY'),
                new MessageButton()
                    .setCustomId('5')
                    .setLabel('DECK RESET')
                    .setDisabled(true)
                    .setStyle('SECONDARY'),
            )
		interaction.message.edit({ embeds: [embedInt, embedCard], files: [attachmentThree], components: [row, row2] });

        interaction.deferUpdate()

	},
};
