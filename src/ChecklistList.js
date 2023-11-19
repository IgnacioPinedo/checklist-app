const ChecklistList = (props) => {
  const { checklists } = props;

  return (
    <div>
      {checklists.map((checklist) => (
        <div key={checklist.id} style={{padding:'0.5rem 1.5rem', borderTop: '2px solid #ddd'}}>
          <h2 key={checklist.id}>{checklist.name}</h2>
        </div>
      ))}
    </div>
  );
};

export default ChecklistList;
