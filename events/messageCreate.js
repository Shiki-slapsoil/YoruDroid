"use-strict";

module.exports = (client, message) => {
  if(message.bot) return;

  const prefix = "`";
  const [pr, ...args] = message.content.split(/ +/);
  const userPrefix = pr.substr(0, prefix.length);
  const userCommand = pr.substr(prefix.length);

  if(userPrefix !== prefix) return;

  const command = client.commands.get(userCommand);

  if(!command) return;

  command.exec(message, args)
};
