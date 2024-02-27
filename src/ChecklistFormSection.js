import styles from 'styles/ChecklistForm.module.css';
import ChecklistFormItem from './ChecklistFormItem';

const ChecklistFormSection = ({
  section,
  sectionIndex,
  handleAddSection,
  handleRemoveSection,
  handleDuplicateSection,
  handleSetSectionName,
  handleAddItem,
  handleRemoveItem,
  handleSetItemName,
}) => {
  return (
    <div className={styles['form-main']}>
      <div className={styles['form-main-header']}>
        <label className={styles.label}>{`Section ${sectionIndex + 1}`}</label>
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
      {section.items.map((item, itemIndex) => (
        <ChecklistFormItem
          key={`section-item-${itemIndex}`}
          sectionIndex={sectionIndex}
          item={item}
          itemIndex={itemIndex}
          handleAddItem={handleAddItem}
          handleRemoveItem={handleRemoveItem}
          handleSetItemName={handleSetItemName}
        />
      ))}
    </div>
  );
};

export default ChecklistFormSection;
