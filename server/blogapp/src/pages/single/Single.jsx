import React from 'react'
import './single.css'
import Sidebar from '../../components/Sidebar/Sidebar'
import Singlepost from '../../components/singlePost/Singlepost'
export default function Single() {
  return (
    <div className='single'>
        {/* post */}
        <Singlepost></Singlepost>
        <Sidebar></Sidebar>
    </div>
  )
}
