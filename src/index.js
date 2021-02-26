const Discord = require('discord.js')
const i18n = require('i18n')
const path = require('path')
require('dotenv').config()
const campusCommand = require('./commands/campus/campus.command')
const channelCommand = require('./commands/channel/channel.command')
const techWatchCommand = require('./commands/techWatch')

i18n.configure({
  locales: ['en'],
  directory: path.join(__dirname, '/locales'),
  defaultLocale: 'en',
})

const client = new Discord.Client()
client.on('message', async function (message) {
  const prefix = '!'
  if (message.author.bot || !message.content.startsWith(prefix)) {
    return
  }

  const args = message.content.split(' ')
  if (!args.length) {
    return
  }
  const command = args.shift().substring(prefix.length).toLowerCase()

  switch (command) {
    case 'campus':
      campusCommand(message, args)
      break
    case 'channel':
      channelCommand(message, args)
      break
    case 'techwatch':
      techWatchCommand(message, args)
      break
  }
})

client.login(process.env.BOT_TOKEN)
