const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require('discord.js');
const buttonPagination = require('../../utils/buttonPagination');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('embed')
		.setDescription('Send an embed')
		.setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
	userPermissions: [PermissionFlagsBits.Administrator],
	bot: [],
	run: async (client, interaction) => {
		try {
			const embeds = [];
			for (let i = 0; i < 4; i++) {
				embeds.push(new EmbedBuilder().setDescription(`This is page ${i + 1}`));
			}

			await buttonPagination(interaction, embeds);
		} catch (err) {
			console.log(err);
		}
	},
};
