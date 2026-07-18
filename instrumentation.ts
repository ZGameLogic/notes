import { configService } from "@/app/lib/ConfigService";
import {Cron} from "croner";
import {refreshExpiredTokens} from "@/app/lib/AuthenticationService";

export async function register() {
  await configService.init();

  if (process.env.NEXT_RUNTIME === "nodejs") {
    const {databaseService} = await import("@/app/lib/DatabaseService");
    await databaseService.init();
  }

  new Cron('*/5 * * * * *', refreshExpiredTokens);
}