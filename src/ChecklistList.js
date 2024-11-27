import { useState } from 'react';
import styles from 'styles/ChecklistList.module.css';
import DeleteChecklistPopup from 'src/DeleteChecklistPopup';

const ChecklistList = (props) => {
  const [deleteSlug, setDeleteSlug] = useState(null);
  const { checklists, isAdmin, deleteChecklist, duplicateChecklist } = props;

  const handleDeleteChecklist = (slug) => {
    setDeleteSlug(slug);
  };

  const handleDuplicateChecklist = (slug) => {
    duplicateChecklist(slug);
  };

  return (
    <div>
      {deleteSlug && (
        <DeleteChecklistPopup
          slug={deleteSlug}
          checklistName={checklists.find((checklist) => checklist.slug === deleteSlug).name}
          deleteChecklist={() => {
            setDeleteSlug(null);
            deleteChecklist(deleteSlug);
          }}
          cancel={() => setDeleteSlug(null)}
        />
      )}
      {checklists.map((checklist) => (
        <div key={checklist.slug} className={styles['list-item']}>
          <a key={checklist.slug} className={styles.a} href={`/checklists/${checklist.slug}`}>
            <h2 key={checklist.slug}>{checklist.name}</h2>
          </a>
          {isAdmin && (
            <div className={styles['list-icons']}>
              <a href={`/checklists/${checklist.slug}/edit`}>
                <span className='material-symbols-outlined'>edit</span>
              </a>
              <span
                className='material-symbols-outlined'
                onClick={() => handleDuplicateChecklist(checklist.slug)}
              >
                content_copy
              </span>
              <span
                className='material-symbols-outlined'
                onClick={() => handleDeleteChecklist(checklist.slug)}
                style={{
                  color: '#C9101C',
                }}
              >
                delete
              </span>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ChecklistList;
