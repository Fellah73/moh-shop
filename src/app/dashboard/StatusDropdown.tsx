'use client'

import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { Check, ChevronsUpDownIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';


export default function StatusDropdown({ id, status }: { id: string; status: string }) {
    const [orderStatus, setOrderStatus] = useState(status); // État du statut de la commande
    const router = useRouter(); // Router pour rafraîchir la page
    const statuses = ["fullfilled", "awaiting_shipment", "shipped"];
    // Fonction pour changer le statut de la commande
    const changeOrderStatus = async (newStatus: string) => {
        console.log('clicked', newStatus);
        try {
            const res = await fetch(`/api/order?orderId=${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ status: newStatus }),
            })

            if (!res.ok) {
                throw new Error('Failed to update order status');
            }
            const data = await res.json();

            console.log(data.message);

            setOrderStatus(newStatus); // Mise à jour de l'état local

            router.refresh(); // Rafraîchir la page
            
        } catch (error) {
            console.error('Failed to update order status');
        }
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-[200px] justify-between">
                    {orderStatus}
                    <ChevronsUpDownIcon className="ml-2 h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent>
                <DropdownMenuGroup>
                    {statuses.map((status) => (
                        <DropdownMenuItem
                            key={status}
                            onClick={() => changeOrderStatus(status)}
                            className={cn(
                                'flex text-sm gap-1 items-center p-2.5 cursor-default hover:bg-zinc-100',
                                {
                                    'bg-zinc-100': orderStatus === status,
                                }
                            )}
                        >
                            {status}
                            { orderStatus === status && <Check className="ml-auto h-4 w-4 text-green-500" />}
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
