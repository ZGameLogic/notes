import {databaseService} from "@/app/lib/DatabaseService";
import {NextResponse} from "next/server";

export async function GET(){
  return NextResponse.json(await databaseService?.prisma?.records.findMany());
}