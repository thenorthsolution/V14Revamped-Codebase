require("colors");

module.exports = async (client) => {
  console.log("[INFO]".blue + `${client.user.username} is online in ${client.guilds.cache.size} servers.`);
};