import client, {Config} from "cloud-config-client";

class ConfigService {
  config: Config | undefined = undefined;

  async init(): Promise<void> {
    if(this.config !== undefined) return;
    this.config = await client.load({
      endpoint: 'http://192.168.1.15:30050',
      name: 'notes',
      profiles: [process.env.CONFIG_PROFILE ?? '']
    });
    this.config.forEach((key, value) => process.env[key] = value);
    console.log(`Config Service Initialized. Profile: ${process.env.CONFIG_PROFILE}`);
  }
}

declare global {
  var configService: ConfigService | undefined;
}

export const configService = global.configService ?? (global.configService = new ConfigService());