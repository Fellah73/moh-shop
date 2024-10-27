import { Icons } from "@/components/Icons";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Phone from "@/components/Phone";
import Reviews from "@/components/Reviews";
import { buttonVariants } from "@/components/ui/button";
import { ArrowRight, Check, Star } from "lucide-react";
import Link from "next/link";


export default function Home() {
  return (
    <div className="bg-slate-50 grainy-light">
      <section>
        <MaxWidthWrapper className='pb-24 pt-10 lg:grid lg:grid-cols-3 sm:pb-32 lg:gap-x-0 xl:gap-x-8 lg:pt-24 xl:pt-32 lg:pb-52'>
          <div className='col-span-2 px-6 lg:px-0 lg:pt-4'>
            <div className='relative mx-auto text-center lg:text-left flex flex-col items-center lg:items-start'>
              <div className='absolute w-28 left-0 -top-20 hidden lg:block'>
                {/* i forgot this div right here in the video, it's purely visual gradient and looks nice */}
                <div className='absolute inset-x-0 bottom-0 bg-gradient-to-t via-slate-50/50 from-slate-50 h-28' />
                <img src='/snake-1.png' className='w-full' />
              </div>
              <h1 className='relative w-fit tracking-tight text-balance mt-16 font-bold !leading-tight text-gray-900 text-5xl md:text-6xl lg:text-7xl'>
                Your Image on a{' '}
                <span className='bg-green-600 px-2 text-white'>Custom</span>{' '}
                Phone Case
              </h1>
              <p className='mt-8 text-lg lg:pr-10 max-w-prose text-center lg:text-left text-balance md:text-wrap'>
                Capture your favorite memories with your own,{' '}
                <span className='font-semibold'>one-of-one</span> phone case.
                CaseCobra allows you to protect your memories, not just your
                phone case.
              </p>

              <ul className='mt-8 space-y-2 text-left font-medium flex flex-col items-center sm:items-start'>
                <div className='space-y-2'>
                  <li className='flex gap-1.5 items-center text-left'>
                    <Check className='h-5 w-5 shrink-0 text-green-600' />
                    High-quality, durable material
                  </li>
                  <li className='flex gap-1.5 items-center text-left'>
                    <Check className='h-5 w-5 shrink-0 text-green-600' />5 year
                    print guarantee
                  </li>
                  <li className='flex gap-1.5 items-center text-left'>
                    <Check className='h-5 w-5 shrink-0 text-green-600' />
                    Modern iPhone models supported
                  </li>
                </div>
              </ul>

              <div className='mt-12 flex flex-col sm:flex-row items-center sm:items-start gap-5'>
                <div className='flex -space-x-4'>
                  <img
                    className='inline-block h-10 w-10 rounded-full ring-2 ring-slate-100'
                    src='/users/user-1.png'
                    alt='user image'
                  />
                  <img
                    className='inline-block h-10 w-10 rounded-full ring-2 ring-slate-100'
                    src='/users/user-2.png'
                    alt='user image'
                  />
                  <img
                    className='inline-block h-10 w-10 rounded-full ring-2 ring-slate-100'
                    src='/users/user-3.png'
                    alt='user image'
                  />
                  <img
                    className='inline-block h-10 w-10 rounded-full ring-2 ring-slate-100'
                    src='/users/user-4.jpg'
                    alt='user image'
                  />
                  <img
                    className='inline-block object-cover h-10 w-10 rounded-full ring-2 ring-slate-100'
                    src='/users/user-5.jpg'
                    alt='user image'
                  />
                </div>

                <div className='flex flex-col justify-between items-center sm:items-start'>
                  <div className='flex gap-0.5'>
                    <Star className='h-4 w-4 text-green-600 fill-green-600' />
                    <Star className='h-4 w-4 text-green-600 fill-green-600' />
                    <Star className='h-4 w-4 text-green-600 fill-green-600' />
                    <Star className='h-4 w-4 text-green-600 fill-green-600' />
                    <Star className='h-4 w-4 text-green-600 fill-green-600' />
                  </div>

                  <p>
                    <span className='font-semibold'>1.250</span> happy customers
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className='col-span-full lg:col-span-1 w-full flex justify-center px-8 sm:px-16 md:px-0 mt-32 lg:mx-0 lg:mt-20 h-fit'>
            <div className='relative md:max-w-xl'>
              <img
                src='/your-image.png'
                className='absolute w-40 lg:w-52 left-56 -top-20 select-none hidden sm:block lg:hidden xl:block'
              />
              <img
                src='/line.png'
                className='absolute w-20 -left-6 -bottom-6 select-none'
              />
              <Phone className='w-64' imgSrc='/testimonials/1.jpg' />
            </div>
          </div>
        </MaxWidthWrapper>
      </section>
      <section>
        {/* avis des clients */}
        <MaxWidthWrapper className="flex flex-col items-center gap-16 sm:gap-32 ">

          <div className="flex flex-col lg:flex-row items-center gap-4 sm:gap-6">
            <h2 className="order-1 mt-2 text-center text-balance !leading-tight text-5xl sm:text-6xl font-bold text-gray-900 ">
              Avis des nos <span className="relative px-2">clients <Icons.underline className="hidden sm:block pointer-events-none absolute inset-x-0 -top-7 text-green-600" />
                <Icons.underline className="hidden sm:block pointer-events-none absolute inset-x-0 -bottom-5 text-blue-600" /></span>
            </h2>
            <img src="/snake-2.png" className="w-24 order-0 lg:order-2 lg:ml-3" />
          </div>
          <div className="mx-auto grid max-w-2xl grid-cols-1 px-4 lg:mx-0 lg:max-w-none lg:grid-cols-2 gap-y-16">
            <div className="flex flex-auto flex-col gap-4 lg:pr-8 xl:pr-20">
              <div className="flex gap-0.5 mb-2">
                <Star className="size-5 text-green-600 fill-green-600" />
                <Star className="size-5 text-green-600 fill-green-600" />
                <Star className="size-5 text-green-600 fill-green-600" />
                <Star className="size-5 text-green-600 fill-green-600" />
                <Star className="size-5 text-green-600 fill-green-600" />
              </div>
              <div className="text-lg leading-7">
                <p>
                  "The case fits perfectly and <span className="font-bold text-black p-0.5"> the design is even better in person! </span>Delivery was quick, and I m super happy with my purchase"
                </p>
              </div>
            </div>
            <div className="flex gap-4 mt-0 lg:mt-2">
              <img src="/users/user-1.png" className="size-12 object-cover rounded-full" />
              <div className="flex flex-col">
                <p className="font-semibold ">Mohamed </p>
                <div className="flex gap-1.5 items-center text-zinc-500">
                  <Check className="size-5 text-green-600 stroke-[3px]" />
                  <p className="text-sm">Verifired Purchase</p>
                </div>
              </div>
            </div>
            <div className="flex flex-auto flex-col gap-4 lg:pr-8 xl:pr-20">
              <div className="flex gap-0.5 mb-2">
                <Star className="size-5 text-green-600 fill-green-600" />
                <Star className="size-5 text-green-600 fill-green-600" />
                <Star className="size-5 text-green-600 fill-green-600" />
                <Star className="size-5 text-green-600 fill-green-600" />
                <Star className="size-5 text-green-600 fill-green-600" />
              </div>
              <div className="text-lg leading-7">
                <p>
                  "I love how sleek and lightweight the case is without compromising on protection! <span className="font-bold text-black"> It’s exactly what I was looking for</span>, and it arrived earlier than expected. I will definitely shop again from Moh-Shope."
                </p>
              </div>
            </div>
            <div className="flex gap-4 mt-0 lg:mt-2">
              <img src="/users/user-2.png" className="size-12 object-cover rounded-full" />
              <div className="flex flex-col">
                <p className="font-semibold ">Meriem </p>
                <div className="flex gap-1.5 items-center text-zinc-500">
                  <Check className="size-5 text-green-600 stroke-[3px]" />
                  <p className="text-sm">Verifired Purchase</p>
                </div>
              </div>
            </div>
            <div className="flex flex-auto flex-col gap-4 lg:pr-8 xl:pr-20">
              <div className="flex gap-0.5 mb-2">
                <Star className="size-5 text-green-600 fill-green-600" />
                <Star className="size-5 text-green-600 fill-green-600" />
                <Star className="size-5 text-green-600 fill-green-600" />
                <Star className="size-5 text-green-600 fill-green-600" />
                <Star className="size-5 text-green-600 fill-green-600" />
              </div>
              <div className="text-lg leading-7">
                <p>
                  "The iPhone case exceeded my expectations with its premium quality and perfect fit! <span className="font-bold text-black"> The design is vibrant, exactly as shown on the website</span>, and feels very durable. I was impressed with the fast delivery and smooth shopping experience."
                </p>
              </div>
            </div>
            <div className="flex gap-4 mt-0 lg:mt-2">
              <img src="/users/user-3.png" className="size-12 object-cover rounded-full" />
              <div className="flex flex-col">
                <p className="font-semibold ">Rahima </p>
                <div className="flex gap-1.5 items-center text-zinc-500">
                  <Check className="size-5 text-green-600 stroke-[3px]" />
                  <p className="text-sm">Verifired Purchase</p>
                </div>
              </div>
            </div>

          </div>
        </MaxWidthWrapper>
        <div className="pt-16">
          <Reviews />
        </div>
      </section>
      {/* phone case example */}
      <section>
        <MaxWidthWrapper className="py-24">
          <div className="mb-12 px-6 lg:px-8">
            <div className="mx-auto max-w-2xl sm:text-center">
              <h2 className="order-1 mt-2 text-center text-balance !leading-tight text-5xl sm:text-6xl font-bold text-gray-900 ">
                Upload your photo and get{" "}<span className="relative px-2  text-white bg-green-600 rounded-md">your own case</span>now
              </h2>
            </div>
          </div>

          <div className="mx-auto max-w-6xl px-6 lg:px-8">
            <div className="relative flex flex-col items-center md:grid grid-cols-2 gap-40">
              <img src="/arrow.png" className="absolute top-[25rem] md:top-1/2 -translate-y-1/2 z-10 left-1/2 -translate-x-1/2 rotate-90 md:rotate-0" />
              <div className="relative h-80 md:h-full w-full md:justify-self-end max-w-sm rounded-xl bg-gray-900/5">
                <img src="/horse.jpg" className="rounded-md object-cover bg-white shadow-xl ring-gray-900/5 size-full" />
              </div>

              <Phone className="w-[70%]" imgSrc="/horse_phone.jpg" />
            </div>
          </div>
          <ul className="mx-auto mt-12 max-w-prose sm:text-lg space-y-2 w-fit">
            <li className='flex w-fit gap-1.5 items-center text-left'>
              <Check className='h-5 w-5 shrink-0 text-green-600' />
              High-quality, durable material
            </li>
            <li className='flex gap-1.5 items-center text-left'>
              <Check className='h-5 w-5 shrink-0 text-green-600' />5 year
              print guarantee
            </li>
            <li className='flex gap-1.5 items-center text-left'>
              <Check className='h-5 w-5 shrink-0 text-green-600' />
              Modern iPhone models supported
            </li>
            <li className='flex gap-1.5 items-center text-left'>
              <Check className='h-5 w-5 shrink-0 text-green-600' />
              Five years print warranty
            </li>
            <div className="flex justify-center">
              <Link className={buttonVariants({ size: 'lg', className: 'mx-auto mt-6' })} href='/configure/upload'> Create your own case<ArrowRight className='ml-2 size-5' />
              </Link>
            </div>
          </ul>
        </MaxWidthWrapper>
      </section>
    </div>
  );
}
