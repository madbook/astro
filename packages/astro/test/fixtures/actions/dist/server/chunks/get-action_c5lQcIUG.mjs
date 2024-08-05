async function getAction(path) {
  const pathKeys = path.replace("/_actions/", "").split(".");
  let { server: actionLookup } = await import('./_astro_internal-actions_BmyCy9Pu.mjs');
  for (const key of pathKeys) {
    if (!(key in actionLookup)) {
      return void 0;
    }
    actionLookup = actionLookup[key];
  }
  if (typeof actionLookup !== "function") {
    return void 0;
  }
  return actionLookup;
}

export { getAction };
