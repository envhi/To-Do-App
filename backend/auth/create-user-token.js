const jwt = require("jsonwebtoken");

const createUserToken = async (user, req, res) => {
  // sign vai criar um token com base nos 3 parametros
  const token = jwt.sign(
    // 1º parametro: payload, informações do usuário que seram usadas como parte do token gerado
    {
      id: user._id,
    },
    // 2º parametro: secret
    "testsecret",
    // 3º parametro: expire time
    // { expiresIn: 300}
  );


    return await token;
};

module.exports = createUserToken;
