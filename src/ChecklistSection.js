import ChecklistItem from 'src/ChecklistItem';
import styles from 'styles/ChecklistSection.module.css';

const ChecklistSection = (props) => {
  const { section } = props;

  return (
    <>
      <div className={styles.header}>
        <h2>{section.name}</h2>
      </div>
      {section.items.map((item) => (
        <ChecklistItem key={item.id} item={item} />
      ))}
    </>
  );
};

export default ChecklistSection;
