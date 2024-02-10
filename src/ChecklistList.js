import { useState } from 'react';
import styles from 'styles/ChecklistList.module.css';
import DeleteChecklistPopup from 'src/DeleteChecklistPopup';

const ChecklistList = (props) => {
  const [deleteId, setDeleteId] = useState(null);
  const { checklists, isAdmin, deleteChecklist, duplicateChecklist } = props;

  const handleDeleteChecklist = (id) => {
    setDeleteId(id);
  };

  const handleDuplicateChecklist = (id) => {
    duplicateChecklist(id);
  };

  return (
    <div>
      {deleteId && (
        <DeleteChecklistPopup
          id={deleteId}
          checklistName={checklists.find((checklist) => checklist.id === deleteId).name}
          deleteChecklist={() => {
            setDeleteId(null);
            deleteChecklist(deleteId);
          }}
          cancel={() => setDeleteId(null)}
        />
      )}
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
