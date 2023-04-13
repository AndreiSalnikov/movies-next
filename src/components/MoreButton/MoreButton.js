import styles from "./MoreButton.module.scss";

const MoreButton = ({trigger, setIsMoreClicked, setTrigger}) => {
  const addMoreMovies = () => {
    setTrigger(!trigger)
    setIsMoreClicked(true)
  };

  return (
    <button className={styles.more} onClick={addMoreMovies}>Ещё</button>
  );
};

export default MoreButton;
