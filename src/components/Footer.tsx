import React from 'react'
import MaxWidthWrapper from './MaxWidthWrapper'
import Link from 'next/link'

export default function Footer() {
    return (
        <footer className='bg-white h-20 relative'>
            <MaxWidthWrapper>
                <div className='border-t border-gray-200' />
                <div className='h-full flex flex-col justify-center items-center ite md:flex-row md:justify-between'>
                    <div className='text-center md:text-left pb-2 md:pb-0'>
                        <p className='text-sm text-muted-foreground'>
                            &copy; {new Date().getFullYear()} All rights reserved.
                        </p>
                    </div>
                    <div className='flex flex-col md:flex-row space-y-2 md:space-x-7 items-center justify-center'>
                        <Link href='#' className='text-sm text-muted-foreground'>Terms</Link>
                        <Link href='#' className='text-sm text-muted-foreground'>Privacy Policy</Link>
                        <Link href='#' className='text-sm text-muted-foreground'>Cookie Policy</Link>
                    </div>
                </div>
            </MaxWidthWrapper>
        </footer>
    )
}
