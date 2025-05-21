import axios from './axios';
import React, { useEffect, useState } from 'react'

function Context() {
    const [user, setuser] = useState(null);

    const getUser = async ()=>{
        try{
            const {data} = axios("/user")
        }catch (err) {
            console.log(err)
        }
    }
    useEffect(()=>{
        getUser();
    }, [])
  return (
    <div>
        <userContext.Provider value={[user, setuser]}>
            {props.children}
        </userContext.Provider>
    </div>
  )
}

export default Context