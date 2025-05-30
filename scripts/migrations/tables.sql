CREATE TABLE volunteers (
    "id" SERIAL PRIMARY KEY,
    "firstname" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "location" INTEGER,
    "total_points" INTEGER NOT NULL, -- review: à retirer
    -- colonne donated_points déplacée dans la table donations
    "created_at" timestamp NOT NULL DEFAULT (now()),
    "updated_at" timestamp NOT NULL DEFAULT (now())
);

CREATE TABLE cities (
    "id" SERIAL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "coordinates_lat" NUMERIC(8,2),
    "coordinates_lng" NUMERIC(8,2)
);

CREATE TABLE collections (
    "id" SERIAL PRIMARY KEY,
    "volunteer_id" INTEGER NOT NULL,
    "city_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP WITHOUT ZONE NOT NULL,
    "total_points" INTEGER
);

CREATE TABLE is_collected (
    "id" SERIAL PRIMARY KEY,
    "collection_id" INTEGER NOT NULL,
    "waste_id" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL
);

CREATE TABLE wastes (
    "id" SERIAL PRIMARY KEY,
    "value" TEXT NOT NULL,
    "points" INTEGER NOT NULL
);

CREATE TABLE donations (
    "id" SERIAL PRIMARY KEY,
    "association_id" INTEGER NOT NULL,
    "volunteer_id" INTEGER NOT NULL,
    "donated_points" INTEGER NOT NULL,
    "donation_date" TIMESTAMP WITHOUT ZONE NOT NULL
);

CREATE TABLE associations (
    "id" SERIAL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" VARCHAR(255) NOT NULL,
    "points" INTEGER NOT NULL,
    "points_conversion_euro" INTEGER NOT NULL -- modification nom de colonne dans DrawSQL
);



