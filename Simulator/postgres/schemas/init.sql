--
-- TOC entry 203 (class 1259 OID 16386)
-- Name: House; Type: TABLE; Schema: sim; owner: sim
--

CREATE TABLE "house" (
    "id" uuid NOT NULL,
    "consumption" float NOT NULL
);


ALTER TABLE "house" OWNER TO sim;

--
-- TOC entry 204 (class 1259 OID 16394)
-- Name: Producer; Type: TABLE; Schema: sim; owner: sim
--

CREATE TABLE "producer" (
    "id" uuid NOT NULL,
    "owner" uuid NOT NULL,
    "type" text NOT NULL,
    "coords" text
);


ALTER TABLE "producer" OWNER TO sim;

--
-- TOC entry 206 (class 1259 OID 16417)
-- Name: ProducerEvent; Type: TABLE; Schema: sim; owner: sim
--

CREATE TABLE "producerevent" (
    "id" uuid NOT NULL,
    "producerId" uuid NOT NULL,
    "timestamp" timestamp with time zone NOT NULL,
    "status" text NOT NULL, 
    "energyProduced" float NOT NULL,
    "windSpeed" float NOT NULL
);


ALTER TABLE "producerevent" OWNER TO sim;

--
-- TOC entry 205 (class 1259 OID 16407)
-- Name: Storage; Type: TABLE; Schema: sim; owner: sim
--

CREATE TABLE "storage" (
    "id" uuid NOT NULL,
    "owner" uuid NOT NULL,
    "maxCapacity" float NOT NULL,
    "currentCapacity" float NOT NULL,
    "fillCapacity" float NOT NULL
);


ALTER TABLE "storage" OWNER TO sim;

--
-- TOC entry 207 (class 1259 OID 16427)
-- Name: StorageEvent; Type: TABLE; Schema: sim; owner: sim
--

CREATE TABLE "storageevent" (
    "id" uuid NOT NULL,
    "storageId" uuid NOT NULL,
    "currentCapacity" float NOT NULL,
    "timeStamp" timestamp with time zone NOT NULL
);


ALTER TABLE "storageevent" OWNER TO sim;

--
-- TOC entry 2795 (class 2606 OID 16393)
-- Name: House House_pkey; Type: CONSTRAINT; Schema: sim; owner: sim
--

ALTER TABLE ONLY "house"
    ADD CONSTRAINT "house_pkey" PRIMARY KEY (id);


--
-- TOC entry 2801 (class 2606 OID 16421)
-- Name: ProducerEvent ProducerEvent_pkey; Type: CONSTRAINT; Schema: sim; owner: sim
--

ALTER TABLE ONLY "producerevent"
    ADD CONSTRAINT "producerevent_pkey" PRIMARY KEY ("id");


--
-- TOC entry 2797 (class 2606 OID 16401)
-- Name: Producer Producer_pkey; Type: CONSTRAINT; Schema: sim; owner: sim
--

ALTER TABLE ONLY "producer"
    ADD CONSTRAINT "producer_pkey" PRIMARY KEY ("id");



-- TOC entry 2804 (class 2606 OID 16402)
-- Name: Producer owner_fk; Type: FK CONSTRAINT; Schema: sim; owner: sim
--

ALTER TABLE ONLY "producer"
    ADD CONSTRAINT "owner_fk" FOREIGN KEY ("owner") REFERENCES "house"(id) NOT VALID;


--
-- TOC entry 2805 (class 2606 OID 16412)
-- Name: Storage owner_fk; Type: FK CONSTRAINT; Schema: sim; owner: sim
--

ALTER TABLE ONLY "storage"
    ADD CONSTRAINT "owner_fk" FOREIGN KEY ("owner") REFERENCES "house"(id);


--
-- TOC entry 2803 (class 2606 OID 16431)
-- Name: StorageEvent StorageEvent_pkey; Type: CONSTRAINT; Schema: sim; owner: sim
--

ALTER TABLE ONLY "storageevent"
    ADD CONSTRAINT "storageevent_pkey" PRIMARY KEY ("id");


--
-- TOC entry 2799 (class 2606 OID 16411)
-- Name: Storage Storage_pkey; Type: CONSTRAINT; Schema: sim; owner: sim
--

ALTER TABLE ONLY "storage"
    ADD CONSTRAINT "storage_pkey" PRIMARY KEY ("id");


--
-- TOC entry 2806 (class 2606 OID 16422)
-- Name: ProducerEvent Producer_fk; Type: FK CONSTRAINT; Schema: sim; owner: sim
--

ALTER TABLE ONLY "producerevent"
    ADD CONSTRAINT "Producer_fk" FOREIGN KEY ("producerId") REFERENCES "producer"("id");


--
-- TOC entry 2807 (class 2606 OID 16432)
-- Name: StorageEvent storageId_fk; Type: FK CONSTRAINT; Schema: sim; owner: sim
--

ALTER TABLE ONLY "storageevent"
    ADD CONSTRAINT "storageId_fk" FOREIGN KEY ("storageId") REFERENCES "storage"("id");


-- Completed on 2019-11-11 09:36:51 UTC

--
-- PostgreSQL database dump complete
--

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";