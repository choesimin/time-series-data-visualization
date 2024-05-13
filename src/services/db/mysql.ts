import { createConnection, Connection } from "mysql2/promise";

export default class Database {
  private static connection: Connection;

  private constructor() {}

  public static async getConnection(): Promise<Connection> {
    if (!Database.connection) {
      try {
        Database.connection = await createConnection({
          host: process.env.MYSQL_HOST,
          port: process.env.MYSQL_PORT as unknown as number,
          user: process.env.MYSQL_USER,
          password: process.env.MYSQL_PASSWORD,
          database: process.env.MYSQL_DATABASE,
        });
        console.log("MySQL 연결 성공");

        process.on("exit", () => {
          Database.connection.end();
          console.log("MySQL 연결 종료");
        });

        process.on("SIGINT", async () => {
          await Database.connection.end();
          console.log("MySQL 연결 종료");
          process.exit(0);
        });

        process.on("SIGTERM", async () => {
          await Database.connection.end();
          console.log("MySQL 연결 종료");
          process.exit(0);
        });
      } catch (error) {
        console.error("MySQL 연결 실패 :", error);
        process.exit(1);
      }
    }
    return Database.connection;
  }
}
