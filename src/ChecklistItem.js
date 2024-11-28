import { useState, useEffect } from 'react';
import styles from 'styles/ChecklistItem.module.css';

const ChecklistItem = (props) => {
  const { item, toggleSectionItemCheck } = props;

  return (
    <div className={styles.item} onClick={toggleSectionItemCheck}>
      <input type='checkbox' className={styles.checkbox} checked={item.checked} readOnly />
      <h3>{item.name}</h3>
    </div>
  );
};

export default ChecklistItem;
