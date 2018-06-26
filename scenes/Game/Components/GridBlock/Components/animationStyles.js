import { jss } from "react-jss";
import jssNested from "jss-nested";
import vendorPrefixer from "jss-vendor-prefixer";

jss.use(jssNested);
jss.use(vendorPrefixer);

const spaceLength = "44%";
const animationDuration = ".4s";

export default {
  card: {
    "&:hover $hoverLineLeft": {
      animationDuration,
      height: "40px",
      bottom: 0,
      marginBottom: "auto",
    },
    "&:hover $hoverLineRight": {
      animationDuration,
      height: "40px",
      top: 0,
      marginTop: "auto",
    },
    "&:hover $hoverLineUp": {
      animationDuration,
      width: "40px",
      left: 0,
      marginLeft: "auto",
    },
    "&:hover $hoverLineDown": {
      animationDuration,
      width: "40px",
      right: 0,
      marginRight: "auto",
    },
  },
  hoverLineLeft: {
    left: 0,
    height: "10px",
    top: 0,
    marginTop: "auto",
    bottom: spaceLength,
    marginBottom: spaceLength,
  },
  hoverLineRight: {
    right: 0,
    height: "10px",
    bottom: 0,
    marginBottom: "auto",
    top: spaceLength,
    marginTop: spaceLength,
  },
  hoverLineUp: {
    top: 0,
    width: "10px",
    right: 0,
    marginRight: "auto",
    left: spaceLength,
    marginLeft: spaceLength,
  },
  hoverLineDown: {
    bottom: 0,
    width: "10px",
    left: 0,
    marginLeft: "auto",
    right: spaceLength,
    marginRight: spaceLength,
  },
};
