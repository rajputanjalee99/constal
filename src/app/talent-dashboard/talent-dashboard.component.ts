import { Component, OnInit } from '@angular/core';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import * as am4maps from "@amcharts/amcharts4/maps";
import am4geodata_worldLow from "@amcharts/amcharts4-geodata/worldLow";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";



declare var $;

import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-talent-dashboard',
  templateUrl: './talent-dashboard.component.html',
  styleUrls: ['./talent-dashboard.component.scss']
})
export class TalentDashboardComponent implements OnInit {



// calendarPlugins = [dayGridPlugin];

  constructor() {
    
   }



  
  ngOnInit(): void {
  

  // ------------------chart 1---------------------------
am4core.useTheme(am4themes_animated);
// Themes end




// --------------------------2nd chart-------------------------

/* Chart code */
// Themes begin
// am4core.useTheme(am4themes_animated);
// Themes end

// Create chart instance
let chart2 = am4core.create("chartdiv2", am4charts.PieChart);

// Add data
chart2.data = [{
  "contract": "Hourly",
  "ratio": 54
}, {
  "contract": "Lumpsum",
  "ratio": 17
}, {
  "contract": "Salary Based",
  "ratio": 30
}];

// Add and configure Series
let pieSeries2 = chart2.series.push(new am4charts.PieSeries());
pieSeries2.dataFields.value = "ratio";
pieSeries2.dataFields.category = "contract";
pieSeries2.ticks.template.disabled = true;
pieSeries2.alignLabels = false;
pieSeries2.labels.template.text = "{value.percent.formatNumber('#.0')}%";
pieSeries2.labels.template.radius = am4core.percent(-40);
pieSeries2.labels.template.fill = am4core.color("white");
pieSeries2.slices.template.stroke = am4core.color("#fff");
pieSeries2.slices.template.strokeOpacity = 1;

// This creates initial animation
pieSeries2.hiddenState.properties.opacity = 1;
pieSeries2.hiddenState.properties.endAngle = -90;
pieSeries2.hiddenState.properties.startAngle = -90;

chart2.hiddenState.properties.radius = am4core.percent(0);

chart2.legend = new am4charts.Legend();



// ----------------------------------3 chart-----------------------------

// am4core.useTheme(am4themes_animated);
// Themes end

// Create map instance
let chart3 = am4core.create("chartdiv3", am4maps.MapChart);

// Set map definition
chart3.geodata = am4geodata_worldLow;

// Set projection
chart3.projection = new am4maps.projections.Miller();

// Create map polygon series
let polygonSeries = chart3.series.push(new am4maps.MapPolygonSeries());

// Exclude Antartica
polygonSeries.exclude = ["AQ"];

// Make map load polygon (like country names) data from GeoJSON
polygonSeries.useGeodata = true;

// Configure series
let polygonTemplate = polygonSeries.mapPolygons.template;
polygonTemplate.tooltipText = "{name}";
polygonTemplate.polygon.fillOpacity = 0.6;


// Create hover state and set alternative fill color
let hs = polygonTemplate.states.create("hover");
hs.properties.fill = chart3.colors.getIndex(0);

// Add image series
let imageSeries = chart3.series.push(new am4maps.MapImageSeries());
imageSeries.mapImages.template.propertyFields.longitude = "longitude";
imageSeries.mapImages.template.propertyFields.latitude = "latitude";
imageSeries.mapImages.template.tooltipText = "{title}";
imageSeries.mapImages.template.propertyFields.url = "url";

let circle = imageSeries.mapImages.template.createChild(am4core.Circle);
circle.radius = 3;
circle.propertyFields.fill = "color";

let circle2 = imageSeries.mapImages.template.createChild(am4core.Circle);
circle2.radius = 3;
circle2.propertyFields.fill = "color";


circle2.events.on("inited", function(event){
  animateBullet(event.target);
})


function animateBullet(circle) {
    let animation = circle.animate([{ property: "scale", from: 1, to: 5 }, { property: "opacity", from: 1, to: 0 }], 1000, am4core.ease.circleOut);
    animation.events.on("animationended", function(event){
      animateBullet(event.target.object);
    })
}

let colorSet = new am4core.ColorSet();

imageSeries.data = [ {
  "title": "Brussels",
  "latitude": 50.8371,
  "longitude": 4.3676,
  "color":colorSet.next()
}, {
  "title": "Copenhagen",
  "latitude": 55.6763,
  "longitude": 12.5681,
  "color":colorSet.next()
}, {
  "title": "Paris",
  "latitude": 48.8567,
  "longitude": 2.3510,
  "color":colorSet.next()
}, {
  "title": "Reykjavik",
  "latitude": 64.1353,
  "longitude": -21.8952,
  "color":colorSet.next()
}, {
  "title": "Moscow",
  "latitude": 55.7558,
  "longitude": 37.6176,
  "color":colorSet.next()
}, {
  "title": "Madrid",
  "latitude": 40.4167,
  "longitude": -3.7033,
  "color":colorSet.next()
}, {
  "title": "London",
  "latitude": 51.5002,
  "longitude": -0.1262,
  "url": "http://www.google.co.uk",
  "color":colorSet.next()
}, {
  "title": "Peking",
  "latitude": 39.9056,
  "longitude": 116.3958,
  "color":colorSet.next()
}, {
  "title": "New Delhi",
  "latitude": 28.6353,
  "longitude": 77.2250,
  "color":colorSet.next()
}, {
  "title": "Tokyo",
  "latitude": 35.6785,
  "longitude": 139.6823,
  "url": "http://www.google.co.jp",
  "color":colorSet.next()
}, {
  "title": "Ankara",
  "latitude": 39.9439,
  "longitude": 32.8560,
  "color":colorSet.next()
}, {
  "title": "Buenos Aires",
  "latitude": -34.6118,
  "longitude": -58.4173,
  "color":colorSet.next()
}, {
  "title": "Brasilia",
  "latitude": -15.7801,
  "longitude": -47.9292,
  "color":colorSet.next()
}, {
  "title": "Ottawa",
  "latitude": 45.4235,
  "longitude": -75.6979,
  "color":colorSet.next()
}, {
  "title": "Washington",
  "latitude": 38.8921,
  "longitude": -77.0241,
  "color":colorSet.next()
}, {
  "title": "Kinshasa",
  "latitude": -4.3369,
  "longitude": 15.3271,
  "color":colorSet.next()
}, {
  "title": "Cairo",
  "latitude": 30.0571,
  "longitude": 31.2272,
  "color":colorSet.next()
}, {
  "title": "Pretoria",
  "latitude": -25.7463,
  "longitude": 28.1876,
  "color":colorSet.next()
} ];



// ---------------------------------4 chart----------------------

let chart4 = am4core.create("chartdiv4", am4charts.XYChart);
chart4.scrollbarX = new am4core.Scrollbar();

// Add data
chart4.data = [{
  "country": "Prepare Baseline",
  "visits": 3025
}, {
  "country": "BIM 3D Simulation",
  "visits": 1882
}, {
  "country": "Constructability Check",
  "visits": 1809
}, {
  "country": "BIM 4D Simulation",
  "visits": 1809
}, {
  "country": "5D Take of Quantity",
  "visits": 1809
}];

prepareParetoData();

function prepareParetoData(){
    let total = 0;

    for(var i = 0; i < chart4.data.length; i++){
        let value = chart4.data[i].visits;
        total += value;
    }

    let sum = 0;
    for(var i = 0; i < chart4.data.length; i++){
        let value = chart4.data[i].visits;
        sum += value;   
        chart4.data[i].pareto = sum / total * 100;
    }    
}

// Create axes
let categoryAxis = chart4.xAxes.push(new am4charts.CategoryAxis());
categoryAxis.dataFields.category = "country";
categoryAxis.renderer.grid.template.location = 0;
categoryAxis.renderer.minGridDistance = 60;
categoryAxis.tooltip.disabled = true;
categoryAxis.renderer.labels.template.rotation = 310;
categoryAxis.renderer.labels.template.fontSize = 12;

let valueAxis = chart4.yAxes.push(new am4charts.ValueAxis());
valueAxis.renderer.minWidth = 50;
valueAxis.min = 0;
valueAxis.cursorTooltipEnabled = false;

// Create series
let series = chart4.series.push(new am4charts.ColumnSeries());
series.sequencedInterpolation = true;
series.dataFields.valueY = "visits";
series.dataFields.categoryX = "country";
series.tooltipText = "[{categoryX}: bold]{valueY}[/]";
series.columns.template.strokeWidth = 0;

series.tooltip.pointerOrientation = "vertical";

series.columns.template.column.cornerRadiusTopLeft = 10;
series.columns.template.column.cornerRadiusTopRight = 10;
series.columns.template.column.fillOpacity = 0.8;

// on hover, make corner radiuses bigger
let hoverState = series.columns.template.column.states.create("hover");
hoverState.properties.cornerRadiusTopLeft = 0;
hoverState.properties.cornerRadiusTopRight = 0;
hoverState.properties.fillOpacity = 1;

series.columns.template.adapter.add("fill", function(fill, target) {
  return chart4.colors.getIndex(target.dataItem.index);
})


let paretoValueAxis = chart4.yAxes.push(new am4charts.ValueAxis());
paretoValueAxis.renderer.opposite = true;
paretoValueAxis.min = 0;
paretoValueAxis.max = 100;
paretoValueAxis.strictMinMax = true;
paretoValueAxis.renderer.grid.template.disabled = true;
paretoValueAxis.numberFormatter = new am4core.NumberFormatter();
paretoValueAxis.numberFormatter.numberFormat = "#'%'"
paretoValueAxis.cursorTooltipEnabled = false;

let paretoSeries = chart4.series.push(new am4charts.LineSeries())
paretoSeries.dataFields.valueY = "pareto";
paretoSeries.dataFields.categoryX = "country";
paretoSeries.yAxis = paretoValueAxis;
paretoSeries.tooltipText = "pareto: {valueY.formatNumber('#.0')}%[/]";
paretoSeries.bullets.push(new am4charts.CircleBullet());
paretoSeries.strokeWidth = 2;
paretoSeries.stroke = new am4core.InterfaceColorSet().getFor("alternativeBackground");
paretoSeries.strokeOpacity = 0.5;

// Cursor
chart4.cursor = new am4charts.XYCursor();
chart4.cursor.behavior = "panX";


// -------------------------- 5 chart----------------------------------

let chart = am4core.create("chartdiv", am4charts.PieChart);

chart.data = [ {
  "contract": "Project 1",
  "ratio": 20
}, {
  "contract": "Project 2",
  "ratio": 60
}, {
  "contract": "Project 3",
  "ratio": 40
}
];

// Add and configure Series
let pieSeries3 = chart.series.push(new am4charts.PieSeries());
pieSeries3.dataFields.value = "ratio";
pieSeries3.dataFields.category = "contract";
pieSeries3.ticks.template.disabled = true;
pieSeries3.alignLabels = false;
pieSeries3.labels.template.text = "{value.percent.formatNumber('#.0')}%";
pieSeries3.labels.template.radius = am4core.percent(-40);
pieSeries3.labels.template.fill = am4core.color("white");
pieSeries3.slices.template.stroke = am4core.color("#fff");
pieSeries3.slices.template.strokeOpacity = 1;

// This creates initial animation
pieSeries3.hiddenState.properties.opacity = 1;
pieSeries3.hiddenState.properties.endAngle = -90;
pieSeries3.hiddenState.properties.startAngle = -90;

chart.hiddenState.properties.radius = am4core.percent(0);

chart.legend = new am4charts.Legend();



  }
}
