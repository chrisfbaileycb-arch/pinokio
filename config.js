const fs = require('fs');
const path = require('path');
const os = require('os');
const packagejson = require("./package.json");

class Store {
  constructor() {
    this.storePath = path.resolve(os.homedir(), ".pinokio", "config.json");
    this.store = {};
    try {
      if (fs.existsSync(this.storePath)) {
        const str = fs.readFileSync(this.storePath, "utf8");
        this.store = JSON.parse(str);
      }
    } catch (e) {
      this.store = {};
    }
  }
  _save() {
    try {
      const dir = path.dirname(this.storePath);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      fs.writeFileSync(this.storePath, JSON.stringify(this.store, null, 2), "utf8");
    } catch (e) {
    }
  }
  set(key, val) {
    this.store[key] = val;
    this._save();
  }
  get(key) {
    return this.store[key];
  }
  delete(key) {
    delete this.store[key];
    this._save();
  }
  has(key) {
    return Object.prototype.hasOwnProperty.call(this.store, key);
  }
  clear() {
    this.store = {};
    this._save();
  }
}

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
