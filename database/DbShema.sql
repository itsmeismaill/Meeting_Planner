CREATE TABLE equipements (
    id INT AUTO_INCREMENT PRIMARY KEY,
    equipement VARCHAR(255)
);

CREATE TABLE types_reunion (
    id INT AUTO_INCREMENT PRIMARY KEY,
    type VARCHAR(255),
    equipement_fk INT,
    FOREIGN KEY (equipement_fk) REFERENCES equipements(id)
);

CREATE TABLE creneaux (
    id INT AUTO_INCREMENT PRIMARY KEY,
    type VARCHAR(255),
    heure INT
);

CREATE TABLE salles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    nbr_places INT,
    equipement_fk INT,
    nbr_places_provisoires INT,
    FOREIGN KEY (equipement_fk) REFERENCES equipements(id)
);

CREATE TABLE reservations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    date_debut DATE,
    salle_fk INT,
    crenau_fk INT,
    nbr_personnes INT,
    FOREIGN KEY (salle_fk) REFERENCES salles(id),
    FOREIGN KEY (crenau_fk) REFERENCES creneaux(id)
);


-- Remplissage des table

INSERT INTO equipements (equipement) VALUES 
('Néant'),
('Ecran'),
('Pieuvre'),
('Tableau'),
('Ecran+Webcam'),
('Ecran + Webcam + Pieuvre'),
('Ecran + Pieuvre'),
('Tableau+ Ecran + Pieuvre');

INSERT INTO types_reunion (type, equipement_fk) VALUES 
('VC', (SELECT id FROM equipements WHERE equipement = 'Ecran + Webcam + Pieuvre')),
('SPEC', (SELECT id FROM equipements WHERE equipement = 'Tableau')),
('RS', (SELECT id FROM equipements WHERE equipement = 'Néant')),
('RC', (SELECT id FROM equipements WHERE equipement = 'Tableau + Ecran + Pieuvre'));


--pour la table crenaux  : just une simple boucle pour remplir les créneaux de 8h à 19h
--a la place de ca:
-- Insertion des créneaux horaires de 8h à 19h
-- INSERT INTO creneaux (type, heure) VALUES 
-- ('8h-9h', 8),
-- ('9h-10h', 9),
-- ('10h-11h', 10),
-- ('11h-12h', 11),
-- ('12h-13h', 12),
-- ('13h-14h', 13),
-- ('14h-15h', 14),
-- ('15h-16h', 15),
-- ('16h-17h', 16),
-- ('17h-18h', 17),
-- ('18h-19h', 18),
-- ('19h-20h', 19);
-- Déclaration des variables
DECLARE @heure INT;
SET @heure = 8;

-- Insertion des données dans la table creneaux
WHILE (@heure <= 19) DO
    INSERT INTO creneaux (type, heure) VALUES 
    (CONCAT(@heure, 'h-', @heure + 1, 'h'), @heure);

    SET @heure = @heure + 1;
END WHILE;

-- Pour le dernier créneau (de 19h à 20h)
INSERT INTO creneaux (type, heure) VALUES ('19h-20h', 19);




INSERT INTO salles (name, nbr_places, equipement_fk, nbr_places_provisoires) VALUES 
-- Avec FLOOR(), 7.3 deviendra 7, 7.9 deviendra 7 également, et seulement 8.0 ou plus sera arrondi à 8.
('E1001', 23, (SELECT id FROM equipements WHERE equipement = 'Néant'), FLOOR(0.7 * 23)),
('E1002', 10, (SELECT id FROM equipements WHERE equipement = 'Ecran'), FLOOR(0.7 * 10)),
('E1003', 8, (SELECT id FROM equipements WHERE equipement = 'Pieuvre'), FLOOR(0.7 * 8)),
('E1004', 4, (SELECT id FROM equipements WHERE equipement = 'Tableau'), FLOOR(0.7 * 4)),
('E2001', 4, (SELECT id FROM equipements WHERE equipement = 'Néant'), FLOOR(0.7 * 4)),
('E2002', 15, (SELECT id FROM equipements WHERE equipement = 'Ecran+Webcam'), FLOOR(0.7 * 15)),
('E2003', 7, (SELECT id FROM equipements WHERE equipement = 'Néant'), FLOOR(0.7 * 7)),
('E2004', 9, (SELECT id FROM equipements WHERE equipement = 'Tableau'), FLOOR(0.7 * 9)),
('E3001', 13, (SELECT id FROM equipements WHERE equipement = 'Ecran + Webcam + Pieuvre'), FLOOR(0.7 * 13)),
('E3002', 8, (SELECT id FROM equipements WHERE equipement = 'Néant'), FLOOR(0.7 * 8)),
('E3003', 9, (SELECT id FROM equipements WHERE equipement = 'Ecran + Pieuvre'), FLOOR(0.7 * 9)),
('E3004', 4, (SELECT id FROM equipements WHERE equipement = 'Néant'), FLOOR(0.7 * 4));


