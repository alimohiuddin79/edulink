import React from 'react'

interface PageWrapperProps {
    children: React.ReactNode;
    pageName: string;
}

const PageWrapper: React.FC<PageWrapperProps> = ({ children, pageName }) => {
  return (
    <>
    <h1
        className="
            text-4xl
            font-semibold
            text-[#36F8B2]
            text-center
            mb-10
        "
      >
        {pageName}
      </h1>
      <div
        className="
                flex
                flex-col
                justify-center
                items-center
            "
      >
        {children}
      </div>
    </>
  )
}

export default PageWrapper