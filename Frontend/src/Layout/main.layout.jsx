import Navigation from '@/components/Navigation'
import React from 'react'
import { Outlet } from 'react-router'

const Mainlayout = () => {
  return (
    <div>
        <Navigation />
        <Outlet/>
    </div>
  )
}

export default Mainlayout
