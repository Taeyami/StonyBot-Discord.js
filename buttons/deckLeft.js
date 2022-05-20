
const { MessageActionRow, MessageButton, MessageEmbed, MessageAttachment } = require('discord.js');

const Canvas = require('canvas');

module.exports = {
	name: 'deckLeft',
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

				const canvasTwo = Canvas.createCanvas(400, 149);
		const contextTwo = canvasTwo.getContext('2d');
		contextTwo.fillStyle = "#232427";
		contextTwo.fillRect(0, 0, canvasTwo.width, canvasTwo.height);


        const card1 = await Canvas.loadImage('./images/card' + `${shuffled[0]}` + '.png');
        contextTwo.drawImage(card1, 0, 0, 96, canvasTwo.height);
        const card2 = await Canvas.loadImage('./images/card' + `${shuffled[1]}` + '.png');
        contextTwo.drawImage(card2, 100, 0, 96, canvasTwo.height);
        const card3 = await Canvas.loadImage('./images/card' + `${shuffled[2]}` + '.png');
        contextTwo.drawImage(card3, 200, 0, 96, canvasTwo.height);
        const card4 = await Canvas.loadImage('./images/card' + `${shuffled[3]}` + '.png');
        contextTwo.drawImage(card4, 300, 0, 96, canvasTwo.height);

		const attachmentTwo = new MessageAttachment(canvasTwo.toBuffer(), 'CardsOne.jpg');

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
            .setImage('attachment://CardsOne.jpg')

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
                    .setDisabled(true)
                    .setStyle('SECONDARY'),
                new MessageButton()
                    .setCustomId(monsterArr.toString())
                    .setLabel('.') 
                    .setStyle('SECONDARY'),
                new MessageButton()
                    .setCustomId('deckRight')
                    .setLabel('>') 
                    .setStyle('SECONDARY'),
                new MessageButton()
                    .setCustomId('5')
                    .setLabel('DECK RESET')
                    .setDisabled(true)
                    .setStyle('SECONDARY'),
            )
            
		interaction.message.edit({ embeds: [embedInt, embedCard], files: [attachmentTwo], components: [row, row2] });

        interaction.deferUpdate()

	},
};
