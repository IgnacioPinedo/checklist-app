import styles from 'styles/ChecklistList.module.css';

const ChecklistList = (props) => {
  const { checklists } = props;

  return (
    <div>
      {checklists.map((checklist) => (
        <a key={checklist.id} className={styles.a} href={`/checklists/${checklist.id}`}>
          <div className={styles['list-item']}>
            <h2 key={checklist.id}>{checklist.name}</h2>
          </div>
        </a>
      ))}
    </div>
  );
};

export default ChecklistList;
