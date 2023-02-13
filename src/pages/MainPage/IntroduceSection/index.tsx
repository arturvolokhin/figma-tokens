import styles from "./Introduce.module.scss";

const IntroduceSection = () => {
  return (
    <section className={styles.section}>
      <div className={styles.section__text}>
        <h1 className={styles.section__text_title}>
          We are develope the future
        </h1>
        <h2 className={styles.section__text_subtitle}>
          Dev.family - your provider to the future
        </h2>
      </div>
      <ul className={styles.section__statistic_list}>
        {Array.from({ length: 4 }).map((_, index) => (
          <li key={index} className={styles.section__statistic_list__item}>
            <h2 className={styles.section__statistic_list__item_title}>26</h2>
            <h3 className={styles.section__statistic_list__item_subtitle}>
              ЛЕТ
            </h3>
            <h4 className={styles.section__statistic_list__item_descr}>
              НА РЫНКЕ
            </h4>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default IntroduceSection;
