"use-strict";

module.exports = {
  name:"msg",
  exec: async (message, args) => {
    const content = args.join(" ");

    if(!message.member.permissions.has("MANAGE_GUILD")){
      return;
    };
    
    if(!content.length){
      return message.channel.send("**`Please provide a message`**");
    };

    await message.delete()

    return message.channel.send(content);
  }
}
