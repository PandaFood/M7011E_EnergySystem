--
-- TOC entry 8 (class 2615 OID 16385)
-- Name: sim; Type: SCHEMA; Schema: -; Owner: sim
--

CREATE SCHEMA sim;


ALTER SCHEMA sim OWNER TO sim;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 203 (class 1259 OID 16386)
-- Name: House; Type: TABLE; Schema: sim; Owner: sim
--

CREATE TABLE sim."House" (
    name text NOT NULL,
    id uuid NOT NULL,
    adress text
);


ALTER TABLE sim."House" OWNER TO sim;

--
-- TOC entry 204 (class 1259 OID 16394)
-- Name: Producer; Type: TABLE; Schema: sim; Owner: sim
--

CREATE TABLE sim."Producer" (
    "ID" uuid NOT NULL,
    "Owner" uuid NOT NULL,
    "Type" text NOT NULL,
    "Coords" text
);


ALTER TABLE sim."Producer" OWNER TO sim;

--
-- TOC entry 206 (class 1259 OID 16417)
-- Name: ProducerEvent; Type: TABLE; Schema: sim; Owner: sim
--

CREATE TABLE sim."ProducerEvent" (
    "ID" uuid NOT NULL,
    "ProducerID" uuid NOT NULL,
    "Timestamp" timestamp with time zone NOT NULL,
    "EnergyProduced" bigint NOT NULL
);


ALTER TABLE sim."ProducerEvent" OWNER TO sim;

--
-- TOC entry 205 (class 1259 OID 16407)
-- Name: Storage; Type: TABLE; Schema: sim; Owner: sim
--

CREATE TABLE sim."Storage" (
    "ID" uuid NOT NULL,
    "Owner" uuid NOT NULL,
    "MaxCapacity" bigint NOT NULL,
    "CurrentCapacity" bigint NOT NULL
);


ALTER TABLE sim."Storage" OWNER TO sim;

--
-- TOC entry 207 (class 1259 OID 16427)
-- Name: StorageEvent; Type: TABLE; Schema: sim; Owner: sim
--

CREATE TABLE sim."StorageEvent" (
    "ID" uuid NOT NULL,
    "StorageID" uuid NOT NULL,
    "CurrentCapacity" bigint NOT NULL,
    "TimeStamp" timestamp with time zone NOT NULL
);


ALTER TABLE sim."StorageEvent" OWNER TO sim;

--
-- TOC entry 2795 (class 2606 OID 16393)
-- Name: House House_pkey; Type: CONSTRAINT; Schema: sim; Owner: sim
--

ALTER TABLE ONLY sim."House"
    ADD CONSTRAINT "House_pkey" PRIMARY KEY (id);


--
-- TOC entry 2801 (class 2606 OID 16421)
-- Name: ProducerEvent ProducerEvent_pkey; Type: CONSTRAINT; Schema: sim; Owner: sim
--

ALTER TABLE ONLY sim."ProducerEvent"
    ADD CONSTRAINT "ProducerEvent_pkey" PRIMARY KEY ("ID");


--
-- TOC entry 2797 (class 2606 OID 16401)
-- Name: Producer Producer_pkey; Type: CONSTRAINT; Schema: sim; Owner: sim
--

ALTER TABLE ONLY sim."Producer"
    ADD CONSTRAINT "Producer_pkey" PRIMARY KEY ("ID");


--
-- TOC entry 2803 (class 2606 OID 16431)
-- Name: StorageEvent StorageEvent_pkey; Type: CONSTRAINT; Schema: sim; Owner: sim
--

ALTER TABLE ONLY sim."StorageEvent"
    ADD CONSTRAINT "StorageEvent_pkey" PRIMARY KEY ("ID");


--
-- TOC entry 2799 (class 2606 OID 16411)
-- Name: Storage Storage_pkey; Type: CONSTRAINT; Schema: sim; Owner: sim
--

ALTER TABLE ONLY sim."Storage"
    ADD CONSTRAINT "Storage_pkey" PRIMARY KEY ("ID");


--
-- TOC entry 2804 (class 2606 OID 16402)
-- Name: Producer Owner_fk; Type: FK CONSTRAINT; Schema: sim; Owner: sim
--

ALTER TABLE ONLY sim."Producer"
    ADD CONSTRAINT "Owner_fk" FOREIGN KEY ("Owner") REFERENCES sim."House"(id) NOT VALID;


--
-- TOC entry 2805 (class 2606 OID 16412)
-- Name: Storage Owner_fk; Type: FK CONSTRAINT; Schema: sim; Owner: sim
--

ALTER TABLE ONLY sim."Storage"
    ADD CONSTRAINT "Owner_fk" FOREIGN KEY ("ID") REFERENCES sim."House"(id);


--
-- TOC entry 2806 (class 2606 OID 16422)
-- Name: ProducerEvent Producer_fk; Type: FK CONSTRAINT; Schema: sim; Owner: sim
--

ALTER TABLE ONLY sim."ProducerEvent"
    ADD CONSTRAINT "Producer_fk" FOREIGN KEY ("ProducerID") REFERENCES sim."Producer"("ID");


--
-- TOC entry 2807 (class 2606 OID 16432)
-- Name: StorageEvent StorageID_fk; Type: FK CONSTRAINT; Schema: sim; Owner: sim
--

ALTER TABLE ONLY sim."StorageEvent"
    ADD CONSTRAINT "StorageID_fk" FOREIGN KEY ("StorageID") REFERENCES sim."Storage"("ID");


-- Completed on 2019-11-11 09:36:51 UTC

--
-- PostgreSQL database dump complete
--

