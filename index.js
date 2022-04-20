'use-strict';

require('dotenv').config();

const { readdirSync } = require('fs');
const { join } = require('path');
const { Client, Intents, Collection } = require('discord.js');
const client = new Client({
  intents: [ ...Object.values(Intents.FLAGS) ],
  presence: { status: 'dnd', activities: [{
      name: 'Dragon Raja',
      type: 'PLAYING',
  }]}
});

client.commands = new Collection();

const f = x => x.split('.').pop() === "js";

for (const command of readdirSync(join(__dirname, './commands')).filter(f)){
  const cmdFile = require(join(__dirname, './commands', command));
  const cmdName = cmdFile.name;
  client.commands.set(cmdName, cmdFile);
};

for (const event of readdirSync(join(__dirname, './events')).filter(f)){
  const evtFile = require(join(__dirname, './events', event));
  const evtName = event.split('.')[0];
  client.on(evtName, evtFile.bind(null, client));

};

client.once('ready', () => console.log(`${client.user.tag} is online`));

client.login(process.env.TOKEN);
