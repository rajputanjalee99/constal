import { Component, OnInit } from '@angular/core';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import { Service } from '../service/service.service';
import { Router } from '@angular/router';

declare var $;
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-talent-dashboard',
  templateUrl: './talent-dashboard.component.html',
  styleUrls: ['./talent-dashboard.component.scss']
})
export class TalentDashboardComponent implements OnInit {
  
	clients_slider: OwlOptions = {
        loop: true,
        mouseDrag: true,
        touchDrag: true,
        pullDrag: true,
        dots: true,
        navSpeed: 700,
        margin: 10,
        nav: false,
        center: true,
        autoplay: false,
        navText: ['<i class="fas fa-angle-left"></i>', '<i class="fas fa-angle-right"></i>'],
        responsive: {
          0: {
            items: 1
          },
          400: {
            items: 2
          },
          740: {
            items: 3
          },
          940: {
            items: 5
          }
        },
    }

  constructor( public _service : Service,private router : Router) { }

  ngOnInit(): void {

    
    this.getUserProfile();

am4core.useTheme(am4themes_animated);
// -----------------------------chart 1-------------------------------
let chart = am4core.create("chartdiv", am4charts.XYChart);

// Add data
chart.data = [{
  "year": "1930",
  "italy": 1,
  "germany": 5,
  "uk": 3
}, {
  "year": "1934",
  "italy": 1,
  "germany": 2,
  "uk": 6
}, {
  "year": "1938",
  "italy": 2,
  "germany": 3,
  "uk": 1
}, {
  "year": "1950",
  "italy": 3,
  "germany": 4,
  "uk": 1
}, {
  "year": "1954",
  "italy": 5,
  "germany": 1,
  "uk": 2
}, {
  "year": "1958",
  "italy": 3,
  "germany": 2,
  "uk": 1
}, {
  "year": "1962",
  "italy": 1,
  "germany": 2,
  "uk": 3
}, {
  "year": "1966",
  "italy": 2,
  "germany": 1,
  "uk": 5
}, {
  "year": "1970",
  "italy": 3,
  "germany": 5,
  "uk": 2
}, {
  "year": "1974",
  "italy": 4,
  "germany": 3,
  "uk": 6
}, {
  "year": "1978",
  "italy": 1,
  "germany": 2,
  "uk": 4
}];

// Create category axis
let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
categoryAxis.dataFields.category = "year";
categoryAxis.renderer.opposite = true;

// Create value axis
let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
valueAxis.renderer.inversed = true;
valueAxis.title.text = "Place taken";
valueAxis.renderer.minLabelPosition = 0.01;

// Create series
let series1 = chart.series.push(new am4charts.LineSeries());
series1.dataFields.valueY = "italy";
series1.dataFields.categoryX = "year";
series1.name = "Italy";
series1.bullets.push(new am4charts.CircleBullet());
series1.tooltipText = "Place taken by {name} in {categoryX}: {valueY}";
series1.legendSettings.valueText = "{valueY}";
series1.visible  = false;

let series2 = chart.series.push(new am4charts.LineSeries());
series2.dataFields.valueY = "germany";
series2.dataFields.categoryX = "year";
series2.name = 'Germany';
series2.bullets.push(new am4charts.CircleBullet());
series2.tooltipText = "Place taken by {name} in {categoryX}: {valueY}";
series2.legendSettings.valueText = "{valueY}";

let series3 = chart.series.push(new am4charts.LineSeries());
series3.dataFields.valueY = "uk";
series3.dataFields.categoryX = "year";
series3.name = 'United Kingdom';
series3.bullets.push(new am4charts.CircleBullet());
series3.tooltipText = "Place taken by {name} in {categoryX}: {valueY}";
series3.legendSettings.valueText = "{valueY}";

// Add chart cursor
chart.cursor = new am4charts.XYCursor();
chart.cursor.behavior = "zoomY";


let hs1 = series1.segments.template.states.create("hover")
hs1.properties.strokeWidth = 5;
series1.segments.template.strokeWidth = 1;

let hs2 = series2.segments.template.states.create("hover")
hs2.properties.strokeWidth = 5;
series2.segments.template.strokeWidth = 1;

let hs3 = series3.segments.template.states.create("hover")
hs3.properties.strokeWidth = 5;
series3.segments.template.strokeWidth = 1;

// Add legend
// chart.legend = new am4charts.Legend();
// chart.legend.itemContainers.template.events.on("over", function(event){
//   let segments = event.target.dataItem.dataContext.segments;
//   segments.each(function(segment){
//     segment.isHover = true;
//   })
// })

// chart.legend.itemContainers.template.events.on("out", function(event){
//   let segments = event.target.dataItem.dataContext.segments;
//   segments.each(function(segment){
//     segment.isHover = false;
//   })
// })


  	// ---------------------------------4 chart----------------------

let chart4 = am4core.create("chartdiv4", am4charts.XYChart);
chart4.scrollbarX = new am4core.Scrollbar();

// Add data
chart4.data = [{
  "country": "Structure",
  "visits": 1882
}, {
  "country": "Expert",
  "visits": 1809
}, {
  "country": "Claims",
  "visits": 1122
}
];

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
let categoryAxis1 = chart4.xAxes.push(new am4charts.CategoryAxis());
categoryAxis1.dataFields.category = "country";
categoryAxis1.renderer.grid.template.location = 0;
categoryAxis1.renderer.minGridDistance = 60;
categoryAxis1.tooltip.disabled = true;

let valueAxis1 = chart4.yAxes.push(new am4charts.ValueAxis());
valueAxis1.renderer.minWidth = 50;
valueAxis1.min = 0;
valueAxis1.cursorTooltipEnabled = false;

// Create series
let series4 = chart4.series.push(new am4charts.ColumnSeries());
series4.sequencedInterpolation = true;
series4.dataFields.valueY = "visits";
series4.dataFields.categoryX = "country";
series4.tooltipText = "[{categoryX}: bold]{valueY}[/]";
series4.columns.template.strokeWidth = 0;

series4.tooltip.pointerOrientation = "vertical";

series4.columns.template.column.cornerRadiusTopLeft = 10;
series4.columns.template.column.cornerRadiusTopRight = 10;
series4.columns.template.column.fillOpacity = 0.8;

// on hover, make corner radiuses bigger
let hoverState = series4.columns.template.column.states.create("hover");
hoverState.properties.cornerRadiusTopLeft = 0;
hoverState.properties.cornerRadiusTopRight = 0;
hoverState.properties.fillOpacity = 1;

series4.columns.template.adapter.add("fill", function(fill, target) {
  return chart4.colors.getIndex(target.dataItem.index);
})


let paretoValueAxis1 = chart4.yAxes.push(new am4charts.ValueAxis());
paretoValueAxis1.renderer.opposite = true;
paretoValueAxis1.min = 0;
paretoValueAxis1.max = 100;
paretoValueAxis1.strictMinMax = true;
paretoValueAxis1.renderer.grid.template.disabled = true;
paretoValueAxis1.numberFormatter = new am4core.NumberFormatter();
paretoValueAxis1.numberFormatter.numberFormat = "#'%'"
paretoValueAxis1.cursorTooltipEnabled = false;

let paretoSeries1 = chart4.series.push(new am4charts.LineSeries())
paretoSeries1.dataFields.valueY = "pareto";
paretoSeries1.dataFields.categoryX = "country";
paretoSeries1.yAxis = paretoValueAxis1;
paretoSeries1.tooltipText = "pareto: {valueY.formatNumber('#.0')}%[/]";
paretoSeries1.bullets.push(new am4charts.CircleBullet());
paretoSeries1.strokeWidth = 2;
paretoSeries1.stroke = new am4core.InterfaceColorSet().getFor("alternativeBackground");
paretoSeries1.strokeOpacity = 0.5;

// Cursor
chart4.cursor = new am4charts.XYCursor();
chart4.cursor.behavior = "panX";

// -------------------------------------chart--------------------------------------
  }

  getUserProfile(){
    this._service.getUserProfile().subscribe(async res => {
      console.log(res);
      console.log("user profile resp =============== ",res)
      if(res.profile && res.profile.admin_profile_status && res.profile.admin_profile_status=="pending"){
        $('.restrctd_modal').modal('show');
      }else if(res.profile && res.profile.admin_profile_status && res.profile.admin_profile_status=="rejected"){
        $('.ops_modal').modal('show');
      }else{
        $('.restrctd_modal').modal('hide');
      }
    },(err) => {
      this._service.handleError(err)
      console.log(err)
    })
  }

  logout(){
    localStorage.clear();
    $('.restrctd_modal').modal('hide');
    this.router.navigate(['talent-login']);
  }

  updateProfile(){
    $('.ops_modal').modal('hide');
    this.router.navigate(['profile-settings']);
  }

}
