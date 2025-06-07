-- Update: suppression colonne "donation" de la table volunteers
ALTER TABLE volunteers
DROP COLUMN "donation";
DROP COLUMN "donated_points";

-- add volunteers
INSERT INTO volunteers (firstname, lastname, email, password, location, created_at) VALUES
    ('Elena', 'Fernandez', 'elena@gmail.com', 'elena54321', 'Paris', NOW()),
	('John', 'Doe', 'Johny@gmail.com', 'Jdoe54321', 'Lyon', NOW());


-- update volunteers
UPDATE volunteers
SET firstname = 'Claire'
WHERE id = 1;


-- delete volunteers
DELETE FROM volunteers
WHERE id = 1;

