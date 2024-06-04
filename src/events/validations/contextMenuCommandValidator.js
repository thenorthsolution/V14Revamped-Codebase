require("colors");

const { EmbedBuilder } = require("discord.js");
const { developersIds, testServerId } = require("../../config.json");
const mConfig = require("../../messageConfig.json");
const getLocalContextMenus = require("../../utils/getLocalContextMenus");

module.exports = async (client, interaction) => {
  if (!interaction.isContextMenuCommand()) return;
  const localContextMenus = getLocalContextMenus();

  const { commandName, member, guildId, guild } = interaction;

  try {
    const contextMenuObject = localContextMenus.find((contextMenu) => contextMenu.name === commandName);
    if (!contextMenuObject) return;

    if (contextMenuObject.devOnly && !developersIds.includes(member.id)) {
      const rEmbed = new EmbedBuilder()
        .setColor(`${mConfig.embedColorError}`)
        .setDescription(`${mConfig.commandDevOnly}`);

      return interaction.reply({ embeds: [rEmbed], ephemeral: true });
    };

    if (contextMenuObject.testMode && guildId !== testServerId) {
      const rEmbed = new EmbedBuilder()
        .setColor(`${mConfig.embedColorError}`)
        .setDescription(`${mConfig.commandTestMode}`);

      return interaction.reply({ embeds: [rEmbed], ephemeral: true });
    };

    if (contextMenuObject.userPermissions?.length) {
      for (const permission of contextMenuObject.userPermissions) {
        if (member.permissions.has(permission)) continue;

        const rEmbed = new EmbedBuilder()
          .setColor(`${mConfig.embedColorError}`)
          .setDescription(`${mConfig.userNoPermissions}`);

        return interaction.reply({ embeds: [rEmbed], ephemeral: true });
      };
    };

    if (contextMenuObject.botPermissions?.length) {
      for (const permission of contextMenuObject.botPermissions) {
        const bot = guild.members.me;
        if (bot.permissions.has(permission)) continue;

        const rEmbed = new EmbedBuilder()
          .setColor(`${mConfig.embedColorError}`)
          .setDescription(`${mConfig.botNoPermissions}`);

        return interaction.reply({ embeds: [rEmbed], ephemeral: true });
      };
    };

    await contextMenuObject.run(client, interaction);
  } catch (err) {
    console.log("[ERROR]".red + "Error in your contextMenuCommandValidator.js file:");
    console.log(err);
  };
};
