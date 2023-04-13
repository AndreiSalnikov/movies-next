import React from 'react';
import styles from "../MinutesConverter/MinutesConverter.module.scss";
import {SIXTY_MINUTES} from "@/utils/constants"

const ConverterMinutes = ({duration}) => {
  const hours = parseInt(duration / SIXTY_MINUTES)
  const minutes = duration % SIXTY_MINUTES

  return (
    <span className={styles.converter}>{`${hours}ч ${minutes}м`}</span>
  );
};

export default ConverterMinutes;
