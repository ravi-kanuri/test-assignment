import { DataTypes } from "sequelize";
import sequlize from "../config/db";

const RateLimit = sequlize.define(
    "RateLimit",{
        userId:{
            type: DataTypes.UUID,
            primaryKey: true,
        },
        count :{
            type: DataTypes.INTEGER,
            defaultValue: 1
        },
        windowStart:{
          type: DataTypes.DATE,
          allowNull: false,
        }
    }
)

export default RateLimit;
