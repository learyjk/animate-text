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
  distanceFromViewportBottom: string;
};

// CONSTANTS
const ATTRIBUTE_PROP = "wb-animate-text";
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
  // props with no defaults
  let duration = Number(element.getAttribute("duration"));
  let stagger = Number(element.getAttribute("stagger"));
  let ease = String(element.getAttribute("ease"));

  // props with defaults
  let textDivision = element.getAttribute("text-division") || "chars";
  let repeat = Number(element.getAttribute("repeat")) || 0;
  let repeatDelay = Number(element.getAttribute("repeat-delay")) || 2;
  let distanceFromViewportBottom = element.getAttribute("distance-from-top")
    ? `"bottom-=${element.getAttribute("distance-from-top")?.toString()}`
    : "bottom-=10%";

  console.log("distanceFromViewportBottom", distanceFromViewportBottom);

  return {
    duration,
    stagger,
    ease,
    textDivision,
    repeat,
    repeatDelay,
    distanceFromViewportBottom,
  };
};

// ANIMATE LOOP
elementsToAnimate.forEach((el) => {
  const attributeValue = el.getAttribute(ATTRIBUTE_PROP);

  const {
    duration,
    stagger,
    ease,
    textDivision,
    repeat,
    repeatDelay,
    distanceFromViewportBottom,
  } = getCustomProps(el);

  const splitText = splitIntoLetters(el);

  if (textDivision === "chars") {
    gsap.set(el.querySelectorAll(".word"), { autoAlpha: 1 });
    gsap.set(el.querySelectorAll(".line"), { autoAlpha: 1 });
  }

  if (textDivision === "words") {
    gsap.set(el.querySelectorAll(".line"), { autoAlpha: 1 });
    gsap.set(el.querySelectorAll(".char"), { autoAlpha: 1 });
  }

  if (textDivision === "lines") {
    gsap.set(el.querySelectorAll(".word"), { autoAlpha: 1 });
    gsap.set(el.querySelectorAll(".char"), { autoAlpha: 1 });
  }

  gsap.set(el, { autoAlpha: 1 });

  if (attributeValue === ATTRIBUTE_VALUES.STAGGER_TEXT) {
    gsap.from(splitText[textDivision], {
      autoAlpha: 0,
      y: "100%",
      stagger: stagger || 0.05,
      repeat,
      repeatDelay,
      ease: ease || "expo.out",
      scrollTrigger: {
        trigger: el,
        start: `bottom ${distanceFromViewportBottom}`,
      },
    });
  }

  if (attributeValue === ATTRIBUTE_VALUES.FADE_IN_FROM_LEFT) {
    gsap.from(splitText[textDivision], {
      autoAlpha: 0,
      stagger: stagger || 0.1,
      ease: "power2.out",
      repeat,
      repeatDelay,
      scrollTrigger: {
        trigger: el,
        start: `bottom ${distanceFromViewportBottom}`,
      },
    });
  }

  if (attributeValue === ATTRIBUTE_VALUES.SLIDE_FROM_RIGHT) {
    let tl = gsap.timeline({
      repeat,
      repeatDelay,
      scrollTrigger: {
        trigger: el,
        start: `bottom ${distanceFromViewportBottom}`,
      },
    });
    tl.from(splitText[textDivision], {
      autoAlpha: 0,
      x: "200%",
      stagger: stagger || 0.05,
      ease: "expo.out",
    }).from(
      el,
      {
        autoAlpha: 0,
        x: "15%",
        duration: (stagger || 0.05) * el.textContent!.length * 2,
        ease: "expo.out",
      },
      "<"
    );
  }

  //bounce it
  if (attributeValue === ATTRIBUTE_VALUES.BOUNCE_IN) {
    gsap.from(splitText[textDivision], {
      autoAlpha: 0,
      scaleX: 0,
      y: "100%",
      stagger: stagger || 0.1,
      ease: "back.out(2)",
      repeat,
      repeatDelay,
      scrollTrigger: {
        trigger: el,
        start: `bottom ${distanceFromViewportBottom}`,
      },
    });
  }

  if (attributeValue === ATTRIBUTE_VALUES.SCALE_IN) {
    gsap.from(splitText[textDivision], {
      autoAlpha: 0,
      scale: 4,
      stagger: stagger || 0.1,
      ease,
      repeat,
      repeatDelay,
      scrollTrigger: {
        trigger: el,
        start: `bottom ${distanceFromViewportBottom}`,
      },
    });
  }

  if (attributeValue === ATTRIBUTE_VALUES.BLUR_IN) {
    const tl = gsap.timeline({
      repeat,
      repeatDelay,
      scrollTrigger: {
        trigger: el,
        start: `bottom ${distanceFromViewportBottom}`,
      },
    });
    tl.from(splitText[textDivision], {
      autoAlpha: 0,
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
    //const tl = gsap.timeline({ repeat, repeatDelay });
    gsap.from(splitText[textDivision], {
      x: "-200%",
      autoAlpha: 0,
      stagger: stagger || 0.05,
      ease: "back.out(4)",
      repeat,
      repeatDelay,
      scrollTrigger: {
        trigger: el,
        start: `bottom ${distanceFromViewportBottom}`,
      },
    });
  }

  // rotated reveal
  if (attributeValue === ATTRIBUTE_VALUES.ROTATED_REVEAL) {
    gsap.from(splitText[textDivision], {
      y: "100%",
      rotateZ: "20deg",
      autoAlpha: 0,
      duration: 1,
      stagger: stagger || 0.5,
      ease: "expo.out",
      repeat,
      repeatDelay,
      scrollTrigger: {
        trigger: el,
        start: `bottom ${distanceFromViewportBottom}`,
      },
    });
  }
});
