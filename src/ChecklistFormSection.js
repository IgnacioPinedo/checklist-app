import styles from 'styles/ChecklistForm.module.css';
import ChecklistFormItem from './ChecklistFormItem';
import useWindowDimensions from 'hooks/useWindowDimensions';

const ChecklistFormSection = ({
  section,
  sectionIndex,
  handleRemoveSection,
  handleDuplicateSection,
  handleSetSectionName,
  handleRemoveItem,
  handleSetItemName,
  dragSectionStart,
  dragSectionEnter,
  dropSection,
  lastSection,
  dragSectionItemStart,
  dragSectionItemEnter,
  dropSectionItem,
}) => {
  const { width } = useWindowDimensions();

  if (lastSection)
    return (
      <div className={styles['form-main']}>
        <div className={styles['form-main-header']}>
          <div className={styles['form-main-title']}>
            <div>
              <label className={styles.label}>New Section</label>
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
        {section.items.map((item, itemIndex, items) => (
          <ChecklistFormItem
            key={`section-item-${itemIndex}`}
            sectionIndex={sectionIndex}
            item={item}
            itemIndex={itemIndex}
            handleRemoveItem={handleRemoveItem}
            handleSetItemName={handleSetItemName}
            dragSectionItemStart={dragSectionItemStart}
            dragSectionItemEnter={dragSectionItemEnter}
            dropSectionItem={dropSectionItem}
            lastItem={itemIndex === items.length - 1}
          />
        ))}
      </div>
    );

  if (width < 900) {
    return (
      <div className={styles['form-main']}>
        <div className={styles['form-main-header']}>
          <div className={styles['form-main-title']}>
            <div>
              <label className={styles.label}>{`Section ${sectionIndex + 1}`}</label>
            </div>
            <div className={styles['form-icons']}>
              <span
                className='material-symbols-outlined'
                onClick={() => handleDuplicateSection(sectionIndex)}
              >
                content_copy
              </span>
              <span
                className='material-symbols-outlined'
                onClick={() => handleRemoveSection(sectionIndex)}
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
            value={section.name}
            onChange={(e) => handleSetSectionName(e, sectionIndex)}
            placeholder='Section Name'
          />
        </div>
        {section.items.map((item, itemIndex, items) => (
          <ChecklistFormItem
            key={`section-item-${itemIndex}`}
            sectionIndex={sectionIndex}
            item={item}
            itemIndex={itemIndex}
            handleRemoveItem={handleRemoveItem}
            handleSetItemName={handleSetItemName}
            dragSectionItemStart={dragSectionItemStart}
            dragSectionItemEnter={dragSectionItemEnter}
            dropSectionItem={dropSectionItem}
            lastItem={itemIndex === items.length - 1}
          />
        ))}
      </div>
    );
  }

  return (
    <div
      className={styles['form-main']}
      draggable
      onDragStart={dragSectionStart}
      onDragEnter={dragSectionEnter}
      onDragEnd={dropSection}
      data-section-index={sectionIndex}
    >
      <div className={styles['form-main-header']}>
        <div className={styles['form-main-title']}>
          <div>
            <span className='material-symbols-outlined'>drag_indicator</span>
            <label className={styles.label}>{`Section ${sectionIndex + 1}`}</label>
          </div>
          <div className={styles['form-icons']}>
            <span
              className='material-symbols-outlined'
              onClick={() => handleDuplicateSection(sectionIndex)}
            >
              content_copy
            </span>
            <span
              className='material-symbols-outlined'
              onClick={() => handleRemoveSection(sectionIndex)}
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
          value={section.name}
          onChange={(e) => handleSetSectionName(e, sectionIndex)}
          placeholder='Section Name'
        />
      </div>
      {section.items.map((item, itemIndex, items) => (
        <ChecklistFormItem
          key={`section-item-${itemIndex}`}
          sectionIndex={sectionIndex}
          item={item}
          itemIndex={itemIndex}
          handleRemoveItem={handleRemoveItem}
          handleSetItemName={handleSetItemName}
          dragSectionItemStart={dragSectionItemStart}
          dragSectionItemEnter={dragSectionItemEnter}
          dropSectionItem={dropSectionItem}
          lastItem={itemIndex === items.length - 1}
        />
      ))}
    </div>
  );
};

export default ChecklistFormSection;
