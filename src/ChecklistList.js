import styles from 'styles/ChecklistList.module.css';

const ChecklistList = (props) => {
  const { checklists, isAdmin, deleteChecklist } = props;

  const handleDeleteChecklist = (id) => {
    deleteChecklist(id);
  };

  return (
    <div>
      {checklists.map((checklist) => (
        <>
          <div className={styles['list-item']}>
            <a key={checklist.id} className={styles.a} href={`/checklists/${checklist.id}`}>
              <h2 key={checklist.id}>{checklist.name}</h2>
            </a>
            {isAdmin && (
              <span
                className='material-symbols-outlined'
                onClick={() => handleDeleteChecklist(checklist.id)}
              >
                delete
              </span>
            )}
          </div>
        </>
      ))}
    </div>
  );
};

export default ChecklistList;
