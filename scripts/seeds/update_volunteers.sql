



-- fk table is_collected
ALTER TABLE is_collected
    ADD CONSTRAINT fk_collection_volunteer
    FOREIGN KEY ("collection_id") REFERENCES collections("id");

