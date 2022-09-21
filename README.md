An extension that converts colors given on frontendmentor.io style-guide.md files in the following format:

```

### Neutral

- Almost White: hsl(0, 0%, 98%)
- Medium Gray: hsl(0, 0%, 41%)
- Almost Black: hsl(0, 0%, 8%)

```

to SCSS or CSS readable format by fetching more exact color names from thecolorapi.com API and adding specific prefixes.

Example output SCSS:

```css
$Alabaster: hsl(0, 0%, 98%);
$GraniteGray: hsl(0, 0%, 41%);
$EerieBlack: hsl(0, 0%, 8%);
```

Example output CSS:

```css
--clr-Alabaster: hsl(0, 0%, 98%);
--clr-$GraniteGray: hsl(0, 0%, 41%);
--clr-$EerieBlack: hsl(0, 0%, 8%);
```
