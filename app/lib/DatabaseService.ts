import {PrismaPg} from "@prisma/adapter-pg";
import {PrismaClient} from "@/generated/prisma/client";

class DatabaseService {
  prisma: PrismaClient | undefined = undefined;

  async init(): Promise<void> {
    if(this.prisma !== undefined) return;
    const connectionString = `postgresql://${process.env['next.datasource.username']}:${process.env['next.datasource.password']}@${process.env['next.datasource.url']}?schema=${process.env['next.datasource.schema']}`;
    const adapter = new PrismaPg({ connectionString }, { schema: process.env['next.datasource.schema'] });
    this.prisma = new PrismaClient({ adapter });
    console.log("DatabaseService initialized");
  }
}

declare global {
  var databaseService: DatabaseService | undefined;
}

export const databaseService = global.databaseService ?? (global.databaseService = new DatabaseService());