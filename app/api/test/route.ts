import {databaseService} from "@/app/lib/DatabaseService";
import {NextResponse} from "next/server";
import {authorizeWithDiscordCode, getDiscordUserFromDiscordToken} from "@/app/lib/DiscordService";

export async function GET(){
  return NextResponse.json(await databaseService?.prisma?.records.findMany());
}

export async function POST(req: Request) {
  const body = await req.json();
  const code = body.token;

  console.log(await getDiscordUserFromDiscordToken(code));

  return NextResponse.json(body);
}