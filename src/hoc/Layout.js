import React, {useEffect, useState} from 'react';
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import {useRouter} from "next/router";
import {mainApi} from "@/utils/MainApi";
import {useAuth} from "@/hooks/useAuth";
import Preloader from "@/components/Preloader/Preloader";

const Layout = ({children}) => {
  const location = useRouter()
  const {setUser} = useAuth();
  const [isLoadingPage, setIsLoadingPage] = useState(false);

  useEffect(() => {
    const jwt = localStorage.getItem('jwt');
     setIsLoadingPage(true);
    if (jwt) {
      mainApi
        .tokenCheck(jwt)
        .then((data) => {
          setUser({name: data.name, email: data.email});
          location.push(location.pathname);
        })
        .catch((err) => console.log(err))
        .finally(() => setIsLoadingPage(false));
    } else {
       setIsLoadingPage(false);
    }
  }, []);


  return isLoadingPage ? (<Preloader></Preloader>) : (
    <>
      {(location.pathname !== "/signin" && location.pathname !== "/signup" && location.pathname !== "/404")  && <Header/>}
      {children}
      {(location.pathname !== "/signin" && location.pathname !== "/signup" && location.pathname !== "/profile" && location.pathname !== "/404") && <Footer/>}
    </>
  );
};

export default Layout;
