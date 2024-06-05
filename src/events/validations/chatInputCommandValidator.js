require("colors");

const { EmbedBuilder } = require("discord.js");
const { developersIds, testServerId } = require("../../config.json");
const mConfig = require("../../messageConfig.json");
const getLocalCommands = require("../../utils/getLocalCommands");

module.exports = async (client, interaction) => {
  if (!interaction.isChatInputCommand() && !interaction.isAutocomplete()) return;
  const localCommands = getLocalCommands();

  const { commandName, member, guildId, guild } = interaction;

  try {
    const commandObject = localCommands.find((command) => command.data.name === commandName);
    if (!commandObject) return;

    if (commandObject.devOnly && !developersIds.includes(member.id)) {
      const rEmbed = new EmbedBuilder()
        .setColor(`${mConfig.embedColorError}`)
        .setDescription(`${mConfig.commandDevOnly}`);

      return interaction.reply({ embeds: [rEmbed], ephemeral: true });
    };

    if (commandObject.testMode && guildId !== testServerId) {
      const rEmbed = new EmbedBuilder()
        .setColor(`${mConfig.embedColorError}`)
        .setDescription(`${mConfig.commandTestMode}`);

      return interaction.reply({ embeds: [rEmbed], ephemeral: true });
    };

    if (commandObject.userPermissions?.length) {
      for (const permission of commandObject.userPermissions) {
        if (member.permissions.has(permission)) continue;

        const rEmbed = new EmbedBuilder()
          .setColor(`${mConfig.embedColorError}`)
          .setDescription(`${mConfig.userNoPermissions}`);

        return interaction.reply({ embeds: [rEmbed], ephemeral: true });
      };
    };

    if (commandObject.botPermissions?.length) {
      for (const permission of commandObject.botPermissions) {
        const bot = guild.members.me;
        if (bot.permissions.has(permission)) continue;

        const rEmbed = new EmbedBuilder()
          .setColor(`${mConfig.embedColorError}`)
          .setDescription(`${mConfig.botNoPermissions}`);

        return interaction.reply({ embeds: [rEmbed], ephemeral: true });
      };
    };

    if (interaction.isChatInputCommand()) {
      if (!commandObject.run) return interaction.reply({ content: "`⚠️` This command does not have a run function!", ephemeral: true });

      await commandObject.run(client, interaction);
    } else if (interaction.isAutocomplete()) {
      if (!commandObject.autocomplete) return interaction.respond([{ name: "No autocomplete handling found, this is a fallback option.", value: "fallbackAutoComplete" }]);

      await commandObject.autocomplete(client, interaction);
    };
  } catch (err) {
    console.log("[ERROR]".red + "Error in your chatInputCommandValidator.js file:");
    console.log(err);
  };
};