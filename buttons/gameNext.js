
const { MessageActionRow, MessageButton, MessageEmbed, MessageAttachment } = require('discord.js');

let cardsData = require('../utils/game/cards.json')

let enemyData = require('../utils/game/enemyActions.json')

const Canvas = require('canvas');

module.exports = {
	name: 'gameNext',
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

		let deckArr = Array.from(deckStr.split(','),Number);

		console.log(enemyData.actions[monsterArr[6]].defence.armor)
		console.log(monsterArr[7])

		function enemyAction() {
			if (monsterArr[7] === 1) {
				monsterArr[7].set(2)
				return enemyData.actions[monsterArr[6]].attack.damage
			} else {
				monsterArr[7].set(1)
				return enemyData.actions[monsterArr[6]].defence.armor
			}
		}

		console.log(enemyAction())

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
                    .setCustomId('arrow')
                    .setLabel('Next') 
                    .setDisabled(true)
                    .setStyle('SECONDARY'),
            )

        const row2 = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setCustomId(deckArr.toString())
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

		const canvas = Canvas.createCanvas(1000, 360);
		const context = canvas.getContext('2d');
		context.fillStyle = "#232427";
		context.fillRect(0, 0, canvas.width, canvas.height);

		const hero = await Canvas.loadImage('./images/hero.png');
		context.drawImage(hero, 10, 90, 300, 240);

		const monster = await Canvas.loadImage('./images/monster'+`${monsterArr[2]}`+'.png');
		context.drawImage(monster, monsterArr[3], monsterArr[4], monsterArr[0], monsterArr[1]);

		const energy = await Canvas.loadImage('./images/energy.png');
		context.drawImage(energy, 10, 15, 93, 82);

		const deckFull = await Canvas.loadImage('./images/fullDeck.png');
		context.drawImage(deckFull, 30, 260, 65, 87);

		const deckEmpty = await Canvas.loadImage('./images/emptyDeck.png');
		context.drawImage(deckEmpty, 900, 260, 65, 87);

		const heroDef = await Canvas.loadImage('./images/defence.png');
		context.drawImage(heroDef, 300, 50, 42, 49);

		const enemyDef = await Canvas.loadImage('./images/defence.png');
		context.drawImage(enemyDef, 600, 50, 42, 49);

		const enemyHp = await Canvas.loadImage('./images/hp.png');
		context.drawImage(enemyHp, 600, 110, 42, 49);

		const heroHp = await Canvas.loadImage('./images/hp.png');
		context.drawImage(heroHp, 300, 110, 42, 49);

		const enemyDamage = await Canvas.loadImage('./images/damage.png');
		context.drawImage(enemyDamage, 600, 170, 43, 43);

		context.font = 'bold 32px Montserrat';
		context.fillStyle = '#ffffff';
		context.fillText('0', 550, 85);//enemyDef
		context.fillText(`${monsterArr[5] - cardsData.cards[deckArr[0]].damage}`+'/'+`${monsterArr[5]}`, 500, 145);//enemyHp
		context.fillText('0', 550, 200);//enemyDam
		context.fillText('0', 360, 85);//heroDef
		context.fillText('0', 40, 246);//fullDeck
		context.fillText(0 + 1, 910, 246);//emptyDeck
		context.fillText('30/30', 360, 145);//HeroHp

		context.font = 'bold 42px Montserrat';
		context.fillStyle = '#232427';
		context.fillText(`${cardsData.cards[deckArr[0]].energy}`, 44, 78);//energy


		const attachment = new MessageAttachment(canvas.toBuffer(), 'Interface.jpg');

		const canvasTwo = Canvas.createCanvas(815, 300);
		const contextTwo = canvasTwo.getContext('2d');
		contextTwo.fillStyle = "#232427";
		contextTwo.fillRect(0, 0, canvasTwo.width, canvasTwo.height);


		const card1 = await Canvas.loadImage('./images/card0.jpg');
		contextTwo.drawImage(card1, 0, 0, 200, canvasTwo.height);
		const card2 = await Canvas.loadImage('./images/card' + `${deckArr[1]}` + '.jpg');
		contextTwo.drawImage(card2, 205, 0, 200, canvasTwo.height);
		const card3 = await Canvas.loadImage('./images/card' + `${deckArr[2]}` + '.jpg');
		contextTwo.drawImage(card3, 410, 0, 200, canvasTwo.height);
		const card4 = await Canvas.loadImage('./images/card' + `${deckArr[3]}` + '.jpg');
		contextTwo.drawImage(card4, 615, 0, 200, canvasTwo.height);

		const attachmentTwo = new MessageAttachment(canvasTwo.toBuffer(), 'CardsOne.jpg');

		const canvasThree = Canvas.createCanvas(815, 300);
		const contextThree = canvasThree.getContext('2d');
		contextThree.fillStyle = "#232427";
		contextThree.fillRect(0, 0, canvasThree.width, canvasThree.height);


		const card11 = await Canvas.loadImage('./images/card' + `${deckArr[4]}` + '.jpg');
		contextThree.drawImage(card11, 0, 0, 200, canvasThree.height);
		const card22 = await Canvas.loadImage('./images/card' + `${deckArr[5]}` + '.jpg');
		contextThree.drawImage(card22, 205, 0, 200, canvasThree.height);
		const card33 = await Canvas.loadImage('./images/card' + `${deckArr[6]}` + '.jpg');
		contextThree.drawImage(card33, 410, 0, 200, canvasThree.height);
		const card44 = await Canvas.loadImage('./images/card' + `${deckArr[7]}` + '.jpg');
		contextThree.drawImage(card44, 615, 0, 200, canvasThree.height);

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
            .setImage('attachment://CardsOne.jpg')
	
		interaction.message.edit({ embeds: [embedInt, embedCard], files: [attachment, attachmentTwo], components: [row, row2], });



        interaction.deferUpdate()
	},
};
