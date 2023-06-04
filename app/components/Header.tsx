import Image from 'next/image'
import React from 'react'
import DarkModeToggle from './DarkModeToggle'
import Link from 'next/link'
import Button from './Button'

const Header = () => {
  return (
    <header
      className='
        flex
        justify-between
        items-center
        py-4
      '
    >
        <Image src={'/assets/icons/Logo.png'} alt='logo' width={112} height={32}/>
        <nav
          className='
            flex
            justify-between
            items-center
            gap-x-5
          '
        >
          <DarkModeToggle />
          <ul
            className='
              flex
              gap-x-3
            '
          >
            <li>
              <Link href={'/resume-builder'}>Resume Builder</Link>
            </li>
            <li>
              <Link href={'/hire-counselor'}>Hire a Counselor</Link>
            </li>
            <li>
              <Link href={'/blogs'}>Blogs</Link>
            </li>
            <li>
              <Link href={'/questionnaire'}>Questionnaire</Link>
            </li>
            <li>
              <Link href={'/contact'}>Contact Us</Link>
            </li>
          </ul>
          <div
            className='
              flex
              gap-x-3
            '
          >
            <Button
              type='button'
            >
              Login
            </Button>
            <Button
              type='button'
            >
              Sign Up
            </Button>
          </div>
        </nav>
    </header>
  )
}

export default Header