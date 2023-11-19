const ChecklistList = (props) => {
  const { checklists } = props;

  return (
    <div>
      {checklists.map((checklist) => (
        <a
          key={checklist.id}
          style={{ textDecoration: 'none', color: 'inherit' }}
          href={`/checklists/${checklist.id}`}
        >
          <div style={{ padding: '0.5rem 1.5rem', borderTop: '2px solid #ddd' }}>
            <h2 key={checklist.id}>{checklist.name}</h2>
          </div>
        </a>
      ))}
    </div>
  );
};

export default ChecklistList;
