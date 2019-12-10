--
-- TOC entry 203 (class 1259 OID 16386)
-- Name: House; Type: TABLE; Schema: auth; Owner: auth
--

CREATE TABLE "users" (
    "id" uuid NOT NULL,
    "name" text NOT NULL,
    "adress" text NOT NULL,
    "city" text NOT NULL,
    "country" text NOT NULL,
    "co" text,
    "email" text NOT NULL,
    "password" text NOT NULL

);

ALTER TABLE "users" OWNER TO auth;

ALTER TABLE ONLY "users"
    ADD CONSTRAINT "users_pkey" PRIMARY KEY ("id");

CREATE TABLE "tokens" (
    "id" uuid NOT NULL,
    "userid" uuid NOT NULL,
    "token" text NOT NULL,
    "issued" timestamp with time zone NOT NULL,
    "validuntil" timestamp with time zone NOT NULL,
    "used" boolean NOT NULL
);

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";