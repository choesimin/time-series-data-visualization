import dayjs, { Dayjs } from "dayjs";
import SourceDB from "@/services/db/mysql";
import TargetDB from "@/services/db/mongodb";
import getConfig from "@/services/config";
import { syncQueue } from "@/services/sync/SyncQueue";
import Row from "@/types/Row";
import Doc from "@/types/Doc";
import Config from "@/types/Config";
import { WithoutId } from "mongodb";
import { INITIAL_DATE } from "@/constants/date";

export default async function syncWithQueue(id: string): Promise<void> {
  try {
    await syncQueue.enqueue(() => sync(id));
  } catch (error) {
    console.error("동기화 오류 발생 :", error);
  }
}

async function sync(id: string): Promise<void> {
  const config: Config = getConfig(id);
  console.log(`${config.name} 동기화 시작`);
  const lastDocument: Doc = await getLastDocument(config);
  console.log(`${config.name} 마지막 문서 : ${JSON.stringify(lastDocument)}`);

  let start: Dayjs = dayjs(lastDocument.date).add(1, "hour").startOf("hour");
  const finish: Dayjs = dayjs().subtract(1, "hour").endOf("hour");

  while (start.isBefore(finish) || start.isSame(finish)) {
    const begin: Dayjs = start.startOf("hour");
    const end: Dayjs = start.endOf("hour");
    await save(config, begin, end);
    start = start.add(1, "hour");
  }

  console.log(`${config.name} 동기화 종료`);
}

async function getLastDocument(config: Config): Promise<Doc> {
  const collection = await TargetDB.getCollection();
  const result: WithoutId<Doc>[] = (await collection
    .find<Doc>({ type: config.target.type })
    .sort({ date: -1 })
    .limit(1)
    .toArray()) as WithoutId<Doc>[];

  const lastDocument: Doc =
    result.length > 0
      ? {
          date: result[0].date,
          type: config.target.type,
          amount: result[0].amount,
          count: result[0].count,
        }
      : {
          date: dayjs(INITIAL_DATE).subtract(1, "hour").toDate(),
          type: config.target.type,
          amount: 0,
          count: 0,
        };

  return lastDocument;
}

async function save(config: Config, begin: Dayjs, end: Dayjs): Promise<void> {
  let cachedRows: Row[] = [];

  const params: string[] = config.source.param(begin, end);
  for (const sql of config.source.sql) {
    const connection = await SourceDB.getConnection();
    const [rows, fields] = await connection.execute<Row[]>(sql, params);
    cachedRows.push(...rows);
    await sleep(50);
  }

  console.log(`${config.name} VAL : ${JSON.stringify(params)}`);
  console.log(`${config.name} ROW : ${cachedRows.length} 건`);

  const documents: Doc[] = sumRowsToDocs(cachedRows, config);
  console.log(`${config.name} DOC : ${JSON.stringify(documents)}`);

  const collection = await TargetDB.getCollection();
  collection.insertMany(fillDocsMissingHour(documents, config, begin, end));
  await sleep(50);
}

function sumRowsToDocs(rows: Row[], config: Config): Doc[] {
  const result = new Map<string, Doc>();

  rows.forEach((row) => {
    const date: Dayjs = dayjs(row.date).startOf("hour");

    const dateKey = date.toISOString();
    if (result.has(dateKey)) {
      const document = result.get(dateKey);
      if (document) {
        document.count += 1;
        if (config.source.hasAmount) {
          document.amount = document.amount
            ? document.amount + (row.amount != undefined ? row.amount : 0)
            : row.amount;
        }
      }
    } else {
      const newDocument: Doc = {
        date: date.toDate(),
        type: config.target.type,
        count: 1,
      };
      if (config.source.hasAmount) {
        newDocument.amount = row.amount;
      }
      result.set(dateKey, newDocument);
    }
  });

  return Array.from(result.values());
}

function fillDocsMissingHour(
  docs: Doc[],
  config: Config,
  beginDate: Dayjs,
  endDate: Dayjs
): Doc[] {
  const sortedData: Doc[] = docs.sort(
    (a, b) => a.date.valueOf() - b.date.valueOf()
  );

  const result: Doc[] = [];

  let currentDate: Dayjs = beginDate.startOf("hour");
  while (currentDate <= endDate) {
    const document: Doc | undefined = sortedData.find((doc) =>
      dayjs(doc.date).isSame(currentDate)
    );

    if (document) {
      result.push(document);
    } else {
      const newDocument: Doc = {
        date: currentDate.toDate(),
        type: config.target.type,
        count: 0,
      };
      if (config.source.hasAmount) {
        newDocument.amount = 0;
      }
      result.push(newDocument);
    }

    currentDate = currentDate.add(1, "hour");
  }

  return result;
}

async function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
