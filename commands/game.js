
const { MessageActionRow, MessageButton, Discord, MessageEmbed, MessageSelectMenu } = require('discord.js');

module.exports = {
	name: 'game',
	description: 'Just a test command',
	aliases: [`g`],
	usage: '',
	guildOnly: false,
	args: false,
	permissions: {
		bot: [],
		user: [],
	},
	execute: (message, args, client) => {
		const row = new MessageActionRow()
			.addComponents(
				new MessageSelectMenu()
					.setCustomId('select')
					.setPlaceholder('What better to do?')
					.addOptions([
						{
							label: 'CARD #1',
							description: '2 ENERGY | Deals 10 damage',
							value: 'first_option',
						},
						{
							label: 'CARD #2',
							description: '1 ENERGY | Gain 2 energy',
							value: 'second_option',
						},
						{
							label: 'CARD #3',
							description: '3 ENERGY | Deals 16 damage',
							value: 'seco2_option',
						},
						{
							label: 'CARD #4',
							description: '2 ENERGY | This turn, you draw 1 more card, then discard 1 chosen card',
							value: 'sec3d_option',
						},
						{
							label: 'CARD #5',
							description: '1 ENERGY | Deals 9 damage',
							value: 'se4nd_option',
						},
						{
							label: 'CARD #6',
							description: '0 ENERGY | Gain 20 armor',
							value: 'sec5d_option',
						},
						{
							label: 'CARD #7',
							description: '2 ENERGY | Gain 3 attacks with damage 3-7',
							value: 'se6d_option',
						},
						{
							label: 'CARD #8',
							description: '2 ENERGY | Takes 2 health and deals 5 damage to all enemies',
							value: 'se7d_option',
						},
						{
							label: 'HEAL POTION',
							description: 'Heal 10 HP',
							value: 'se7dfdption',
						},
						{
							label: 'POISON POTION',
							description: 'Deals 10 dagame',
							value: 'sefdsftion',
						},
						{
							label: 'RUN',
							description: 'Escape from fight',
							value: 'sefdfdsfdsion',
						},
					]),
			);

			const roww = new MessageActionRow()
            	.addComponents(
			    	new MessageButton()
                	    .setCustomId('leftg')
                	    .setLabel('<')
                	    .setStyle('SECONDARY'),
                	new MessageButton()
                	    .setCustomId('rightg')
                	    .setLabel(`>`)
                	    .setStyle('SECONDARY'),
                	new MessageButton()
                	    .setCustomId('nextraund')
                	    .setLabel('NEXT') 
                	    .setStyle('SECONDARY'),
                )

        const embed = new MessageEmbed()
            .setColor(`2f3136`)
            .setImage(`https://media.discordapp.net/attachments/875763456891060315/975149778583314462/unknown.png`)
        const embedd = new MessageEmbed()
            .setColor(`2f3136`)
            .setImage(`https://media.discordapp.net/attachments/875763456891060315/975149764289114172/unknown.png`)

        message.channel.send({ embeds: [embed, embedd], components: [row, roww] })
	},
};
