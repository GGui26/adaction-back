-- fk table donations
ALTER TABLE donations
    ADD CONSTRAINT fk_donations_association 
        FOREIGN KEY ("association_id") REFERENCES associations("id"),
        ADD CONSTRAINT fk_donations_volunteer 
        FOREIGN KEY ("volunteer_id") REFERENCES volunteers("id"),
        ADD COLUMN "donated_points",
        ADD COLUMN "donation_date";