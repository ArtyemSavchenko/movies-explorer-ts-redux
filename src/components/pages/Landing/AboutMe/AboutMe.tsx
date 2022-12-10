import photo from '../../../../images/about-me-photo.webp';

import CustomLink from '../../../ui/CustomLink/CustomLink';
import HeadingUnderlined from '../HeadingUnderlined/HeadingUnderlined';
import BaseText from '../BaseText/BaseText';

import styles from './AboutMe.module.css';

const AboutMe = () => {
  return (
    <section className={styles.aboutMe}>
      <HeadingUnderlined extraClass={styles.aboutMe__heading}>
        Студент
      </HeadingUnderlined>
      <figure className={styles.aboutMe__infoBox}>
        <img
          className={styles.aboutMe__photo}
          src={photo}
          alt="Портрет студента."
        />
        <figcaption className={styles.aboutMe__captionBox}>
          <h3 className={styles.aboutMe__name}>Артём</h3>
          <BaseText extraClass={styles.aboutMe__profession}>
            Фронтенд-разработчик, 33 года
          </BaseText>
          <BaseText extraClass={styles.aboutMe__description}>
            Я&nbsp;родился и&nbsp;живу в&nbsp;Таганроге, отучился в&nbsp;ТРТУ.
            После учёбы зарабатывал игрой в&nbsp;покер. Было интересно,
            но&nbsp;время игр прошло. Теперь я&nbsp;плотно изучаю фронтенд. Кому
            вообще интересно читать эти тексты.
          </BaseText>
          <CustomLink
            extraClass={styles.aboutMe__gitLink}
            feature="external-link"
            href="https://github.com/ArtyemSavchenko"
          >
            Github
          </CustomLink>
        </figcaption>
      </figure>
    </section>
  );
};

export default AboutMe;
