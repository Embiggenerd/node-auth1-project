const encryptPass = crypt => async (pass) => crypt.hashSync(pass, 14)


module.exports = (crypt) => ({
    encryptPass: encryptPass(crypt)
})