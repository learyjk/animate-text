# Web Bae Animate Text

## What is wb-animate-text?

Animate Text is a no-code wrapper for GSAP to easily add award winning text animations to your web project. Animate Text offers multiple customization options on top of it's opinionated animation designs.

![demo video](/assets/animateText.mov)

## Demo Site

https://animation-testing-grounds.webflow.io/

## How do I use it?

simply add a custom attribute `wb-animate-text` to you Webflow project and value for animation you want:

> Name = `wb-animate-text`\
> Value = `stagger-from-bottom`

## What Animations are available?

- `stagger-from-bottom`
- `fade-in-from-left`
- `slide-from-right`
- `bounce-in`
- `scale-in`
- `blur-in`
- `side-elastic-reveal`
- `rotated-reveal`
- `skew-up`

## Can I customize the animations?

Yes! There are global customizations and some specific to individual animations. All of these are optional.

Here's a list of customizable properties.

### Text Division

> Name = `text-division`\
> Value = `words`

Value can be `chars`, `words`, or `lines`.

Default is `chars`.

### Stagger

> Name = `stagger`\
> Value = `0.5`

Value is a number in second to stagger between each specified `text-division`.

Default value is different for each animation.

For most animations, the actual duration is controlled by the stagger time.

### Duration

> Name = `duration`\
> Value = `2`

Value is a number for duration of animation in seconds. Note that most animation durations are controlled by the stagger time. Duration is used for `slide-from-right` and `blur-in`.

Default duration depends on the animation.

### Ease

> Name = `ease`\
> Value = `power3.out`

return {
ease,
repeat,
repeatDelay,
distanceFromViewportBottom,
yoyo,
};
