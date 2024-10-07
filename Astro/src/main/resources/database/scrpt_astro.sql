-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `mydb` DEFAULT CHARACTER SET utf8 ;
USE `mydb` ;

-- -----------------------------------------------------
-- Table `mydb`.`cliente`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`cliente` (
  `id_cliente` INT NOT NULL AUTO_INCREMENT,
  `cliente_email` VARCHAR(100) NOT NULL,
  `cliente_hashword` VARCHAR(1000) NOT NULL,
  `cliente_username` VARCHAR(255) NOT NULL,
  `cliente_creationDate` DATE NOT NULL,
  `cliente_lastAcess` DATE NOT NULL,
  PRIMARY KEY (`id_cliente`),
  UNIQUE INDEX `idcliente_UNIQUE` (`id_cliente` ASC) VISIBLE,
  UNIQUE INDEX `cliente_email_UNIQUE` (`cliente_email` ASC) VISIBLE,
  UNIQUE INDEX `cliente_username_UNIQUE` (`cliente_username` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`access_level`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`access_level` (
  `id_access_level` INT NOT NULL,
  `id_cliente` INT NOT NULL,
  `acces_leve_admAccess` TINYINT NOT NULL,
  `access_level_add_music` TINYINT NOT NULL,
  PRIMARY KEY (`id_access_level`),
  UNIQUE INDEX `id_access_level_UNIQUE` (`id_access_level` ASC) VISIBLE,
  UNIQUE INDEX `id_cliente_UNIQUE` (`id_cliente` ASC) VISIBLE,
  CONSTRAINT `id_user`
    FOREIGN KEY (`id_cliente`)
    REFERENCES `mydb`.`cliente` (`id_cliente`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`linking`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`linking` (
  `id_linking` INT NOT NULL,
  `id_cliente` INT NOT NULL,
  `linking_vinculo` TINYINT NOT NULL,
  UNIQUE INDEX `id_linking_UNIQUE` (`id_linking` ASC) VISIBLE,
  PRIMARY KEY (`id_linking`),
  UNIQUE INDEX `id_cliente_UNIQUE` (`id_cliente` ASC) VISIBLE,
  CONSTRAINT `id_user`
    FOREIGN KEY (`id_cliente_linking`)
    REFERENCES `mydb`.`cliente` (`id_cliente`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
