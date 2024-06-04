const path = require("path");
const getAllFiles = require("./getAllFiles");

module.exports = () => {
  let selectMenus = [];
  const selectMenuFolders = getAllFiles(path.join(__dirname, "..", "selectmenus"), true);

  for (const selectMenuFolder of selectMenuFolders) {
    const selectMenuFiles = getAllFiles(selectMenuFolder);

    for (const selectMenuFile of selectMenuFiles) {
      const selectMenuObject = require(selectMenuFile);

      if (process.env.MODE === "dev" && selectMenuObject.devOnly) {
        selectMenus.push(selectMenuObject);
      } else if (!selectMenuObject.devOnly) {
        selectMenus.push(selectMenuObject);
      };
    };
  };

  return selectMenus;
};