import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import MaxWidthWrapper from './MaxWidthWrapper'
import { buttonVariants } from './ui/button'

export default async function Navbar() {
    const { getUser } = getKindeServerSession() 
    const user = await getUser()
    const isAdmin = user?.email === process.env.ADMIN_EMAIL  || user?.email === process.env.ADMIN_EMAIL2
    return (
        <>
            <nav className='sticky z-[100] top-0 w-full h-14 inset-x-0 border-b border-gray-200 bg-white/80 backdrop-blur-lg transition-all'>
                <MaxWidthWrapper className='flex h-14 items-center justify-between border-b border-zinc-200'>
                    <Link href='/' className='flex z-40 font-semibold '>
                        moh <span className='text-green-600'>{' '} shop</span>
                    </Link>
                    <div className='h-full flex items-center space-x-4'>
                        {
                            user ? (
                                <>
                                    <Link href='api/auth/logout' className={buttonVariants({ variant: 'ghost', size: 'sm' })}>
                                        Logout
                                    </Link>
                                    {
                                        isAdmin && (<Link href='api/' className={buttonVariants({ variant: 'ghost', size: 'sm' })}>
                                           💸 Dashbord
                                        </Link>)
                                    }
                                    <Link href='/configure/upload' className={buttonVariants({ variant: 'ghost', size: 'sm', className: 'hidden sm:flex items-center gap-1' })}>
                                        Create case
                                        <ArrowRight className='ml-2 size-5' />
                                    </Link>

                                </>
                            ) : (
                                <>
                                    <Link href='api/auth/register' className={buttonVariants({ variant: 'ghost', size: 'sm' })}>
                                        Sign up
                                    </Link>
                                    <Link href='api/auth/login' className={buttonVariants({ variant: 'ghost', size: 'sm' })}>
                                        Login
                                    </Link>
                                    <div className='h-8 w-px bg-zinc-200 hidden sm:block' />

                                    <Link
                                        href='/configure/upload'
                                        className={buttonVariants({
                                            size: 'sm',
                                            className: 'hidden sm:flex items-center gap-1',
                                        })}>
                                        Create case
                                        <ArrowRight className='ml-1.5 h-5 w-5' />
                                    </Link>
                                </>
                            )
                        }

                    </div>
                </MaxWidthWrapper>
            </nav>
        </>
    )
}
