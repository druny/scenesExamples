import React from "react";

import AuthProcessing from "~/scenes/AuthProcessing/AuthProcessing";

import SignInSteamButton from "../../Components/SignInSteamButton/SignInSteamButton"

import styles from "./styles.scss";

const content = {
  title: "HexTech - The newest way to open cases and win your favorite skins",
  description: "Sign up now and get 2 Free Cases + 50% match deposit bonus!",
};

export default () => (
  <div className={styles.mainView}>
    <div className={styles.leftPart}>
      <h1 className={styles.tabTitle}>{content.title}</h1>
      <p className={styles.tabDescription}>{content.description}</p>
    </div>
    <div className={styles.rightPart}>
      <div className={styles.buttonView}>
        <AuthProcessing>
          <SignInSteamButton />
        </AuthProcessing>
      </div>
    </div>
  </div>
);
