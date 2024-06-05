const path = require("path");
const getAllFiles = require("./getAllFiles");

module.exports = () => {
  let buttons = [];
  const buttonFolders = getAllFiles(path.join(__dirname, "..", "buttons"), true);

  for (const buttonFolder of buttonFolders) {
    const buttonFiles = getAllFiles(buttonFolder);

    for (const buttonFile of buttonFiles) {
      const buttonObject = require(buttonFile);

      if (process.env.MODE === "dev" && buttonObject.devOnly) {
        buttons.push(buttonObject);
      } else if (!buttonObject.devOnly) {
        buttons.push(buttonObject);
      };
    };
  };

  return buttons;
};