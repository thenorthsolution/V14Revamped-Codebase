require("colors");

const { EmbedBuilder } = require("discord.js");
const { developersIds, testServerId } = require("../../config.json");
const mConfig = require("../../messageConfig.json");
const getButtons = require("../../utils/getButtons");

module.exports = async (client, interaction) => {
  if (!interaction.isButton() || interaction.customId.includes("*")) return;
  const buttons = getButtons();

  const { customId, member, guildId, guild, message, user } = interaction;

  try {
    const buttonObject = buttons.find((button) => button.customId === customId);
    if (!buttonObject) return;

    if (buttonObject.devOnly && !developersIds.includes(member.id)) {
      const rEmbed = new EmbedBuilder()
        .setColor(`${mConfig.embedColorError}`)
        .setDescription(`${mConfig.commandDevOnly}`);

      return interaction.reply({ embeds: [rEmbed], ephemeral: true });
    };

    if (buttonObject.testMode && guildId !== testServerId) {
      const rEmbed = new EmbedBuilder()
        .setColor(`${mConfig.embedColorError}`)
        .setDescription(`${mConfig.commandTestMode}`);

      return interaction.reply({ embeds: [rEmbed], ephemeral: true });
    };

    if (buttonObject.userPermissions?.length) {
      for (const permission of buttonObject.userPermissions) {
        if (member.permissions.has(permission)) continue;

        const rEmbed = new EmbedBuilder()
          .setColor(`${mConfig.embedColorError}`)
          .setDescription(`${mConfig.userNoPermissions}`);

        return interaction.reply({ embeds: [rEmbed], ephemeral: true });
      };
    };

    if (buttonObject.botPermissions?.length) {
      for (const permission of buttonObject.botPermissions) {
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
        .setDescription(`${mConfig.cannotUseButton}`);

      return interaction.reply({ embeds: [rEmbed], ephemeral: true });
    };

    await buttonObject.run(client, interaction);
  } catch (err) {
    console.log("[ERROR]".red + "Error in your buttonValidator.js file:");
    console.log(err);
  };
};