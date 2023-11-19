const ChecklistItem = (props) => {
  const { item } = props;

  return (
    <div
      style={{
        padding: '0.5rem 3rem',
        borderTop: '2px solid #ddd',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <input type='checkbox' style={{ marginRight: '1rem' }} />
      <h3>{item.name}</h3>
    </div>
  );
};

export default ChecklistItem;
