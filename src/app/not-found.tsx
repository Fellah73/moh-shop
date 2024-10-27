import { Button } from '@headlessui/react'
import Link from 'next/link'
import React from 'react'

export default function notFound() {
  return (
    <div className="w-full h-screen flex justify-center items-center bg-gradient-to-l from-white to-green-700">
      <Link href={'/'} >
        <Button className="text-white bg-primary px-6 py-4 rounded-lg">
          Create a new case
        </Button>
      </Link>
    </div>
  )
}
