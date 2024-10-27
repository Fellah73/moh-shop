'use client'
import { Progress } from '@/components/ui/progress'
import { useToast } from '@/hooks/use-toast'
import { useUploadThing } from '@/lib/uploadthing'
import { cn } from '@/lib/utils'
import { Images, Loader2, MousePointerSquareDashed } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState, useTransition } from 'react'
import Dropzone, { FileRejection } from 'react-dropzone'
export default function page() {
    const { toast } = useToast()
    const [isDrageOver, setIsDrageOver] = useState<boolean>(false)
    const [uploadProgress, setUploadProgress] = useState<number>(33)
    const [isPanding, startTransition] = useTransition()
    const router = useRouter()

    const { startUpload,isUploading } = useUploadThing('imageUploader', {
        onClientUploadComplete: ([data]) => {
            const configId = data.serverData.configId
            startTransition(() => {
                router.push(`/configure/design?id=${configId}`)
            })
        },
        onUploadProgress: (progress) => {
            setUploadProgress(progress)
        }
    })

 

    const onDropRejected = (rejectedFiles: FileRejection[]) => {
        const [file] = rejectedFiles
        setIsDrageOver(false)
        toast({
            title: `${file.file.type} is not supported.`,
            description: 'Only PNG, JPG and JPEG are supported.',
            variant: 'destructive',
        })
    }
    const onDropAccepted = (acceptedFiles: File[]) => {
        startUpload(acceptedFiles, { configId: undefined })
        setIsDrageOver(false)
    }


    return (
        <div className={cn('relative h-full flex-1 my-16 w-full rounded-xl bg-gray-900/5 ring-1 ring-inset ring-gray-900/25 p-2 lg:rounded-2xl flex flex-col items-center ', {
            'ring-blue-900/15 bg-gray-900/15': isDrageOver
        })}>
            <div className='relative flex flex-1 flex-col items-center justify-center w-full'>
                <Dropzone
                    onDropAccepted={onDropAccepted}
                    onDropRejected={onDropRejected}
                    accept={{
                        'image/png': ['.png'],
                        'image/jpeg': ['.jpeg'],
                        'image/jpg': ['.jpg'],
                        'image/webp': ['.webp'],
                    }}
                    onDragEnter={() => setIsDrageOver(true)}
                    onDragLeave={() => setIsDrageOver(false)}
                >
                    {({ getRootProps, getInputProps }) => (
                        <div className="size-full flex-1 flex flex-col items-center justify-center" {...getRootProps()}>
                            <input {...getInputProps()} />

                            {
                                isDrageOver ?
                                    <MousePointerSquareDashed className='size-7 text-zinc-500 mb-2' />
                                    : isUploading || isPanding ?
                                        <Loader2 className='animate-spin text-zinc-500 size-7 mb-2' />
                                        : <Images className='size-7 text-zinc-500 mb-2' />
                            }
                            <div className='flex flex-col justify-center mb-2 text-sm text-zinc-600'>
                                {
                                    isUploading ? (
                                        <div className='flex flex-col items-center'>
                                            <p>Uploading ...</p>
                                            <Progress value={uploadProgress} className='mt-2 w-40 bg-gray-300' />
                                        </div>)
                                        : isPanding ? (
                                            <div className='flex flex-col items-center'>
                                                <p> Redirecting please wait ...</p>
                                            </div>
                                        ) : isDrageOver ? (
                                            <span className='font-semibold'>
                                                Drop your image here
                                            </span>
                                        ) : (
                                            <span className='font-semibold'>
                                                Click to upload and drag or drop
                                            </span>)
                                }
                            </div>
                            {
                                isPanding ? null :
                                    <p className='text-sm text-zinc-500'>WEBP ,PNG , JPG , JPEG</p>
                            }
                        </div>
                    )}

                </Dropzone>
            </div>

        </div>
    )
}
