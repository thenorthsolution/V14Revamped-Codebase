const path = require("path");
const getAllFiles = require("./getAllFiles");

module.exports = () => {
  let localCommands = [];
  const commandFolders = getAllFiles(path.join(__dirname, "..", "commands"), true);

  for (const commandFolder of commandFolders) {
    const commandFiles = getAllFiles(commandFolder);

    for (const commandFile of commandFiles) {
      const commandObject = require(commandFile);

      if (process.env.MODE === "dev" && commandObject.devOnly) {
        localCommands.push(commandObject);
      } else if (!commandObject.devOnly) {
        localCommands.push(commandObject);
      };
    };
  };

  return localCommands;
};