import { gsap } from "gsap";
import { splitIntoLetters } from "./split";

// TEXT ANIMATIONS FOR NOCODERS

declare type Props = {
  duration: number;
  stagger: number;
  ease: string;
};

// CONSTANTS
const ATTRIBUTE_PROP = "wb-text-animate";
enum ATTRIBUTE_VALUES {
  STAGGER_TEXT = "stagger-text",
}

// SELECTORS
let elementsToAnimate: NodeList = document.querySelectorAll(
  `[${ATTRIBUTE_PROP}]`
);

// HELPERS
const getCustomProps = (element: Element): Props => {
  let duration = Number(element.getAttribute("duration")) || 0.3;
  let stagger = Number(element.getAttribute("stagger")) || 0.1;
  let ease = element.getAttribute("ease") || "power2.out";
  return {
    duration,
    stagger,
    ease,
  };
};

elementsToAnimate.forEach((el) => {
  let attributeValue = (el as Element).getAttribute("wb-text-animate");
  if (attributeValue === ATTRIBUTE_VALUES.STAGGER_TEXT) {
    const splitText = splitIntoLetters(el);
    //console.log(splitText);
    let { duration, stagger, ease } = getCustomProps(el as Element);

    gsap.from(splitText.chars, {
      opacity: 0,
      y: "50%",
      duration,
      stagger,
      ease,
    });
  }
});
