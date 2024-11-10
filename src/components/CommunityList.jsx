import axios from 'axios'
import React, { useEffect, useState } from 'react'
import CommunityListItem from './CommunityListItem'

export default function CommunityList() {
const [communities,setCommunities] = useState([])
useEffect(()=> {
    const getData = async ()=> {
        
        const response = await axios.get(`http://localhost:5000/communities`)
        setCommunities(response.data)
    }

    getData()

}, [])
  return (
    <div className="">
    {
        communities.map(c => {
            return <CommunityListItem name={c.name} id={c.id}/>
        })
    }
</div>
  )
}
