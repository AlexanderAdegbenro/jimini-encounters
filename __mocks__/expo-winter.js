/**
 * No-op mock for expo/src/winter to avoid Jest 30 "import outside of scope" error
 * when the real winter runtime installs __ExpoImportMetaRegistry.
 * Node test environment already provides TextDecoder, URL, etc.
 */
module.exports = {};
