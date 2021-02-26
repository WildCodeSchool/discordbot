const { getWeek } = require('date-fns')
const db = require('../../../prisma/prismaClient')

async function getWeeklyLinks(message, city) {
  try {
    const links = await db.link.findMany({
      where: {
        weekNo: getWeek(new Date()),
        campus: {
          is: {
            city: city,
          },
        },
      },
      include: {
        wilder: {
          select: {
            username: true,
          },
        },
      },
    })

    return message.channel.send({
      embed: {
        thumbnail: {
          url: 'https://avatars.githubusercontent.com/u/8874047?s=280&v=4',
        },
        title: `**The weekly tech watch for ${city} !**`,
        fields: links.map(({ link, wilder }, i) => {
          return { name: `${i + 1}: ${wilder.username}`, value: link }
        }),
      },
    })
  } catch (error) {
    console.error(error)
    return message.channel.send(error)
  }
}

module.exports = getWeeklyLinks
