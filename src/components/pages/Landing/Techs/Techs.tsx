import HeadingUnderlined from '../HeadingUnderlined/HeadingUnderlined';
import BaseText from '../BaseText/BaseText';
import Tech from '../Tech/Tech';

import styles from './Techs.module.css';

const TECHS = ['HTML', 'CSS', 'JS', 'React', 'Git', 'Express.js', 'MongoDB'];

const Techs = () => {
  return (
    <section className={styles.techs}>
      <HeadingUnderlined extraClass={styles.techs__heading}>
        Технологии
      </HeadingUnderlined>
      <h3 className={styles.techs__subheading}>7&nbsp;технологий</h3>
      <BaseText extraClass={styles.techs__description}>
        На&nbsp;курсе веб-разработки мы&nbsp;освоили технологии, которые
        применили в&nbsp;дипломном проекте.
      </BaseText>

      <div className={styles.techs__techsBox}>
        {TECHS.map((tech) => (
          <Tech key={tech}>{tech}</Tech>
        ))}
      </div>
    </section>
  );
};

export default Techs;
