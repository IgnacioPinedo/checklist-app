import { useState } from 'react';

const ChecklistItem = (props) => {
  const [checked, setChecked] = useState(false);

  const { item } = props;

  return (
    <div
      style={{
        padding: '0.5rem 3rem',
        borderTop: '2px solid #ddd',
        display: 'flex',
        alignItems: 'center',
        cursor: 'pointer',
      }}
      onClick={() => setChecked((prevChecked) => !prevChecked)}
    >
      <input type='checkbox' style={{ marginRight: '1rem' }} checked={checked} />
      <h3>{item.name}</h3>
    </div>
  );
};

export default ChecklistItem;
