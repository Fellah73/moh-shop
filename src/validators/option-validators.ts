import { PRODUCTS_PRICES } from "@/config/products"


export const COLORS = [
    { Label:"Black", value:"black" , tw :'zinc-900' },
    { Label:"Orange", value:"orange" , tw :'orange-500' },
    { Label:"Red", value:"red" , tw :'red-800' },
    { Label:"Blue", value:"blue" , tw :'blue-800' },
    { Label:"White", value:"white" , tw :'zinc-300' },
 ] as const

 export const MODELS = {
    name: 'models',
    options: [
      {
        label: 'iPhone X',
        value: 'iphonex',
      },
      {
        label: 'iPhone 11',
        value: 'iphone11',
      },
      {
        label: 'iPhone 12',
        value: 'iphone12',
      },
      {
        label: 'iPhone 13',
        value: 'iphone13',
      },
      {
        label: 'iPhone 14',
        value: 'iphone14',
      },
      {
        label: 'iPhone 15',
        value: 'iphone15',
      },
    ],
  } as const

  export const MATERIALS ={
    name: 'material',
    options: [
        {
            label: 'Silicone',
            value :'silicone',
            descriptoin :undefined,
            price : PRODUCTS_PRICES.material.silicone,
        },
        {
            label: 'Soft Polycarbonate',
            value :'polycarbonate',
            descriptoin : "resisting to water and sweat",
            price : PRODUCTS_PRICES.material.polycarbonate,
        }
    ]
  } as const

  export const FINISHES ={
    name: 'finish',
    options: [
        {
            label: 'Smooth Finish',
            value :'smooth',
            descriptoin :undefined,
            price : PRODUCTS_PRICES.finish.smooth,
        },
        {
            label: 'Textured Finish',
            value :'textured',
            descriptoin : 'soft grippy texture',
            price : PRODUCTS_PRICES.finish.textured,
        }
    ]
  } as const
