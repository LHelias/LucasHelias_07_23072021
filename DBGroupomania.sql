DROP DATABASE Groupomania;

CREATE DATABASE IF NOT EXISTS Groupomania CHARACTER SET 'utf8';
USE Groupomania;

SET NAMES utf8;

CREATE TABLE IF NOT EXISTS users (
    email VARCHAR(100) NOT NULL PRIMARY KEY,
    password VARCHAR(100) NOT NULL,
    firstname VARCHAR(50) NOT NULL,
    lastname VARCHAR(50) NOT NULL,
    profile_picture_url TINYTEXT
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS post (
    post_id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    creation_date DATETIME NOT NULL,
    user_id VARCHAR(30) NOT NULL,
    textcontent MEDIUMTEXT NOT NULL,
    video_url MEDIUMTEXT ,
    CONSTRAINT FK_user_id_post FOREIGN KEY (user_id)
    REFERENCES users(email)
    ON DELETE CASCADE
    ON UPDATE CASCADE
) ENGINE=InnoDB ;

CREATE TABLE IF NOT EXISTS comment (
    creation_date DATETIME NOT NULL,
    user_id VARCHAR(100) NOT NULL,
    post_id INT UNSIGNED NOT NULL,
    textcontent MEDIUMTEXT,
    CONSTRAINT FK_user_id_comment FOREIGN KEY (user_id)
    REFERENCES users(email)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
    CONSTRAINT FK_post_id_comment FOREIGN KEY comment(post_id)
    REFERENCES post(post_id)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
    PRIMARY KEY (post_id, user_id, creation_date)
) ENGINE=InnoDB;


INSERT INTO users VALUES
('toto@gmail.com', 'mpddetoto', 'Toto', 'Dupont',''),
('lulu@gmail.com', 'mdpdelulu', 'Lulu', 'Durand',''),
('jeanmoulin@francelibre.fr', 'resistance', 'Jean', 'Moulin','');

INSERT INTO post(creation_date,user_id,textcontent,video_url) VALUES
('2020-03-16 08:20:00','jeanmoulin@francelibre.fr','Lorem Ipsum',''),
('2020-02-16','jeanmoulin@francelibre.fr','RESISTANCE !!!',''),
('2021-08-23 20:40:00','toto@gmail.com', 'Coucou les abonnés, mettez un pouce bleu, abonnez vous à ma chaine, cliquez sur la ptite cloche et voici le lien de mon Tipee !','');

INSERT INTO comment VALUES
('2021-08-23 20:50:00', 'jeanmoulin@francelibre.fr',3, 'D''accord c''est fait.'),
('2021-08-24 12:10:00', 'lulu@gmail.com',3, 'Merci !'),
('2021-08-25', 'jeanmoulin@francelibre.fr',2, 'RDV à Londres.');


-- DATA pour l'ancienne version des mes tables sans le post_id auto increment

-- INSERT INTO user VALUES
-- ('toto@gmail.com', 'mpddetoto', 'Toto', 'Dupont',''),
-- ('lulu@gmail.com', 'mdpdelulu', 'Lulu', 'Durand',''),
-- ('jeanmoulin@francelibre.fr', 'resistance', 'Jean', 'Moulin','');

-- INSERT INTO post VALUES
-- ('2020-03-16 08:20:00','jeanmoulin@francelibre.fr','Lorem Ipsum',''),
-- ('2020-02-16','jeanmoulin@francelibre.fr','RESISTANCE !!!',''),
-- ('2021-08-23 20:40:00','toto@gmail.com', 'Coucou les abonnés, mettez un pouce bleu, abonnez vous à ma chaine, cliquez sur la ptite cloche et voici le lien de mon Tipee !','');

-- INSERT INTO comment VALUES
-- ('2021-08-23 20:50:00', 'jeanmoulin@francelibre.fr', '2021-08-23 20:40:00', 'toto@gmail.com', 'D''accord c''est fait.'),
-- ('2021-08-24 12:10:00', 'lulu@gmail.com', '2021-08-23 20:40:00', 'toto@gmail.com', 'Merci !'),
-- ('2021-08-25', 'jeanmoulin@francelibre.fr', '2020-02-16','jeanmoulin@francelibre.fr', 'RDV à Londres.');