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
