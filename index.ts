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
  repeat: number;
  repeatDelay: number;
};

// CONSTANTS
const ATTRIBUTE_PROP = "wb-text-animate";
enum ATTRIBUTE_VALUES {
  STAGGER_TEXT = "stagger-text",
  FADE_IN_FROM_LEFT = "fade-in-from-left",
  SLIDE_FROM_RIGHT = "slide-from-right",
  BOUNCE_IN = "bounce-in",
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
  let repeat = Number(element.getAttribute("repeat")) || -1;
  let repeatDelay = Number(element.getAttribute("repeat-delay")) || 2;
  return {
    duration,
    stagger,
    ease,
    textDivision,
    repeat,
    repeatDelay,
  };
};

// ANIMATE LOOP
elementsToAnimate.forEach((el) => {
  let attributeValue = el.getAttribute("wb-text-animate");
  if (attributeValue === ATTRIBUTE_VALUES.STAGGER_TEXT) {
    let { duration, stagger, ease, textDivision, repeat, repeatDelay } =
      getCustomProps(el);
    const splitText = splitIntoLetters(el);

    gsap.from(splitText[textDivision], {
      scrollTrigger: el,
      opacity: 0,
      y: "100%",
      duration,
      stagger,
      ease,
      repeat,
      repeatDelay,
    });
  }

  if (attributeValue === ATTRIBUTE_VALUES.FADE_IN_FROM_LEFT) {
    const splitText = splitIntoLetters(el);
    let { duration, stagger, ease, textDivision, repeat, repeatDelay } =
      getCustomProps(el);
    gsap.from(splitText[textDivision], {
      scrollTrigger: el,
      opacity: 0,
      duration,
      stagger,
      ease,
      repeat,
      repeatDelay,
    });
  }

  if (attributeValue === ATTRIBUTE_VALUES.SLIDE_FROM_RIGHT) {
    const splitText = splitIntoLetters(el);
    let { duration, stagger, ease, textDivision, repeat, repeatDelay } =
      getCustomProps(el);
    let tl = gsap.timeline({ repeat, repeatDelay });
    tl.from(splitText[textDivision], {
      scrollTrigger: el,
      opacity: 0,
      x: "100%",
      duration,
      stagger: 0.05,
      ease: "sine.inOut",
      repeatDelay,
    }).from(
      el,
      {
        scrollTrigger: el,
        opacity: 0,
        x: "10%",
        duration: stagger * el.textContent!.length,
        ease: "expo.out",
        repeatDelay,
      },
      "<"
    );
  }

  if (attributeValue === ATTRIBUTE_VALUES.BOUNCE_IN) {
    const splitText = splitIntoLetters(el);
    let { duration, stagger, ease, textDivision, repeat, repeatDelay } =
      getCustomProps(el);
    gsap.from(splitText[textDivision], {
      scrollTrigger: el,
      opacity: 0,
      scaleX: 0,
      y: "100%",
      duration,
      stagger,
      ease: "back.out(2)",
      repeat,
      repeatDelay,
    });
  }
});
