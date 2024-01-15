import { createContext,useContext,useEffect,useMemo,useState } from 'react';
import axios from 'axios';
import {axiosReq, axiosRes} from "../api/axiosDefaults"
import { useNavigate } from 'react-router-dom';


export const currentUserContext = createContext();
export const setCurrentUserContext = createContext();

export const useCurrentUser = () => useContext(currentUserContext);
export const useSetCurrentUser = () => useContext(setCurrentUserContext);

export const CurrentUserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const history = useNavigate();

  const handleMount = async () => {
    try {
      const { data } = await axiosRes.get('dj-rest-auth/user/');
      setCurrentUser(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    handleMount();
  }, []);

  useEffect(() => {
    const requestInterceptor = axiosReq.interceptors.request.use(
      async (config) => {
        try {
          await axios.post('/dj-rest-auth/token/refresh');
        } catch (err) {
          setCurrentUser((prevCurrentUser) => {
            if (prevCurrentUser) {
              history('/signin');
            }
            return null;
          });
          return config;
        }
        return config;
      },
      (err) => Promise.reject(err)
    );

    const responseInterceptor = axiosRes.interceptors.response.use(
      (response) => response,
      async (err) => {
        if (err.response?.status === 401) {
          try {
            await axios.post('/dj-rest-auth/token/refresh/');
          } catch (err) {
            setCurrentUser((prevCurrentUser) => {
              if (prevCurrentUser) {
                history('/signin');
              }
              return null;
            });
            return Promise.reject(err);
          }
        }
        return Promise.reject(err);
      }
    );

    return () => {
      axiosReq.interceptors.request.eject(requestInterceptor);
      axiosRes.interceptors.response.eject(responseInterceptor);
    };
  }, [history]);

  return (
    <currentUserContext.Provider value={currentUser}>
      <setCurrentUserContext.Provider value={setCurrentUser}>
        {children}
      </setCurrentUserContext.Provider>
    </currentUserContext.Provider>
  );
};
