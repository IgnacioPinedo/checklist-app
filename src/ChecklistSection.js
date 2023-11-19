import ChecklistItem from './ChecklistItem';

const ChecklistSection = (props) => {
  const { section } = props;

  return (
    <>
      <div style={{ padding: '0.5rem 1.5rem', borderTop: '2px solid #ddd' }}>
        <h2>{section.name}</h2>
      </div>
      {section.items.map((item) => (
        <ChecklistItem key={item.id} item={item} />
      ))}
    </>
  );
};

export default ChecklistSection;
