require("colors");

const getApplicationContextMenus = require("../../utils/getApplicationCommands");
const getLocalContextMenus = require("../../utils/getLocalContextMenus");
const { testServerId } = require("../../config.json");

module.exports = async (client) => {
  try {
    let guildId = null;

    process.env.MODE === "dev"
      ? guildId = testServerId
      : guildId;

    const localContextMenus = getLocalContextMenus();
    const applicationContextMenus = await getApplicationContextMenus(client, guildId);

    for (const localContextMenu of localContextMenus) {
      const { data } = localContextMenu;

      const contextMenuName = data.name;
      const contextMenuType = data.type;

      const existingContextMenu = await applicationContextMenus.cache.find(
        (cmd) => cmd.name === contextMenuName
      );

      if (existingContextMenu) {
        if (localContextMenu.deleted) {
          await applicationContextMenus.delete(existingContextMenu.id);
          console.log(
            `Application command ${contextMenuName} has been deleted.`.red
          );
          continue;
        };
      } else {
        if (localContextMenu.deleted) {
          console.log(
            `Application command ${contextMenuName} has been skipped, since property "deleted" is set to "true".`
              .grey
          );
          continue;
        };

        await applicationContextMenus.create({
          name: contextMenuName,
          type: contextMenuType,
        });
        console.log(
          `Application command ${contextMenuName} has been registered.`.green
        );
      };
    };
  } catch (err) {
    console.log("[ERROR]".red + "Error in your registerContextMenus.js file:");
    console.log(err);
  };
};