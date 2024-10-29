'use client'

import { Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useRef , useState} from 'react'

export default function AuthCallbackPage() {
    const router = useRouter()
    const hasFetched = useRef(false)
    const [configData, setConfigData] = useState<String | null>('') // Drapeau pour éviter les fetch multiples

    useEffect(() => {
        if (hasFetched.current) return // Empêcher un second fetch

        if (typeof window !== 'undefined') {
            const configId = localStorage.getItem('configurationId')
            localStorage.removeItem('configurationId')

            if (configId) {
                setConfigData(configId)
            }
                getUser() 

            hasFetched.current = true // Marquer le fetch comme effectué
        }
    }, [])
    {/* Fonction pour ajouter le user dnas la bdd*/ }
    const getUser = async () => {
        const res = await fetch(`/api/auth-db`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
        })

        const data = await res.json()

        if (data.success  === true  && configData) {

                  router.push(`/configure/preview?id=${configData}`)
        } else {
            router.push('/')
        }
    }

    return (
        <div className='w-full mt-24 flex justify-center'>
            <div className='flex flex-col items-center gap-2'>
                <Loader2 className='animate-spin text-gray-500 size-8' />
                <h3 className='font-semibold text-xl'>Logging you in ...</h3>
                <p>You will be redirected shortly</p>
            </div>
        </div>
    )
}
