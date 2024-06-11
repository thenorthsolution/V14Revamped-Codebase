const path = require("path");
const getAllFiles = require("./getAllFiles");

module.exports = () => {
  let modals = [];
  const modalFolders = getAllFiles(path.join(__dirname, "..", "modals"), true);

  for (const modalFolder of modalFolders) {
    const modalFiles = getAllFiles(modalFolder);

    for (const modalFile of modalFiles) {
      const modalObject = require(modalFile);

      if (process.env.MODE === "dev" && modalObject.devOnly) {
        modals.push(modalObject);
      } else if (!modalObject.devOnly) {
        modals.push(modalObject);
      };
    };
  };

  return modals;
};