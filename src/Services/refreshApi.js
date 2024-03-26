import {createRefresh} from 'react-auth-kit'
import Testnet from '../config/Testnet'
import apiRequest from "./apiRequest";
import EXPIRATION from "../config/Expiration"
const refreshApi = createRefresh({
    interval: 1,   // Refreshs the token in every 10 minutes
    refreshApiCallback: async (
        {   // arguments
            authToken,
            authTokenExpireAt,
            refreshToken,
            refreshTokenExpiresAt,
            authUserState
        }) => {
        try {
            const result = await apiRequest(Testnet.REFRESH_URL, 'POST', '',authToken);
            if (result.status == 200) {
                const response = await result.json();
                console.log(response)
                document.cookie="Bearer=" + response.token;
                localStorage.setItem("bearer",response.token)
                return {
                    isSuccess: true,
                    newAuthToken: response.token,
                    newAuthTokenExpireIn: EXPIRATION.EXPIRATION_BEARER,
                    newRefreshToken: response.token,
                    newRefreshTokenExpiresIn: EXPIRATION.EXPIRATION_REFRESH_BEARER,
                }
            }
        }
        catch(error){
            console.error(error)
            return {
                isSuccess: false
            }
        }
    }
})

export default refreshApi