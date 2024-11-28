import { useState, useRef } from 'react';
import useOutsideClickAction from 'hooks/useOutsideClickAction';
import styles from 'styles/Dropdown.module.css';

const Dropdown = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const { possibleValues, value, setValue } = props;

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  }

  const closeDropdown = () => {
    setIsOpen(false);
  }

  useOutsideClickAction(dropdownRef, closeDropdown);

  return (
    <div ref={dropdownRef} className={styles.dropdown} onClick={toggleDropdown}>
      <span>{value.name}</span>
      <ul className={`${styles['dropdown-content']} ${isOpen ? styles['dropdown-content-show'] : ''}`}>
        {possibleValues.map((possibleValue, index) => (
          <li
            key={index}
            onClick={() => {
              setValue(possibleValue);
              setIsOpen(false);
            }}
          >
            {possibleValue.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dropdown;
