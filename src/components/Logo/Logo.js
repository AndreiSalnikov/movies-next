import React from 'react';
import styles from "../Logo/Logo.module.scss";
import Link from "next/link";
import {useRouter} from "next/router";


const Logo = () => {
  const location = useRouter()
  return (
    <Link
      className={location.pathname === '/registration' || location.pathname === '/login' ? `${styles.logo} ${styles.logo__type_center}` : `${styles.logo}`}
      href="/">
    </Link>
  );
};

export default Logo;
