const { getWeek } = require('date-fns')
const db = require('../../../prisma/prismaClient')
const { urlRegexp } = require('../../helpers/string.helper')

async function createLink(message, link, city) {
  try {
    if (!link || !link.match(urlRegexp)) {
      throw new Error('Please send a real url')
    }
    const linkCount = await db.link.count({
      where: {
        link,
        AND: {
          campus: {
            city,
          },
        },
      },
    })

    if (linkCount > 0) {
      throw new Error('This link has already been sent !')
    }

    await db.link.create({
      data: {
        link,
        weekNo: getWeek(new Date()),
        campus: {
          connectOrCreate: {
            create: {
              city,
            },
            where: {
              city,
            },
          },
        },
        wilder: {
          connectOrCreate: {
            create: {
              username: message.author.username,
              id: message.author.id,
              campus: {
                connectOrCreate: {
                  create: {
                    city,
                  },
                  where: {
                    city,
                  },
                },
              },
            },
            where: {
              id: message.author.id,
            },
          },
        },
      },
    })

    return message.channel.send('successfully added !')
  } catch (error) {
    if (error.code === 'P2002') {
      return message.channel.send('This resource has already been sent !')
    }

    return message.channel.send(error.message)
  }
}

module.exports = createLink
