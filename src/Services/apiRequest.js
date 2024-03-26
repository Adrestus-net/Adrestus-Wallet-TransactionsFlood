import JsonUtil from '../util/JsonUtil.js'

const apiRequest = async (url = '', type, data = null, authToken = "", response = null, errMsg = null) => {
    try {
        let response
        if (data != null) {
            const postOptions = {
                method: type,
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    //'Access-Control-Allow-Credentials': 'true',
                    //'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                    //'Access-Control-Allow-Headers': 'x-requested-with, Content-Type, origin, authorization, accept, client-security-token',
                    'Authorization': `Bearer ${authToken}`
                },
                body: JsonUtil.isJson(data) ? data : JSON.stringify(data)
            }
            response = await fetch(url, postOptions);
            console.log(response)
        } else {
            const getOptions = {
                method: type,
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    //'Access-Control-Allow-Credentials': 'true',
                    //'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                    //'Access-Control-Allow-Headers': 'x-requested-with, Content-Type, origin, authorization, accept, client-security-token',
                    'Authorization': `Bearer ${authToken}`
                },
            }
            response = await fetch(url, getOptions);
        }
        return response
    } catch (err) {
        errMsg = err.message;
        return errMsg;
    }
}

export default apiRequest;