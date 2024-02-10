import { useState, useEffect } from 'react';
import styles from 'styles/ChecklistItem.module.css';

const ChecklistItem = (props) => {
  const [checked, setChecked] = useState(false);

  const { item, doneAll } = props;

  return (
    <div className={styles.item} onClick={() => setChecked((prevChecked) => !prevChecked)}>
      <input type='checkbox' className={styles.checkbox} checked={checked || doneAll} />
      <h3>{item.name}</h3>
    </div>
  );
};

export default ChecklistItem;
