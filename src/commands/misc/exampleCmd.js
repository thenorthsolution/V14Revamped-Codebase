const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("test")
    .setDescription("Test if everything works.")
    .toJSON()
  ,
  testMode: false,
  devOnly: false,
  deleted: false,
  userPermissions: [],
  botPermissions: [],

  run: (client, interaction) => {
    try {
      //...

    } catch (err) {
      console.log("[ERROR]".red + "Error in your exampleCmd.js run function:");
      console.log(err);
    };
  },

  // Required for autocomplete option handling ---
  autocomplete: async (client, interaction) => {
    try {
      //...

    } catch (err) {
      console.log("[ERROR]".red + "Error in your exampleCmd.js autocomplete function:");
      console.log(err);
    };
  }
  // --- Required for autocomplete option handling
};