const axios = require('axios');
const qs = require('qs');

const client_id = '8b8a8c66585b4376b70f7362c50fbdf0';  // Substitua pelo seu Client ID
const client_secret = 'f72310fabe114507b38b88988be9cc73';  // Substitua pelo seu Client Secret

const getToken = async () => {
  const token_url = 'https://accounts.spotify.com/api/token';
  const data = qs.stringify({ grant_type: 'client_credentials' });

  try {
    const response = await axios.post(token_url, data, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: 'Basic ' + Buffer.from(`${client_id}:${client_secret}`).toString('base64'),
      },
    });

    return response.data.access_token;  // Retorna o token
  } catch (error) {
    console.error('Erro ao obter token:', error.response.data);
  }
};
