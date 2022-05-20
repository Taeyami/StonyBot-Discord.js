
const Canvas = require('canvas');

const { MessageAttachment, MessageActionRow, MessageButton, Discord, MessageEmbed } = require('discord.js');

let cardsData = require('../utils/game/cards.json')

const dataBase = require('nippy.db');

const gp = dataBase('./data/gamePlayer.sqlite')

module.exports = {
	name: 'race',
	description: 'Just a test command',
	aliases: [],
	usage: '',
	guildOnly: false,
	args: false,
	permissions: {
		bot: [],
		user: [],
	},
	execute: async (message, args, client) => {

		let profileData = gp.get(`${message.guild.id}.${message.author.id}.profile`)

		let shuffled = profileData.Deck
  		.map(value => ({ value, sort: Math.random() }))
  		.sort((a, b) => a.sort - b.sort)
  		.map(({ value }) => value)

  		console.log(profileData)

		if (profileData === undefined || profileData === null) return;

		//[energyGet0, damage1, deffence2, removeCard3, addCard4, damageHero5]

		//visual

		function monsterFun() {
			let randomNum = Math.floor((Math.random() * 2) + 1);
			if (randomNum === 1) {
				return [100, 150, 1, 280, 30, 35, 0, 1]; // [photo, photo, photo, photo, photo, enemyHp, enemyType, actionPoint]
			}

			if (randomNum === 2) {
				return [100, 150, 2, 280, 30, 35, 1, 1];
			}
		}

		let monsterArr = monsterFun()


		let cardEmoji = '959201084298100778'
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
                    .setCustomId(`${profileData.HP},${profileData.Defence},${profileData.Energy}`)
                    .setLabel('deck')
                    .setDisabled(true)
                    .setStyle('SECONDARY'),
            )

		const canvas = Canvas.createCanvas(400, 200);
		const context = canvas.getContext('2d');
		context.fillStyle = "#232427";
		const background = await Canvas.loadImage('./images/background.jpg');
		context.drawImage(background, 0, 0, 400, 200);

		const hero = await Canvas.loadImage('./images/hero3.png');
		context.drawImage(hero, 0, 65, 120, 120);

		const monster = await Canvas.loadImage('./images/monster'+`${monsterArr[2]}`+'.png');
		context.drawImage(monster, monsterArr[3], monsterArr[4], monsterArr[0], monsterArr[1]);

		const energy = await Canvas.loadImage('./images/interface.png');
		context.drawImage(energy, 0, 0, 400, 200);

		context.font = 'bold 20px Minecraft Rus';
		context.fillStyle = '#cbb790';
		context.fillText('0', 33, 35);//energy
		context.font = 'bold 6px Minecraft Rus';
		context.fillStyle = '#222034';
		context.fillText('10', 100, 186);//hpHero
		context.fillText('10', 288, 186);//hpHero
		context.font = 'bold 12px Minecraft Rus';
		context.fillStyle = '#222034';
		context.fillText('10', 120, 186);//hpHero
		context.fillText('10', 258, 186);//hpHero

		const attachment = new MessageAttachment(canvas.toBuffer(), 'Interface.jpg');

		const canvasTwo = Canvas.createCanvas(400, 149);
		const contextTwo = canvasTwo.getContext('2d');
		contextTwo.fillStyle = "#2f3136";
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
            .setImage('attachment://Interface.jpg')
         	.setTitle('**Fight in the woods**')

        const embedCard = new MessageEmbed()
            .setColor("2f3136")
            .setFooter({
            	text:`Fight started by ${message.author.username} | Completed 0/1`,
            	iconURL: message.guild.iconURL()
            })
            .setImage('attachment://CardsOne.jpg')
	
		message.reply({ embeds: [embedInt, embedCard], files: [attachment, attachmentTwo], components: [row, row2], });
	},
};
