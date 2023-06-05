import React from 'react'

const LightHeading = ({ children } : { children: React.ReactNode }) => {
  return (
    <h3
        className='
            text-xl
            font-semibold
            text-[#36F8B2]
            uppercase
        '
    >
        {children}
    </h3>
  )
}

export default LightHeading