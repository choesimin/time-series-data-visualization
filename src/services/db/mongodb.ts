import { MongoClient, Db, Collection, Document } from "mongodb";

export default class Database {
  private static connection: Db;
  private static client: MongoClient;

  private constructor() {}

  public static async getCollection<T extends Document>(): Promise<
    Collection<T>
  > {
    const db = await Database.getConnection();
    return db.collection<T>(process.env.MONGODB_COLLECTION as string);
  }

  private static async getConnection(): Promise<Db> {
    if (!Database.connection) {
      try {
        Database.client = new MongoClient(process.env.MONGODB_URI as string);
        await Database.client.connect();
        Database.connection = Database.client.db(process.env.MONGODB_DATABASE);
        console.log("MongoDB 연결 성공");

        Database.handleExitSignals();
      } catch (error) {
        console.error("MongoDB 연결 실패 :", error);
        process.exit(1);
      }
    }
    return Database.connection;
  }

  private static handleExitSignals() {
    process.on("exit", () =>
      Database.client.close().then(() => console.log("MongoDB 연결 종료"))
    );
    process.on("SIGINT", () => Database.closeAndExit());
    process.on("SIGTERM", () => Database.closeAndExit());
  }

  private static async closeAndExit() {
    try {
      await Database.client.close(true);
      console.log("MongoDB 연결 종료");
      process.exit(0);
    } catch (error) {
      console.error("MongoDB 연결 종료 실패 :", error);
      process.exit(1);
    }
  }
}
