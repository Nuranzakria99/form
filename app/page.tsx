import Link from 'next/link'
import React from 'react'

export default function Home() {
  return (
    <>
    <div className='flex flex-col justify-center items-center text-4xl font-bold mt-44 space-y-10'>
    <Link href="/urgentformresic">Rasic Data</Link>
    <Link href="/urgentformcv">Career Values Data</Link>
    <Link href="/urgentformms">motivational skills Data</Link>
    </div>
    </>
  )
}
