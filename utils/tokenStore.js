const tokenStore = {
    jwtToken: null,
};

async function saveToken(token) {
    tokenStore.jwtToken = token;
    console.log('Token saved in memory:', token);
}

async function getToken() {
    if (!tokenStore.jwtToken) {
        throw new Error('Token not found in memory. Please log in.');
    }
    return tokenStore.jwtToken;
}

module.exports = { saveToken, getToken };
