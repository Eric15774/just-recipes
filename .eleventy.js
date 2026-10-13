export default function (eleventyConfig) {
  // Copy static assets straight through
  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy("src/images");

  // Turn "Main Courses" into "main-courses" for URLs
  eleventyConfig.addFilter("slugify", function (str) {
    return String(str)
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  });

  // All recipes, sorted alphabetically by title
  eleventyConfig.addCollection("recipesAZ", function (collectionApi) {
    return collectionApi
      .getFilteredByGlob("src/recipes/*.md")
      .sort((a, b) => a.data.title.localeCompare(b.data.title));
  });

  // Recipes grouped by category, e.g. collections.byCategory["Main Courses"]
  eleventyConfig.addCollection("byCategory", function (collectionApi) {
    const recipes = collectionApi.getFilteredByGlob("src/recipes/*.md");
    const groups = {};
    for (const recipe of recipes) {
      const cat = recipe.data.category || "Uncategorized";
      if (!groups[cat]) groups[cat] = [];
      groups[cat].push(recipe);
    }
    for (const cat in groups) {
      groups[cat].sort((a, b) => a.data.title.localeCompare(b.data.title));
    }
    return groups;
  });

  // List of category names, alphabetical
  eleventyConfig.addCollection("categoryNames", function (collectionApi) {
    const recipes = collectionApi.getFilteredByGlob("src/recipes/*.md");
    const names = new Set(recipes.map((r) => r.data.category || "Uncategorized"));
    return [...names].sort();
  });

  // Recipe tags with their recipes, e.g. [{ name, slug, recipes }]
  eleventyConfig.addCollection("tagList", function (collectionApi) {
    const slug = (s) => String(s).toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    const map = {};
    for (const r of collectionApi.getFilteredByGlob("src/recipes/*.md")) {
      for (const tag of r.data.tags || []) {
        const s = slug(tag);
        if (!s) continue;
        if (!map[s]) map[s] = { name: tag, slug: s, recipes: [] };
        map[s].recipes.push(r);
      }
    }
    const list = Object.values(map);
    for (const t of list) t.recipes.sort((a, b) => a.data.title.localeCompare(b.data.title));
    return list.sort((a, b) => a.name.localeCompare(b.name));
  });

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "_data",
    },
  };
}
