# Conception de la base de données PostgreSQL

## Revue des données / Base de données

- **Conserver la table `wastes`**, mais ajouter une colonne `points` (paramètre pour le déchet, ex : mégot = 10 pts).
- **Table `wastes` (table de configuration) :**
    - Supprimer la colonne `quantity`.
    - Supprimer la colonne `city`.
    - Ajouter la colonne `points`.
- **Créer la table `collecte` :**
    - `id` (UUID)
    - `volunteer_id`
    - `city`
    - `date`
    - *(Optionnel : total de points pour la gamification)*
- **Créer la table `isCollected` :**
    - `collect_id`
    - `waste_id`
    - `quantity`
    - *(Toutes sont des clés étrangères ; il s'agit de la table d'action)*
- **Éviter les relations Many-to-Many** pour prévenir les conflits en base.
    - *Exemple : Plusieurs maisons peuvent avoir plusieurs fenêtres, donc il n'est pas clair à quelle maison appartient chaque fenêtre.*

---

## Modifications SQL (préparation point du Lundi matin 02/06)

- Supprimer la colonne `total_points` de la table `volunteers`.
- Supprimer la colonne `donated_points` de la table `volunteers`.
    - Ajouter la colonne `donated_points` à la table `donations`.
    - Ajouter la colonne `donation_date` à la table `donations`.
    - *Le montant du don est une propriété de la table `donations`.*

---

## Relations de clés étrangères

1. **cities ↔ wastes :** Un-à-plusieurs (une ville possède plusieurs déchets)
2. **cities ↔ volunteers :** Un-à-plusieurs (une ville possède plusieurs bénévoles)
3. **associations ↔ donations :** Un-à-plusieurs (une association peut recevoir plusieurs dons)
4. **volunteers ↔ donations :** Un-à-plusieurs (un bénévole peut faire plusieurs dons)
5. **volunteers ↔ collectes :** Un-à-plusieurs (un bénévole peut faire plusieurs collectes)
6. **collectes ↔ isCollected :** Un-à-plusieurs (une collecte contient plusieurs déchets collectés)
7. **wastes ↔ isCollected :** Un-à-plusieurs (un type de déchet peut être collecté dans plusieurs collectes)
8. **wastes ↔ points :** Un-à-un (chaque type de déchet a un nombre de points associé)
9. **volunteers ↔ points :** Un-à-un (le total de points d’un bénévole est calculé à partir des collectes)
10. **donations ↔ points :** Un-à-un (un don peut générer des points pour le bénévole)




