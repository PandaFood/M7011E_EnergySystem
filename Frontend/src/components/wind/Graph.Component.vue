<template>
  <div class="chart" ref="chartdiv">
  </div>
</template>

<script>
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

import axios from 'axios'

am4core.useTheme(am4themes_animated);


export default {
    name: 'Graph',
    data () {
        return {
            graphData: []
        }
    },
    params: ["turbineId"],
    methods: {
        initSeries: function(name, color, unit) {
            var axis = this.chart.yAxes.push(new am4charts.ValueAxis());

            // Create series
            var series = this.chart.series.push(new am4charts.LineSeries());
            series.dataFields.valueY = name.toLowerCase();
            series.dataFields.dateX = "date";
            series.strokeWidth = 3;
            series.fillOpacity = 0.0;

            series.stroke = color;
            series.fill = color;
            series.name = name;
            series.unit = unit;
            series.yAxis = axis;
            series.tooltipText = "{name}: [bold]{valueY} {unit}[/]";

            axis.renderer.line.strokeOpacity = 1;
            axis.renderer.line.strokeWidth = 2;
            axis.renderer.line.stroke = series.stroke;
            axis.renderer.labels.template.fill = series.stroke;
                axis.renderer.grid.template.disabled = true;
        },
        addData: function (speed, power, timestamp) {
            this.chart.addData({
                date: timestamp,
                speed: speed.toFixed(2),
                power: power.toFixed(2)
            })
        },
    },
    mounted() {
    
        let chart = am4core.create(this.$refs.chartdiv, am4charts.XYChart);

        chart.paddingRight = 20;
        this.chart = chart; 

        am4core.useTheme(am4themes_animated);
        // Themes end
        // Create axes
        this.dateAxis = this.chart.xAxes.push(new am4charts.DateAxis());
        this.dateAxis.renderer.grid.template.location = 0;
        this.dateAxis.renderer.minGridDistance = 100;
        this.dateAxis.groupData = true;
        this.chart.scrollbarX = new am4core.Scrollbar();
        this.chart.scrollbarX.paddingLeft = 20;
        this.chart.scrollbarX.paddingRight = 20;

        this.initSeries("Power", '#EE0000', 'kWh');
        this.initSeries("Speed", '#0000EE', 'm/s');

        // Add cursor
        this.chart.cursor = new am4charts.XYCursor();
        this.chart.cursor.behavior = "zoomX";
        this.chart.cursor.lineX.disabled = true;
        this.chart.legend = new am4charts.Legend();
        this.chart.legend.labels.template.text = "[bold {color}]{name} ({unit})[/]";

        this.dateAxis.keepSelection = true;

        axios.get('/api/producerEvent', {params: {producerId: this.$attrs.turbineId}, headers: { Authorization: 'Bearer ' + localStorage.getItem('jwt')}})
            .then(response => {
                function strip(element) {
                    return {
                        speed: element.windSpeed.toFixed(2),
                        power: element.energyProduced.toFixed(2),
                        date: Date.parse(element.timestamp),
                    }
                }

                let data = response.data.map(strip);
                data.sort(function(a, b){return a.date - b.date}); 

                if (data.length > 50) {
                    this.dateAxis.start = 0.8;
                }
                this.chart.addData(data)
            })
            .catch(err => {
                this.flash(err, 'error');
            });
    },

    beforeDestroy() {
        if (this.chart) {
            this.chart.dispose();
        }
    },

}
</script>

<style scoped>
div {
    width: 95vw;
    height: 550px;
    margin: auto;
    clear: both;
    padding-top: 50px;
}
</style>