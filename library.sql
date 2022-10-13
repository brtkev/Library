--
-- PostgreSQL database dump
--

-- Dumped from database version 10.22
-- Dumped by pg_dump version 10.22

-- Started on 2022-10-13 02:45:52

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 1 (class 3079 OID 12924)
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- TOC entry 2853 (class 0 OID 0)
-- Dependencies: 1
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET default_tablespace = '';

SET default_with_oids = false;

--
-- TOC entry 200 (class 1259 OID 16420)
-- Name: authors; Type: TABLE; Schema: public; Owner: kbn
--

CREATE TABLE public.authors (
    author_id integer NOT NULL,
    author_name text NOT NULL
);


ALTER TABLE public.authors OWNER TO kbn;

--
-- TOC entry 199 (class 1259 OID 16418)
-- Name: authors_author_id_seq; Type: SEQUENCE; Schema: public; Owner: kbn
--

CREATE SEQUENCE public.authors_author_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.authors_author_id_seq OWNER TO kbn;

--
-- TOC entry 2854 (class 0 OID 0)
-- Dependencies: 199
-- Name: authors_author_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: kbn
--

ALTER SEQUENCE public.authors_author_id_seq OWNED BY public.authors.author_id;


--
-- TOC entry 197 (class 1259 OID 16398)
-- Name: books; Type: TABLE; Schema: public; Owner: kbn
--

CREATE TABLE public.books (
    book_id integer NOT NULL,
    title text NOT NULL
);


ALTER TABLE public.books OWNER TO kbn;

--
-- TOC entry 196 (class 1259 OID 16396)
-- Name: books_book_id_seq; Type: SEQUENCE; Schema: public; Owner: kbn
--

CREATE SEQUENCE public.books_book_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.books_book_id_seq OWNER TO kbn;

--
-- TOC entry 2855 (class 0 OID 0)
-- Dependencies: 196
-- Name: books_book_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: kbn
--

ALTER SEQUENCE public.books_book_id_seq OWNED BY public.books.book_id;


--
-- TOC entry 201 (class 1259 OID 16429)
-- Name: booksauthors; Type: TABLE; Schema: public; Owner: kbn
--

CREATE TABLE public.booksauthors (
    book_id integer NOT NULL,
    author_id integer NOT NULL
);


ALTER TABLE public.booksauthors OWNER TO kbn;

--
-- TOC entry 204 (class 1259 OID 16455)
-- Name: bookscategories; Type: TABLE; Schema: public; Owner: kbn
--

CREATE TABLE public.bookscategories (
    book_id integer NOT NULL,
    category_id integer NOT NULL
);


ALTER TABLE public.bookscategories OWNER TO kbn;

--
-- TOC entry 198 (class 1259 OID 16407)
-- Name: booksextrainfo; Type: TABLE; Schema: public; Owner: kbn
--

CREATE TABLE public.booksextrainfo (
    book_id integer NOT NULL,
    subtitle text,
    description text,
    printdate text,
    img text,
    editorial text
);


ALTER TABLE public.booksextrainfo OWNER TO kbn;

--
-- TOC entry 203 (class 1259 OID 16446)
-- Name: categories; Type: TABLE; Schema: public; Owner: kbn
--

CREATE TABLE public.categories (
    category_id integer NOT NULL,
    category text NOT NULL
);


ALTER TABLE public.categories OWNER TO kbn;

--
-- TOC entry 202 (class 1259 OID 16444)
-- Name: categories_cateogy_id_seq; Type: SEQUENCE; Schema: public; Owner: kbn
--

CREATE SEQUENCE public.categories_cateogy_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.categories_cateogy_id_seq OWNER TO kbn;

--
-- TOC entry 2856 (class 0 OID 0)
-- Dependencies: 202
-- Name: categories_cateogy_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: kbn
--

ALTER SEQUENCE public.categories_cateogy_id_seq OWNED BY public.categories.category_id;


--
-- TOC entry 2699 (class 2604 OID 16423)
-- Name: authors author_id; Type: DEFAULT; Schema: public; Owner: kbn
--

ALTER TABLE ONLY public.authors ALTER COLUMN author_id SET DEFAULT nextval('public.authors_author_id_seq'::regclass);


--
-- TOC entry 2698 (class 2604 OID 16401)
-- Name: books book_id; Type: DEFAULT; Schema: public; Owner: kbn
--

ALTER TABLE ONLY public.books ALTER COLUMN book_id SET DEFAULT nextval('public.books_book_id_seq'::regclass);


--
-- TOC entry 2700 (class 2604 OID 16449)
-- Name: categories category_id; Type: DEFAULT; Schema: public; Owner: kbn
--

ALTER TABLE ONLY public.categories ALTER COLUMN category_id SET DEFAULT nextval('public.categories_cateogy_id_seq'::regclass);


--
-- TOC entry 2841 (class 0 OID 16420)
-- Dependencies: 200
-- Data for Name: authors; Type: TABLE DATA; Schema: public; Owner: kbn
--

COPY public.authors (author_id, author_name) FROM stdin;
\.


--
-- TOC entry 2838 (class 0 OID 16398)
-- Dependencies: 197
-- Data for Name: books; Type: TABLE DATA; Schema: public; Owner: kbn
--

