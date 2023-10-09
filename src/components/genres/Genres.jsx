import React from 'react'
import './style.scss'
import { useSelector } from 'react-redux'
export default function Genres({data}) {
    const { genres } = useSelector((state)=>state.home)
  return (
    <div className='genres'>
      {data?.map((g)=>{
        if(!genres[g]?.name) return ;
        return (
            <div className="genre" key={g}>
                {genres[g]?.name}
            </div>
        )
      })}
    </div>
  )
}
