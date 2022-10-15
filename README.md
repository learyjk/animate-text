# Web Bae Animate Text

## What is wb-animate-text?

Animate Text is a no-code wrapper for GSAP to easily add award winning text animations to your web project. Animate Text offers multiple customization options on top of it's opinionated animation designs.

https://user-images.githubusercontent.com/35752455/196008550-86d3ed46-c6e2-4549-8d5f-db2604eed1a2.mp4

## Demo Site

https://wb-animate-text.webflow.io/

## How do I use it?

1. Add the script to before the `</body>` tag

2. Add the CSS styles to your `<head>` tag

3. Add a custom attribute `wb-animate-text` to you Webflow project and value for animation you want:

> Name = `wb-animate-text`\
> Value = `stagger-from-bottom`

4. Customize as necessary with given opptions below.

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

- `text-division`
- `stagger`
- `duration`
- `ease`
- `repeat`
- `repeat-delay`
- `trigger-distance-from-bottom`
- `yoyo`

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

Specify any ease the GSAP accepts: https://greensock.com/ease-visualizer/

Default ease depends on the animation

### Repeat

> Name = `repeat`\
> Value = `-1`

Specify a number of times for animation to repeat. `-1` for infinite repetitions.

Default is 0 (animation plays only once)

### Repeat Delay

> Name = `repeat-delay`\
> Value = `1`

Specify a time in seconds to dleay between each animation repetition.

Default value is 2 seconds.

### Trigger istance From Viewport Bottom

> Name = `trigger-distance-from-bottom`\
> Value = `25`

Specify a number which represents percent distance from viewport bottom for your animation to trigger. Percentage is relative to the bottom of your element. I.e. if 25 is entered as the value, you should expect your text to animate the bottom of the text is 25% from the bottom of the viewport.

Default value is 10%

### Yoyo

> Name = `yoyo`\
> Value = `true`

Determines if the animation should 'yoyo', or 'play in reverse' after playing forward.

Default value is false.
