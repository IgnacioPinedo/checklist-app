import { useState } from 'react';

const ChecklistItem = (props) => {
  const { item } = props;

  const [checked, setChecked] = useState(item.checked);


  return (
    <div
      style={{
        padding: '0.5rem 3rem',
        borderTop: '2px solid #ddd',
        display: 'flex',
        alignItems: 'center',
      }}
      onClick={(prev) => setChecked(!prev)}
    >
      <input type='checkbox' style={{ marginRight: '1rem' }} checked={checked} />
      <h3>{item.name}</h3>
    </div>
  );
};

export default ChecklistItem;
