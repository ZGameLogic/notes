import {PrismaPg} from "@prisma/adapter-pg";
import {PrismaClient} from "@/generated/prisma/client";

class DatabaseService {
  prisma: PrismaClient | undefined = undefined;

  async init(): Promise<void> {
    if(this.prisma !== undefined) return;
    const connectionString = `postgresql://${process.env['datasource.username']}:${process.env['datasource.password']}@${process.env['datasource.url']}?sslmode=disable`;
    const adapter = new PrismaPg({ connectionString });
    this.prisma = new PrismaClient({ adapter });
    console.log("DatabaseService initialized");
  }
}

declare global {
  var databaseService: DatabaseService | undefined;
}

export const databaseService = global.databaseService ?? (global.databaseService = new DatabaseService());