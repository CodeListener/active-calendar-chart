import { Plugin } from "vue";
import ActiveCalendarChart from "./ActiveCalendarChart.vue";
import generateChartData from "./core";

export type RowItem = {
  date: string;
  isEmpty: boolean;
  year: number;
  month: number;
};

export type ColItem = {
  span: number;
  month: number;
  year: number;
  date: string;
};

export type Result = {
  headers: ColItem[];
  rows: RowItem[][];
};

type SFCWithInstall<T> = T & Plugin;
(ActiveCalendarChart as SFCWithInstall<typeof ActiveCalendarChart>).install = (app) => {
  app.component("ActiveCalendarChart", ActiveCalendarChart);
};
export { ActiveCalendarChart, generateChartData };
export default ActiveCalendarChart;
