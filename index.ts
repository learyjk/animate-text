import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { splitIntoLetters } from "./split";

gsap.registerPlugin(ScrollTrigger);

// TEXT ANIMATIONS FOR NOCODERS

declare type Props = {
  duration: number;
  stagger: number;
  ease: string;
  textDivision: string;
};

// CONSTANTS
const ATTRIBUTE_PROP = "wb-text-animate";
enum ATTRIBUTE_VALUES {
  STAGGER_TEXT = "stagger-text",
  FADE_IN_FROM_LEFT = "fade-in-from-left",
}

// SELECTORS
let elementsToAnimate: NodeListOf<Element> = document.querySelectorAll(
  `[${ATTRIBUTE_PROP}]`
);

// HELPERS
const getCustomProps = (element: Element): Props => {
  let duration = Number(element.getAttribute("duration")) || 0.3;
  let stagger = Number(element.getAttribute("stagger")) || 0.1;
  let ease = element.getAttribute("ease") || "power2.out";
  let textDivision = element.getAttribute("text-division") || "chars";
  return {
    duration,
    stagger,
    ease,
    textDivision,
  };
};

// ANIMATE LOOP
elementsToAnimate.forEach((el) => {
  let attributeValue = el.getAttribute("wb-text-animate");
  if (attributeValue === ATTRIBUTE_VALUES.STAGGER_TEXT) {
    let { duration, stagger, ease, textDivision } = getCustomProps(
      el as Element
    );
    const splitText = splitIntoLetters(el);

    gsap.from(splitText[textDivision], {
      scrollTrigger: el,
      opacity: 0,
      y: "50%",
      duration,
      stagger,
      ease,
    });
  }

  if (attributeValue === ATTRIBUTE_VALUES.FADE_IN_FROM_LEFT) {
    const splitText = splitIntoLetters(el);
    let { duration, stagger, ease, textDivision } = getCustomProps(
      el as Element
    );
    gsap.from(splitText[textDivision], {
      scrollTrigger: el,
      opacity: 0,
      duration,
      stagger,
      ease,
    });
  }
});
