import photo from '../../../../images/about-me-photo.webp';

import CustomLink from '../../../ui/CustomLink/CustomLink';
import HeadingUnderlined from '../HeadingUnderlined/HeadingUnderlined';
import BaseText from '../BaseText/BaseText';

import './AboutMe.css';

const AboutMe = () => {
  return (
    <section className="about-me">
      <HeadingUnderlined extraClass="about-me__heading">
        Студент
      </HeadingUnderlined>
      <figure className="about-me__info-box">
        <img className="about-me__photo" src={photo} alt="Портрет студента." />
        <figcaption className="about-me__caption-box">
          <h3 className="about-me__name">Артём</h3>
          <BaseText extraClass="about-me__profession">
            Фронтенд-разработчик, 33 года
          </BaseText>
          <BaseText extraClass="about-me__description">
            Я&nbsp;родился и&nbsp;живу в&nbsp;Таганроге, отучился в&nbsp;ТРТУ.
            После учёбы зарабатывал игрой в&nbsp;покер. Было интересно,
            но&nbsp;время игр прошло. Теперь я&nbsp;плотно изучаю фронтенд. Кому
            вообще интересно читать эти тексты.
          </BaseText>
          <CustomLink
            extraClass="about-me__git-link"
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
