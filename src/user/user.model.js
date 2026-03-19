import { DataTypes, Model } from "sequelize";
import {v4 as uuid} from "uuid";
import { sequlize } from "../config/db";

const User = sequlize.define(
    "User",
    {
        id:{
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue:()=> UUIDV4(),
        },
        email:{
           type: DataTypes.STRING,
           unique: true,
           allowNull:false,
        },
        password:{
            type: DataTypes.STRING,
            allowNull: false,
        }
    }

);

export default User;


