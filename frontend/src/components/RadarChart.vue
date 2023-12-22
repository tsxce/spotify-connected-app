<script setup>
import { defineProps } from "vue";
import { PolarAreaChart } from "vue-chart-3";
import { Chart, registerables } from "chart.js";

const props = defineProps({
  audioData: {
    type: Object,
    required: true,
  },
});
Chart.register(...registerables);
const dataLabels = [];
const dataArray = [];
if (props.audioData) {
  Object.keys(props.audioData).forEach((key) => {
    if (props.audioData[key] > 0 && props.audioData[key] < 1) {
      dataLabels.push(key);
      dataArray.push(props.audioData[key] * 10000);
    }
  });
}
const testData = {
  // labels: ["Paris", "Nîmes", "Toulon", "Perpignan", "Autre"],
  labels: dataLabels,
  datasets: [
    {
      label: "Average Audio Feature",
      data: dataArray,
      // data: [30, 40, 60, 70, 5, 99],
      backgroundColor: [
        "#00CED1", // DarkTurquoise
        "#9932CC", // DarkOrchid
        "#DC143C", // Crimson
        "#FF1493", // DeepPink
        "#00FF00", // Lime
        "#FF69B4", // HotPink
      ],
    },
  ],
};
</script>

<template>
  <PolarAreaChart :chartData="testData" />
</template>
