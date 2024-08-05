let manifest = {};
function _privateSetManifestDontUseThis(ssrManifest) {
  manifest = ssrManifest;
}

export { _privateSetManifestDontUseThis as _, manifest as m };
