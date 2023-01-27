import classes from "./Welcome.module.css";
import SushiEgg from "../../assets/sushiegg.png";
import SushiKik from "../../assets/sushikik.png";
import SushiSide from "../../assets/sushiside.png";

export default function Welcome({ setWelcomeScreen }) {
  return (
    <>
      <div className={classes.welcome} onClick={() => setWelcomeScreen(false)}>
        <div className={classes.welcomeDiv}>
          <h1>WELCOME AT SUSHIYOU</h1>
          <p>
            10% DISCOUNT PROMO CODE: <strong>SUSHINOW</strong>
          </p>
          <button>Let's Order</button>
          <img className={classes.sushiegg} src={SushiEgg} alt="sushi egg" />
          <img className={classes.sushikik} src={SushiKik} alt="sushi kicks" />
          <img className={classes.sushiside} src={SushiSide} alt="sushi side" />
        </div>
      </div>
      <div className={classes.foot}></div>
    </>
  );
}
