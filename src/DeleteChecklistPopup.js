import styles from 'styles/DeleteChecklistPopup.module.css';

const DeleteChecklistPopup = (props) => {
  const { id, checklistName, deleteChecklist, cancel } = props;

  return (
    <div className={styles.background}>
      <div className={styles.popup}>
        <h2>Are you sure you want to delete checklist {checklistName}?</h2>
        <p>This action cannot be undone.</p>
        <div className={styles['button-container']}>
          <button className={styles.button} onClick={() => deleteChecklist(id)}>
            Delete
          </button>
          <button className={styles.button} onClick={cancel}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteChecklistPopup;
