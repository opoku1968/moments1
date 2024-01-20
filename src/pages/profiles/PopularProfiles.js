import React, { useEffect, useState } from 'react';
import appstyles from "../../App.module.css"
import { Container } from 'react-bootstrap';
import axios from 'axios';
import { axiosReq } from '../../api/axiosDefaults';
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import Asset from '../../components/Asset';
import Profile from './Pofile';

const PopularProfiles = ({mobile}) => {
    const  [profileData,setProfileData] = useState({
        pageProfile: {results: []},
        PopularProfiles: {results: []}
    })
    const {PopularProfiles} = profileData;
    const currentUser = useCurrentUser()

    useEffect(() => {
        const handleMount = async () => {
            try{
                const {data} = await axiosReq.get('/profiles/?ordering=-followers_count')
                setProfileData(prevState =>({
                    ...prevState,
                    PopularProfiles:data,
                    
                }))
                console.log(PopularProfiles.results)
                
              
                // console.log(profile.id)
            }
            catch(err){
                console.log(TypeError);

            }
        }
        handleMount()
    },[currentUser])
 

  return (
    <Container className={`${appstyles.Content} ${mobile && 'd-lg-none text-center mb-3'}`}>
        {PopularProfiles.results.length ? (
            <>
        <p>Most followed profiles.</p>
        {mobile ? (
            <div className='d-flx justify-content-around'>
                 {PopularProfiles.results.slice(0,4).map((profile) => (
           <Profile key={profile.id} profile={profile} mobile/>

        ))}
                
                 </div>
        ):(
            PopularProfiles.results.map((profile) => (
                <Profile key={profile.id} profile={profile}/>
    
            ))
        )}
        
        </>
        
        ):(
            <Asset spinner/>
        )}
    </Container >
  );
}

export default PopularProfiles;
