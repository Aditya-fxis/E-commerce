import React from 'react'

const Instagram = () => {
  return (
    <div className="flex h-[90vh]">
    
    <div className="w-3/5 p-4">
        <div className='grid grid-cols-3 gap-0 ml-[16%] pt-8  '>
            <img src="instagram-1.jpg" alt="instagram image" className="w-full h-full object-cover"/>
            <img src="instagram-2.jpg" alt="instagram image" className="w-full h-full object-cover"/>
            <img src="instagram-3.jpg" alt="instagram image" className="w-full h-full object-cover"/>
            <img src="instagram-4.jpg" alt="instagram image" className="w-full h-full object-cover"/>
            <img src="instagram-5.jpg" alt="instagram image" className="w-full h-full object-cover"/>
            <img src="instagram-6.jpg" alt="instagram image" className="w-full h-full object-cover"/>  
        </div>
    </div>
   
    <div className="w-2/5 p-4  mt-[10%]">
        <h1 className='text-4xl font-bold'>Instagram</h1>
        <p className='w-[60%] text-justify text-gray-600 text-sm mt-8'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro aperiam alias earum quidem quibusdam dicta vel deleniti perferendis ab nisi.</p>
        <h1 className='text-4xl font-bold text-red-500 mt-16'>#Men_Fashion</h1>
    </div>
    </div>
  
  )
}

export default Instagram
  