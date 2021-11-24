<script>
import moment from "moment";
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
            backgroundColor: [
              "blue",
              "red",
              "green",
              "pink",
              "brown",
              "yellow",
            ],
            data: [],
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
    // console.log(this.$store.getters["db/displayEvent"])
    this.displayPieChart();
    this.renderChart(this.chartdata, this.options);
  },
  computed: {
    calendarEvent() {
      // return this.$store.getters["db/calendarEvent"]
      const a = JSON.parse(
        JSON.stringify(this.$store.getters["db/calendarEvent"])
      );
      // console.log(a);
      return a;
    },
    selectedDate() {
      const a = JSON.parse(
        JSON.stringify(this.$store.getters["db/selectedDate"])
      );
      return a;
    },
  },
  watch: {
    selectedDate() {
      this.displayPieChart();
      this.renderChart(this.chartdata, this.options);
    },
  },

  methods: {
    displayPieChart() {
      const filteringEvent = this.calendarEvent.filter((event) => {
        return (
          moment(event.start).format("YYYY-MM") === this.selectedDate &&
          event.state === "minus"
        );
      });

      const tallyEvent = filteringEvent.reduce(
        (arr, { amount, classification }) => {
          const target = arr.find((it) => {
            return it.classification === classification;
          });
          if (target) {
            target.amount += amount;
          } else {
            arr.push({ amount, classification });
          }
          return arr;
        },
        []
      );

      const classifications = [];
      tallyEvent.forEach((event) => {
        classifications.push(event.classification);
      });
      const amounts = [];
      tallyEvent.forEach((event) => {
        amounts.push(event.amount);
      });


      this.chartdata.datasets.forEach((dataset) => {
        dataset.data = [];
        amounts.forEach((amount) => {
          dataset.data.push(amount);
        });
      });
      this.chartdata.labels = [];
      this.chartdata.labels = classifications;
    },
  },
};
</script>
