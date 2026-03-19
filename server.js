import dotenv from "dotenv";
import app from "./app";
import sequelize from "./src/config/db";

dotenv.config();

const PORT = process.env.PORT || 8000;

const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log("DB is connected");

    await sequelize.sync({ alter: true });

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error(" Failed to start server:", error);
  }
};

startServer();