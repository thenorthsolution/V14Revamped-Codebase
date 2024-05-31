const { Client, StringSelectMenuInteraction } = require("discord.js");

module.exports = {
  customId: "exampleSSM",
  devOnly: false,
  testMode: false,
  userPermissions: [],
  botPermissions: [],
  /**
   *
   * @param {Client} client
   * @param {StringSelectMenuInteraction} interaction
   */
  run: async (client, interaction) => {
    await interaction.deferReply();
    await interaction.editReply({
      content: `You selected: ${interaction.values[0]}`,
      components: [],
    });
  },
};
