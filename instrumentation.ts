import { configService } from "@/lib/ConfigService";
import {Cron} from "croner";
import {refreshExpiredTokens} from "@/lib/AuthenticationService";

export async function register() {
  await configService.init();

  if (process.env.NEXT_RUNTIME === "nodejs") {
    const {databaseService} = await import("@/lib/DatabaseService");
    await databaseService.init();
  }

  new Cron('0 */5 * * * *', refreshExpiredTokens);
}