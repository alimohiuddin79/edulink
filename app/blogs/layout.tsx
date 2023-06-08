import Head from 'next/head'
import React from 'react'

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Head>
        {/* TODO: Import all meta tags later */}
        {/* <meta /> */}
        <title>Blogs</title>
      </Head>
      <section className="py-12">
        <div
          className="
            flex
            flex-col
            gap-y-6
        "
        >
          <h1
            className="
            text-4xl
            font-semibold
            text-[#36F8B2]
            text-center
            mb-10
        "
          >
            Blogs
          </h1>
          <div
            className='
                flex
                flex-col
                justify-center
                items-center
            '
          >
            {children}
          </div>
        </div>
      </section>
    </>
  )
}

export default Layout;