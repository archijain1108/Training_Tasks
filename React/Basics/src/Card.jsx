import React from 'react'

const Card = ({title , description}) => {
  return (
    <div className='p-4 border border-b-2 text-center border-amber-500 rounded-sm flex flex-col gap-2  min-w-[200px] max-w-[300px]'>
      <h2 className='text-xl text-amber-50'>{title}</h2>
      <p className='text-sm text-amber-200'>{description}</p>
    </div>
  )
}

export default Card
