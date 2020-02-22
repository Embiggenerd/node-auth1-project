const encryptPass = crypt => pass => crypt.hashSync(pass, 14)

const comparePass = crypt => (newPass, hashedPass) => crypt.compareSync(newPass, hashedPass)

module.exports = (crypt) => ({
    encryptPass: encryptPass(crypt),
    comparePass: comparePass(crypt)
})