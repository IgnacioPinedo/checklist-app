import ChecklistItem from 'src/ChecklistItem';
import styles from 'styles/ChecklistSection.module.css';

const ChecklistSection = (props) => {
  const {
    section,
    togggleSectionCollapse,
    toggleSectionItemCheck,
    toggleSectionDoneAll,
  } = props;

  return (
    <>
      <div className={styles.header}>
        <div className={styles['form-icons']}>
          {section.collapsed ? (
            <span className='material-symbols-outlined' onClick={togggleSectionCollapse}>
              expand_less
            </span>
          ) : (
            <span className='material-symbols-outlined' onClick={togggleSectionCollapse}>
              expand_more
            </span>
          )}
          <h2>{section.name}</h2>
        </div>
        <div className={styles['form-icons']}>
          <span
            className='material-symbols-outlined'
            onClick={toggleSectionDoneAll}
            style={{ color: '#13CC35' }}
          >
            done_all
          </span>
        </div>
      </div>
      <div className={section.collapsed ? styles.collapsed : styles.expanded}>
        {section.items.map((item) => (
          <ChecklistItem key={item.id} item={item} toggleSectionItemCheck={() => toggleSectionItemCheck(item.id)} />
        ))}
      </div>
    </>
  );
};

export default ChecklistSection;
