import { db } from '@/app/db'
import { notFound } from 'next/navigation'
import DesignPreview from './DesignPreview'
interface PageProps {
    searchParams: {
        [key: string]: string | string[] | undefined
    }
}
export default async function page({ searchParams }: PageProps) {
    const { id } = searchParams
    if (!id || typeof id !== 'string') {
        return notFound()
    }

    console.log('le id est ', id)

    const findedConfuguration = await db.configuration.findUnique({
        where: { id },
    })
    console.log(findedConfuguration)
    if (!findedConfuguration) {
        return notFound()
    }

    return (
        <DesignPreview configuration={findedConfuguration} />
    )
}
