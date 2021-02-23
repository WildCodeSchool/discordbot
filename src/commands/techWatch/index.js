const createLink = require('./createLink')
const getWeeklyLinks = require('./getWeeklyLinks')

const ADD = 'add'
const WEEKLY = 'weekly'

module.exports = async (message, args) => {
  const [action, link] = args

  const categoryWhereCommandWasSent = message.guild.channels.cache.get(
    message.channel.parentID
  ) // refers to the discord category (who got the campus name), to automate relation between posted links and campus

  switch (action) {
    case ADD:
      await createLink(message, link, categoryWhereCommandWasSent.name)
      break

    case WEEKLY:
      await getWeeklyLinks(message, categoryWhereCommandWasSent.name)
      break
  }
}
