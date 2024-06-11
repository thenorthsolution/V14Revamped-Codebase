require("colors");

const { EmbedBuilder } = require("discord.js");
const { developersIds, testServerId } = require("../../config.json");
const mConfig = require("../../messageConfig.json");
const getSelectMenus = require("../../utils/getSelectMenus");

module.exports = async (client, interaction) => {
  if (!interaction.isAnySelectMenu() || interaction.customId.includes("*")) return;
  const selects = getSelectMenus();

  const { customId, member, guildId, guild, message, user } = interaction;

  try {
    const selectObject = selects.find((select) => select.customId === customId);
    if (!selectObject) return;

    if (selectObject.devOnly && !developersIds.includes(member.id)) {
      const rEmbed = new EmbedBuilder()
        .setColor(`${mConfig.embedColorError}`)
        .setDescription(`${mConfig.commandDevOnly}`);

      return interaction.reply({ embeds: [rEmbed], ephemeral: true });
    };

    if (selectObject.testMode && guildId !== testServerId) {
      const rEmbed = new EmbedBuilder()
        .setColor(`${mConfig.embedColorError}`)
        .setDescription(`${mConfig.commandTestMode}`);

      return interaction.reply({ embeds: [rEmbed], ephemeral: true });
    };

    if (selectObject.userPermissions?.length) {
      for (const permission of selectObject.userPermissions) {
        if (member.permissions.has(permission)) continue;

        const rEmbed = new EmbedBuilder()
          .setColor(`${mConfig.embedColorError}`)
          .setDescription(`${mConfig.userNoPermissions}`);

        return interaction.reply({ embeds: [rEmbed], ephemeral: true });
      };
    };

    if (selectObject.botPermissions?.length) {
      for (const permission of selectObject.botPermissions) {
        const bot = guild.members.me;
        if (bot.permissions.has(permission)) continue;

        const rEmbed = new EmbedBuilder()
          .setColor(`${mConfig.embedColorError}`)
          .setDescription(`${mConfig.botNoPermissions}`);

        return interaction.reply({ embeds: [rEmbed], ephemeral: true });
      };
    };

    if (message.interaction && message.interaction?.user.id !== user.id) {
      const rEmbed = new EmbedBuilder()
        .setColor(`${mConfig.embedColorError}`)
        .setDescription(`${mConfig.cannotUseSelect}`);

      return interaction.reply({ embeds: [rEmbed], ephemeral: true });
    };

    await selectObject.run(client, interaction);
  } catch (err) {
    console.log("[ERROR]".red + "Error in your selectMenuValidator.js file:");
    console.log(err);
  };
};