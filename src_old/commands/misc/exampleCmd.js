const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("test")
    .setDescription("Test if everything works.")
    .addStringOption((o) => o
      .setName("test-option")
      .setDescription("This is a test option.")
    )
    .toJSON()
  ,
  userPermissions: [],
  botPermissions: [],

  run: (client, interaction) => {
  }
};