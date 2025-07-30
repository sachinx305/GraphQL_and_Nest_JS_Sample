--
-- PostgreSQL database dump
--

-- Dumped from database version 17.5
-- Dumped by pg_dump version 17.5

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: uuid-ossp; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;


--
-- Name: EXTENSION "uuid-ossp"; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: department; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.department (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    name character varying NOT NULL,
    description character varying,
    "organizationId" uuid NOT NULL,
    "createdAt" timestamp with time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.department OWNER TO postgres;

--
-- Name: organization; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.organization (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    name character varying NOT NULL,
    description character varying,
    address character varying,
    "createdAt" timestamp with time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.organization OWNER TO postgres;

--
-- Name: permission; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.permission (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    name character varying NOT NULL,
    description character varying,
    "createdAt" timestamp with time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.permission OWNER TO postgres;

--
-- Name: role; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.role (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    name character varying NOT NULL,
    description character varying,
    "createdAt" timestamp with time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.role OWNER TO postgres;

--
-- Name: role_permission; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.role_permission (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    "createdAt" timestamp with time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp with time zone DEFAULT now() NOT NULL,
    "roleId" uuid NOT NULL,
    "permissionId" uuid NOT NULL
);


ALTER TABLE public.role_permission OWNER TO postgres;

--
-- Name: team; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.team (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    name character varying NOT NULL,
    description character varying,
    "departmentId" uuid NOT NULL,
    "createdAt" timestamp with time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.team OWNER TO postgres;

--
-- Name: user; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."user" (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    name character varying NOT NULL,
    email character varying NOT NULL,
    "teamId" uuid NOT NULL,
    "createdAt" timestamp with time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public."user" OWNER TO postgres;

--
-- Name: user_role; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.user_role (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    "userId" uuid NOT NULL,
    "roleId" uuid NOT NULL,
    "createdAt" timestamp with time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.user_role OWNER TO postgres;

--
-- Data for Name: department; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.department (id, name, description, "organizationId", "createdAt", "updatedAt") FROM stdin;
8b2860ad-ed22-48e2-b982-95713abd479e	Department One	A global leader in innovative solutions.	cba765e3-a78d-4c8e-8c5a-2739edddcce2	2025-06-05 02:08:52.332421+05:30	2025-06-05 02:08:52.332421+05:30
862bb825-fc5b-4e24-8904-29b05076d080	Department Two	A global leader in innovative solutions.	cba765e3-a78d-4c8e-8c5a-2739edddcce2	2025-06-05 02:11:48.192157+05:30	2025-06-05 02:11:48.192157+05:30
6f319561-ac11-4875-ab3e-facaa3e2e6db	Department Two	A global leader in innovative solutions.	cba765e3-a78d-4c8e-8c5a-2739edddcce2	2025-06-05 02:41:58.419294+05:30	2025-06-05 02:41:58.419294+05:30
527fb8b4-dbe0-423e-a095-9bc1c58ae2db	Department Three	A global leader in innovative solutions.	cba765e3-a78d-4c8e-8c5a-2739edddcce2	2025-06-09 23:33:52.836937+05:30	2025-06-09 23:33:52.836937+05:30
\.


--
-- Data for Name: organization; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.organization (id, name, description, address, "createdAt", "updatedAt") FROM stdin;
cba765e3-a78d-4c8e-8c5a-2739edddcce2	Squad	A global leader in innovative solutions.	Spaze It Park	2025-06-05 00:45:04.19745+05:30	2025-06-05 00:45:04.19745+05:30
5cfd40b4-33e1-4b8d-988d-e6215c2f4064	Dummy One	A global leader in innovative solutions.	Spaze It Park	2025-06-05 01:26:08.879074+05:30	2025-06-05 01:26:08.879074+05:30
\.


--
-- Data for Name: permission; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.permission (id, name, description, "createdAt", "updatedAt") FROM stdin;
b2282c45-4b7d-44e2-b4ec-3e929e60a75b	Permission One	P1 Description	2025-06-06 00:04:12.524668+05:30	2025-06-06 00:04:12.524668+05:30
201ba767-28bc-4167-a8fe-6a63553f5636	Permission two	P2 Description	2025-06-06 00:04:26.5066+05:30	2025-06-06 00:04:26.5066+05:30
271bd9c3-e13c-421e-b91b-9146ba6b60e2	Permission Three	P3 Description	2025-06-06 00:04:36.684625+05:30	2025-06-06 00:04:36.684625+05:30
05bd9054-5c42-45ef-9b49-564fdc28149e	Permission Four	P4 Description	2025-06-06 00:04:51.94972+05:30	2025-06-06 00:04:51.94972+05:30
\.


--
-- Data for Name: role; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.role (id, name, description, "createdAt", "updatedAt") FROM stdin;
f07950a2-09bf-4375-a2d3-5dcbdf6ae15c	Manager	Manager Description	2025-06-05 22:26:07.285917+05:30	2025-06-05 22:26:07.285917+05:30
027c517e-d826-4829-b965-612cf771b5da	Team Lead	Team Lead Description	2025-06-05 22:26:25.229521+05:30	2025-06-05 22:26:25.229521+05:30
a02ebea1-aea5-4378-b123-d6973cb57f8d	Developer	Developer Description	2025-06-05 22:35:42.421074+05:30	2025-06-05 22:35:42.421074+05:30
\.


--
-- Data for Name: role_permission; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.role_permission (id, "createdAt", "updatedAt", "roleId", "permissionId") FROM stdin;
23143d80-29f2-4e44-ac5f-3adeb980b21f	2025-06-06 00:30:10.224408+05:30	2025-06-06 00:30:10.224408+05:30	f07950a2-09bf-4375-a2d3-5dcbdf6ae15c	05bd9054-5c42-45ef-9b49-564fdc28149e
a3df4265-f111-401e-8ed9-f1a7ccf55a8e	2025-06-06 00:30:45.888485+05:30	2025-06-06 00:30:45.888485+05:30	f07950a2-09bf-4375-a2d3-5dcbdf6ae15c	271bd9c3-e13c-421e-b91b-9146ba6b60e2
5eedcb40-b7e1-4527-8bac-482c15fc40f5	2025-06-06 00:31:24.293642+05:30	2025-06-06 00:31:24.293642+05:30	f07950a2-09bf-4375-a2d3-5dcbdf6ae15c	201ba767-28bc-4167-a8fe-6a63553f5636
384e813f-46b6-4282-a2cb-0f058585d63c	2025-06-06 00:31:45.859116+05:30	2025-06-06 00:31:45.859116+05:30	f07950a2-09bf-4375-a2d3-5dcbdf6ae15c	b2282c45-4b7d-44e2-b4ec-3e929e60a75b
7b26f867-5cfe-447f-b030-c800b69ba979	2025-06-06 00:37:56.305179+05:30	2025-06-06 00:37:56.305179+05:30	027c517e-d826-4829-b965-612cf771b5da	b2282c45-4b7d-44e2-b4ec-3e929e60a75b
20955750-9830-485c-a9fb-3c82cb7e8ebb	2025-06-06 00:38:20.60532+05:30	2025-06-06 00:38:20.60532+05:30	a02ebea1-aea5-4378-b123-d6973cb57f8d	b2282c45-4b7d-44e2-b4ec-3e929e60a75b
767216ef-a1ca-4348-ab56-650f86a4fe44	2025-06-06 00:38:46.564199+05:30	2025-06-06 00:38:46.564199+05:30	027c517e-d826-4829-b965-612cf771b5da	271bd9c3-e13c-421e-b91b-9146ba6b60e2
\.


--
-- Data for Name: team; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.team (id, name, description, "departmentId", "createdAt", "updatedAt") FROM stdin;
18565302-0fb8-414f-b5f5-c28d24e7a1bb	Team Two	A global leader in innovative solutions.	8b2860ad-ed22-48e2-b982-95713abd479e	2025-06-05 02:52:31.251208+05:30	2025-06-05 02:52:31.251208+05:30
2b0ef5e2-cf2d-421e-976d-eaa72d25f9f2	Team one	A global leader in innovative solutions.	6f319561-ac11-4875-ab3e-facaa3e2e6db	2025-06-05 02:55:44.69799+05:30	2025-06-05 02:55:44.69799+05:30
7559ffa7-193d-443f-9cef-8d00f90592cc	Team Two	A global leader in innovative solutions.	6f319561-ac11-4875-ab3e-facaa3e2e6db	2025-06-09 23:34:43.298068+05:30	2025-06-09 23:34:43.298068+05:30
\.


--
-- Data for Name: user; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."user" (id, name, email, "teamId", "createdAt", "updatedAt") FROM stdin;
d75e68d9-b4c9-42d1-88ae-bbd6fccde74c	User one	one@gmail.com	18565302-0fb8-414f-b5f5-c28d24e7a1bb	2025-06-05 03:15:24.693639+05:30	2025-06-05 03:15:24.693639+05:30
01379529-b45c-462d-88da-637baf03cc55	User two	two@gmail.com	18565302-0fb8-414f-b5f5-c28d24e7a1bb	2025-06-05 03:16:57.008162+05:30	2025-06-05 03:16:57.008162+05:30
1d792f17-6f62-4da5-bc84-895b495dd6f8	User Three	three@gmail.com	2b0ef5e2-cf2d-421e-976d-eaa72d25f9f2	2025-06-05 03:18:01.283699+05:30	2025-06-05 03:18:01.283699+05:30
d019b016-c8b1-43be-a589-8b083c1a9363	User four	four@gmail.com	2b0ef5e2-cf2d-421e-976d-eaa72d25f9f2	2025-06-05 03:19:53.323045+05:30	2025-06-05 03:19:53.323045+05:30
24bb5084-6a69-4077-921b-389c83827f3b	User Five	5@gmail.com	2b0ef5e2-cf2d-421e-976d-eaa72d25f9f2	2025-06-09 23:35:54.116168+05:30	2025-06-09 23:35:54.116168+05:30
\.


--
-- Data for Name: user_role; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.user_role (id, "userId", "roleId", "createdAt", "updatedAt") FROM stdin;
670eb17d-6e31-41fa-8b07-9d6de5f20116	d019b016-c8b1-43be-a589-8b083c1a9363	a02ebea1-aea5-4378-b123-d6973cb57f8d	2025-06-05 23:16:50.283188+05:30	2025-06-05 23:16:50.283188+05:30
7c4fb663-b44b-4c06-a8c4-e2a434a8911d	1d792f17-6f62-4da5-bc84-895b495dd6f8	027c517e-d826-4829-b965-612cf771b5da	2025-06-05 23:20:13.35807+05:30	2025-06-05 23:20:13.35807+05:30
d30ce914-1446-4427-8d9e-a869fc0299ae	1d792f17-6f62-4da5-bc84-895b495dd6f8	a02ebea1-aea5-4378-b123-d6973cb57f8d	2025-06-05 23:20:43.811974+05:30	2025-06-05 23:20:43.811974+05:30
\.


--
-- Name: permission PK_3b8b97af9d9d8807e41e6f48362; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.permission
    ADD CONSTRAINT "PK_3b8b97af9d9d8807e41e6f48362" PRIMARY KEY (id);


--
-- Name: role_permission PK_96c8f1fd25538d3692024115b47; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.role_permission
    ADD CONSTRAINT "PK_96c8f1fd25538d3692024115b47" PRIMARY KEY (id);


--
-- Name: department PK_9a2213262c1593bffb581e382f5; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.department
    ADD CONSTRAINT "PK_9a2213262c1593bffb581e382f5" PRIMARY KEY (id);


--
-- Name: user_role PK_fb2e442d14add3cefbdf33c4561; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_role
    ADD CONSTRAINT "PK_fb2e442d14add3cefbdf33c4561" PRIMARY KEY (id);


--
-- Name: organization organization_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.organization
    ADD CONSTRAINT organization_pkey PRIMARY KEY (id);


--
-- Name: role role_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.role
    ADD CONSTRAINT role_pkey PRIMARY KEY (id);


--
-- Name: team team_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.team
    ADD CONSTRAINT team_pkey PRIMARY KEY (id);


--
-- Name: user user_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_email_key UNIQUE (email);


--
-- Name: user user_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_pkey PRIMARY KEY (id);


--
-- Name: department FK_032f5f4a6d84e0dc9e328e8f114; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.department
    ADD CONSTRAINT "FK_032f5f4a6d84e0dc9e328e8f114" FOREIGN KEY ("organizationId") REFERENCES public.organization(id) ON DELETE CASCADE;


--
-- Name: user FK_1e89f1fd137dc7fea7242377e25; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT "FK_1e89f1fd137dc7fea7242377e25" FOREIGN KEY ("teamId") REFERENCES public.team(id) ON DELETE CASCADE;


--
-- Name: role_permission FK_72e80be86cab0e93e67ed1a7a9a; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.role_permission
    ADD CONSTRAINT "FK_72e80be86cab0e93e67ed1a7a9a" FOREIGN KEY ("permissionId") REFERENCES public.permission(id) ON DELETE CASCADE;


--
-- Name: user_role FK_ab40a6f0cd7d3ebfcce082131fd; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_role
    ADD CONSTRAINT "FK_ab40a6f0cd7d3ebfcce082131fd" FOREIGN KEY ("userId") REFERENCES public."user"(id) ON DELETE CASCADE;


--
-- Name: team FK_bd5ee5dab94afcc03153c9c6cc2; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.team
    ADD CONSTRAINT "FK_bd5ee5dab94afcc03153c9c6cc2" FOREIGN KEY ("departmentId") REFERENCES public.department(id) ON DELETE CASCADE;


--
-- Name: user_role FK_dba55ed826ef26b5b22bd39409b; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_role
    ADD CONSTRAINT "FK_dba55ed826ef26b5b22bd39409b" FOREIGN KEY ("roleId") REFERENCES public.role(id) ON DELETE CASCADE;


--
-- Name: role_permission FK_e3130a39c1e4a740d044e685730; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.role_permission
    ADD CONSTRAINT "FK_e3130a39c1e4a740d044e685730" FOREIGN KEY ("roleId") REFERENCES public.role(id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

