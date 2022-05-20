module.exports = (err, files, client) => {
  console.log(`\n---BUTTONS---`)
  if (err) return console.error(err);
  files.forEach((file) => {
    const buttonsFunction = require(`./../buttons/${file}`);
    if (buttonsFunction.disabled) return;
    console.log(`${file}`)
    client.buttons.set(buttonsFunction.name,buttonsFunction)

    const event = buttonsFunction.event || file.split(".")[0];
    const emitter =
      (typeof buttonsFunction.emitter === "string"
        ? client[buttonsFunction.emitter]
        : buttonsFunction.emitter) || client;
    const once = buttonsFunction.once;

    try {
      emitter[once ? "once" : "on"](event, (...args) =>
        buttonsFunction.execute(...args, client)
      );
    } catch (error) {
      console.error(error.stack);
    }
  });
};
