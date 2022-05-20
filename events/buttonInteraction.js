const { MessageEmbed } = require("discord.js");
const { prefix } = require("../utils/config.json");

module.exports = {
  event: "interactionCreate",
  execute: async (interaction, client) => {
    if (!interaction.isButton()) return;

    const button = client.buttons.get(interaction.customId);

    try {
      await button.execute(interaction, client);
    } catch (error) {
      console.error(error);
      await interaction.reply({
        content: "There was an error while executing this command!",
        ephemeral: true,
      });
    }
  },
};
