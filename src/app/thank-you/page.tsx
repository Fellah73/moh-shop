'use client'
import { useEffect, useState, useRef, Suspense } from 'react';
import ThankYou from './ThankYou';
import { Loader2 } from 'lucide-react';

interface PageProps {
  searchParams: {
    [key: string]: string | undefined;
  };
}

export default function Page({ searchParams }: PageProps) {
  const { orederId } = searchParams;
  const hasFetched = useRef(false);

  // Gestion des états
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);


  const getOrder = async () => {
    try {
      const res = await fetch(`http://localhost:3000/api/order?orderId=${orederId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const result = await res.json();

      if (result.success === false) {
        setError(result.message);
      } else {
        setData(result.data);
      }


    } catch (err) {

      setError('An error occurred while fetching data.');

    } finally {
      setLoading(false);
    }
  };

  // Utilisation de useEffect pour appeler la fonction une seule fois
  useEffect(() => {
    if (hasFetched.current) return;
    getOrder();
    hasFetched.current = true

  }, []);

  // Affichage en fonction de l'état
  if (loading) {
    return <div className='w-full mt-24 flex justify-center'>
      <div className='flex flex-col items-center gap-2'>
        <Loader2 className='animate-spin text-primary size-12' />
        <h3 className='font-semibold text-xl'>Fetchin your order ...</h3>
        <p>The data will be available in a few seconds</p>
      </div>
    </div>
  }

  if (error) {
    return <div>No data found: {error}</div>;
  }

  return (
    <Suspense>
      <ThankYou order={data} />
    </Suspense>

  );
}
