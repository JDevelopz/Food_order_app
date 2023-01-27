import classes from "./Header.module.css";
import MealsImage from "../../assets/sushi.jpeg";
import HeaderCartBtn from "./HeaderCartBtn";

const Header = (props) => {
  return (
    <>
      <header className={classes.header}>
        <h1>SUSHIYOU</h1>
        <HeaderCartBtn setCartStatus={props.setCartStatus} />
      </header>
      <div className={classes["main-image"]}>
        <img src={MealsImage} alt="A plate with delicious food." />
      </div>
    </>
  );
};

export default Header;
