require("colors");

const { EmbedBuilder } = require("discord.js");
const { developersIds, testServerId } = require("../../config.json");
const mConfig = require("../../messageConfig.json");
const getModals = require("../../utils/getModals");

module.exports = async (client, interaction) => {
  if (!interaction.isModalSubmit() || interaction.customId.includes("*")) return;
  const modals = getModals();

  const { customId, member, guildId, guild } = interaction;

  try {
    const modalObject = modals.find((modal) => modal.customId === customId);
    if (!modalObject) return;

    if (modalObject.devOnly && !developersIds.includes(member.id)) {
      const rEmbed = new EmbedBuilder()
        .setColor(`${mConfig.embedColorError}`)
        .setDescription(`${mConfig.commandDevOnly}`);

      return interaction.reply({ embeds: [rEmbed], ephemeral: true });
    };

    if (modalObject.testMode && guildId !== testServerId) {
      const rEmbed = new EmbedBuilder()
        .setColor(`${mConfig.embedColorError}`)
        .setDescription(`${mConfig.commandTestMode}`);

      return interaction.reply({ embeds: [rEmbed], ephemeral: true });
    };

    if (modalObject.userPermissions?.length) {
      for (const permission of modalObject.userPermissions) {
        if (member.permissions.has(permission)) continue;

        const rEmbed = new EmbedBuilder()
          .setColor(`${mConfig.embedColorError}`)
          .setDescription(`${mConfig.userNoPermissions}`);

        return interaction.reply({ embeds: [rEmbed], ephemeral: true });
      };
    };

    if (modalObject.botPermissions?.length) {
      for (const permission of modalObject.botPermissions) {
        const bot = guild.members.me;
        if (bot.permissions.has(permission)) continue;

        const rEmbed = new EmbedBuilder()
          .setColor(`${mConfig.embedColorError}`)
          .setDescription(`${mConfig.botNoPermissions}`);

        return interaction.reply({ embeds: [rEmbed], ephemeral: true });
      };
    };

    await modalObject.run(client, interaction);
  } catch (err) {
    console.log("[ERROR]".red + "Error in your modalValidator.js file:");
    console.log(err);
  };
};