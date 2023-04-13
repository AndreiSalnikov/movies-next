import {useRouter} from "next/router";
import {useAuth} from "@/hooks/useAuth";
import {useEffect} from "react";
import Preloader from "@/components/Preloader/Preloader";

export function withAuth(Component) {
  return function WithAuth(props) {
    const router = useRouter();
    const {user, isLoading, setIsLoading} = useAuth();

    useEffect(() => {
      const handleRedirect = async () => {
        if (user && (router.pathname === '/signin' || router.pathname === '/signup')) {
          await router.replace("/")
          setIsLoading(false)
        } else if ((user === null && router.pathname === '/signin') || (user === null && router.pathname === '/signup')) {
          await router.replace(router.pathname)
          setIsLoading(false)
        } else if (user === null) {
          await router.replace('/')
          setIsLoading(false)
        } else {
          setIsLoading(false)
        }
      }

      handleRedirect()
    }, []);

    if (isLoading) {
      return <Preloader/>;
    }

    return <Component {...props} />;
  };
}
