import { ColItem, Result, RowItem } from ".";
import { format } from "./utils";

const ONE_DAY = 86400000;
const today = new Date();

export enum MonthMap {
  Jan = 1,
  Feb,
  Mar,
  Apr,
  May,
  Jun,
  Jul,
  Aug,
  Sep,
  Oct,
  Nov,
  Dec,
}

export enum DayMap {
  Sun,
  Mon,
  Tues,
  Wed,
  Thur,
  Fri,
  Sat,
}

function getStartDate(end: number | string | Date, cols = 53) {
  const endDate = new Date(end);
  const day = endDate.getDay();
  // 由于一年365天, 365 / 7 > 52 && <53，所以只获取52周前的天数
  const endTimeStamp = endDate.getTime() - ONE_DAY * day;
  // 如果刚好endDate是在最后一列的最后一个
  const delta = ONE_DAY * (cols - 1) * 7;
  return new Date(endTimeStamp - delta);
}

function getRowItems(start: number | string | Date, end: number | string | Date) {
  const result = [[], [], [], [], [], [], []] as RowItem[][];
  const startDate = new Date(start);
  const endDate = new Date(end);
  const startDay = startDate.getDay();
  // 填充第一列空位置
  for (let i = 0; i < startDay; i++) {
    result[i].push({
      year: startDate.getFullYear(),
      month: startDate.getMonth() + 1,
      date: format(new Date(startDate.getTime() - ONE_DAY * (i + 1)).getTime()),
      isEmpty: true,
    });
  }
  for (let t = startDate.getTime(); t <= endDate.getTime(); t += ONE_DAY) {
    const date = new Date(t);
    const day = date.getDay();
    result[day].push({
      date: format(date.getTime()),
      isEmpty: false,
      year: date.getFullYear(),
      month: date.getMonth() + 1,
    });
  }
  return result;
}

function getHeaderColItems(rows: RowItem[][], isFullYear = true) {
  const map = new Map<string, ColItem>();
  const firstRow = rows[0];
  const lastRow = rows[rows.length - 1];
  firstRow.forEach((col, index) => {
    const key = `${col.year}-${col.month}`;
    let data = map.get(key) || {
      span: 0,
      month: col.month,
      year: col.year,
      date: col.date,
    };
    data.span += !isFullYear && index === 0 && (col.year !== lastRow[index].year || col.month !== lastRow[index].month) ? 0 : 1;

    map.set(key, data);
  });
  return [...map.values()];
}

function generateChartData(year?: number): Result;
function generateChartData(startDate: string, endDate: string): Result;
function generateChartData(...args: any): Result {
  let headers: ColItem[] = [];
  let rows: RowItem[][] = [];
  if (args.length === 0) {
    rows = getRowItems(getStartDate(today), today);
  } else if (args.length === 1) {
    const [year] = args;
    rows = getRowItems(`${year}-01-01`, `${year}-12-31`);
  } else if (args.length === 2) {
    const [startDate, endDate] = args;
    rows = getRowItems(startDate, endDate);
  }
  headers = getHeaderColItems(rows);
  return { headers, rows };
}

export default generateChartData;
