async function logUserIn(phone, password) {
    try {
        return await axios.post("/api/public/auth/login", {
            phone_number: phone,
            password: password,
        });
    } catch (error) {
        // Don't log to console, just throw the error for the component to handle
        throw error;
    }
}
async function logUserOut() {
    try {
        return await axios.post("/api/public/auth/logout");
    } catch (error) {
        throw error;
    }
}
async function isAuthorized() {
    try {
        return await axios.post("/api/public/auth/verify");
    } catch (error) {
        if (error.response.status === 401) {
            return false;
        }
        throw error;
    }
}


export { logUserIn, logUserOut, isAuthorized };


