import createApp from "./app";
import dotenv from "dotenv";
import {connectToDatabase} from "./models";
import CustomLogger from "./common/utils/errorLogger";

dotenv.config()

const PORT = process.env.PORT || 8000;
const appServer = async () => {
  const app = await createApp();
  if (require.main ===  module) {
    app.listen(PORT);
  }
};

const startApp = async () => {
  try {
    await connectToDatabase();
    await appServer();
    return CustomLogger.info(`connect to the database and server running on port ${PORT}`);
  } catch (e) {
    console.log(e);
    return CustomLogger.info(`failed to connect the database`);
  }
};

startApp();
