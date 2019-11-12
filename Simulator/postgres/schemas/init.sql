--
-- TOC entry 203 (class 1259 OID 16386)
-- Name: House; Type: TABLE; Schema: sim; Owner: sim
--

CREATE TABLE "house" (
    id uuid NOT NULL,
    name text NOT NULL,
    adress text
);


ALTER TABLE "house" OWNER TO sim;

--
-- TOC entry 204 (class 1259 OID 16394)
-- Name: Producer; Type: TABLE; Schema: sim; Owner: sim
--

CREATE TABLE "producer" (
    "ID" uuid NOT NULL,
    "Owner" uuid NOT NULL,
    "Type" text NOT NULL,
    "Coords" text
);


ALTER TABLE "producer" OWNER TO sim;

--
-- TOC entry 206 (class 1259 OID 16417)
-- Name: ProducerEvent; Type: TABLE; Schema: sim; Owner: sim
--

CREATE TABLE "producerevent" (
    "ID" uuid NOT NULL,
    "ProducerID" uuid NOT NULL,
    "Timestamp" timestamp with time zone NOT NULL,
    "EnergyProduced" bigint NOT NULL
);


ALTER TABLE "producerevent" OWNER TO sim;

--
-- TOC entry 205 (class 1259 OID 16407)
-- Name: Storage; Type: TABLE; Schema: sim; Owner: sim
--

CREATE TABLE "storage" (
    "ID" uuid NOT NULL,
    "Owner" uuid NOT NULL,
    "MaxCapacity" bigint NOT NULL,
    "CurrentCapacity" bigint NOT NULL
);


ALTER TABLE "storage" OWNER TO sim;

--
-- TOC entry 207 (class 1259 OID 16427)
-- Name: StorageEvent; Type: TABLE; Schema: sim; Owner: sim
--

CREATE TABLE "storageevent" (
    "ID" uuid NOT NULL,
    "StorageID" uuid NOT NULL,
    "CurrentCapacity" bigint NOT NULL,
    "TimeStamp" timestamp with time zone NOT NULL
);


ALTER TABLE "storageevent" OWNER TO sim;

--
-- TOC entry 2795 (class 2606 OID 16393)
-- Name: House House_pkey; Type: CONSTRAINT; Schema: sim; Owner: sim
--

ALTER TABLE ONLY "house"
    ADD CONSTRAINT "house_pkey" PRIMARY KEY (id);


--
-- TOC entry 2801 (class 2606 OID 16421)
-- Name: ProducerEvent ProducerEvent_pkey; Type: CONSTRAINT; Schema: sim; Owner: sim
--

ALTER TABLE ONLY "producerevent"
    ADD CONSTRAINT "producerevent_pkey" PRIMARY KEY ("ID");


--
-- TOC entry 2797 (class 2606 OID 16401)
-- Name: Producer Producer_pkey; Type: CONSTRAINT; Schema: sim; Owner: sim
--

ALTER TABLE ONLY "producer"
    ADD CONSTRAINT "producer_pkey" PRIMARY KEY ("ID");


--
-- TOC entry 2803 (class 2606 OID 16431)
-- Name: StorageEvent StorageEvent_pkey; Type: CONSTRAINT; Schema: sim; Owner: sim
--

ALTER TABLE ONLY "storageevent"
    ADD CONSTRAINT "storageevent_pkey" PRIMARY KEY ("ID");


--
-- TOC entry 2799 (class 2606 OID 16411)
-- Name: Storage Storage_pkey; Type: CONSTRAINT; Schema: sim; Owner: sim
--

ALTER TABLE ONLY "storage"
    ADD CONSTRAINT "storage_pkey" PRIMARY KEY ("ID");


--
-- TOC entry 2804 (class 2606 OID 16402)
-- Name: Producer Owner_fk; Type: FK CONSTRAINT; Schema: sim; Owner: sim
--

ALTER TABLE ONLY "producer"
    ADD CONSTRAINT "owner_fk" FOREIGN KEY ("Owner") REFERENCES "house"(id) NOT VALID;


--
-- TOC entry 2805 (class 2606 OID 16412)
-- Name: Storage Owner_fk; Type: FK CONSTRAINT; Schema: sim; Owner: sim
--

ALTER TABLE ONLY "storage"
    ADD CONSTRAINT "Owner_fk" FOREIGN KEY ("ID") REFERENCES "house"(id);


--
-- TOC entry 2806 (class 2606 OID 16422)
-- Name: ProducerEvent Producer_fk; Type: FK CONSTRAINT; Schema: sim; Owner: sim
--

ALTER TABLE ONLY "producerevent"
    ADD CONSTRAINT "Producer_fk" FOREIGN KEY ("ProducerID") REFERENCES "producer"("ID");


--
-- TOC entry 2807 (class 2606 OID 16432)
-- Name: StorageEvent StorageID_fk; Type: FK CONSTRAINT; Schema: sim; Owner: sim
--

ALTER TABLE ONLY "storageevent"
    ADD CONSTRAINT "StorageID_fk" FOREIGN KEY ("StorageID") REFERENCES "storage"("ID");


-- Completed on 2019-11-11 09:36:51 UTC

--
-- PostgreSQL database dump complete
--

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";