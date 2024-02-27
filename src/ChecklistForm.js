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

  useEffect(() => {
    if (existingChecklist) setChecklist(existingChecklist);
  }, [existingChecklist]);

  const handleSubmit = (e) => {
    e.preventDefault();
    submitChecklist(checklist);
  };

  const handleSetName = (e) => {
    setChecklist({ ...checklist, name: e.target.value });
  };

  const handleAddSection = () => {
    setChecklist((prevState) => {
      const sections = [...prevState.sections];

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

      return { ...prevState, sections };
    });
  };

  const handleSetSectionName = (e, sectionIndex) => {
    setChecklist((prevState) => {
      const sections = [...prevState.sections];

      sections[sectionIndex] = { ...sections[sectionIndex], name: e.target.value };

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

  const handleAddItem = (sectionIndex) => {
    setChecklist((prevState) => {
      const sections = [...prevState.sections];

      const items = [...sections[sectionIndex].items];

      items.push({
        name: '',
        order: items.sort((a, b) => a.order - b.order)[items.length - 1].order + 1,
      });

      sections[sectionIndex] = { ...sections[sectionIndex], items };

      return { ...prevState, sections };
    });
  };

  const handleSetItemName = (e, sectionIndex, itemIndex) => {
    setChecklist((prevState) => {
      const sections = [...prevState.sections];

      const items = [...sections[sectionIndex].items];

      items[itemIndex] = { ...items[itemIndex], name: e.target.value };

      sections[sectionIndex] = { ...sections[sectionIndex], items };

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

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles['form-main']}>
        <div className={styles['form-main-header']}>
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
      {checklist.sections.map((section, sectionIndex) => (
        <ChecklistFormSection
          key={`section-${sectionIndex}`}
          section={section}
          sectionIndex={sectionIndex}
          handleAddSection={handleAddSection}
          handleRemoveSection={handleRemoveSection}
          handleDuplicateSection={handleDuplicateSection}
          handleSetSectionName={handleSetSectionName}
          handleAddItem={handleAddItem}
          handleRemoveItem={handleRemoveItem}
          handleSetItemName={handleSetItemName}
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
