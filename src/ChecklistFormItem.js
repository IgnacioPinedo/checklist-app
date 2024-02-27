import styles from 'styles/ChecklistForm.module.css';

const ChecklistFormItem = ({
  sectionIndex,
  item,
  itemIndex,
  handleAddItem,
  handleRemoveItem,
  handleSetItemName,
}) => {
  return (
    <div className={styles['form-item']}>
      <div className={styles['form-main-header']}>
        <label className={styles.label}>{`Item ${itemIndex + 1}`}</label>
        <div className={styles['form-icons']}>
          <span className='material-symbols-outlined' onClick={() => handleAddItem(sectionIndex)}>
            add
          </span>
          <span
            className='material-symbols-outlined'
            onClick={() => handleRemoveItem(sectionIndex, itemIndex)}
          >
            delete
          </span>
        </div>
      </div>
      <input
        type='text'
        className={styles.input}
        value={item.name}
        onChange={(e) => handleSetItemName(e, sectionIndex, itemIndex)}
        placeholder='Item Name'
      />
    </div>
  );
};

export default ChecklistFormItem;
