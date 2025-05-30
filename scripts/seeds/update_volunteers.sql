-- Update: suppression colonne "donation" de la table volunteers
ALTER TABLE volunteers
DROP COLUMN "donation";
DROP COLUMN "donated_points";
