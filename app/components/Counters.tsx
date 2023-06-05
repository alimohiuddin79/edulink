import React from 'react'
import Heading from './Heading'

const Counters = () => {
  return (
    <div
        className='
            flex
            justify-between
            items-center
            h-[200px]
            w-full
        '
    >
        <div
            className='
                flex
                flex-col
                gap-y-3
            '
        >
            <Heading>453</Heading>
            <p
                className='
                    text-xl
                    font-semibold
                '
            >
                Blog Reads
            </p>
        </div>
        <div
            className='
                flex
                flex-col
                gap-y-3
            '
        >
            <Heading>10+</Heading>
            <p
                className='
                    text-xl
                    font-semibold
                '
            >
                Expert Counselors
            </p>
        </div>
        <div
            className='
                flex
                flex-col
                gap-y-3
            '
        >
            <Heading>681</Heading>
            <p
                className='
                    text-xl
                    font-semibold
                '
            >
                Resume Creates
            </p>
        </div>
        <div
            className='
                flex
                flex-col
                gap-y-3
            '
        >
            <Heading>8</Heading>
            <p
                className='
                    text-xl
                    font-semibold
                '
            >
                Hired Counselors
            </p>
        </div>
    </div>
  )
}

export default Counters