
const { MessageActionRow, MessageButton, MessageEmbed, MessageAttachment } = require('discord.js');

const moment = require('moment');

module.exports = {
	name: 'deleteMessage',
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
        interaction.message.delete()
    }
}
