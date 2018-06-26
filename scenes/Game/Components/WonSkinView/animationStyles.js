import { jss } from "react-jss";
import vendorPrefixer from "jss-vendor-prefixer";
import {
  merge,
  fadeIn,
  headShake,
  fadeInLeft,
  fadeInRight,
} from "react-animations";

jss.use(vendorPrefixer);

const shakeFadeLeft = merge(headShake, fadeInLeft);
const shakeFadeRight = merge(headShake, fadeInRight);

const animationDuration = "1s";

const { classes } = jss.createStyleSheet({
  "@keyframes shakeFadeLeft": shakeFadeLeft,
  "@keyframes shakeFadeRight": shakeFadeRight,
  "@keyframes fadeIn": fadeIn,
  shakeFadeLeft: {
    animation: `shakeFadeLeft ${animationDuration} forwards`,
  },
  shakeFadeRight: {
    animation: `shakeFadeRight ${animationDuration} forwards`,
  },
  skinValue: {
    animation: `fadeIn ${animationDuration} forwards`,
  },
}).attach();

export default classes;
