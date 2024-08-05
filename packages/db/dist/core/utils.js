import { getAstroStudioEnv } from "@astrojs/studio";
import { loadEnv } from "vite";
import "./types.js";
function getAstroEnv(envMode = "") {
  const env = loadEnv(envMode, process.cwd(), "ASTRO_");
  return env;
}
function getRemoteDatabaseUrl() {
  const env = getAstroStudioEnv();
  return env.ASTRO_STUDIO_REMOTE_DB_URL || "https://db.services.astro.build";
}
function getDbDirectoryUrl(root) {
  return new URL("db/", root);
}
function defineDbIntegration(integration) {
  return integration;
}
function mapObject(item, callback) {
  return Object.fromEntries(
    Object.entries(item).map(([key, value]) => [key, callback(key, value)])
  );
}
export {
  defineDbIntegration,
  getAstroEnv,
  getDbDirectoryUrl,
  getRemoteDatabaseUrl,
  mapObject
};
