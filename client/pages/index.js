import styles from "../styles/Home.module.css";
import Header from "../components/Header";
import StakeDetails from "../components/StakeDetails";
import StakeForm from "../components/StakeForm";

export default function Home() {
  return (
    <main className="bg-gradient-to-r from-pink-300 to-green-300">
      <div className={` ${styles.container}`}>
        <Header />
        <StakeDetails />
        <StakeForm />
      </div>
    </main>
  );
}