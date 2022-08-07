-- CREATE DATABASE perntodo;

-- CREATE TABLE todo(
--     todo_id SERIAL PRIMARY KEY,
--     description VARCHAR(255)
-- );


-- Table: OCR.Customer

-- DROP TABLE IF EXISTS "OCR"."Customer";

CREATE TABLE IF NOT EXISTS "OCR"."Customer"
(
    cid bigint NOT NULL,
    name character varying COLLATE pg_catalog."default",
    phone character varying COLLATE pg_catalog."default",
    password character varying COLLATE pg_catalog."default",
    zip_code character varying COLLATE pg_catalog."default",
    address character varying COLLATE pg_catalog."default",
    payment_type character varying COLLATE pg_catalog."default",
    payment_info character varying COLLATE pg_catalog."default",
    email character varying COLLATE pg_catalog."default",
    admin boolean,
    CONSTRAINT "Customer_pkey" PRIMARY KEY (cid)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS "OCR"."Customer"
    OWNER to xgpvbekjjzcxad;

GRANT ALL ON TABLE "OCR"."Customer" TO xgpvbekjjzcxad;

-- Table: OCR.Orders

-- DROP TABLE IF EXISTS "OCR"."Orders";

CREATE TABLE IF NOT EXISTS "OCR"."Orders"
(
    orderid bigint NOT NULL,
    "deliveryStatus" character varying COLLATE pg_catalog."default",
    "order date" character varying COLLATE pg_catalog."default",
    quantity character varying COLLATE pg_catalog."default",
    coid bigint,
    cid bigint,
    pid bigint,
    CONSTRAINT "Orders_pkey" PRIMARY KEY (orderid),
    CONSTRAINT tocourier FOREIGN KEY (coid)
        REFERENCES "OCR"."Courier" (coid) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID,
    CONSTRAINT tocustomer FOREIGN KEY (cid)
        REFERENCES "OCR"."Customer" (cid) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID,
    CONSTRAINT toproduct FOREIGN KEY (pid)
        REFERENCES "OCR"."Product" (pid) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS "OCR"."Orders"
    OWNER to xgpvbekjjzcxad;

GRANT ALL ON TABLE "OCR"."Orders" TO xgpvbekjjzcxad;
-- Index: fki_toproduct

-- DROP INDEX IF EXISTS "OCR".fki_toproduct;

CREATE INDEX IF NOT EXISTS fki_toproduct
    ON "OCR"."Orders" USING btree
    (pid ASC NULLS LAST)
    TABLESPACE pg_default;