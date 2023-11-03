import { DataTypes, Sequelize, Model } from "sequelize";

export const connection = new Sequelize('laravel', 'root', 'password', {
    host: '127.0.0.1',
    dialect: 'mysql',
});

export const Image = connection.define("image", {
    id: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    posted: { type: DataTypes.BOOLEAN, allowNull: false },
}, {
    paranoid: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    deletedAt: "deleted_at",
});

export const Quote = connection.define("quote", {
    id: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false, autoIncrement: true, primaryKey: true },
    quote: { type: DataTypes.TEXT, allowNull: false },
    posted: { type: DataTypes.BOOLEAN, allowNull: false },
}, {
    paranoid: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    deletedAt: "deleted_at",
});