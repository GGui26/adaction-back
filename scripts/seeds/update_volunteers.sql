-- Foreign Key 

-- fk table collections
ALTER TABLE collections
    ALTER COLUMN "volunteer_id" TYPE UUID USING "volunteer_id"::uuid; -- Remplacer le type de la colonne "volunteer_id" de la table collections pour pouvoir y mettre la clé étrangère

ALTER TABLE collections
    ADD CONSTRAINT fk_volunteers_collection
    FOREIGN KEY ("volunteer_id") REFERENCES volunteers("id");
