import HeadingUnderlined from '../HeadingUnderlined/HeadingUnderlined';
import BaseText from '../BaseText/BaseText';

import styles from './AboutProject.module.css';

const AboutProject = () => {
  return (
    <section className={styles.aboutProject} id="about-project">
      <HeadingUnderlined extraClass={styles.aboutProject__heading}>
        О проекте
      </HeadingUnderlined>

      <div className={styles.aboutProject__textContentBox}>
        <div className={styles.aboutProject__textBox}>
          <h3 className={styles.aboutProject__subheading}>
            Дипломный проект включал 5&nbsp;этапов
          </h3>
          <BaseText extraClass={styles.aboutProject__description}>
            Составление плана, работу над бэкендом, вёрстку, добавление
            функциональности и&nbsp;финальные доработки.
          </BaseText>
        </div>

        <div className={styles.aboutProject__textBox}>
          <h3 className={styles.aboutProject__subheading}>
            На&nbsp;выполнение диплома ушло 5&nbsp;недель
          </h3>
          <BaseText extraClass={styles.aboutProject__description}>
            У&nbsp;каждого этапа был мягкий и&nbsp;жёсткий дедлайн, которые
            нужно было соблюдать, чтобы успешно защититься.
          </BaseText>
        </div>
      </div>

      <div className={styles.aboutProject__timeLine}>
        <p
          className={[
            styles.aboutProject__duration,
            styles.aboutProject__duration_accent,
          ].join(' ')}
        >
          1&nbsp;неделя
        </p>
        <p className={styles.aboutProject__duration}>4&nbsp;недели</p>
        <p className={styles.aboutProject__timeLineCaption}>Back-end</p>
        <p className={styles.aboutProject__timeLineCaption}>Front-end</p>
      </div>
    </section>
  );
};

export default AboutProject;