COPY public.books (book_id, title) FROM stdin;
\.


--
-- TOC entry 2842 (class 0 OID 16429)
-- Dependencies: 201
-- Data for Name: booksauthors; Type: TABLE DATA; Schema: public; Owner: kbn
--

COPY public.booksauthors (book_id, author_id) FROM stdin;
\.


--
-- TOC entry 2845 (class 0 OID 16455)
-- Dependencies: 204
-- Data for Name: bookscategories; Type: TABLE DATA; Schema: public; Owner: kbn
--

COPY public.bookscategories (book_id, category_id) FROM stdin;
\.


--
-- TOC entry 2839 (class 0 OID 16407)
-- Dependencies: 198
-- Data for Name: booksextrainfo; Type: TABLE DATA; Schema: public; Owner: kbn
--

COPY public.booksextrainfo (book_id, subtitle, description, printdate, img, editorial) FROM stdin;
\.


--
-- TOC entry 2844 (class 0 OID 16446)
-- Dependencies: 203
-- Data for Name: categories; Type: TABLE DATA; Schema: public; Owner: kbn
--

COPY public.categories (category_id, category) FROM stdin;
\.


--
-- TOC entry 2857 (class 0 OID 0)
-- Dependencies: 199
-- Name: authors_author_id_seq; Type: SEQUENCE SET; Schema: public; Owner: kbn
--

SELECT pg_catalog.setval('public.authors_author_id_seq', 22, true);


--
-- TOC entry 2858 (class 0 OID 0)
-- Dependencies: 196
-- Name: books_book_id_seq; Type: SEQUENCE SET; Schema: public; Owner: kbn
--

SELECT pg_catalog.setval('public.books_book_id_seq', 49, true);


--
-- TOC entry 2859 (class 0 OID 0)
-- Dependencies: 202
-- Name: categories_cateogy_id_seq; Type: SEQUENCE SET; Schema: public; Owner: kbn
--

SELECT pg_catalog.setval('public.categories_cateogy_id_seq', 25, true);


--
-- TOC entry 2704 (class 2606 OID 16428)
-- Name: authors authors_pkey; Type: CONSTRAINT; Schema: public; Owner: kbn
--

ALTER TABLE ONLY public.authors
    ADD CONSTRAINT authors_pkey PRIMARY KEY (author_id);


--
-- TOC entry 2702 (class 2606 OID 16406)
-- Name: books books_pkey; Type: CONSTRAINT; Schema: public; Owner: kbn
--

ALTER TABLE ONLY public.books
    ADD CONSTRAINT books_pkey PRIMARY KEY (book_id);


--
-- TOC entry 2706 (class 2606 OID 16433)
-- Name: booksauthors booksauthors_pkey; Type: CONSTRAINT; Schema: public; Owner: kbn
--

ALTER TABLE ONLY public.booksauthors
    ADD CONSTRAINT booksauthors_pkey PRIMARY KEY (book_id, author_id);


--
-- TOC entry 2710 (class 2606 OID 16469)
-- Name: bookscategories bookscategories_pkey; Type: CONSTRAINT; Schema: public; Owner: kbn
--

ALTER TABLE ONLY public.bookscategories
    ADD CONSTRAINT bookscategories_pkey PRIMARY KEY (book_id, category_id);


--
-- TOC entry 2708 (class 2606 OID 16454)
-- Name: categories categories_pkey; Type: CONSTRAINT; Schema: public; Owner: kbn
--

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_pkey PRIMARY KEY (category_id);


--
-- TOC entry 2713 (class 2606 OID 16439)
-- Name: booksauthors booksauthors_author_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: kbn
--

ALTER TABLE ONLY public.booksauthors
    ADD CONSTRAINT booksauthors_author_id_fkey FOREIGN KEY (author_id) REFERENCES public.authors(author_id);


--
-- TOC entry 2712 (class 2606 OID 16434)
-- Name: booksauthors booksauthors_book_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: kbn
--

ALTER TABLE ONLY public.booksauthors
    ADD CONSTRAINT booksauthors_book_id_fkey FOREIGN KEY (book_id) REFERENCES public.books(book_id);


--
-- TOC entry 2714 (class 2606 OID 16458)
-- Name: bookscategories bookscategories_book_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: kbn
--

ALTER TABLE ONLY public.bookscategories
    ADD CONSTRAINT bookscategories_book_id_fkey FOREIGN KEY (book_id) REFERENCES public.books(book_id);


--
-- TOC entry 2715 (class 2606 OID 16463)
-- Name: bookscategories bookscategories_category_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: kbn
--

ALTER TABLE ONLY public.bookscategories
    ADD CONSTRAINT bookscategories_category_id_fkey FOREIGN KEY (category_id) REFERENCES public.categories(category_id);


--
-- TOC entry 2711 (class 2606 OID 16413)
-- Name: booksextrainfo booksextrainfo_book_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: kbn
--

ALTER TABLE ONLY public.booksextrainfo
    ADD CONSTRAINT booksextrainfo_book_id_fkey FOREIGN KEY (book_id) REFERENCES public.books(book_id);


-- Completed on 2022-10-13 02:45:53

--
-- PostgreSQL database dump complete
--

