import { Toaster } from '@/components/ui/sonner'
import React from 'react'
import { Outlet } from 'react-router-dom'

const Rootlayout = () => {
  return (
    <div>
      <Outlet/>
      <Toaster/>
    </div>
  )
}

export default Rootlayout
