/* eslint-disable @next/next/no-img-element */
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Checklist from 'src/Checklist';
import styles from 'styles/ChecklistSlug.module.css';

export default function Index() {
  const router = useRouter();
  const [checklist, setChecklist] = useState(undefined);

  const { slug: checklistSlug } = router.query;

  useEffect(() => {
    if (!checklistSlug) {
      return;
    }

    fetch(`/api/v1/checklists/${checklistSlug}`).then((response) => {
      if (response.ok) {
        response.json().then((data) => {
          setChecklist({
            ...data.data.checklist,
            sections: data.data.checklist.sections.map((section) => ({
              ...section,
              collapsed: false,
              items: section.items.map((item) => ({
                ...item,
                checked: false,
              })),
            })),
          });
        });
      } else {
        router.push('/');
      }
    });
  }, [checklistSlug, router]);

  if (!checklist) {
    return null;
  }

  const togggleAllSectionCollapse = () => {
    setChecklist((prevChecklist) => {
      const newChecklist = {
        ...prevChecklist,
        sections: prevChecklist.sections.map((s) => {
          const section = { ...s };

          section.collapsed = !section.collapsed;

          return section;
        }),
      };
      return newChecklist;
    });
  };

  const togggleSectionCollapse = (sectionId) => {
    setChecklist((prevChecklist) => {
      const newChecklist = {
        ...prevChecklist,
        sections: prevChecklist.sections.map((s) => {
          const section = { ...s };

          if (section.id === sectionId) section.collapsed = !section.collapsed;

          return section;
        }),
      };
      return newChecklist;
    });
  };

  const toggleSectionItemCheck = (sectionId, itemId) => {
    setChecklist((prevChecklist) => {
      const newChecklist = {
        ...prevChecklist,
        sections: prevChecklist.sections.map((s) => {
          const section = { ...s };

          if (section.id === sectionId) {
            section.items = section.items.map((i) => {
              const item = { ...i };

              if (item.id === itemId) item.checked = !item.checked;

              return item;
            });
          }

          return section;
        }),
      };
      return newChecklist;
    });
  };

  const toggleSectionDoneAll = (sectionId) => {
    setChecklist((prevChecklist) => {
      const newChecklist = {
        ...prevChecklist,
        sections: prevChecklist.sections.map((s) => {
          const section = { ...s };

          if (section.id === sectionId) {
            const allChecked = section.items.every((i) => i.checked);

            section.items = section.items.map((i) => {
              const item = { ...i };

              item.checked = !allChecked;

              return item;
            });
          }

          return section;
        }),
      };
      return newChecklist;
    });
  };

  return (
    <>
      <Head>
        <title>{`Checklister | ${checklist.name}`}</title>
      </Head>
      <div className={styles.wrapper}>
        <div className={styles.card}>
          <Link className={styles.a} href='/'>
            <span className='material-symbols-outlined'>home</span>
          </Link>
          <br />
          <img src='/logo-horizontal.svg' alt='Checklister Logo' className={styles.logo} />
          <h1 className={styles.h1}>{checklist.name}</h1>
          {checklist.sections.every((s) => s.collapsed) ? (
            <span className={`material-symbols-outlined ${styles.collapse}`} onClick={togggleAllSectionCollapse}>
              expand_less
            </span>
          ) : (
            <span className={`material-symbols-outlined ${styles.collapse}`} onClick={togggleAllSectionCollapse}>
              expand_more
            </span>
          )}
          <Checklist
            checklist={checklist}
            togggleSectionCollapse={togggleSectionCollapse}
            toggleSectionItemCheck={toggleSectionItemCheck}
            toggleSectionDoneAll={toggleSectionDoneAll}
          />
        </div>
      </div>
    </>
  );
}
