const commandCheck = require("./../utils/commandCheck");

module.exports = async (err, files, client) => {
  console.log(`\n---COMMANDS---`)
  if (err) return console.error(err);
  files.forEach((file, index) => {
    const command = require(`./../commands/${file}`);
    if (commandCheck(command.name, command)) {
      if (command.name) {
        client.commands.set(command.name, command);
        console.log(`${file}`)

        if (command.aliases && Array.isArray(command))
          command.aliases.foreach((alias) =>
            client.aliases.set(alias, command.name)
          );
      } else {
        console.log(`Error`)
      }
    }
  });
};
