import config from "../config.json";
import configDev from "../config.dev.json";
import configProd from "../config.prod.json";

class ConfigService {
  constructor() {
    const env = import.meta.env.VITE_CONFIG_ENV;
    if (env === "development") {
      this._config = configDev;
    } else if (env === "production") {
      this._config = configProd;
    } else {
      this._config = config;
    }
  }

  get(keyPath, tplVars = null) {
    let val = eval(`this._config.${keyPath}`);
    if (tplVars) {
      for (let key in tplVars) {
        val = val.replace(
          new RegExp(`\\$\\{${key}\\}`, "g"),
          tplVars[key] || ""
        );
      }
    }
    return val;
  }
}

export const configService = new ConfigService();
