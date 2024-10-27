import { db } from '@/app/db'
import { notFound } from 'next/navigation'
import DesignConfigurator from './DesignConfigurator'
interface PageProps {
  searchParams: {
    [key: string]: string | string[] | undefined
  }
}

export default async function page({ searchParams }: PageProps) {
   const { id } = searchParams
   if(!id || typeof id !== 'string'){
    return notFound()
   }

   const configuration = await db.configuration.findUnique({
    where:{id},
   })
   if(!configuration){
    return notFound()
   }

    const { width, height,imageUrl } = configuration
  return (
    <DesignConfigurator configId={configuration.id} imageUrl={imageUrl} imageDimensions={{width,height}}/>
  )
}
