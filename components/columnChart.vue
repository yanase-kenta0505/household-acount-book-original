<script>
import { Bar } from "vue-chartjs";
export default {
  extends: Bar,
  data() {
    return {
      chartdata: {
        labels: ["January", "February", "foo", "hooo"],
        datasets: [
          {
            label: ["Data One"],
            backgroundColor: "#f87979",
            data: [40, 30, 50, 60],
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
      },
    };
  },
  mounted() {
    this.renderChart(this.chartdata, this.options);
  },
};
</script>
