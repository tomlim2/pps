import SectionModelEmoji1 from "components/sections/fiber/model-emoji-1";
import styles from "./page.module.scss";

export const metadata = {
  title: "Model emoji 1 | Fiber | yslim",
  description: "My playground",
};

const JourneyEnv = () => {
  return (
    <main className={styles.page}>
      <SectionModelEmoji1 />
    </main>
  );
};

export default JourneyEnv;
