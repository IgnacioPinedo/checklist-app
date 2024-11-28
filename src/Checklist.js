import ChecklistSection from 'src/ChecklistSection';

const Checklist = (props) => {
  const { checklist, togggleSectionCollapse, toggleSectionItemCheck, toggleSectionDoneAll } = props;

  return checklist.sections.map((section) => {
    return (
      <ChecklistSection
        key={section.id}
        section={section}
        togggleSectionCollapse={() => togggleSectionCollapse(section.id)}
        toggleSectionItemCheck={(itemId) => toggleSectionItemCheck(section.id, itemId)}
        toggleSectionDoneAll={() => toggleSectionDoneAll(section.id)}
      />
    );
  });
};

export default Checklist;
