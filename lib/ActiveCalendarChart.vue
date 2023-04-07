<template>
  <div class="active-calendar-chart">
    <table :style="tableStyle">
      <thead>
        <tr>
          <th class="first-grid" :style="thStyle">
            <slot name="first-grid" />
          </th>
          <th class="month" v-for="item in result.headers" :colspan="item.span" :style="thStyle">
            <slot name="month" :item="item" :list="result.headers">
              <span>{{ item.span <= 3 ? "" : MonthMap[item.month] }}</span>
            </slot>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, index) in result.rows">
          <td class="week" :style="tdStyle">
            <slot name="week" :item="index">
              <span :style="{ paddingRight: '10px' }" v-show="index % 2 !== 0">{{ DayMap[index] }}</span>
            </slot>
          </td>
          <td class="date" v-for="col in row" :data-date="col.date" :style="tdStyle">
            <slot :item="col" :row="row" :all="result.rows">
              <div :style="[gridStyle, { backgroundColor: col.isEmpty ? 'transparent' : value?.[col.date]?.color ?? defaultColor }]" />
            </slot>
          </td>
        </tr>
      </tbody>
    </table>
    <div v-if="!!descripton || colors.length" class="tfoot" :style="tFootStyle">
      <div class="description">{{ descripton }}</div>
      <div class="colors" :style="tFootRightStyle" v-show="colors?.length">
        <span>{{ less }}</span>
        <span v-for="color in colors" class="grid" :style="[gridStyle, { backgroundColor: color, marginLeft: '4px' }]"></span>
        <span :style="{ marginLeft: '4px' }">{{ more }}</span>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed, StyleValue } from "vue";
import generateChartData, { DayMap, MonthMap } from "./core";

const props = withDefaults(
  defineProps<{
    value: { [key: string]: { value: number; color: string } };
    textAlign?: "left" | "center" | "right";
    date?: number | { start: string; end: string };
    defaultColor?: string;
    less?: string;
    more?: string;
    colors?: string[];
    grid?: { width?: string; height?: string };
    descripton?: string;
  }>(),
  {
    textAlign: "left",
    date: undefined,
    defaultColor: "#ebedf0",
    less: "Less",
    more: "More",
    descripton: undefined,
    colors: () => [],
    grid: () => ({ width: "10px", height: "10px" }),
  }
);

const result = computed(() => {
  if (!props.date) return generateChartData();
  if (typeof props.date === "number") return generateChartData(props.date);
  return generateChartData(props.date.start, props.date.end);
});

/**
 * style
 */
const gridStyle = computed<StyleValue>(() => ({
  width: props.grid.width,
  height: props.grid.height,
}));
const tableStyle = computed<StyleValue>(() => ({
  textAlign: props.textAlign,
  fontSize: "12px",
  color: "#1f2328",
}));
const thStyle: StyleValue = {
  paddingBottom: "4px",
};
const tdStyle: StyleValue = {
  padding: 0,
  lineHeight: 1,
  boxSizing: "border-box",
};
const tFootStyle: StyleValue = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  fontSize: "12px",
  color: "#999",
  marginTop: "10px",
  fontWeight: 300,
};
const tFootRightStyle: StyleValue = {
  display: "flex",
  alignItems: "center",
};
</script>
