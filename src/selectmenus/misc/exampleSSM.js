const { PermissionFlagsBits } = require("discord.js");

module.exports = {
  customId: "exampleSSM",
  testMode: false,
  devOnly: false,
  userPermissions: [],
  botPermissions: [],

  run: async (client, interaction) => {
    try {
      //...
      
    } catch (err) {
      console.log("[ERROR]".red + "Error in your exampleSSM.js run function:");
      console.log(err);
    };
  }
};