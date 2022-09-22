**This extension can be useful to you only if you're doing frontendmentor.io challenges**

## Table of contents

- [What is this?](#what-is-this)
- [How to install](#how-to-install)
  - [Linux](#linux)
  - [Windows](#windows)
- [How to use](#how-to-use)
- [Acknowledgments](#acknowledgments)

## What is this?

This is a Chrome extension that converts any numbers of colors given on frontendmentor.io style-guide.md files in the following format:

```

### Neutral

- Almost White: hsl(0, 0%, 98%)
- Medium Gray: hsl(0, 0%, 41%)
- Almost Black: hsl(0, 0%, 8%)

```

to SCSS or CSS readable format by fetching more exact color names from thecolorapi.com API and adding specific prefixes. It extracts only the HSL values from the input field so don't worry about leaving something like ### Neutral inside, it can handle it.

Example output SCSS:

```scss
$Alabaster: hsl(0, 0%, 98%);
$GraniteGray: hsl(0, 0%, 41%);
$EerieBlack: hsl(0, 0%, 8%);
```

Example output CSS:

```css
--clr-Alabaster: hsl(0, 0%, 98%);
--clr-GraniteGray: hsl(0, 0%, 41%);
--clr-EerieBlack: hsl(0, 0%, 8%);
```

## How to install

### Linux

0. Think about an appropriate location on your computer to save this to
1. Open Terminal
2. Open appropriate location, copy & paste
   ```
   git clone https://github.com/waikoo/FormatColors
   ```
3. Open Google Chrome
4. In the addres bar write
   ```
   chrome://extensions
   ```
5. Upper right hand corner enable `Developer Mode` by clicking the toggle
6. Upper left hand side `Load unpacked`
7. Navigate to where you downloaded it
8. For ease of use, pin it by clicking on the `Extensions` icon next to your address bar and clicking the little pin icon

### Windows

## How to use

## Acknowledgments

Designed by:
[https://www.dribbble.com/Lyonixa](https://www.dribbble.com/Lyonixa)
