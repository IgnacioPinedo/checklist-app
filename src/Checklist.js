import ChecklistSection from 'src/ChecklistSection';

const Checklist = (props) => {
  const { checklist } = props;

  return checklist.sections.map((section) => {
    return <ChecklistSection key={section.id} section={section} />;
  });
};

export default Checklist;
