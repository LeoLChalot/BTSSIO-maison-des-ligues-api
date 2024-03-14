-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : jeu. 14 mars 2024 à 13:52
-- Version du serveur : 8.2.0
-- Version de PHP : 8.2.13

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `m2l`
--

-- --------------------------------------------------------

--
-- Structure de la table `articles`
--

DROP TABLE IF EXISTS `articles`;
CREATE TABLE IF NOT EXISTS `articles` (
  `id_article` varchar(40) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `nom` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `photo` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT 'images\\no-image.png',
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `prix` float(10,2) NOT NULL,
  `quantite` int NOT NULL,
  `categorie_id` varchar(40) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`id_article`),
  UNIQUE KEY `nom` (`nom`),
  KEY `categorie_id` (`categorie_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `articles`
--

INSERT INTO `articles` (`id_article`, `nom`, `photo`, `description`, `prix`, `quantite`, `categorie_id`) VALUES
('007162c3-795a-4278-aae6-c4fd44e142a6', 'Kit d entrainement modulaire plots lestés', 'images\\_20191003154451-large..jpg1707945553174.jpg', 'Conçu pour vos entraînements, pour des exercices rythmiques et de coordination motrice.', 50.00, 100, '413875cb-cbc1-4971-8c72-e2e7e86219bf'),
('160b484d-f51a-49ad-bec6-7a9eab468536', 'Ballon de futsal fs900', 'images\\image_pixl_(1).jpg1707948835701.jpg', 'Nous avons développé ce ballon pour les joueurs de Futsal qui maîtrisent tous les gestes techniques, recherchant un ballon résistant et précis.\r\nNos équipes de conception ont développé le ballon de Futsal FS900 cousu main et homologué FIFA Quality Pro pour une résistance optimale et un jeu à haute intensité.', 25.00, 100, '193560de-2ae1-432c-afcf-e48f001ab660'),
('19beb553-99f1-4f4e-ab77-a1bccf5c0e27', 'Lunettes De Natation XBASE', 'images\\lunettes-de-natation-xbase-verres-clairs-taille-unique-noir-bleu.jpg1708894765566.jpg', 'Nos équipes de conception ont développé ces lunettes de natation pour les nageurs débutant souhaitant se mettre ou se remettre à la natation.\r\n\r\nMarre de ne pas pouvoir régler votre lunette? Elles s\'adaptent à tous les visages grâce au réglage breveté du pont de nez et à l\'ajustement simple de la sangle qui garantissent une bonne étanchéité.', 5.00, 69, '7452c0f2-14f3-49f0-a9da-6b931638598a'),
('232c3b2a-4ff2-4257-bda2-03179d785723', 'Kit d entrainement essentiel', 'images\\kit_dentrainement.jpg1707943733041.jpg', 'Conçu pour vos entraînements, pour des exercices rythmiques et de coordination motrice.', 30.00, 100, '413875cb-cbc1-4971-8c72-e2e7e86219bf'),
('2ad35d34-1fb3-4964-bba3-f94887d3e9b0', 'Lunettes De Natation SPIRIT', 'images\\lunettes-de-natation-spirit-verres-miroirs-petite-taille-bleu-orange.jpg1708896023897.jpg', 'Nos équipes de conception ont développé ces lunettes de natation pour les nageurs confirmés souhaitant améliorer leur technique et nager en toute sérénité.\r\n\r\nMarre des traces autour des yeux ? La construction ultra souple, le large champ de vision et le très bon maintien des lunettes SPIRIT permettent de nager sereinement et sans désagréments.', 17.00, 50, '7452c0f2-14f3-49f0-a9da-6b931638598a'),
('2c4444b5-8774-408f-93be-79e0b0462c24', 'Cage de musculation cross-training', 'images\\8564931_20200828102758-large..jpg1707949346151.jpg', 'Conçu pour les exercices et les circuits de cross training.\r\nCage idéale pour le cross training avec barre de traction sur la partie haute de la cage.', 530.00, 15, 'b9a2e2eb-3847-4b27-8f9c-c8d1c4c813d5'),
('321eeff5-5be6-4d1d-880e-da9099df60b5', 'Vélo vtt st 120 femme', 'images\\image_pixl-_3_.jpg1707949214965.jpg', 'Conçu pour vos premiers randonnées VTT, par temps sec, jusqu\'à 1h30.\r\nUn VTT performant et facile ! Aux commandes du VTT ST 120, vous vous sentez précis et léger grâce au mono plateau (1x9 vitesses) et à ses freins à disque mécaniques. Adaptez votre vitesse facilement.', 359.00, 50, 'f382d66b-1d13-4b50-b2b2-0172a8f372ad'),
('3927e11f-7014-4033-b348-00a0a23e73b6', 'Raquette de tennis adulte', 'images\\image_pixl-_5_.jpg1707949552054.jpg', 'Cette raquette a été conçue pour les joueurs et joueuses de tennis confirmés à la recherche d\'une raquette polyvalente.\r\nLa Wilson Blade 101L V8.0 est une version légère et au tamis plus grand. Elle conserve le contrôle emblématique de la série Blade en apportant ainsi plus de puissance et de tolérance.', 135.00, 5, '836256e6-ada2-48ad-be9d-61beb27e0aaf'),
('3c0854f4-b3c8-4a64-a3a4-f3cd9b8ed405', 'Raquette de tennis adulte aero', 'images\\image_pixl-_6_.jpg1707949652428.jpg', 'Cette raquette est conçue pour les joueurs et joueuses de tennis confirmés à la recherche de prise d\'effets et maniabilité.\r\nLa gamme innovante EVO de Babolat permet de profiter des avantages de la gamme Pure, avec plus de confort et plus de légèreté. Idéale pour les joueurs recherchant plus de polyvalence, avec de l\'effet', 130.00, 100, '836256e6-ada2-48ad-be9d-61beb27e0aaf'),
('42334c9e-8234-43fb-bc4f-f68b4753160d', 'Kimono Karaté Compétition - Modèle Sempai', 'images\\kimono-karate-competition-modele-sempai-brorderie-rouge-epaules.jpg1708896214523.jpg', 'Le karategi SEMPAI conçu pour le kumite est agréé WKF et testé par Steven Da Costa. Coupe ample, matière légère, fluide et respirante. Finition, broderies, étiquettes et doublure intérieure sublimes.', 105.00, 100, '3b77cb56-b472-4ea8-9d88-e35686ccd760'),
('45ab42f9-5d3d-4668-92b3-b52b2b6763ce', 'Chasubles numérotées 1 à 10 orange', 'images\\_20191009155859-large..jpg1707947029563.jpg', 'Conçues pour constituer et différencier rapidement deux équipes en sports collectifs', 36.00, 100, '413875cb-cbc1-4971-8c72-e2e7e86219bf'),
('472f8327-f1c1-40d3-9a89-d3be2b18ff45', 'Lunettes SPEEDO BIOFUSE 2.0', 'images\\lunettes-de-natation-verres-fumes-speedo-biofuse-20.jpg1708894854063.jpg', 'Speedo a conçu la biofuse 2.0 pour les pratiquants réguliers souhaitant s\'entrainer ou se maintenir en forme aussi bien en piscine qu\'en nage extérieure.\r\n\r\nPremières lunettes de natation développées à partir de matériaux biosynthétiques recyclables, conçues pour offrir un très grand confort, une parfaite fléxibilité et stabilité aux nageurs réguliers.', 24.00, 99, '7452c0f2-14f3-49f0-a9da-6b931638598a'),
('58e8fc2e-daa3-4bb5-b007-1fb55e6a2cc1', 'Raquette de tennis adulte - tr960', 'images\\image_pixl-_7_.jpg1707949802507.jpg', 'Nos concepteurs ont développé cette raquette en collaboration avec Gaël Monfils pour les joueurs de tennis experts à la recherche de contrôle. Vendue non cordée\r\nLa TR960 CONTROL Pro est une raquette de 300g qui vous procure une sensation de stabilité à l\'impact et de contrôle tout en restant assez polyvalente. Raquette vendue non cordée.', 110.00, 60, '836256e6-ada2-48ad-be9d-61beb27e0aaf'),
('5ee8e6eb-78b5-4c58-be54-1f794fd289ff', 'Vélo pliant électrique', 'images\\image_pixl-_2_.jpg1707949110433.jpg', 'Très confortable pour se déplacer régulièrement en ville ou se balader. Il se stocke facilement chez soi, dans un coffre de voiture ou de camping-car.\r\nGrâce à ses roues de 20\", son cadre acier, sa potence et tige de selle réglables, ses accessoires (porte-bagage), son autonomie jusqu\'à 50km, il est le compagnon idéal pour de confortables balades.', 1099.00, 29, 'f382d66b-1d13-4b50-b2b2-0172a8f372ad'),
('690b7f6a-79ec-475d-86f8-ee87aee59e29', 'Ballon cecifoot sonore', 'images\\2d84ff09-9d08-4fef-a1e7-bc3131fe7c97.png1707948615199.png', 'La pratique du football en salle pour les mal-voyants', 28.50, 85, '193560de-2ae1-432c-afcf-e48f001ab660'),
('73594180-bd4c-416b-a38e-fcb360303321', 'Kit haltères de musculation 20kg', 'images\\image_pixl-_4_.jpg1707949447473.jpg', 'Ce kit haltères 20 kg permet la réalisation de nombreux exercices de musculation à domicile. Ajoutez des poids sur l\'haltère au fil de vos progrès.\r\nFacile à ranger et à transporter grâce à sa valise, ce kit haltères comprend 2 barres courtes et 12 poids (8x1kg + 4x2 kg). Sécurité assurée avec les barres filetées et ses poids tenus par un écrou.', 55.00, 100, 'b9a2e2eb-3847-4b27-8f9c-c8d1c4c813d5'),
('92138bf1-af8c-4f52-a697-1f74df584ad5', 'Ballon de football hybride fifa basic', 'images\\image_pixl.jpg1707948544169.jpg', 'Homologué par la FIFA pour vos entraînements et compétitions, nous avons conçu le F500 hybride, un ballon associant un bon confort d\'utilisation et résistance.', 11.40, 91, '193560de-2ae1-432c-afcf-e48f001ab660'),
('96289f22-803c-4123-b1d8-fa8e1591bf58', 'Kettlebell 8kg', 'images\\8662630_20210125182621-large..jpg1707949280706.jpg', 'La gamme de kettlebells Sveltus en fonte avec revêtement vinyle est conçue pour les cours collectifs et entraînements intensifs.\r\nAlliez renforcement musculaire et cardio !<br>Les entraînements avec KETTLEBELL vous apportent, plus de force, plus de puissance et aussi plus de souplesse et de résistance.', 28.00, 299, 'b9a2e2eb-3847-4b27-8f9c-c8d1c4c813d5'),
('a2c3b01d-c43e-44c5-b2e7-194b46494506', 'Chasuble ajouree simple jaune fluo', 'images\\8653467_20201123093707-large..jpg1707947946127.jpg', 'Conçu pour constituer et différencier rapidement deux équipes en sports collectifs', 2.40, 92, '413875cb-cbc1-4971-8c72-e2e7e86219bf'),
('d0394f91-3ce2-4614-8dbf-7957fd1ac4e4', 'Lot de 2 vestes et un pantalon de Karategi Hayashi Kumite Premium', 'images\\lot-de-2-vestes-et-un-pantalon-de-karategi-hayashi-kumite-premium.jpg1708896137075.jpg', 'Nos équipes de conception ont développé ces lunettes de natation pour les nageurs confirmés souhaitant améliorer leur technique et nager en toute sérénité.\r\n\r\nLe meilleur de la compétition en Lot de 2 vestes et un pantalon de Karategi Hayashi Kumite Premium en Coolmeshtech, avec homologation WKF.', 204.50, 50, '3b77cb56-b472-4ea8-9d88-e35686ccd760'),
('d412570b-cfd2-4002-8c12-d4b51383a589', 'Vtc enfant riverside 100 20 pouces', 'images\\image_pixl-_1_.jpg1707948977728.jpg', 'Nous avons conçu ce vélo tout chemin pour les enfants de 6 à 9 ans (120 à 135 cm) souhaitant se balader dans les parcs urbains ou chemins aménagés.\r\nPour découvrir les premières balades à vélo sur tous les chemins, ce VTC enfant 20 pouces est robuste et simple d\'utilisation (1 seule vitesse)', 160.00, 50, 'f382d66b-1d13-4b50-b2b2-0172a8f372ad'),
('e4f0e185-5c24-4c34-ab7f-1f0ce01074d3', 'Kimono de karaté Adidas ADIZERO2', 'images\\kimono-de-karate-adidas-adizero2.jpg1708896262810.jpg', 'Conçu pour les compétiteurs expérimentés', 89.99, 100, '3b77cb56-b472-4ea8-9d88-e35686ccd760');

-- --------------------------------------------------------

--
-- Structure de la table `articles_standby`
--

DROP TABLE IF EXISTS `articles_standby`;
CREATE TABLE IF NOT EXISTS `articles_standby` (
  `id` varchar(40) COLLATE utf8mb4_general_ci NOT NULL,
  `id_panier` varchar(40) COLLATE utf8mb4_general_ci NOT NULL,
  `id_article` varchar(40) COLLATE utf8mb4_general_ci NOT NULL,
  KEY `id_panier` (`id_panier`),
  KEY `id_article` (`id_article`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `articles_standby`
--

INSERT INTO `articles_standby` (`id`, `id_panier`, `id_article`) VALUES
('ae7bbffc-d89e-4427-a88f-8bfe9b9d8eb2', '0c6ed870-371f-4625-a266-0c6a3cbeb8a0', 'a2c3b01d-c43e-44c5-b2e7-194b46494506'),
('73a9d170-a744-453a-8909-16a467e6807f', '0c6ed870-371f-4625-a266-0c6a3cbeb8a0', 'a2c3b01d-c43e-44c5-b2e7-194b46494506'),
('f794b3c6-bd27-45ab-8d49-37dd8d7a479f', '0c6ed870-371f-4625-a266-0c6a3cbeb8a0', '690b7f6a-79ec-475d-86f8-ee87aee59e29');

-- --------------------------------------------------------

--
-- Structure de la table `categories`
--

DROP TABLE IF EXISTS `categories`;
CREATE TABLE IF NOT EXISTS `categories` (
  `id_categorie` varchar(40) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `nom` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`id_categorie`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `categories`
--

INSERT INTO `categories` (`id_categorie`, `nom`) VALUES
('193560de-2ae1-432c-afcf-e48f001ab660', 'Sports Co'),
('3b77cb56-b472-4ea8-9d88-e35686ccd760', 'Sport de combat'),
('413875cb-cbc1-4971-8c72-e2e7e86219bf', 'Sports d\'extérieur'),
('7452c0f2-14f3-49f0-a9da-6b931638598a', 'Sports nautiques'),
('836256e6-ada2-48ad-be9d-61beb27e0aaf', 'Sports de raquettes'),
('b9a2e2eb-3847-4b27-8f9c-c8d1c4c813d5', 'Musculation'),
('f382d66b-1d13-4b50-b2b2-0172a8f372ad', 'Vélos et sports urbains');

-- --------------------------------------------------------

--
-- Structure de la table `commandes`
--

DROP TABLE IF EXISTS `commandes`;
CREATE TABLE IF NOT EXISTS `commandes` (
  `id` varchar(40) COLLATE utf8mb4_general_ci NOT NULL,
  `id_utilisateur` varchar(40) COLLATE utf8mb4_general_ci NOT NULL,
  `id_commande` varchar(40) COLLATE utf8mb4_general_ci NOT NULL,
  `date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `prix_commande` decimal(10,2) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_utilisateur` (`id_utilisateur`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `commandes`
--

INSERT INTO `commandes` (`id`, `id_utilisateur`, `id_commande`, `date`, `prix_commande`) VALUES
('03efe37b-96d0-4e55-8010-4acc7206ce14', 'a89d7922-5546-41fb-8c57-913782f35d4e', '0c6ed870-371f-4625-a266-0c6a3cbeb8a0', '2024-02-26 14:24:28', 5.00),
('16cc93c3-1646-468b-9ee3-5c64ce5e0fc9', 'a89d7922-5546-41fb-8c57-913782f35d4e', '0c6ed870-371f-4625-a266-0c6a3cbeb8a0', '2024-02-26 14:18:19', 34.20),
('22669d1b-2966-49a9-aa7e-ea4b8515c628', 'a89d7922-5546-41fb-8c57-913782f35d4e', '0c6ed870-371f-4625-a266-0c6a3cbeb8a0', '2024-02-26 14:45:55', 60.00),
('34634e3c-6843-4598-86ff-f28c490b1a84', 'a89d7922-5546-41fb-8c57-913782f35d4e', '0c6ed870-371f-4625-a266-0c6a3cbeb8a0', '2024-02-26 14:27:51', 57.00),
('3a00840d-9086-4114-a14b-f80283883906', 'a89d7922-5546-41fb-8c57-913782f35d4e', '0c6ed870-371f-4625-a266-0c6a3cbeb8a0', '2024-02-26 14:28:43', 57.00),
('4367c7e1-c566-4ab3-b3f6-3809f5ee8945', 'a89d7922-5546-41fb-8c57-913782f35d4e', '0c6ed870-371f-4625-a266-0c6a3cbeb8a0', '2024-02-26 14:22:40', 22.80),
('4ecc6231-2965-4ac9-a06b-99528d2dd6de', 'a89d7922-5546-41fb-8c57-913782f35d4e', '0c6ed870-371f-4625-a266-0c6a3cbeb8a0', '2024-02-26 14:22:52', 22.80),
('851249e3-d1d8-4602-80ef-0e97ad328094', 'a89d7922-5546-41fb-8c57-913782f35d4e', '0c6ed870-371f-4625-a266-0c6a3cbeb8a0', '2024-02-26 14:17:56', 57.00),
('9ca6a05a-5cdc-4dea-87aa-f2ba2a720eee', 'a89d7922-5546-41fb-8c57-913782f35d4e', '0c6ed870-371f-4625-a266-0c6a3cbeb8a0', '2024-02-26 14:23:43', 28.50),
('acb224c6-1c2d-4a7a-88a8-bf3b83773f5e', 'a89d7922-5546-41fb-8c57-913782f35d4e', '0c6ed870-371f-4625-a266-0c6a3cbeb8a0', '2024-02-26 14:20:27', 22.80),
('d3e72867-2040-41b2-8a0c-e3a4a00944b0', 'a89d7922-5546-41fb-8c57-913782f35d4e', '0c6ed870-371f-4625-a266-0c6a3cbeb8a0', '2024-02-26 14:30:58', 57.00),
('dffa3d2b-425d-478e-b79b-794363a19669', 'a89d7922-5546-41fb-8c57-913782f35d4e', '0c6ed870-371f-4625-a266-0c6a3cbeb8a0', '2024-02-26 15:30:29', 12825.00),
('e656194a-6707-48e1-b84c-2e4df2bb9d4a', 'a89d7922-5546-41fb-8c57-913782f35d4e', '0c6ed870-371f-4625-a266-0c6a3cbeb8a0', '2024-02-26 14:22:53', 11.40),
('f0b5a6d4-3378-49d1-b50d-0dfb96953923', 'a89d7922-5546-41fb-8c57-913782f35d4e', '0c6ed870-371f-4625-a266-0c6a3cbeb8a0', '2024-02-26 14:19:23', 34.20),
('f5bdd555-9a35-4617-8a60-0ae3d6559b70', 'a89d7922-5546-41fb-8c57-913782f35d4e', '0c6ed870-371f-4625-a266-0c6a3cbeb8a0', '2024-02-26 14:31:12', 12.00);

-- --------------------------------------------------------

--
-- Structure de la table `details_commandes`
--

DROP TABLE IF EXISTS `details_commandes`;
CREATE TABLE IF NOT EXISTS `details_commandes` (
  `id` varchar(40) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `email` varchar(191) COLLATE utf8mb4_general_ci NOT NULL,
  `id_commande` varchar(40) COLLATE utf8mb4_general_ci NOT NULL,
  `id_article` varchar(40) COLLATE utf8mb4_general_ci NOT NULL,
  `quantite` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_article` (`id_article`),
  KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `details_commandes`
--

INSERT INTO `details_commandes` (`id`, `email`, `id_commande`, `id_article`, `quantite`) VALUES
('01fa529b-26bc-44d0-a7b3-7551eb2be258', 'user@example.com', '0c6ed870-371f-4625-a266-0c6a3cbeb8a0', 'a2c3b01d-c43e-44c5-b2e7-194b46494506', 5),
('093fb73f-f568-4ca4-8803-7e768dca6698', 'user@example.com', '0c6ed870-371f-4625-a266-0c6a3cbeb8a0', '92138bf1-af8c-4f52-a697-1f74df584ad5', 1),
('0b4c69e7-1b86-45aa-ba29-d78925646aab', 'user@example.com', '0c6ed870-371f-4625-a266-0c6a3cbeb8a0', '92138bf1-af8c-4f52-a697-1f74df584ad5', 3),
('1dee0ed9-23b6-463f-a08a-9c4f97cd0176', 'user@example.com', '0c6ed870-371f-4625-a266-0c6a3cbeb8a0', '92138bf1-af8c-4f52-a697-1f74df584ad5', 5),
('20503ad9-b648-4f98-be88-4dbebb46bc05', 'user@example.com', '0c6ed870-371f-4625-a266-0c6a3cbeb8a0', '690b7f6a-79ec-475d-86f8-ee87aee59e29', 1),
('31bf24f7-6967-48ac-95d2-2cc98fdc3325', 'user@example.com', '0c6ed870-371f-4625-a266-0c6a3cbeb8a0', '92138bf1-af8c-4f52-a697-1f74df584ad5', 3),
('446a7709-6923-445c-a1c3-4a3185de3b54', 'user@example.com', '0c6ed870-371f-4625-a266-0c6a3cbeb8a0', '690b7f6a-79ec-475d-86f8-ee87aee59e29', 2),
('4c61ac07-0958-455f-9965-3fe6bd9a9385', 'user@example.com', '0c6ed870-371f-4625-a266-0c6a3cbeb8a0', '19beb553-99f1-4f4e-ab77-a1bccf5c0e27', 12),
('53c5e263-0885-42c5-a950-d82aa5e0d215', 'user@example.com', '0c6ed870-371f-4625-a266-0c6a3cbeb8a0', '690b7f6a-79ec-475d-86f8-ee87aee59e29', 4),
('737140d2-0eff-4c07-a1c3-9b6c1934226a', 'user@example.com', '0c6ed870-371f-4625-a266-0c6a3cbeb8a0', '5ee8e6eb-78b5-4c58-be54-1f794fd289ff', 1),
('739cbce9-56a5-45f6-88b3-65c06aa55afd', 'user@example.com', '0c6ed870-371f-4625-a266-0c6a3cbeb8a0', '690b7f6a-79ec-475d-86f8-ee87aee59e29', 3),
('7a6d4f16-7ac2-4fc1-b414-9f21327d8a47', 'user@example.com', '0c6ed870-371f-4625-a266-0c6a3cbeb8a0', '690b7f6a-79ec-475d-86f8-ee87aee59e29', 2),
('803bcb2e-23ea-41b1-8fe8-d24386303caa', 'user@example.com', '0c6ed870-371f-4625-a266-0c6a3cbeb8a0', '92138bf1-af8c-4f52-a697-1f74df584ad5', 6),
('85e343ea-2550-460d-aad2-a3c1470b15ba', 'user@example.com', '0c6ed870-371f-4625-a266-0c6a3cbeb8a0', '690b7f6a-79ec-475d-86f8-ee87aee59e29', 5),
('a37f0d8f-adb3-47ab-ae65-f10b5e10b44f', 'user@example.com', '0c6ed870-371f-4625-a266-0c6a3cbeb8a0', '92138bf1-af8c-4f52-a697-1f74df584ad5', 2),
('b28f0ebe-e9d2-4fd2-8210-10581623585e', 'user@example.com', '0c6ed870-371f-4625-a266-0c6a3cbeb8a0', '92138bf1-af8c-4f52-a697-1f74df584ad5', 2),
('b59ec10e-4046-4c68-beac-921213a92e91', 'user@example.com', '0c6ed870-371f-4625-a266-0c6a3cbeb8a0', '19beb553-99f1-4f4e-ab77-a1bccf5c0e27', 1),
('b60c2383-f22d-4b4c-96d7-a39a6d32957f', 'user@example.com', '0c6ed870-371f-4625-a266-0c6a3cbeb8a0', '690b7f6a-79ec-475d-86f8-ee87aee59e29', 2),
('b8ba67bc-7720-4e48-b681-965fc38e5242', 'user@example.com', '0c6ed870-371f-4625-a266-0c6a3cbeb8a0', '690b7f6a-79ec-475d-86f8-ee87aee59e29', 2),
('bb09dde6-0add-4f7a-9d01-af752dddd0cf', 'user@example.com', '0c6ed870-371f-4625-a266-0c6a3cbeb8a0', '690b7f6a-79ec-475d-86f8-ee87aee59e29', 1),
('bc0a09dd-24d3-4668-91e6-9ea63c41a1aa', 'user@example.com', '0c6ed870-371f-4625-a266-0c6a3cbeb8a0', '3927e11f-7014-4033-b348-00a0a23e73b6', 95),
('c4e0a8f6-5789-40c8-a089-40b5ec4ddff5', 'user@example.com', '0c6ed870-371f-4625-a266-0c6a3cbeb8a0', '690b7f6a-79ec-475d-86f8-ee87aee59e29', 3),
('cdcbffd3-9847-4b06-9ede-15bdbe3a5b12', 'user@example.com', '0c6ed870-371f-4625-a266-0c6a3cbeb8a0', '690b7f6a-79ec-475d-86f8-ee87aee59e29', 3),
('ce8182e4-5143-438a-bc76-8b9a6d0a31b7', 'user@example.com', '0c6ed870-371f-4625-a266-0c6a3cbeb8a0', '92138bf1-af8c-4f52-a697-1f74df584ad5', 2),
('d4ecb7b6-47ac-400e-94ef-54932f668b74', 'user@example.com', '0c6ed870-371f-4625-a266-0c6a3cbeb8a0', 'a2c3b01d-c43e-44c5-b2e7-194b46494506', 1),
('d88c27f2-23c4-409c-a3f5-0db8f105ba7b', 'user@example.com', '0c6ed870-371f-4625-a266-0c6a3cbeb8a0', '472f8327-f1c1-40d3-9a89-d3be2b18ff45', 1),
('e4a7ecd6-a84c-44a7-97dd-0ab0aa8e1daf', 'user@example.com', '0c6ed870-371f-4625-a266-0c6a3cbeb8a0', '690b7f6a-79ec-475d-86f8-ee87aee59e29', 2),
('e6545191-aa90-46c2-858e-15eec7fc31c6', 'user@example.com', '0c6ed870-371f-4625-a266-0c6a3cbeb8a0', '690b7f6a-79ec-475d-86f8-ee87aee59e29', 1);

-- --------------------------------------------------------

--
-- Structure de la table `panier`
--

DROP TABLE IF EXISTS `panier`;
CREATE TABLE IF NOT EXISTS `panier` (
  `id_panier` varchar(40) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `id_utilisateur` varchar(40) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_panier`),
  KEY `id_utilisateur` (`id_utilisateur`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `panier`
--

INSERT INTO `panier` (`id_panier`, `id_utilisateur`, `date`) VALUES
('0c6ed870-371f-4625-a266-0c6a3cbeb8a0', 'a89d7922-5546-41fb-8c57-913782f35d4e', '2024-02-14 21:31:18'),
('6b425798-348c-49f0-aac8-b00d076fcc8e', '7a4609f3-b825-4abb-973f-9477384f467d', '2024-02-14 21:26:03');

-- --------------------------------------------------------

--
-- Structure de la table `panier_produits`
--

DROP TABLE IF EXISTS `panier_produits`;
CREATE TABLE IF NOT EXISTS `panier_produits` (
  `id` varchar(40) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `id_panier` varchar(40) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `id_article` varchar(40) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_article` (`id_article`),
  KEY `id_panier` (`id_panier`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `panier_produits`
--

INSERT INTO `panier_produits` (`id`, `id_panier`, `id_article`) VALUES
('7c797115-4f46-493c-a29d-be4ab60f39d1', '0c6ed870-371f-4625-a266-0c6a3cbeb8a0', '92138bf1-af8c-4f52-a697-1f74df584ad5');

-- --------------------------------------------------------

--
-- Structure de la table `utilisateurs`
--

DROP TABLE IF EXISTS `utilisateurs`;
CREATE TABLE IF NOT EXISTS `utilisateurs` (
  `id_utilisateur` varchar(40) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `prenom` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `nom` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `pseudo` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `email` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `mot_de_passe` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `is_admin` tinyint(1) NOT NULL,
  `register_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_utilisateur`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `pseudo` (`pseudo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `utilisateurs`
--

INSERT INTO `utilisateurs` (`id_utilisateur`, `prenom`, `nom`, `pseudo`, `email`, `mot_de_passe`, `is_admin`, `register_date`) VALUES
('7a4609f3-b825-4abb-973f-9477384f467d', 'Leo', 'Larou-Chalot', 'LeoLChalot', 'l.larouchalot@gmail.com', '$2a$10$k/rib9Vgy8WH1GF70Ik/fONdtG07IgBPyXFF15jDPP1xN.VCUcl8K', 1, '2023-11-09 16:07:39'),
('a89d7922-5546-41fb-8c57-913782f35d4e', 'Test', 'User', 'usertest', 'user@example.com', '$2a$10$DJx3DinDxW/woOBtlTxrpups9Getk7YNPBhnqszsmIJgdmj3LhTY2', 0, '2024-02-14 21:17:40');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
