<script>
import { Line } from "vue-chartjs";
export default {
  extends: Line,
  data() {
    return {
      chartdata: {
        labels: ["January", "February", "foo", "hooo"],
        datasets: [
          {
            label: ["Data One"],
            backgroundColor: "#f87979",
            data: [40, 30, 50, 60],
            borderColor: "rgba(255, 100, 100, 1)",
            lineTension: 0,
            fill: false,
            borderWidth: 3,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          yAxes: [
            {
              ticks: {
                min: 0,
                //beginAtZero: true
              },
            },
          ],
        },
      },
    };
  },
  mounted() {
    this.renderChart(this.chartdata, this.options);
  },
};
</script>
