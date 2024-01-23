import styles from 'styles/ChecklistList.module.css';

const ChecklistList = (props) => {
  const { checklists, isAdmin, deleteChecklist, duplicateChecklist } = props;

  const handleDeleteChecklist = (id) => {
    deleteChecklist(id);
  };

  const handleDuplicateChecklist = (id) => {
    duplicateChecklist(id);
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
              <div className={styles['list-icons']}>
                <a href={`/checklists/${checklist.id}/edit`}>
                  <span className='material-symbols-outlined'>edit</span>
                </a>
                <span
                  className='material-symbols-outlined'
                  onClick={() => handleDuplicateChecklist(checklist.id)}
                >
                  content_copy
                </span>
                <span
                  className='material-symbols-outlined'
                  onClick={() => handleDeleteChecklist(checklist.id)}
                >
                  delete
                </span>
              </div>
            )}
          </div>
        </>
      ))}
    </div>
  );
};

export default ChecklistList;
