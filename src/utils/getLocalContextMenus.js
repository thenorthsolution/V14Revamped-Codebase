const path = require("path");
const getAllFiles = require("./getAllFiles");

module.exports = () => {
  let localContextMenus = [];
  const contextMenuFolders = getAllFiles(path.join(__dirname, "..", "contextmenus"), true);

  for (const contextMenuFolder of contextMenuFolders) {
    const contextMenuFiles = getAllFiles(contextMenuFolder);

    for (const contextMenuFile of contextMenuFiles) {
      const contextMenuObject = require(contextMenuFile);

      if (process.env.MODE === "dev" && contextMenuObject.devOnly) {
        localContextMenus.push(contextMenuObject);
      } else if (!contextMenuObject.devOnly) {
        localContextMenus.push(contextMenuObject);
      };
    };
  };

  return localContextMenus;
};