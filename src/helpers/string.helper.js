require('dotenv').config()

exports.capitalizeName = (word) => {
  return word
    .split(' ')
    .map((name) =>
      name
        .split('-')
        .map((part) => part[0].toUpperCase() + part.slice(1).toLowerCase())
        .join('-')
    )
    .join(' ')
}

exports.urlRegexp = new RegExp(
  /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi
)
