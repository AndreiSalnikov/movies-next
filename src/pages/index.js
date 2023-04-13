import styles from './index.module.scss'
import Promo from "../components/Promo/Promo";
import AboutProject from "../components/AboutProject/AboutProject";
import Techs from "../components/Techs/Techs";
import AboutMe from "../components/AboutMe/AboutMe";
import Portfolio from "../components/Portfolio/Portfolio";

function Home() {
  return (
      <main className={styles.home}>
        <Promo></Promo>
        <AboutProject></AboutProject>
        <Techs></Techs>
        <AboutMe></AboutMe>
        <Portfolio></Portfolio>
      </main>

  );
}

export default Home;
