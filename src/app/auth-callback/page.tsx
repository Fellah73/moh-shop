'use client'
import { Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useRef } from 'react'

export default function AuthCallbackPage() {
    const router = useRouter()
    const hasFetched = useRef(false)

    useEffect(() => {
        const handleAuth = async () => {
            // Éviter les appels multiples
            if (hasFetched.current) return
            hasFetched.current = true

            try {
                // 1. D'abord, on vérifie/crée l'utilisateur dans la base de données
                const res = await fetch(`/api/auth-db`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                })
                const data = await res.json()

                // 2. Une fois l'utilisateur configuré, on vérifie s'il y a une configuration en attente
                if (data.success) {
                    const configId = localStorage.getItem('configurationId')
                    localStorage.removeItem('configurationId')

                    // Redirection basée sur l'existence d'une configuration
                    if (configId) {
                        router.push(`/configure/preview?id=${configId}`)
                    } else {
                        router.push('/')
                    }
                } else {
                    router.push('/')
                }
            } catch (error) {
                console.error('Auth error:', error)
                router.push('/')
            }
        }

        handleAuth()
    }, [router])

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