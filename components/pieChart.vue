<script>
import { Pie } from "vue-chartjs";
export default {
  extends: Pie,
  data() {
    return {
      chartdata: {
        labels: [
          "食費",
          "通信費",
          "家賃",
          "電気代",
          "水道代",
          "車関係",
          "保険",
          "その他",
        ],
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
