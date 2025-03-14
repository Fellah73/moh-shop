import React from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog'
import Image from 'next/image'
import { LoginLink, RegisterLink } from '@kinde-oss/kinde-auth-nextjs'
import { buttonVariants } from './ui/button'

export default function LoginModal({
  isOpen,
  setIsOpen,
}:
  {
    isOpen: boolean,
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  }) {
  return (
    <Dialog onOpenChange={setIsOpen} open={isOpen}>
      <DialogContent className='absolute z-[90]'>
        <DialogHeader>
          <div className='relative mx-auto size-24 mb-2'>
            <Image className='object-contain' src='/snake-1.png' alt='your image' fill />
          </div>
          <DialogTitle className='text-3xl text-center font-bold tracking-tight text-gray-950'>
            Log in to continue
          </DialogTitle>
          <DialogDescription className='text-base text-center py-2'>
            <span className='text-gray-950 font-medium'>
              Your configuration was saved.
            </span>{' '} Please login or create an account to complete your purchase
          </DialogDescription>
        </DialogHeader>
        <div className='grid grid-cols-2 gap-6 divide-x divide-gray-200'>
          <LoginLink className={buttonVariants({ variant: 'outline' })} >
            Login
          </LoginLink>
          <RegisterLink className={buttonVariants({ variant: 'default' })} >
            Register
          </RegisterLink>

        </div>
      </DialogContent>
    </Dialog>
  )
}
