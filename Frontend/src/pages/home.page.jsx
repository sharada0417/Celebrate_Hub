import Hero from '@/components/Hero'
import PlaceListing from '@/components/PlaceListing'
import React from 'react'

const Homepage = () => {
  return (
    <main>
      <div className="relative min-h-screen">
        <Hero />
        <img
          src="/assets/hero_image.jpg"
          alt=""
          className="absolute top-0 left-0 w-full h-[600px] object-cover -z-10 mb-10"
        />
         </div>
        <PlaceListing />
    </main>
  )
}

export default Homepage
