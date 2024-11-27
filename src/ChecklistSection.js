import { useState } from 'react';
import ChecklistItem from 'src/ChecklistItem';
import styles from 'styles/ChecklistSection.module.css';

const ChecklistSection = (props) => {
  const [collapsed, setCollapsed] = useState(false);
  const [doneAll, setDoneAll] = useState(false);
  const { section } = props;

  const toggleCollapsed = () => {
    setCollapsed((prevState) => !prevState);
  };

  const toggleDoneAll = () => {
    setDoneAll((prevDoneAll) => !prevDoneAll);
  };

  return (
    <>
      <div className={styles.header}>
        <h2>{section.name}</h2>
        <div className={styles['form-icons']}>
          <span
            className='material-symbols-outlined'
            onClick={toggleDoneAll}
            style={{ color: '#13CC35' }}
          >
            done_all
          </span>
          {collapsed ? (
            <span className='material-symbols-outlined' onClick={toggleCollapsed}>
              expand_less
            </span>
          ) : (
            <span className='material-symbols-outlined' onClick={toggleCollapsed}>
              expand_more
            </span>
          )}
        </div>
      </div>
      <div className={collapsed ? styles.collapsed : styles.expanded}>
        {section.items.map((item) => (
          <ChecklistItem key={item.id} item={item} doneAll={doneAll} />
        ))}
      </div>
    </>
  );
};

export default ChecklistSection;
