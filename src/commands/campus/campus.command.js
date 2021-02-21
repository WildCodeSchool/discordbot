const Discord = require('discord.js')
const i18n = require('i18n')
const { capitalizeName } = require('../../helpers/string.helper')
const {
  MESSAGE_LIMIT,
  CAMPUS_COLOR,
  DEFAULT_CHANNEL,
} = require('./campus.constant')

module.exports = async (message, args) => {
  const { channel, member } = message
  const { type } = channel

  if (type == 'dm') {
    message.author.send(
      i18n.__(
        "You can't send command in direct message, please type your command in the `#%s` channel.",
        DEFAULT_CHANNEL
      )
    )
    return
  } else {
    message.delete()
  }

  const roles = message.guild.roles.cache
    .array()
    .filter((role) => role.color === CAMPUS_COLOR)
  const rolesName = roles.map((role) => role.name)

  if (args.length < 3 || args[0] === 'h' || args[0] === 'help') {
    const help = new Discord.MessageEmbed().addFields({
      name: i18n.__('Campus assignment'),
      value: i18n.__(
        '`!campus xyz firstname lastname`\n- assign you to the campus *XYZ*\n- edit your nickname as *[XYZ] Firstname Lastname*\n\nYou need to choose a campus among: \n%s.',
        rolesName.join(', ')
      ),
    })
    message.author.send(help)
  } else if (member.roles.cache.some((role) => rolesName.includes(role.name))) {
    message.author.send(
      i18n.__(
        'You already have a campus assigned, please contact your trainer or campus manager to fix this!'
      )
    )
  } else {
    const campusName = args.shift().toUpperCase()
    const campus = roles.find((role) => role.name === campusName)
    if (campus) {
      try {
        await member.roles.add(campus)
        await member.setNickname(
          `[${campus.name}] ${capitalizeName(args.join(' '))}`
        )
        message.author.send(
          i18n.__(
            "Good job %1$s, you've been assigned to campus %2$s.",
            capitalizeName(args.join(' ')),
            campus.name
          )
        )
      } catch (error) {
        message.author.send(error.toString().substring(0, MESSAGE_LIMIT))
      }
    } else {
      message.author.send(
        i18n.__(
          'No campus %1$s found among %2$s.',
          campusName,
          rolesName.join(', ')
        )
      )
    }
  }
}
