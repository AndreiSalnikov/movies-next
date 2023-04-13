import '@/styles/index.scss'
import React from "react";
import Layout from "@/hoc/Layout";
import {CurrentUserProvider} from "@/hoc/CurrentUserProvider";

export default function App({Component, pageProps}) {

  React.useEffect(() => {
    const el = document.querySelector('#__next');
    document.body.classList.add('page');
    el.classList.add('root')
    return () => {    // document.body.classList.add('my-custom-class');
      document.body.classList.remove('root');
      el.classList.remove('root')
    };
  }, []);

  return (
    <CurrentUserProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </CurrentUserProvider>
  )

}
