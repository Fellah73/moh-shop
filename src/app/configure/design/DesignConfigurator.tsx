'use client'
import { cn, formatPrice } from '@/lib/utils'
import { AspectRatio } from '@radix-ui/react-aspect-ratio'
import { ScrollArea } from '@/components/ui/scroll-area'
import NextImage from 'next/image'
import { Rnd } from 'react-rnd'
import { RadioGroup } from '@headlessui/react'
import { useState, useEffect, useRef } from 'react'
import { COLORS, FINISHES, MATERIALS, MODELS } from '@/validators/option-validators'
import { Label } from '@/components/ui/label'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { ArrowRight, Check, CheckIcon, ChevronsUpDown, ChevronsUpDownIcon } from 'lucide-react'
import { BASE_PRICE } from '@/config/products'
import { useUploadThing } from '@/lib/uploadthing'
import { useToast } from '@/hooks/use-toast'
import { useRouter } from 'next/navigation'
export default function DesignConfigurator({ configId, imageUrl, imageDimensions }
    : {
        configId: string,
        imageUrl: string,
        imageDimensions: { width: number, height: number }
    }) {

    const router = useRouter()
    const { toast } = useToast()

    const ResizeHandleComponent = () => {
        return (
            <div className='size-5 rounded-full shadow border bg-zinc-300 border-zinc-900 transition hover:bg-primary' />
        );
    };

    const [options, setOptions] = useState<{
        colorEntry: (typeof COLORS)[number],
        modelEntry: (typeof MODELS.options)[number]
        material: (typeof MATERIALS.options)[number]
        finish: (typeof FINISHES.options)[number]
    }>({
        colorEntry: COLORS[0],
        modelEntry: MODELS.options[0],
        material: MATERIALS.options[0],
        finish: FINISHES.options[1],
    })

    const [renderedDimension, setRenderedDimension] = useState({
        width: imageDimensions.width / 3,
        height: imageDimensions.height / 4
    })

    const [renderedPosition, setRenderedPosition] = useState({
        x: 100,
        y: 50
    })

    const phoneRef = useRef<HTMLDivElement>(null)
    const containerRef = useRef<HTMLDivElement>(null)

    const { startUpload } = useUploadThing('imageUploader')


    useEffect(() => {
        console.log('renderedDimension', renderedDimension)
        console.log('renderedPosition', renderedPosition)
    }, [renderedPosition, renderedDimension])


    async function saveConfiguration() {

        try {
            const { left: caseLeft, top: caseTop, width, height } = phoneRef.current!.getBoundingClientRect()
            const { left: containerLeft, top: containerTop } = containerRef.current!.getBoundingClientRect()
            {/* position du phone dans le container*/ }
            const leftOffset = caseLeft - containerLeft
            const topOffset = caseTop - containerTop

            {/* postition de l'image dans le phone*/ }

            const actualX = renderedPosition.x - leftOffset
            const actualY = renderedPosition.y - topOffset


            const canvas = document.createElement('canvas')
            canvas.width = width
            canvas.height = height
            const ctx = canvas.getContext('2d')
            const userImage = new Image()
            userImage.crossOrigin = 'anonymous'
            userImage.src = imageUrl
            await new Promise((resolve) => { userImage.onload = resolve })
            ctx?.drawImage(
                userImage,
                actualX,
                actualY,
                renderedDimension.width,
                renderedDimension.height
            )
            const base64Data = canvas.toDataURL().split(',')[1]

            const blob = base64ToBlob(base64Data, 'image/png')
            const file = new File([blob], 'filename.png', { type: 'image/png' })

            await startUpload([file], { configId })

            const res = await fetch('/api/design', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: configId,
                    model: options.modelEntry.value,
                    color: options.colorEntry.value,
                    material: options.material.value,
                    finish: options.finish.value,
                })
            })
            const data = await res.json()
            {/* probleme pour passer les donneé à la database */ }
            if (data.message == "Server error") {
                toast({
                    title: 'Error',
                    description: 'Error in POST request , Please try again',
                    variant: 'destructive',
                })
            } else {
                router.push(`/configure/preview?id=${configId}`)
            }

        } catch (err) {
            toast({
                title: 'Error',
                description: 'Error , Please try again',
                variant: 'destructive',
            })
        }
    }


    function base64ToBlob(base64: string, mineType: string) {
        const byteCharacters = atob(base64);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray], { type: mineType });
        return blob
    }

    return (
        <div className='relative mt-20 grid grid-cols-1 lg:grid-cols-3 mb-20 pb-20 '>
            <div className='relative h-[37.5rem] overflow-hidden col-span-2 w-full
                            max-w-4xl flex items-center justify-center rounded-lg border-2 border-dashed border-gray-400
                            p-12 text-center focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2'
                ref={containerRef}>
                <div className='relative w-60 bg-opacity-50 pointer-events-none aspect-[869/1813]'>
                    <AspectRatio ratio={869 / 1813}
                        ref={phoneRef}
                        className='pointer-events-none relative z-50 aspect-[869/1813]'>
                        <NextImage
                            alt='your phone'
                            src='/phone-template.png'
                            fill
                            className='pointer-events-none z-50 select-none' />
                    </AspectRatio>
                    <div className='absolute z-40 inset-0 left-[3px] top-px right-[3px] bottom-px rounded-[32px] 
                             shadow-[0_0_0_99999px_rgba(229,231,325,0.6)] '/>

                    <div className={cn('absolute inset-0 left-[3px] top-px right-[3px] bottom-px rounded-[32px]', {
                        'bg-black': options.colorEntry === COLORS[0],
                        'bg-orange-700': options.colorEntry === COLORS[1],
                        'bg-red-800': options.colorEntry === COLORS[2],
                        'bg-blue-800': options.colorEntry === COLORS[3],
                        'bg-zinc-300': options.colorEntry === COLORS[4],
                    })} />
                </div>
                <Rnd
                    className='absolute z-20 border-[3px] border-primary'

                    default={{
                        x: 100,
                        y: 50,
                        width: imageDimensions.width / 3,
                        height: imageDimensions.height / 4,
                    }}

                    onResizeStop={(_, __, ref, ___, { x, y }) => {
                        setRenderedDimension({
                            //50px => 50
                            height: parseInt(ref.style.height.slice(0, -2)),
                            width: parseInt(ref.style.width.slice(0, -2)),
                        })
                        setRenderedPosition({ x, y })
                    }}

                    onDragStop={(_, data) => {
                        const { x, y } = data
                        setRenderedPosition({ x, y })
                    }}

                    resizeHandleComponent={{
                        bottomRight: <ResizeHandleComponent />,
                        bottomLeft: <ResizeHandleComponent />,
                        topRight: <ResizeHandleComponent />,
                        topLeft: <ResizeHandleComponent />,

                    }}


                >
                    <div className='relative size-full'>
                        <NextImage
                            src={imageUrl}
                            alt='your phone'
                            fill
                            className='pointer-events-none' />
                    </div>
                </Rnd>
            </div>
            <div className='h-[37.5rem] w-full col-span-full lg:col-span-1 flex flex-col bg-white'>
                <ScrollArea className='relative flex-1 overflow-auto'>
                    <div aria-hidden='true' className='absolute z-10 inset-x-0 bottom-0 h-12 
                     bg-gradient-to-t from-white pointer-events-none'/>
                    <div className='px-8 py-10'>
                        <h2 className='tracking-tight text-3xl font-bold'>
                            Customize your case
                        </h2>
                        <div className='w-full h-px bg-zinc-200 my-6' />
                        <div className='relative mt-4 h-full flex flex-col justify-between'>
                            <div className='flex flex-col gap-y-6'>
                                <RadioGroup
                                    value={options.colorEntry}
                                    onChange={(value) => setOptions((prev) => ({ ...prev, colorEntry: value }))}>
                                    <Label className='text-sm'>
                                        Color : {options.colorEntry.Label}
                                    </Label>
                                    <div className='mt-3 flex items-center space-x-0'>
                                        {
                                            COLORS.map((color) => {
                                                return (
                                                    <RadioGroup.Option value={color}
                                                        key={color.Label}
                                                        className={({ checked, active }) => cn('relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 active:ring-0 focus:ring-0 active:outline-none focus:outline-none border-2 border-transparent', {
                                                            [`border-${color.tw}`]: checked || active
                                                        })}>
                                                        <span
                                                            className={cn(
                                                                'h-8 w-8 rounded-full border-opacity-10', {
                                                                'bg-zinc-900 active:border-zinc-900': color.tw === 'zinc-900',
                                                                'bg-zinc-300 active:border-zinc-400': color.tw === 'zinc-300',
                                                                'bg-red-800 active:border-red-800': color.tw === 'red-800',
                                                                'bg-blue-800 active:border-blue-800': color.tw === 'blue-800',
                                                                'bg-orange-700 active:border-orange-500': color.tw === 'orange-500',
                                                            }
                                                            )}
                                                        />

                                                    </RadioGroup.Option>
                                                );
                                            })
                                        }
                                    </div>

                                </RadioGroup>
                                <div className='relative flex flex-col gap-3 w-full'>
                                    <Label>Model </Label>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant='outline' role='combobox' className='w-full justify-between'>
                                                {options.modelEntry.label}
                                                <ChevronsUpDown className='size-4 shrink-0 opacity-50' />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent>
                                            {
                                                MODELS.options.map((model) => {
                                                    return (
                                                        <DropdownMenuItem key={model.label}
                                                            className={cn('flex items-center text-sm gap-1 p-2 cursor-default hover:bg-zinc-300', {
                                                                'bg-zinc-100': model.label === options.modelEntry.label
                                                            })}
                                                            onClick={() => {
                                                                setOptions((prev) => ({ ...prev, modelEntry: model }));
                                                            }}>
                                                            <Check
                                                                className={cn('size-4 mr-2',
                                                                    model.label === options.modelEntry.label ?
                                                                        'opacity-100'
                                                                        : 'opacity-0'
                                                                )} />
                                                            {model.label}
                                                        </DropdownMenuItem>
                                                    )
                                                })
                                            }
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>
                                {[MATERIALS, FINISHES].map(
                                    ({ name, options: selectableOptions }) => (
                                        <RadioGroup
                                            key={name}
                                            value={options[name as keyof typeof options]}
                                            onChange={(val) => {
                                                setOptions((prev) => ({
                                                    ...prev,
                                                    [name]: val,
                                                }))
                                            }}>
                                            <Label>
                                                {name.slice(0, 1).toUpperCase() + name.slice(1)}
                                                <div className='mt-3 space-y-4'>
                                                    {
                                                        selectableOptions.map((option) => (
                                                            <RadioGroup.Option key={option.value} value={option}
                                                                className={({ checked, active }) =>
                                                                    cn('relative block cursor-pointer rounded-lg bg-white px-6 py-4 shadow-sm border-2 border-zinc-200 outline-none focus:outline-none ring-0 focus:ring-0 sm:flex sm:justify-between', {
                                                                        'border-primary': checked || active,
                                                                    })
                                                                }>
                                                                <span className='flex items-center'>
                                                                    <span className='flex flex-col text-sm'>
                                                                        <RadioGroup.Label className='font-medium text-black' as='span'>
                                                                            {option.label}
                                                                        </RadioGroup.Label>

                                                                        {
                                                                            option.descriptoin && (
                                                                                <RadioGroup.Description as='span' className='text-gray-500'>
                                                                                    <span className='block sm:inline'>{option.descriptoin}</span>
                                                                                </RadioGroup.Description>
                                                                            )
                                                                        }
                                                                    </span>
                                                                </span>
                                                                <RadioGroup.Description as='span' className='mt-2 flex text-sm sm:ml-4 sm:mt-0 sm:flex-col sm:text-right'>
                                                                    <span className='flex font-medium text-gray-900'>
                                                                        {formatPrice(option.price / 100)}
                                                                    </span>
                                                                </RadioGroup.Description>
                                                            </RadioGroup.Option>
                                                        ))
                                                    }
                                                </div>
                                            </Label>
                                        </RadioGroup>
                                    ))}
                            </div>
                        </div>
                    </div>
                </ScrollArea>
                <div className='w-full px-8 h-16  bg-white'>
                    <div className='h-px w-full bg-zinc-300' />
                    <div className='size-full flex justify-end items-center'>
                        <div className='w-full flex gap-6 items-center'>
                            <p className='font-medium whitespace-nowrap'>
                                {formatPrice((BASE_PRICE + options.finish.price + options.material.price) / 100)}
                            </p>
                            <Button onClick={saveConfiguration}
                                size='sm' className='w-full' isLoading={true} loadingText='Loading' >
                                Continue
                                <ArrowRight className='size-4 ml-2 inline' />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
