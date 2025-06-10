-- Foreign Key 
-- fk table collections
-- ALTER TABLE collections
--     ALTER COLUMN "volunteer_id" TYPE UUID USING "volunteer_id":uuid; -- Remplacer le type de la colonne "volunteer_id" de la table collections pour pouvoir y mettre la clé étrangère
--     ADD CONSTRAINT fk_volunteers_collection
--     FOREIGN KEY ("volunteer_id") REFERENCES volunteers("id");

ALTER TABLE collections
    ADD CONSTRAINT fk_volunteers_collection
        FOREIGN KEY (volunteer_id) REFERENCES volunteers(id);



-- add collections
INSERT INTO collections (volunteer_id, city_id, created_at, number_collections) VALUES
    (7, 3, NOW(), 5),
    (8, 1, NOW(), 2),
    (9, 3, NOW(), 3),
    (6, 5, NOW(), 7);

-- update collections
UPDATE collections
SET number_collections = 9
WHERE id = 3;

-- delete collections
DELETE FROM collections
WHERE id = 1;


