import React from 'react';
import styles from './FilterCheckbox.module.scss'

function FilterCheckbox({setIsCheckboxChecked, isCheckboxChecked}) {

  function handleChange() {
    setIsCheckboxChecked(!isCheckboxChecked);
  }

  return (
    <label className={styles.checkbox}>
      <input className={styles.checkbox__input} type="checkbox" onChange={handleChange}/>
      <div
        className={isCheckboxChecked ? `${styles.checkbox__slider} ${styles.checkbox__slider_active}` : `${styles.checkbox__slider}`}></div>
    </label>
  );
}

export default FilterCheckbox;
