# Just Recipes

A family cookbook, rebuilt as a static site. No database to maintain, no
buttons to reorder by hand. Every recipe is one plain text file; the
category pages, the A-Z index, and the search box are all generated
automatically from those files.

## How to add a recipe

1. Copy any file in `src/recipes/` as a starting point.
2. Save it as `src/recipes/your-recipe-name.md` (lowercase, hyphens instead
   of spaces).
3. Fill in the front matter (the part between the `---` lines) and the
   Ingredients / Directions / Notes sections.
4. Commit and push. The category page, the homepage A-Z list, and the
   search index all update on their own, nothing else to touch.

```markdown
---
layout: layouts/recipe.njk
title: Recipe Name
category: Main Courses
tags: [tag-one, tag-two]
prep: 15 min
cook: 30 min
servings: "4-6"
---

## Ingredients

- item one
- item two

## Directions

1. step one
2. step two

## Notes

- optional tips, substitutions, make-ahead notes
```

Categories are just whatever text you put in the `category:` field. A new
category name automatically gets its own page, no setup needed. Keep the
spelling consistent (e.g. always "Main Courses", not sometimes "Main
Course") so recipes group together correctly.

## Local preview

```
npm install
npm run serve
```

This starts a local server (usually http://localhost:8080) and rebuilds
as you edit files. Note: the search box only works after a full build
(`npm run build`), not in the live preview server, since Pagefind indexes
the built HTML.

## Building for real

```
npm run build
```

Output goes to `_site/`. You normally won't run this by hand, the GitHub
Actions workflow in `.github/workflows/deploy.yml` does it automatically
on every push to `main` and publishes the result to GitHub Pages.

## One-time GitHub setup

1. Create a new repository on GitHub (e.g. `just-recipes`), separate from
   any existing repo like `eric15774.github.io`. You can have as many
   project sites as you want on one account.
2. Push this folder to that repo.
3. In the repo's Settings -> Pages, set "Source" to "GitHub Actions".
4. Push to `main` (or re-run the workflow) and the site will build and
   deploy automatically.
5. If you want it on `longwell.io` or a subdomain like
   `recipes.longwell.io`, add a `CNAME` file to `src/` with that domain
   in it, and point your domain's DNS at GitHub Pages (same way you did
   for mrlongwell.com).

## What's included so far

Three converted recipes as examples, spanning three categories:

- `chili.md` (Main Courses)
- `banana-bread.md` (Breads and Doughs)
- `peanut-butter-cookies.md` (Cookies Etc.)

The rest of the ~150 recipes from the Google Sites version still need to
be converted into this format. That's the main remaining work, best done
a category at a time. Paste me the text of a batch of recipes and I can
convert them into files in this format.
