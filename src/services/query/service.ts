import TargetDB from "@/services/db/mongodb";
import getConfig from "@/services/config";
import Datum from "@/types/Datum";
import dayjs, { Dayjs } from "dayjs";
import Config from "@/types/Config";
import { WithoutId } from "mongodb";
import Doc from "@/types/Doc";

export default async function get(
  id: string,
  beginDate: Dayjs,
  endDate: Dayjs
) {
  const config: Config = getConfig(id);
  const collection = await TargetDB.getCollection();
  const documents: WithoutId<Doc>[] = await collection
    .find<Doc>({
      date: {
        $gte: beginDate.toDate(),
        $lte: endDate.toDate(),
      },
      type: config.target.type,
    })
    .sort({ date: 1 })
    .toArray();

  const data: Datum[] = documents.map((document) => {
    return {
      date: dayjs(document.date),
      count: document.count,
      amount: document.amount,
    };
  });

  console.log(`${config.name} 자료 조회 건수 : ${data.length}`);

  return data;
}
