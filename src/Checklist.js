import ChecklistSection from './ChecklistSection';

const Checklist = (props) => {
  const { checklist } = props;

  return (
    checklist &&
    checklist.sections.map((section) => {
      return <ChecklistSection key={section.id} section={section} />;
    })
  );
};

export default Checklist;
