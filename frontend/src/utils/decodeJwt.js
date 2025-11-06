const decodeJWT = (token) => {
    try {
        const payload = token.split('.')[1];
        return JSON.parse(atob(payload));
    } catch (error) {
        console.error('Error decoding JWT:', error);
        return null;
    }
};

export default decodeJWT;