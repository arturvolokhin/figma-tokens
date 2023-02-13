import IntroduceSection from "./IntroduceSection";
import styles from "./MainPage.module.scss";

const MainPage = () => {
  return (
    <div className={styles.page}>
      <IntroduceSection />
    </div>
  );
};

export default MainPage;
