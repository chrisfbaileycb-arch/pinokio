const Store = require('electron-store');
const packagejson = require("./package.json")
const store = new Store();
module.exports = {
  newsfeed: (gitRemote) => {
    return `https://pinokiocomputer.github.io/home/item?uri=${gitRemote}&display=feed`
  },
  profile: (gitRemote) => {
    return `https://pinokiocomputer.github.io/home/item?uri=${gitRemote}&display=profile`
  },
  site: "https://pinokio.co",
  discover_dark: "https://pinokio.co?embed=1&theme=dark",
  discover_light: "https://pinokio.co?embed=1&theme=light",
  portal: "https://pinokio.co",
  docs: "https://pinokio.co/docs",
  install: "https://pinokiocomputer.github.io/program.pinokio.computer/#/?id=install",
  agent: process.env.PINOKIO_AGENT || "web",
  port: parseInt(process.env.PORT || '3000', 10),
  version: packagejson.version,
  store
}
