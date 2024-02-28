import styles from 'styles/ChecklistForm.module.css';

const ChecklistFormItem = ({
  sectionIndex,
  item,
  itemIndex,
  handleAddItem,
  handleRemoveItem,
  handleSetItemName,
  dragSectionItemStart,
  dragSectionItemEnter,
  dropSectionItem,
}) => {
  return (
    <div
      className={styles['form-item']}
      draggable
      onDragStart={dragSectionItemStart}
      onDragEnter={dragSectionItemEnter}
      onDragEnd={dropSectionItem}
      data-index={itemIndex}
    >
      <div className={styles['form-main-title']}>
        <div>
          <span className='material-symbols-outlined'>drag_indicator</span>
          <label className={styles.label}>{`Item ${itemIndex + 1}`}</label>
        </div>
        <div className={styles['form-icons']}>
          <span className='material-symbols-outlined' onClick={() => handleAddItem(sectionIndex)}>
            add
          </span>
          <span
            className='material-symbols-outlined'
            onClick={() => handleRemoveItem(sectionIndex, itemIndex)}
            style={{
              color: '#C9101C',
            }}
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
