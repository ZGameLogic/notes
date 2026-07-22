-- CreateEnum
CREATE TYPE "CampaignRole" AS ENUM ('player', 'admin', 'owner');

-- CreateEnum
CREATE TYPE "EventType" AS ENUM ('create', 'update');

-- CreateTable
CREATE TABLE "aliases" (
    "record_id" UUID NOT NULL,
    "alias" VARCHAR NOT NULL,
    "created_by" BIGINT NOT NULL,

    CONSTRAINT "aliases_pk" PRIMARY KEY ("alias","record_id")
);

-- CreateTable
CREATE TABLE "record_types" (
    "record_type" VARCHAR NOT NULL,
    "created_by" BIGINT NOT NULL,

    CONSTRAINT "record_types_pk" PRIMARY KEY ("record_type")
);

-- CreateTable
CREATE TABLE "records" (
    "id" UUID NOT NULL,
    "type" VARCHAR NOT NULL,
    "notes" VARCHAR,
    "campaign" UUID NOT NULL,
    "created_by" BIGINT NOT NULL,

    CONSTRAINT "records_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "relation_types" (
    "left_record_type" VARCHAR NOT NULL,
    "right_record_type" VARCHAR NOT NULL,
    "left_to_right_phrase" VARCHAR NOT NULL,
    "right_to_left_phrase" VARCHAR NOT NULL,
    "relation_type" VARCHAR NOT NULL,

    CONSTRAINT "relation_types_pk" PRIMARY KEY ("relation_type")
);

-- CreateTable
CREATE TABLE "relations" (
    "left_record" UUID NOT NULL,
    "right_record" UUID NOT NULL,
    "notes" VARCHAR,
    "relation_type" VARCHAR NOT NULL,
    "created_by" BIGINT NOT NULL,

    CONSTRAINT "relations_pk" PRIMARY KEY ("left_record","right_record","relation_type")
);

-- CreateTable
CREATE TABLE "auth_data" (
    "notes_token" VARCHAR NOT NULL,
    "discord_refresh_token" VARCHAR NOT NULL,
    "discord_token" VARCHAR NOT NULL,
    "discord_token_expiration" TIMESTAMP(6) NOT NULL,
    "discord_id" BIGINT NOT NULL,

    CONSTRAINT "auth_data_pk" PRIMARY KEY ("notes_token")
);

-- CreateTable
CREATE TABLE "users" (
    "id" BIGINT NOT NULL,
    "avatar" VARCHAR,
    "username" VARCHAR NOT NULL,

    CONSTRAINT "users_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "campaigns" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "created" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "campaign_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "campaign_players" (
    "campaign_id" UUID NOT NULL,
    "user_id" BIGINT NOT NULL,
    "role" "CampaignRole" NOT NULL,

    CONSTRAINT "campaign_players_pk" PRIMARY KEY ("campaign_id","user_id")
);

-- CreateTable
CREATE TABLE "events" (
    "event_id" UUID NOT NULL,
    "user_id" BIGINT NOT NULL,
    "action" "EventType" NOT NULL,
    "time" TIMESTAMP(6) NOT NULL,
    "details" JSONB NOT NULL,

    CONSTRAINT "events_pk" PRIMARY KEY ("event_id")
);

-- AddForeignKey
ALTER TABLE "aliases" ADD CONSTRAINT "aliases_records_id_fk" FOREIGN KEY ("record_id") REFERENCES "records"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "aliases" ADD CONSTRAINT "aliases_user_fk" FOREIGN KEY ("created_by") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "record_types" ADD CONSTRAINT "record_types_user_fk" FOREIGN KEY ("created_by") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "records" ADD CONSTRAINT "records_user_fk" FOREIGN KEY ("created_by") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "records" ADD CONSTRAINT "records_record_types_record_type_fk" FOREIGN KEY ("type") REFERENCES "record_types"("record_type") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "records" ADD CONSTRAINT "records_campaign_campaign_id_fk" FOREIGN KEY ("campaign") REFERENCES "campaigns"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "relation_types" ADD CONSTRAINT "relation_types_record_types_record_type_fk" FOREIGN KEY ("right_record_type") REFERENCES "record_types"("record_type") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "relation_types" ADD CONSTRAINT "relation_types_record_types_record_type_fk_2" FOREIGN KEY ("left_record_type") REFERENCES "record_types"("record_type") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "relations" ADD CONSTRAINT "record_relation_user_fk" FOREIGN KEY ("created_by") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "relations" ADD CONSTRAINT "relations_records_id_fk" FOREIGN KEY ("left_record") REFERENCES "records"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "relations" ADD CONSTRAINT "relations_records_id_fk_2" FOREIGN KEY ("right_record") REFERENCES "records"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "relations" ADD CONSTRAINT "relations_relation_types_relation_type_fk" FOREIGN KEY ("relation_type") REFERENCES "relation_types"("relation_type") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "auth_data" ADD CONSTRAINT "auth_data_users_id_fk" FOREIGN KEY ("discord_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "campaign_players" ADD CONSTRAINT "campaign_players_campaign_id_fk" FOREIGN KEY ("campaign_id") REFERENCES "campaigns"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "campaign_players" ADD CONSTRAINT "campaign_players_users_fk" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "events" ADD CONSTRAINT "event_user_fk" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
