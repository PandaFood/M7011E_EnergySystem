--
-- TOC entry 203 (class 1259 OID 16386)
-- Name: House; Type: TABLE; Schema: auth; Owner: auth
--

CREATE TABLE "user" (
    id uuid NOT NULL,
    name text NOT NULL,
    adress text NOT NULL,
    city text NOT NULL,
    country text NOT NULL,
    co text,
    email text NOT NULL,
    password text NOT NULL

);

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";