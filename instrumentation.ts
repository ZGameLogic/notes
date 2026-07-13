import { configService } from "@/app/lib/ConfigService";

export async function register() {
  await configService.init();

  if (process.env.NEXT_RUNTIME === "nodejs") {
    const { databaseService } = await import("@/app/lib/DatabaseService");
    await databaseService.init();
  }
}