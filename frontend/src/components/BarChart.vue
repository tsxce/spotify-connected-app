<script>
import { Bar } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
);

export default {
  name: "BarChart",
  components: { Bar },
  props: {
    audioData: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const dataLabels = [];
    const dataArray = [];
    Object.keys(props.audioData).forEach((key) => {
      if (props.audioData[key] > 0 && props.audioData[key] < 1) {
        dataLabels.push(key);
        dataArray.push(props.audioData[key]);
      }
    });
    return {
      dataLabels: dataLabels,
      dataArray: dataArray,
      chartData: {
        labels: dataLabels,
        datasets: [
          {
            label: "Audio Feature",
            backgroundColor: [
              "#FF7F50",
              "#FF6347",
              "#FF4500",
              "#FFA500",
              "#FF8C00",
              "#FFD700",
            ],
            data: dataArray,
          },
        ],
      },
      chartOptions: {
        responsive: true,
        legend: { display: false },
      },
    };
  },
};
</script>

<template>
  <Bar id="my-chart-id" :options="chartOptions" :data="chartData" />
</template>
