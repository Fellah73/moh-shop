import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import { Loader2 } from 'lucide-react'
import { redirect } from 'next/navigation'
import { db } from '../db'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { formatPrice } from '@/lib/utils'
import { Progress } from '@/components/ui/progress'
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import StatusDropdown from './StatusDropdown'

export default async function page() {

  const { getUser } = getKindeServerSession()
  const user = await getUser()

  if (user?.email! !== process.env.ADMIN_EMAIL && user?.email! !== process.env.ADMIN_EMAIL2) {
    return (
      <>
        <div className='w-full mt-24 flex justify-center'>
          <div className='flex flex-col items-center gap-2'>
            <Loader2 className='animate-spin text-gray-500 size-8' />
            <h3 className='font-semibold text-xl'>Logging you in ...</h3>
            <p>You will be redirected shortly</p>
          </div>
        </div>
        {redirect('/')}
      </>)
  }
  {/* les orders de la derniere semaine*/ }
  const orders = await db.order.findMany({
    where: {
      isPaid: true,
      createdAt: {
        gte: new Date(new Date().setDate(new Date().getDate() - 7))
      }
    },
    orderBy: {
      createdAt: 'desc'
    },
    include: {
      user: true,
      ShippingAdress: true,
    }
  })


  const globalLastWeekEarninig = await db.order.aggregate({
    where: {
      isPaid: true,
      createdAt: {
        gte: new Date(new Date().setDate(new Date().getDate() - 7))
      }
    },
    _sum: {
      amount: true
    }
  })

  const globalMonthlyEarninig = await db.order.aggregate({
    where: {
      isPaid: true,
      createdAt: {
        gte: new Date(new Date().setDate(new Date().getDate() - 30))
      }
    },
    _sum: {
      amount: true
    }
  })

  const WEEKLY_GOAL = 500
  const MONTHLY_GOAL = 1000

  return (

    <div className='flex min-h-screen w-full bg-muted/40'>
      <div className='max-w-7xl w-full mx-auto flex flex-col sm:gap-4 sm:py-4'>
        <div className='flex flex-col gap-16'>
          <div className='grid gap-4 sm:grid-cols-2'>
            <Card>
              <CardHeader className='pb-2'>
                <CardDescription>
                  Last Week
                </CardDescription>
                <CardTitle className='text-3xl'> {formatPrice(globalLastWeekEarninig._sum.amount!)} </CardTitle>
              </CardHeader>
              <CardContent>
                <div className='text-sm text-muted-foreground'> of {formatPrice(WEEKLY_GOAL)} goal </div>
              </CardContent>
              <CardFooter>
                <Progress value={(globalLastWeekEarninig._sum.amount! / WEEKLY_GOAL) * 100} />
              </CardFooter>
            </Card>
            <Card>
              <CardHeader className='pb-2'>
                <CardDescription>
                  Last Month
                </CardDescription>
                <CardTitle className='text-3xl'> {formatPrice(globalMonthlyEarninig._sum.amount!)} </CardTitle>
              </CardHeader>
              <CardContent>
                <div className='text-sm text-muted-foreground'> of {formatPrice(MONTHLY_GOAL)} goal </div>
              </CardContent>
              <CardFooter>
                <Progress value={(globalMonthlyEarninig._sum.amount! / MONTHLY_GOAL) * 100} />
              </CardFooter>
            </Card>
          </div>
          <h1 className='text-4xl font-bold tracking-tight'>
            Incoming orders
          </h1>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Customer</TableHead>
              <TableHead className='hidden sm:table-cell'>Status</TableHead>
              <TableHead className='hidden sm:table-cell'>Purchae Date</TableHead>
              <TableHead className='text-right'>amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {
              orders.map((order, key) => (
                <TableRow key={key}>
                  <TableCell >
                    <div>
                      {order.ShippingAdress?.name}
                    </div>
                    <div className='text-sm text-muted-foreground hidden sm:inline'>
                      {order.user?.email}
                    </div>
                  </TableCell>
                  <TableCell className='hidden sm:table-cell'>
                    <StatusDropdown id={order.id!} status={order.status!} />
                  </TableCell>
                  <TableCell className='hidden sm:table-cell'>{order.createdAt.toLocaleDateString()}</TableCell>
                  <TableCell className='font-semibold text-right'>{formatPrice(order.amount)} </TableCell>
                </TableRow>
              ))
            }
            
          </TableBody>
          <TableFooter className='text-muted-foreground'>
            <TableCell colSpan={3} className='py-4  lg:pl-[35%]'> Number of orders {orders.length}</TableCell>
            <TableCell className='font-bold text-right py-4'>{formatPrice(globalLastWeekEarninig._sum.amount!)} </TableCell>
          </TableFooter>
        </Table>

      </div>
    </div>

  )
}