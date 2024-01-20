import axios from "axios"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

export const useRedirect = (userAuthStatus) => {
    const history = useNavigate()
    useEffect(() => {
        const handleMount = async() => {
            try {
                await axios.post('/dj-rest-auth/token/refresh/')
                if (userAuthStatus === 'loggedIn'){
                    history('/')
                }

            }catch(err){
                    if (userAuthStatus === 'loggedOut'){
                        history.apply('/')
                    }
            }
        }
        handleMount();

    },[history,userAuthStatus])

}