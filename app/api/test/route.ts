import {databaseService} from "@/app/lib/DatabaseService";
import {NextResponse} from "next/server";
import {authorizeWithCode, authorizeWithNotesToken} from "@/app/lib/AuthenticationService";

export async function GET(){
  return NextResponse.json(await databaseService?.prisma?.records.findMany());
}

export async function POST(req: Request) {
  const body = await req.json();
  const code = body.code;

  return NextResponse.json(await authorizeWithNotesToken(code));
}