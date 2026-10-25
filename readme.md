# Fazari — restaurant website

A one-page website for **Fazari**, an Arabian grill, mandi and biryani restaurant with four branches in Chennai: Chromepet, Tambaram, Pallavaram and OMR.

It's plain HTML, CSS and JavaScript, so there's no build step and nothing to install.

## Run it locally

Open `index.html` in a browser, or serve the folder:

```sh
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Project structure

```
index.html        Page content: hero, signature dishes, menu, about, reviews, locations
css/styles.css    All styles (colours and fonts are defined at the top in :root)
js/menu.js        Menu data. Edit this to change dishes, prices and categories
js/main.js        Mobile nav, open/closed status, menu filters, branch map, scroll effects
assets/           Logo, favicon, and the place to put photos (assets/images/)
```

## Logo

`assets/logo-white.svg` is a vector trace of the logo on [Instagram](https://www.instagram.com/fazarirestaurant/). Instagram only serves the logo at 150×150 px. If the restaurant has the original logo file (SVG, AI or a large PNG), use that instead. The brand teal from the logo is `#1e7f80`. The favicon uses it.

## Before going live

These details are placeholders or come from public listings. Please confirm them:

- [ ] **Branch phone numbers.** No phone numbers are shown yet. Each branch card in the Locations section of `index.html` can take one. The Chromepet card has a commented example.
- [ ] **Hours.** The site says every branch is open 12:00 PM to 11:00 PM daily. That's confirmed for Chromepet and Tambaram (EazyDiner) but not for Pallavaram or OMR. If any differ, update the Locations text in `index.html`, `OPEN_AT` and `CLOSE_AT` in `js/main.js`, and that branch's entry in the JSON-LD block in `<head>`.
- [ ] **Delivery links for Pallavaram and OMR.** Chromepet and Tambaram link to their Zomato pages. Add Zomato or Swiggy links for the other two branches if they have them.
- [ ] **Menu and prices.** `js/menu.js` only lists dishes that guests mention in reviews. Add the full menu (including the Chinese section) and set `price` on each item.
- [ ] **Ratings.** The per-branch Google ratings and the overall "4.4 avg. of 16K+" (October 2026) will go out of date. Update them now and then, or remove them.
- [ ] **About text** in the About section. Add your own story if you'd like.
- [ ] **Signature dish photos.** These are stock photos, not Fazari's own food (see below). Replace them with real photos before launch.

## Photos

### Signature dishes (stock stand-ins)

The six signature cards currently use free stock photos from Unsplash. The [Unsplash License](https://unsplash.com/license) allows this, but they show similar dishes, not Fazari's. To use real photos, save them over these files with the same names. Landscape 4:3 works best, at about 900×675. No code changes are needed.

| File in `assets/images/dishes/` | Stock photo by |
|---|---|
| `chicken-mandi.jpg` | [aboodi vesakaran](https://unsplash.com/photos/a-plate-of-food-with-rice-meat-and-sauces-5DH78QpCR9w) |
| `bbq-biryani.jpg` | [Mario Raj](https://unsplash.com/photos/a-white-bowl-filled-with-rice-and-meat-ysmeQt1dzcw) |
| `full-tandoori.jpg` | [Mayur Sable](https://unsplash.com/photos/a-close-up-of-a-chicken-on-a-plate-jyrr5cYKwao) |
| `bbq-kebab-platter.jpg` | [Gang Hao](https://unsplash.com/photos/a-large-platter-of-assorted-grilled-meats-and-vegetables-o__sIR_14dA) |
| `mexican-shawarma-plate.jpg` | [mahsa shamshiri fard](https://unsplash.com/photos/a-plate-of-food-with-a-variety-of-different-foods-on-it-Iax8VBp6CdU) |
| `tandoori-prawns.jpg` | [Rashpal Singh](https://unsplash.com/photos/a-plate-of-food-with-shrimp-lemons-and-onions-FL_KtxdCBlI) |

### Other photos

- **Menu:** save photos as `assets/images/menu/<dish-name>.jpg` and set `image` on the item in `js/menu.js`. A thumbnail then appears next to that dish. Square images work best.
- **Hero:** add `<img class="medallion-photo" src="assets/images/hero.jpg" alt="">` inside `.medallion` in `index.html` (square, at least 1000×1000). It covers the logo in the circle.

Use the restaurant's own photos. Dish photos on Zomato and Swiggy are often taken by the platform's photographers, and their terms don't allow reuse.

Compress photos before adding them (for example with [squoosh.app](https://squoosh.app)) to keep the site fast.

## Deploying

Any static host works. Three free options:

- **Netlify Drop:** drag this folder onto [app.netlify.com/drop](https://app.netlify.com/drop).
- **GitHub Pages:** push to a repository and turn on Pages in its settings.
- **Vercel:** `npx vercel` from this folder.

After it's live, link the site from your Google Business Profile.
