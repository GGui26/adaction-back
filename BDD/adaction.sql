-- postgreSQL

-- création des tables du projet ADACTION
CREATE TABLE cities (
    "id" SERIAL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "coordinates_lat" NUMERIC(8,2),
    "coordinates_lng" NUMERIC(8,2)
);

CREATE TABLE associations (
    "id" SERIAL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" VARCHAR(255) NOT NULL,
    "points" INTEGER NOT NULL,
    "points_conversion" INTEGER NOT NULL
);

CREATE TABLE volunteers (
    "id" SERIAL PRIMARY KEY,
    "firstname" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "location" INTEGER, -- FK vers cities(id)
    "waste_collection" INTEGER, -- FK vers wastes(id)
    "total_points" INTEGER NOT NULL,
    "donated_points" INTEGER NOT NULL,
    "donation" INTEGER, -- FK vers donations(id)
    "created_at" timestamp NOT NULL DEFAULT (now()),
    "updated_at" timestamp NOT NULL DEFAULT (now())
);

CREATE TABLE wastes (
    "id" SERIAL PRIMARY KEY,
    "value" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "collected_at" TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    "city" INTEGER NOT NULL -- FK vers cities(id)
);

CREATE TABLE donations (
    "id" SERIAL PRIMARY KEY,
    "association_id" INTEGER NOT NULL, -- FK vers associations(id)
    "volunteer_id" INTEGER NOT NULL -- FK vers volunteers(id)
);

CREATE TABLE points (
    "id" SERIAL PRIMARY KEY,
    "total_points" BIGINT NOT NULL,
    "volunteer_id" INTEGER NOT NULL, -- FK vers volunteers(id)
    "waste_id" INTEGER NOT NULL,     -- FK vers wastes(id)
    "donation_id" INTEGER NOT NULL,  -- FK vers donations(id)
    "association_id" INTEGER NOT NULL -- FK vers associations(id)
);

CREATE TABLE adaction_connections (
    "id" SERIAL PRIMARY KEY,
    "volunteer_id" INTEGER NOT NULL,   -- FK vers volunteers(id)
    "waste_id" INTEGER NOT NULL,       -- FK vers wastes(id)
    "city_id" INTEGER NOT NULL,        -- FK vers cities(id)
    "association_id" INTEGER NOT NULL, -- FK vers associations(id)
    "donation_id" INTEGER NOT NULL     -- FK vers donations(id)
);


-- Foreign Key 
-- fk table volunteers
ALTER TABLE volunteers
    ADD CONSTRAINT fk_volunteers_waste_collection 
    FOREIGN KEY ("waste_collection") REFERENCES wastes("id");

ALTER TABLE volunteers
    ADD CONSTRAINT fk_volunteers_donation -- update: suppre
    FOREIGN KEY ("donation") REFERENCES donations("id");

ALTER TABLE volunteers
    ADD CONSTRAINT fk_volunteers_location 
    FOREIGN KEY ("location") REFERENCES cities("id");

-- fk table wastes
ALTER TABLE wastes
    ADD CONSTRAINT fk_wastes_city 
    FOREIGN KEY ("city") REFERENCES cities("id");

-- fk table donation
ALTER TABLE donations
    ADD CONSTRAINT fk_donations_association 
    FOREIGN KEY ("association_id") REFERENCES associations("id");

ALTER TABLE donations
    ADD CONSTRAINT fk_donations_volunteer 
    FOREIGN KEY ("volunteer_id") REFERENCES volunteers("id");

-- fk table points
ALTER TABLE points
    ADD CONSTRAINT fk_points_volunteer 
    FOREIGN KEY ("volunteer_id") REFERENCES volunteers("id");

ALTER TABLE points
    ADD CONSTRAINT fk_points_waste 
    FOREIGN KEY ("waste_id") REFERENCES wastes("id");

ALTER TABLE points
    ADD CONSTRAINT fk_points_donation 
    FOREIGN KEY ("donation_id") REFERENCES donations("id");

ALTER TABLE points
    ADD CONSTRAINT fk_points_association 
    FOREIGN KEY ("association_id") REFERENCES associations("id");

-- fk table adaction_connections
ALTER TABLE adaction_connections
    ADD CONSTRAINT fk_ac_volunteer 
    FOREIGN KEY ("volunteer_id") REFERENCES volunteers("id");

ALTER TABLE adaction_connections
    ADD CONSTRAINT fk_waste 
    FOREIGN KEY ("waste_id") REFERENCES wastes("id");

ALTER TABLE adaction_connections
    ADD CONSTRAINT fk_city 
    FOREIGN KEY ("city_id") REFERENCES cities("id");

ALTER TABLE adaction_connections
    ADD CONSTRAINT fk_association 
    FOREIGN KEY ("association_id") REFERENCES associations("id");

ALTER TABLE adaction_connections
    ADD CONSTRAINT fk_donation 
    FOREIGN KEY ("donation_id") REFERENCES donations("id");


-- Type de relation entre les tables
-- 1. cities <-> wastes : One-to-Many (une ville possède plusieurs déchets)
-- 2. cities <-> volunteers : One-to-Many (une ville possède plusieurs bénévoles)
-- 3. associations <-> donations : One-to-Many (une association peut reçoitrecevoir plusieurs dons)
-- 4. volunteers <-> donations : One-to-Many (un bénévole peut effectuer plusieurs dons)
-- 5. volunteers <-> wastes : One-to-Many (un bénévole collecte plusieurs déchets via waste_collection)
-- 6. volunteers <-> points : One-to-Many (un bénévole possède plusieurs points)
-- 7. wastes <-> points : One-to-Many (un déchet peut générer plusieurs points)
-- 8. donations <-> points : One-to-Many (un don équivaut plusieurs points ?)
-- 9. associations <-> points : One-to-Many (une association recevoir plusieurs points)
-- 10. adaction_connections : Table de jointure Many-to-Many reliant toutes les entités principales (bénévoles, déchets, villes, associations, dons, points)


-- Update: suppression colonne "donation" de la table volunteers
ALTER TABLE volunteers
DROP COLUMN "donation";

-- insertion des valeurs
-- jointure

