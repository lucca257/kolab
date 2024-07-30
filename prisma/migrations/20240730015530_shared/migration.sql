-- CreateTable
CREATE TABLE `user` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `parentUserId` INTEGER NULL,
    `parentId` INTEGER NULL,

    INDEX `FK_c86f56da7bb30c073e3cbed4e50`(`parentId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `user` ADD CONSTRAINT `FK_c86f56da7bb30c073e3cbed4e50` FOREIGN KEY (`parentId`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
