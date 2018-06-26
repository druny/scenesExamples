import React from "react";
import AuthProcessing from "~/scenes/AuthProcessing/AuthProcessing";

import SignInButtonSteam from "../../Components/SignInButtonSteam/SignInButtonSteam";
import MenuList from "../MenuList/MenuList";

const ContentMenuPublic = () => (
  <div>
    <AuthProcessing>
      <SignInButtonSteam />
    </AuthProcessing>

    <MenuList />
  </div>
);

export default ContentMenuPublic;
