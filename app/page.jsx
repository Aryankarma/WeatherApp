import Link from 'next/link'
import React from 'react'

export default function Home(){
  return <div className='p-10 text-center justify-center items-center flex flex-col ...' >
      <Link href={"./weatherCurrent/"}>Redirect me to Weather App</Link>
    </div>
}