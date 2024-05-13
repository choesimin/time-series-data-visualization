import { RowDataPacket } from "mysql2";

export default interface Row extends RowDataPacket {
  date: Date;
  amount?: number;
}
