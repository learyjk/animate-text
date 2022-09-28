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
  SCALE_IN = "scale-in",
  BLUR_IN = "blur-in",
  SIDE_ELASTIC_REVEAL = "side-elastic-reveal",
  ROTATED_REVEAL = "rotated-reveal",
}

// SELECTORS
let elementsToAnimate: NodeListOf<Element> = document.querySelectorAll(
  `[${ATTRIBUTE_PROP}]`
);

// HELPERS
const getCustomProps = (element: Element): Props => {
  let duration = Number(element.getAttribute("duration"));
  let stagger = Number(element.getAttribute("stagger"));
  let ease = String(element.getAttribute("ease"));
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
      stagger: stagger || 0.03,
      repeat,
      repeatDelay,
      ease: "expo.out",
    });
  }

  if (attributeValue === ATTRIBUTE_VALUES.FADE_IN_FROM_LEFT) {
    const splitText = splitIntoLetters(el);
    let { duration, stagger, ease, textDivision, repeat, repeatDelay } =
      getCustomProps(el);
    gsap.from(splitText[textDivision], {
      scrollTrigger: el,
      opacity: 0,
      stagger: stagger || 0.1,
      ease: "power2.out",
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
      x: "200%",
      stagger: stagger || 0.05,
      ease: "expo.out",
    }).from(
      el,
      {
        scrollTrigger: el,
        opacity: 0,
        x: "15%",
        duration: (stagger || 0.05) * el.textContent!.length * 2,
        ease: "expo.out",
      },
      "<"
    );
  }

  //bounce it
  if (attributeValue === ATTRIBUTE_VALUES.BOUNCE_IN) {
    const splitText = splitIntoLetters(el);
    let { duration, stagger, ease, textDivision, repeat, repeatDelay } =
      getCustomProps(el);
    gsap.from(splitText[textDivision], {
      scrollTrigger: el,
      opacity: 0,
      scaleX: 0,
      y: "100%",
      stagger: stagger || 0.1,
      ease: "back.out(2)",
      repeat,
      repeatDelay,
    });
  }

  if (attributeValue === ATTRIBUTE_VALUES.SCALE_IN) {
    const splitText = splitIntoLetters(el);
    let { duration, stagger, ease, textDivision, repeat, repeatDelay } =
      getCustomProps(el);
    gsap.from(splitText[textDivision], {
      scrollTrigger: el,
      opacity: 0,
      scale: 4,
      stagger: stagger || 0.1,
      ease,
      repeat,
      repeatDelay,
    });
  }

  if (attributeValue === ATTRIBUTE_VALUES.BLUR_IN) {
    const splitText = splitIntoLetters(el);
    let { duration, stagger, ease, textDivision, repeat, repeatDelay } =
      getCustomProps(el);
    const tl = gsap.timeline({ repeat, repeatDelay });
    tl.from(splitText[textDivision], {
      scrollTrigger: el,
      opacity: 0,
      scale: 0,
      stagger: stagger || 0.1,
      ease,
    }).from(
      el,
      {
        letterSpacing: "3em",
        filter: "blur(40px)",
        duration: duration || 2,
      },
      "<"
    );
  }
  if (attributeValue === ATTRIBUTE_VALUES.SIDE_ELASTIC_REVEAL) {
    const splitText = splitIntoLetters(el);
    let { duration, stagger, ease, textDivision, repeat, repeatDelay } =
      getCustomProps(el);
    const tl = gsap.timeline({ repeat, repeatDelay });
    tl.from(splitText[textDivision], {
      scrollTrigger: el,
      x: "-200%",
      opacity: 0,
      stagger: stagger || 0.05,
      ease: "back.out(4)",
    });
  }

  // rotated reveal
  if (attributeValue === ATTRIBUTE_VALUES.ROTATED_REVEAL) {
    const splitText = splitIntoLetters(el);
    let { duration, stagger, ease, textDivision, repeat, repeatDelay } =
      getCustomProps(el);
    gsap.from(splitText[textDivision], {
      scrollTrigger: el,
      y: "100%",
      rotateZ: "20deg",
      opacity: 0,
      duration: 1,
      stagger: stagger || 0.5,
      ease: "expo.out",
      repeat,
      repeatDelay,
    });
  }
});
