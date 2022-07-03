const brypt = require('bcryptjs')

const tools = {
  enbcrypt(password) {
    var salt = brypt.genSaltSync(10)
    var hash = brypt.hashSync(password, salt)
    return hash
  },
}

module.exports = tools
