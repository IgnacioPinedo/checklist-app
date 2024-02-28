import { useState } from 'react';
import styles from 'styles/ChecklistForm.module.css';
import ChecklistFormItem from './ChecklistFormItem';

const ChecklistFormSection = ({
  section,
  sectionIndex,
  handleAddSection,
  handleRemoveSection,
  handleDuplicateSection,
  handleSetSectionName,
  handleSectionItemDrop,
  handleAddItem,
  handleRemoveItem,
  handleSetItemName,
  dragSectionStart,
  dragSectionEnter,
  dropSection,
}) => {
  const [dragItemIndex, setDragItemIndex] = useState(null);
  const [dragOverItemIndex, setDragOverItemIndex] = useState(null);

  const dragSectionItemStart = (e) => {
    setDragItemIndex(e.target.dataset.index);
  };

  const dragSectionItemEnter = (e) => {
    setDragOverItemIndex(e.currentTarget.dataset.index);
  };

  const dropSectionItem = () => {
    handleSectionItemDrop(sectionIndex, dragItemIndex, dragOverItemIndex);
    setDragItemIndex(null);
    setDragOverItemIndex(null);
  };

  return (
    <div
      className={styles['form-main']}
      draggable
      onDragStart={dragSectionStart}
      onDragEnter={dragSectionEnter}
      onDragEnd={dropSection}
      data-index={sectionIndex}
    >
      <div className={styles['form-main-header']}>
        <div className={styles['form-main-title']}>
          <div>
            <span className='material-symbols-outlined'>drag_indicator</span>
            <label className={styles.label}>{`Section ${sectionIndex + 1}`}</label>
          </div>
          <div className={styles['form-icons']}>
            <span className='material-symbols-outlined' onClick={handleAddSection}>
              add
            </span>
            <span
              className='material-symbols-outlined'
              onClick={() => handleDuplicateSection(sectionIndex)}
            >
              content_copy
            </span>
            <span
              className='material-symbols-outlined'
              onClick={() => handleRemoveSection(sectionIndex)}
            >
              delete
            </span>
          </div>
        </div>
        <input
          type='text'
          className={styles.input}
          value={section.name}
          onChange={(e) => handleSetSectionName(e, sectionIndex)}
          placeholder='Section Name'
        />
      </div>
      {section.items.map((item, itemIndex) => (
        <ChecklistFormItem
          key={`section-item-${itemIndex}`}
          sectionIndex={sectionIndex}
          item={item}
          itemIndex={itemIndex}
          handleAddItem={handleAddItem}
          handleRemoveItem={handleRemoveItem}
          handleSetItemName={handleSetItemName}
          dragSectionItemStart={dragSectionItemStart}
          dragSectionItemEnter={dragSectionItemEnter}
          dropSectionItem={dropSectionItem}
        />
      ))}
    </div>
  );
};

export default ChecklistFormSection;
