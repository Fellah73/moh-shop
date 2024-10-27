'use client'
import LoginModal from '@/components/LoginModal'
import Phone from '@/components/Phone'
import { Button } from '@/components/ui/button'
import { BASE_PRICE, PRODUCTS_PRICES } from '@/config/products'
import { useToast } from '@/hooks/use-toast'
import { cn, formatPrice } from '@/lib/utils'
import { FINISHES, MATERIALS, MODELS } from '@/validators/option-validators'
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs'
import { Configuration } from '@prisma/client'
import { ArrowRight, Check } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import Confetti from 'react-dom-confetti'


export default function DesignPreview({ configuration }: { configuration: Configuration }) {
    const router = useRouter()
    const { toast } = useToast()
    const [showConfetti, setShowConfetti] = useState(false)
    const { color, model, material, finish } = configuration
    const modelLabel = MODELS.options.find((option) => option.value === model)?.label!
    const materialLabel = MATERIALS.options.find(({ value }) => value === material)?.label!
    const finishLabel = FINISHES.options.find(({ value }) => value === finish)?.label!
    const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false)


    const { user } = useKindeBrowserClient()
 



    const getMaterial = () => {
        if (material === 'silicone') {
            return PRODUCTS_PRICES.material.silicone
        } else {
            return PRODUCTS_PRICES.material.polycarbonate
        }
    }
    const getFinish = () => {
        if (finish === 'textured') {
            return PRODUCTS_PRICES.finish.textured
        } else {
            return PRODUCTS_PRICES.finish.smooth
        }
    }

    const handleChckout = () => {
        if (user) {
            handleCheckOutSession()
        } else {
            setIsLoginModalOpen(true)
            localStorage.setItem('configurationId',configuration.id)
        }
    }
    const handleCheckOutSession = async () => {
        const res = await fetch('/api/buy', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: configuration.id,
            })
        })
        const data = await res.json()
        if (data.url) {
            router.push(data.url)
        }
        else {

            if (data.message === 'Configuration not found') {
                router.push('api/auth/register')
            } else {
                toast({
                    title: "Error",
                    description: `${data.message}`,
                    variant: "destructive"
                })
            }
        }
    }

    useEffect(() => {
        setShowConfetti(true)
    }, [])

    return (
        <>
            <div aria-hidden="true"
                className='pointer-events-none select-none absolute inset-0 overflow-hidden flex justify-center'>
                <Confetti active={showConfetti}
                    config={{
                        angle: 60,
                        spread: 360,
                        startVelocity: 20,
                        elementCount: 170,
                        decay: 0.9,
                        width: "25px",
                        height: "15px",
                        colors: ["#a864fd", "#29cdff", "#78ff44", "#ff718d", "#fdff6a"],
                        duration: 8560
                    }} />
            </div>
            <LoginModal isOpen={isLoginModalOpen} setIsOpen={setIsLoginModalOpen} />
            <div className='mt-20 grid grid-cols-1 text-sm sm:grid-cols-12 sm:grid-rows-1 sm:gap-x-7 lg:gap-x-10'>
                <div className='sm:col-span-4 md:col-span-3 md:row-span-2 md:row-end-2'>
                    <Phone imgSrc={configuration.croppedImageUrl!} dark={true}
                        className={cn("max-w-[150px] md:max-w-full rounded-[38px]", {
                            'bg-orange-800': color === 'orange',
                            'bg-red-800': color === 'red',
                            'bg-blue-800': color === 'blue',
                            'bg-black': color === 'black',
                            'bg-zinc-300': color === 'white',
                        })} />
                </div>
                <div className='mt-6 sm:col-span-8 sm:mt-0 md:row-end-1'>
                    <h3 className='text-3xl font-bold tracking-tight text-gray-900'>
                        Your {modelLabel} Case
                    </h3>
                    <div className='mt-3 flex items-center gap-2 text-sm'>
                        <Check className='h-4 w-4 text-green-600' />
                        In stock and ready to chip
                    </div>
                </div>
                <div className='sm:col-span-12 md:col-span-9 text-base'>
                    <div className='grid grid-cols-1 py-8 border-b border-gray-200 sm:grid-cols-2 sm:gap-x-6 sm:py-6 md:py-10'>
                        <div>
                            <p className='text-black font-medium'>Highlights</p>
                            <ol className='list-disc text-zinc-700 list-inside mt-3'>
                                <li>Wirless charginh campatible</li>
                                <li>TPU chock absorption</li>
                                <li>packaging made from recycle material</li>
                                <li>5 year print warranty</li>
                            </ol>
                        </div>
                        <div>
                            <p className='text-black font-medium'>Matrials</p>
                            <ol className='list-disc text-zinc-700 list-inside mt-3'>
                                <li>High quality durable material</li>
                                <li>Scratch</li>
                                <li>packaging made from recycle material</li>
                                <li>5 year print warranty</li>
                            </ol>
                        </div>
                    </div>
                    <div className='mt-6'>
                        <div className='bg-gray-50 px-4 py-2 sm:rounded-lg sm:p-8'>
                            <div className='flex justify-between  items-center py-2 px-6'>
                                <h3 className='text-sm text-zinc-500'>Base Price</h3>
                                <h3 className='text-base text-black font-semibold'>{formatPrice(BASE_PRICE / 100)}</h3>
                            </div>
                            <div className='flex justify-between  items-center py-2 px-6'>
                                <h3 className='text-sm text-zinc-500'>{materialLabel}</h3>
                                <h3 className='text-base text-black font-semibold'>{formatPrice(getMaterial() / 100)}</h3>
                            </div>
                            <div className='flex justify-between  items-center py-2 px-6'>
                                <h3 className='text-sm text-zinc-500'> {finishLabel} </h3>
                                <h3 className='text-base text-black font-semibold'>{formatPrice(getFinish() / 100)}</h3>
                            </div>
                            <div className='h-[1px] bg-gray-400 w-full mb-2' />
                            <div className='flex justify-between  items-center py-4 px-4'>
                                <h3 className='text-lg text-black font-semibold'> Order Total </h3>
                                <h3 className='text-lg text-black font-semibold'>{formatPrice((getFinish() + getMaterial() + BASE_PRICE) / 100)}</h3>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            <div className='w-full flex items-center justify-end pb-12 px-2 mt-2'>
                <Button isLoading={true}
                    loadingText='loading'
                    onClick={handleChckout}
                    className="px-4 sm:px-6 lg:px-8">
                    Check out <ArrowRight className='ml-1 size-4 inline' />
                </Button>

            </div>

        </>
    )
}
