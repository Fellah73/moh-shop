import { cn } from '@/lib/utils'
import React from 'react'
interface PhoneProps extends React.HTMLAttributes<HTMLDivElement> {
    imgSrc: string
    dark?: boolean
}
export default function Phone({ imgSrc, className, dark = false, ...props }: PhoneProps) {
    return (
        <div className={cn("relative pointer-events-none z-50 overflow-hidden", className)} {...props}>
            <img src={dark ? '/phone-template-dark-edges.png' : 'phone-template-white-edges.png'} 
                className='pointer-events-none z-50' />
            <div className='absolute -z-10 inset-0'>
                <img className='object-cover min-h-full min-w-full' src={imgSrc} alt='your image' />
            </div>
        </div>
    )
}
