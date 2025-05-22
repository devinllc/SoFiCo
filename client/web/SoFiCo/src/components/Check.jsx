import React, { useEffect, useState } from 'react'
import axios from '../utils/axios'

function Check() {
    const [users, setUsers] = useState(null);
    const allUsers = async ()=>{
        try{
            const {data} = axios("/auth/users")
            console.log(data)
        }catch (err){
            console.log(err)
        }
    }
    useEffect(()=>{
        allUsers()
    }, [])

  return (
    <div className='bg-white min-h-50'>
        <h1>Hello Admin</h1>
    </div>
  )
}

export default Check