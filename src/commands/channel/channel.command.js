const Discord = require('discord.js')
const i18n = require('i18n')
const { STAFF_ROLE, DEFAULT_CHANNEL } = require('./channel.constant')

module.exports = async (message, quotedArgs) => {
  const {
    guild: server,
    channel: { type },
    member,
  } = message

  if (type == 'dm') {
    message.author.send(
      i18n.__(
        "You can't send command in direct message, please type your command in the `#%s` channel.",
        DEFAULT_CHANNEL
      )
    )
    return
  }
  let args = quotedArgs.join(' ').match(/"([^"]*)"|\S+/g)
  args = args ? args.map((arg) => arg.replace(/"/g, '')) : []

  if (member.roles.cache.find((role) => role.name === STAFF_ROLE)) {
    if (args.length < 4 || args[0] === 'h' || args[0] === 'help') {
      const help = new Discord.MessageEmbed().addFields({
        name: i18n.__('Channel administration'),
        value: i18n.__(
          '`!channel campus action type name`\n- replace *campus* with your campus full name, eg: "REMOTE FR"\n- replace *action* with **create**, **rename** or **delete**\n- replace *type* with **text** or **voice**\n- replace *name* with the channel name\n\nEg:\n- `!channel "REMOTE FR" create voice "Let\'s chat"`\n- `!channel NANTES delete text introduce-me`\n- `!channel TOULOUSE rename voice "Pain au chocolat" Chocolatine`\n\nVoice channel can have spaces and special characters, text channels will be automatically *slugify*, eg: *"Pizza Time!"* will become *pizza-time*.'
        ),
      })
      message.author.send(help)
    } else {
      const categoryName = args.shift().toUpperCase()
      const category = server.channels.cache.find(
        (channel) =>
          channel.name.toUpperCase() === categoryName &&
          channel.type === 'category'
      )
      if (category) {
        const action = args.shift()
        const type = args.shift().toLowerCase() === 'voice' ? 'voice' : 'text'
        const name = args.shift()

        switch (action) {
          case 'create':
            server.channels
              .create(name, {
                type: type,
                parent: category.id,
              })
              .catch(console.error)
            message.author.send(i18n.__('Channel **%s** created.', name))
            break
          case 'delete':
            const deleteChannel = server.channels.cache.find(
              (channel) =>
                channel.name.toLowerCase() === name.toLowerCase() &&
                channel.type === type &&
                channel.parent &&
                channel.parent.id === category.id
            )
            if (deleteChannel) {
              deleteChannel.delete().catch(console.error)
              message.author.send(i18n.__('Channel **%s** deleted.', name))
            } else {
              message.author.send(
                i18n.__(
                  'No %1$s channel **%2$s** found in category **%3$s**.',
                  type,
                  name,
                  categoryName
                )
              )
            }
            break
          case 'rename':
            if (!args || args.length < 1) {
              message.author.send(
                i18n.__(
                  'You need to specify a newchannel name, eg: `!channel campus rename type old-name new-name`'
                )
              )
              return
            }
            const newName = args.shift()
            const existingChannel = server.channels.cache.find(
              (channel) =>
                channel.name.toLowerCase() === newName.toLowerCase() &&
                channel.type === type &&
                channel.parent &&
                channel.parent.id === category.id
            )
            if (existingChannel) {
              message.author.send(
                i18n.__(
                  'Channel **%1$s** already exists in category **%2$s**!',
                  newName,
                  categoryName
                )
              )
              return
            }
            const renameChannel = server.channels.cache.find(
              (channel) =>
                channel.name.toLowerCase() === name.toLowerCase() &&
                channel.type === type &&
                channel.parent &&
                channel.parent.id === category.id
            )
            if (renameChannel) {
              renameChannel.setName(newName).catch(console.error)
              message.author.send(
                i18n.__('Channel **%1$s** renamed to **%2$s**.', name, newName)
              )
            } else {
              message.author.send(
                i18n.__(
                  'No %1$s channel **%2$s** found in category **%3$s**.',
                  type,
                  name,
                  categoryName
                )
              )
            }
            break
        }
      } else {
        message.author.send(i18n.__('No category **%s** found.', categoryName))
      }
    }
  }
}
