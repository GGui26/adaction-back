-- postgreSQL

-- review Data / BDD : 
-- conserver la table wastes, mais y rajouter une colonne points (paramètre du déchet, ex: mégot = 10 pts)
-- table wastes (table de paramétrages) : supprimer colonne quantity, suppr city, et ajouter les points associés
-- création table collecte : id UUID, volunteer_id, city, date (opt: total de points si gamification)
-- création table isCollected : collect_id, waste_id, quantity -> all fk ! -> table d'action
-- Eviter de faire du N:N -> conflit interne en base de données 
    -- ex: plusieurs maisons peuvent avoir plusieurs fenêtres, donc on ne sait pas quelle fenêtre appartient à telle ou telle maison

-- Type de relation entre les tables
-- 1. cities <-> wastes : One-to-Many (une ville possède plusieurs déchets)
-- 2. cities <-> volunteers : One-to-Many (une ville possède plusieurs bénévoles)
-- 3. associations <-> donations : One-to-Many (une association peut reçoitrecevoir plusieurs dons)
-- 4. volunteers <-> donations : One-to-Many (un bénévole peut effectuer plusieurs dons)
-- 5. volunteers <-> wastes : One-to-Many (un bénévole collecte plusieurs déchets via waste_collection)
-- 6. volunteers <-> points : One-to-Many (un bénévole possède plusieurs points)
-- 7. wastes <-> points : One-to-Many (un déchet peut générer plusieurs points), à modifier
-- 8. donations <-> points : One-to-Many (un don équivaut plusieurs points ?)
-- 9. associations <-> points : One-to-Many (une association recevoir plusieurs points)
-- 10. adaction_connections : Table de jointure Many-to-Many reliant toutes les entités principales (bénévoles, déchets, villes, associations, dons, points)



