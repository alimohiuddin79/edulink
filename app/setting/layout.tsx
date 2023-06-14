import Head from "next/head";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Head>
        {/* TODO: Import all meta tags later */}
        {/* <meta /> */}
        <title>Setting</title>
      </Head>
      <section className="py-12">
        <div
          className="
            flex
            flex-col
            gap-y-6
        "
        >
          {children}
        </div>
      </section>
    </>
  );
};

export default Layout;
