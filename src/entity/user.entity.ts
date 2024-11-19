import { Column, Model, PrimaryKey, Table } from "sequelize-typescript"
import { Role } from "src/constants/app.constants";

/**
 * ORM Model entity for Users table
 * All the fields of this class correspond to the columns of 'Users' table in the database with the respective type.
 */
@Table({tableName: 'Users'})
export class User extends Model{

    @PrimaryKey
    @Column
    userId: number;

    @Column
    username: string;

    @Column
    password: string;

    @Column
    role: Role;
}

