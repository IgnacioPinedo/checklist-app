import { useState, useEffect } from 'react';
import styles from 'styles/ChecklistForm.module.css';
import ChecklistFormSection from './ChecklistFormSection';

const initialChecklist = {
  name: '',
  sections: [
    {
      name: '',
      order: 0,
      items: [
        {
          name: '',
          order: 0,
        },
      ],
    },
  ],
};

const ChecklistForm = ({ submitChecklist, error, existingChecklist, submitButtonValue }) => {
  const [checklist, setChecklist] = useState(initialChecklist);
  const [dragSectionIndex, setDragSectionIndex] = useState(null);
  const [dragOverSectionIndex, setDragOverSectionIndex] = useState(null);

  useEffect(() => {
    if (existingChecklist) {
      const sections = existingChecklist.sections.map((section) => {
        return { ...section, items: [...section.items, { name: '', order: section.items.length }] };
      });

      const updatedChecklist = { ...existingChecklist, sections };

      updatedChecklist.sections.push({
        name: '',
        order: updatedChecklist.sections.length,
        items: [
          {
            name: '',
            order: 0,
          },
        ],
      });

      setChecklist(updatedChecklist);
    }
  }, [existingChecklist]);

  const handleSubmit = (e) => {
    e.preventDefault();

    let sections = [...checklist.sections];

    sections.pop();

    sections = sections.map((section) => {
      const items = [...section.items];

      items.pop();

      return { ...section, items };
    });

    submitChecklist({ ...checklist, sections });
  };

  const handleSetName = (e) => {
    setChecklist({ ...checklist, name: e.target.value });
  };

  const handleSetSectionName = (e, sectionIndex) => {
    setChecklist((prevState) => {
      const sections = [...prevState.sections];

      sections[sectionIndex] = { ...sections[sectionIndex], name: e.target.value };

      if (sectionIndex === sections.length - 1) {
        sections.push({
          name: '',
          order: sections.sort((a, b) => a.order - b.order)[sections.length - 1].order + 1,
          items: [
            {
              name: '',
              order: 0,
            },
          ],
        });
      }

      return { ...prevState, sections };
    });
  };

  const handleDuplicateSection = (sectionIndex) => {
    setChecklist((prevState) => {
      const sections = [...prevState.sections];

      const newSection = { ...sections[sectionIndex] };

      newSection.order = sections.sort((a, b) => a.order - b.order)[sections.length - 1].order + 1;

      sections.push(newSection);

      return { ...prevState, sections };
    });
  };

  const handleRemoveSection = (sectionIndex) => {
    if (checklist.sections.length === 1) return;

    setChecklist((prevState) => {
      const sections = [...prevState.sections];

      if (sections.length === 1) return prevState;

      sections.splice(sectionIndex, 1);

      for (let i = 0; i < sections.length; i++) {
        sections[i] = { ...sections[i], order: i };
      }

      return { ...prevState, sections };
    });
  };

  const handleSetItemName = (e, sectionIndex, itemIndex) => {
    setChecklist((prevState) => {
      const sections = [...prevState.sections];

      const items = [...sections[sectionIndex].items];

      items[itemIndex] = { ...items[itemIndex], name: e.target.value };

      sections[sectionIndex] = { ...sections[sectionIndex], items };

      if (itemIndex === items.length - 1) {
        items.push({
          name: '',
          order: items.sort((a, b) => a.order - b.order)[items.length - 1].order + 1,
        });

        if (sectionIndex === sections.length - 1) {
          sections.push({
            name: '',
            order: sections.sort((a, b) => a.order - b.order)[sections.length - 1].order + 1,
            items: [
              {
                name: '',
                order: 0,
              },
            ],
          });
        }
      }

      return { ...prevState, sections };
    });
  };

  const handleRemoveItem = (sectionIndex, itemIndex) => {
    if (checklist.sections[sectionIndex].items.length === 1) return;

    setChecklist((prevState) => {
      const sections = [...prevState.sections];

      const items = [...sections[sectionIndex].items];

      if (items.length === 1) return prevState;

      items.splice(itemIndex, 1);

      sections[sectionIndex] = { ...sections[sectionIndex], items };

      for (let i = 0; i < items.length; i++) {
        items[i] = { ...items[i], order: i };
      }

      return { ...prevState, sections };
    });
  };

  const handleSectionItemDrop = (sectionIndex, dragItemIndex, dropItemIndex) => {
    setChecklist((prevState) => {
      const sections = [...prevState.sections];

      const items = [...sections[sectionIndex].items];

      const dragItem = items.splice(dragItemIndex, 1)[0];

      items.splice(dropItemIndex, 0, dragItem);

      for (let i = 0; i < items.length; i++) {
        items[i] = { ...items[i], order: i };
      }

      sections[sectionIndex] = { ...sections[sectionIndex], items };

      return { ...prevState, sections };
    });
  };

  const handleSectionDrop = (dragIndex, dropIndex) => {
    setChecklist((prevState) => {
      const sections = [...prevState.sections];

      const dragSection = sections.splice(dragIndex, 1)[0];

      sections.splice(dropIndex, 0, dragSection);

      for (let i = 0; i < sections.length; i++) {
        sections[i] = { ...sections[i], order: i };
      }

      return { ...prevState, sections };
    });
  };

  const dragSectionStart = (e) => {
    setDragSectionIndex(e.target.dataset.index);
  };

  const dragSectionEnter = (e) => {
    setDragOverSectionIndex(e.currentTarget.dataset.index);
  };

  const dropSection = () => {
    handleSectionDrop(dragSectionIndex, dragOverSectionIndex);
    setDragSectionIndex(null);
    setDragOverSectionIndex(null);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={`${styles['form-main']} ${styles['form-main-header']}`}>
        <div className={styles['form-main-title']}>
          <label className={styles.label}>Checklist</label>
        </div>
        <input
          type='text'
          className={styles.input}
          value={checklist.name}
          onChange={(e) => handleSetName(e)}
          placeholder='Checklist Name'
        />
      </div>
      {checklist.sections.map((section, sectionIndex, sections) => (
        <ChecklistFormSection
          key={`section-${sectionIndex}`}
          section={section}
          sectionIndex={sectionIndex}
          handleRemoveSection={handleRemoveSection}
          handleDuplicateSection={handleDuplicateSection}
          handleSetSectionName={handleSetSectionName}
          handleSectionItemDrop={handleSectionItemDrop}
          handleRemoveItem={handleRemoveItem}
          handleSetItemName={handleSetItemName}
          dragSectionStart={dragSectionStart}
          dragSectionEnter={dragSectionEnter}
          dropSection={dropSection}
          lastSection={sectionIndex === sections.length - 1}
        />
      ))}
      <div className={styles['form-footer']}>
        <input className={styles.submit} type='submit' value={submitButtonValue} />
        {error && <p className={styles.error}>{error}</p>}
      </div>
    </form>
  );
};

export default ChecklistForm;
