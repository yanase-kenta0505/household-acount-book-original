<script>
import { Bar } from "vue-chartjs";
export default {
  extends: Bar,
  data() {
    return {
      chartdata: {
        labels: [
          "1月",
          "2月",
          "3月",
          "4月",
          "5月",
          "6月",
          "7月",
          "8月",
          "9月",
          "10月",
          "11月",
          "12月",
        ],
        datasets: [
          {
            label: "食費",
            backgroundColor: "pink",
            data: [40000, 30000, 5000, 20000],
          },
          {
            label: '水道代',
            backgroundColor:"blue",
            data: [5555, 6000, 3000, 10000],
          },
          {
            label: '光熱費',
            backgroundColor:"yellow",
            data: [5555, 6000, 3000, 10000],
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          //軸設定
          yAxes: [
            {
              //y軸設定
              display: true, //表示設定
              
              ticks: {
                //最大値最小値設定
                min: 0, //最小値
                max: 300000, //最大値
                fontSize: 12, //フォントサイズ
                stepSize: 50000, //軸間隔
              },
              stacked: true,
            },
          ],
          xAxes: [
            {
              stacked: true,
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
