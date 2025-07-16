import { AfterViewInit, Component, OnInit, ViewChild, Input } from '@angular/core';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import * as am4maps from "@amcharts/amcharts4/maps";
import am4geodata_worldLow from "@amcharts/amcharts4-geodata/worldLow";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import { Service } from '../../service/service.service';
import { environment } from "../../../environments/environment";

import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

// import { MatPaginator, MatSnackBar, MatSort, MatTableDataSource } from '@angular/material';

declare var $ : any
export interface UserData {
  id: string;
  name: string;
  revenue: string;
  type: string;
  admission: string;
  percentage: string;
  bonus: string;
  status: string
}

const ID: string[] = [
  'T1', 'C1'
];
const REVENUE: string[] = [
  '30,000 USD', '12,000 USD', '35,000 USD', '20,000 USD', '52,000 USD'
];
const NAMES: string[] = [
  'Maia', 'Asher', 'Olivia', 'Atticus', 'Amelia', 'Jack', 'Charlotte', 'Theodore', 'Isla', 'Oliver',
  'Isabella', 'Jasper', 'Cora', 'Levi', 'Violet', 'Arthur', 'Mia', 'Thomas', 'Elizabeth'
];
const TYPE: string[] = [
  'Talent', 'Client'
];
const ADMISSION: string[] = [
  '24-05-2021', '03-06-2021'
];
const PERCENTAGE: string[] = [
  '1.5% ', '3%'
];
const BONUS: string[] = [
  '500 USD', '780 USD'
];
const STATUS: string[] = [
  'Collected', 'Released', 'Pending', 'In Escrow'
];
@Component({
  selector: 'app-referral-db',
  templateUrl: './referral-db.component.html',
  styleUrls: ['./referral-db.component.scss']
})
export class ReferralDbComponent implements OnInit {

  talentCountToDiscipline = []
  list : [] = []
  talentCategory = []
  talentCount = 0;
  clientCount = 0;
  isLoading = false
  reqData = {
    offset : 0,
    limit : 10
  }
  datamodel
  currentPage
  currentIndex
  length
  filterValue
  displayedColumns: string[] = ['position', 'name', 'type', 'expected_project_revenue', 'admission_date', 'bonus_percentage', 'expected_bonus', 'status'];
  dataSource: any
  responseData = []
  search : any
  searchkey: any

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  @Input()
  referCode: any
  referCodeUrl: any
  referFbCode: any
  referLinkedInCode: any
  referTwitterCode: any
  referWhatsAppCode: any

  // displayedColumns: string[] = ['id', 'name', 'revenue', 'type', 'admission', 'percentage', 'bonus', 'status'];
  // dataSource: MatTableDataSource<UserData>;

  // @ViewChild(MatPaginator) paginator: MatPaginator;
  // @ViewChild(MatSort) sort: MatSort;

  constructor(public _service : Service) {
    // Create 100 users
    const users = Array.from({length: 100}, (_, k) => createNewUser(k + 1));

    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(users);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  // applyFilter(event: Event) {
  //   const filterValue = (event.target as HTMLInputElement).value;
  //   this.dataSource.filter = filterValue.trim().toLowerCase();

  //   if (this.dataSource.paginator) {
  //     this.dataSource.paginator.firstPage();
  //   }
  // }

  applyFilter(event: Event) {
      this.searchkey = (event.target as HTMLInputElement).value;
          this.reqData.offset = 0,
      this.getReferredUsersPagination() 
  }

  ngOnInit(): void {

    $(".mdl-hover").hover(function() {
      $(this).closest('.tst').find('.comn-modal').addClass('show-popup');
    }, function() {
      $(this).closest('.tst').find('.comn-modal').removeClass('show-popup');
    });

    // $("#link-modal").modal('show');
    this.getUserProfile();
    
    this.currentPage = 10
    this.currentIndex = 0
    // this.reqData = {}
    this.reqData.offset = 0
    this.reqData.limit = 10
    this.dataSource = new MatTableDataSource(this.responseData);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.datamodel = {}
    this.getReferredUsersPagination();
    this.getReferredUsersData();
    this.getTalentCountToDiscipline();
    // this.getDisciplineList();

    this.isLoading = true;

      // ------------------chart 1---------------------------
    am4core.useTheme(am4themes_animated);
    // --------------------------2nd chart-------------------------

        // Create chart instance
        let chart2 = am4core.create("chartdiv2", am4charts.PieChart);

        // Add data
        chart2.data = [ 
        {
          "contract": "C1",
          "ratio": 30
        }, 
        {
          "contract": "C2",
          "ratio": 25
        }, {
          "contract": "C3",
          "ratio": 15
        }, {
          "contract": "C4",
          "ratio": 30
        }
        ];

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

        pieSeries2.colors.list = [
        am4core.color("#0000ff"),
        am4core.color("#6f6fff"),
        am4core.color("#4646ff"),
        am4core.color("#9898ff"),
      ];

        // This creates initial animation
        pieSeries2.hiddenState.properties.opacity = 1;
        pieSeries2.hiddenState.properties.endAngle = -90;
        pieSeries2.hiddenState.properties.startAngle = -90;

        chart2.hiddenState.properties.radius = am4core.percent(0);

        chart2.legend = new am4charts.Legend();
        chart2.legend.position = "top";
        chart2.legend.valueLabels.template.text = "{value.value}";
        chart2.legend.valueLabels.template.disabled = true;



        // ----------------------------------3 chart-----------------------------
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
              // "color":colorSet.next()
              // "fill": am4core.color("#F05C5C")
              "color": '#00983A'
            }, {
              "title": "Copenhagen",
              "latitude": 55.6763,
              "longitude": 12.5681,
              // "color":colorSet.next()
              "color": '#0000ff'
            }, {
              "title": "Paris",
              "latitude": 48.8567,
              "longitude": 2.3510,
              // "color":colorSet.next()
              "color": '#00983A'
            }, {
              "title": "Reykjavik",
              "latitude": 64.1353,
              "longitude": -21.8952,
              // "color":colorSet.next()
              "color": '#0000ff'
            }, {
              "title": "Moscow",
              "latitude": 55.7558,
              "longitude": 37.6176,
              // "color":colorSet.next()
              "color": '#00983A'
            }, {
              "title": "Madrid",
              "latitude": 40.4167,
              "longitude": -3.7033,
              // "color":colorSet.next()
              "color": '#0000ff'
            }, {
              "title": "London",
              "latitude": 51.5002,
              "longitude": -0.1262,
              "url": "http://www.google.co.uk",
              // "color":colorSet.next()
              "color": '#00983A'
            }, {
              "title": "Peking",
              "latitude": 39.9056,
              "longitude": 116.3958,
              // "color":colorSet.next()
              "color": '#0000ff'
            }, {
              "title": "New Delhi",
              "latitude": 28.6353,
              "longitude": 77.2250,
              // "color":colorSet.next()
              "color": '#00983A'
            }, {
              "title": "Tokyo",
              "latitude": 35.6785,
              "longitude": 139.6823,
              "url": "http://www.google.co.jp",
              // "color":colorSet.next()
              "color": '#0000ff'
            }, {
              "title": "Ankara",
              "latitude": 39.9439,
              "longitude": 32.8560,
              // "color":colorSet.next()
              "color": '#00983A'
            }, {
              "title": "Buenos Aires",
              "latitude": -34.6118,
              "longitude": -58.4173,
              // "color":colorSet.next()
              "color": '#0000ff'
            }, {
              "title": "Brasilia",
              "latitude": -15.7801,
              "longitude": -47.9292,
              // "color":colorSet.next()
              "color": '#00983A'
            }, {
              "title": "Ottawa",
              "latitude": 45.4235,
              "longitude": -75.6979,
              // "color":colorSet.next()
              "color": '#0000ff'
            }, {
              "title": "Washington",
              "latitude": 38.8921,
              "longitude": -77.0241,
              // "color":colorSet.next()
              "color": '#00983A'
            }, {
              "title": "Kinshasa",
              "latitude": -4.3369,
              "longitude": 15.3271,
              // "color":colorSet.next()
              "color": '#0000ff'
            }, {
              "title": "Cairo",
              "latitude": 30.0571,
              "longitude": 31.2272,
              // "color":colorSet.next()
              "color": '#00983A'
            }, {
              "title": "Pretoria",
              "latitude": -25.7463,
              "longitude": 28.1876,
              // "color":colorSet.next()
              "color": '#0000ff'
            } ];

            // chart3.legend = new am4maps.Legend();

    
    




    // -------------------------- 5 chart----------------------------------

    let chart = am4core.create("chartdiv", am4charts.PieChart);

    chart.data = [ 
    {
      "contract": "T1",
      "ratio": 20
    }, {
      "contract": "T2",
      "ratio": 35
    }, {
      "contract": "T3",
      "ratio": 25
    }, {
      "contract": "T4",
      "ratio": 20
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

    pieSeries3.colors.list = [
      am4core.color("#00983A"),
      am4core.color("#28a94a"),
      am4core.color("#32ac61"),
      am4core.color("#278b3e"),
    ];

    // This creates initial animation
    pieSeries3.hiddenState.properties.opacity = 1;
    pieSeries3.hiddenState.properties.endAngle = -90;
    pieSeries3.hiddenState.properties.startAngle = -90;

    chart.hiddenState.properties.radius = am4core.percent(0);

    chart.legend = new am4charts.Legend();
    chart.legend.position = "top";
    chart.legend.valueLabels.template.text = "{value.value}";
    chart.legend.valueLabels.template.disabled = true;



    // --------------------------talents chart-------------------------
    // Create chart instance
    let chartT = am4core.create("talents", am4charts.PieChart);
    // Add data
    chartT.data = [ 
    {
      "contract": "Active",
      "ratio": 0
    }, 
    {
      "contract": "Non-Active",
      "ratio": 100
    }
    ];

    // Add and configure Series
    let pieSeriesT = chartT.series.push(new am4charts.PieSeries());
    pieSeriesT.dataFields.value = "ratio";
    pieSeriesT.dataFields.category = "contract";
    pieSeriesT.ticks.template.disabled = true;
    pieSeriesT.alignLabels = false;
    pieSeriesT.labels.template.text = "{value.percent.formatNumber('#.0')}%";
    pieSeriesT.labels.template.radius = am4core.percent(-40);
    pieSeriesT.labels.template.fill = am4core.color("white");
    pieSeriesT.slices.template.stroke = am4core.color("#fff");
    pieSeriesT.slices.template.strokeOpacity = 1;
    pieSeriesT.colors.list = [
      am4core.color("#00983A"),
      am4core.color("#28a94a"),
      am4core.color("#32ac61"),
      am4core.color("#278b3e"),
    ];

    // This creates initial animation
    pieSeriesT.hiddenState.properties.opacity = 1;
    pieSeriesT.hiddenState.properties.endAngle = -90;
    pieSeriesT.hiddenState.properties.startAngle = -90;

    chartT.hiddenState.properties.radius = am4core.percent(0);

    chartT.legend = new am4charts.Legend();
    chartT.legend.position = "top";
    chartT.legend.valueLabels.template.text = "{value.value}";
    chartT.legend.valueLabels.template.disabled = true;
    // chartT.legend.text = "{value.value}";

    // --------------------------Clients chart-------------------------
    // Create chart instance
    let chartC = am4core.create("clients", am4charts.PieChart);

    // Add data
    chartC.data = [ 
    {
      "contract": "Active",
      "ratio": 1
    }, 
    {
      "contract": "Non-Active",
      "ratio": 0
    }
    ];

    // Add and configure Series
    let pieSeriesC = chartC.series.push(new am4charts.PieSeries());
    pieSeriesC.dataFields.value = "ratio";
    pieSeriesC.dataFields.category = "contract";
    pieSeriesC.ticks.template.disabled = true;
    pieSeriesC.alignLabels = false;
    pieSeriesC.labels.template.text = "{value.percent.formatNumber('#.0')}%";
    pieSeriesC.labels.template.radius = am4core.percent(-40);
    pieSeriesC.labels.template.fill = am4core.color("white");
    pieSeriesC.slices.template.stroke = am4core.color("#fff");
    pieSeriesC.slices.template.strokeOpacity = 1;

    pieSeriesC.colors.list = [
      am4core.color("#0000ff"),
      am4core.color("#6f6fff"),
      am4core.color("#4646ff"),
      am4core.color("#9898ff"),
    ];

    // This creates initial animation
    pieSeriesC.hiddenState.properties.opacity = 1;
    pieSeriesC.hiddenState.properties.endAngle = -90;
    pieSeriesC.hiddenState.properties.startAngle = -90;

    chartC.hiddenState.properties.radius = am4core.percent(0);

    chartC.legend = new am4charts.Legend();
    chartC.legend.position = "top";
    chartC.legend.valueLabels.template.text = "{value.value}";
    chartC.legend.valueLabels.template.disabled = true;

    // --------------------------development target chart-------------------------
      // Create chart instance
      let chartD = am4core.create("chartdivD", am4charts.PieChart);
      // Add data
      chartD.data = [ {
        "country": "Talents",
        "litres": 40000
      }, {
        "country": "Clients",
        "litres": 60000
      } ];

      // Set inner radius
      chartD.innerRadius = am4core.percent(50);

      // chartD.innerRadius = 150;
      let label = chartD.seriesContainer.createChild(am4core.Label);
      label.text = "100,000 USD";
      label.horizontalCenter = "middle";
      label.verticalCenter = "middle";
      label.fontSize = 12;

      // Add and configure Series
      let pieSeries = chartD.series.push(new am4charts.PieSeries());
      pieSeries.dataFields.value = "litres";
      pieSeries.dataFields.category = "country";
      pieSeries.slices.template.stroke = am4core.color("#fff");
      pieSeries.slices.template.strokeWidth = 1;
      pieSeries.slices.template.strokeOpacity = 1;
      // pieSeries.dataFields.hidden = "hidden";
      pieSeries.tooltip.disabled = true;

      // This creates initial animation
      pieSeries.hiddenState.properties.opacity = 1;
      pieSeries.hiddenState.properties.endAngle = -90;
      pieSeries.hiddenState.properties.startAngle = -90;

      chartD.hiddenState.properties.radius = am4core.percent(0);


      // ----------------------------progress chart---------------------------------
      let chartP = am4core.create("chartdivp", am4charts.PieChart);
      // Let's cut a hole in our Pie chart the size of 40% the radius
    chartP.innerRadius = am4core.percent(40);



    // Add and configure Series
    let pieSeriesP = chartP.series.push(new am4charts.PieSeries());
    pieSeriesP.dataFields.value = "value";
    pieSeriesP.dataFields.category = "category";
    pieSeriesP.slices.template.stroke = am4core.color("#fff");
    pieSeriesP.innerRadius = 10;
    pieSeriesP.slices.template.fillOpacity = 0.5;

    pieSeriesP.slices.template.propertyFields.disabled = "labelDisabled";
    pieSeriesP.labels.template.propertyFields.disabled = "labelDisabled";
    pieSeriesP.ticks.template.propertyFields.disabled = "labelDisabled";


    // Add data
    pieSeriesP.data = [{
      "category": "First + Second",
      "value": 60
    }, {
      "category": "Unused",
      "value": 30,
      "labelDisabled":true
    }];

    // Disable sliding out of slices
    pieSeriesP.slices.template.states.getKey("hover").properties.shiftRadius = 0;
    pieSeriesP.slices.template.states.getKey("hover").properties.scale = 1;

    // Add second series
    let pieSeries6 = chartP.series.push(new am4charts.PieSeries());
    pieSeries6.dataFields.value = "value";
    pieSeries6.dataFields.category = "category";
    pieSeries6.slices.template.states.getKey("hover").properties.shiftRadius = 0;
    pieSeries6.slices.template.states.getKey("hover").properties.scale = 1;
    pieSeries6.slices.template.propertyFields.fill = "fill";

    // Add data
    pieSeries6.data = [{
      "category": "First",
      "value": 30
    }, {
      "category": "Second",
      "value": 30
    }, {
      "category": "Remaining",
      "value": 30,
      "fill":"#dedede"
    }];


    pieSeriesP.adapter.add("innerRadius", function(innerRadius, target){
      return am4core.percent(40);
    })

    pieSeries6.adapter.add("innerRadius", function(innerRadius, target){
      return am4core.percent(60);
    })

    pieSeriesP.adapter.add("radius", function(innerRadius, target){
      return am4core.percent(100);
    })

    pieSeries6.adapter.add("radius", function(innerRadius, target){
      return am4core.percent(80);
    })

  }

  /* To copy any Text */
  copyText(val: string){
    console.log("text copp ===")
    let selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = val;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
  }

  copyInputMessage(inputElement){
    inputElement.select();
    document.execCommand('copy');
    inputElement.setSelectionRange(0, 0);
    return this._service.showErrorMessage({ message : "Link copied", action : "Okay"})
  }

  public notify(event: string): void {
    // let message = `'${event}' has been copied to clipboard`
    // console.log(message);
  }

  public stamp(): string {
    let now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();
    return `time (${hours}:${minutes}:${seconds})`;
  }

  generateReferralCode(type){
    console.log("code type ========== ",environment.SERVER_WEB_URL)
    const obj = {};
    this._service.generateReferralCode(obj).subscribe(async res => {
      console.log("code resp =========== ",res);
      if(res.data && res.data.code){
        if(type=="client"){
          this.referCode = environment.SERVER_WEB_URL+"sign-up-user-email/referral/"+res.data.code;
          this.referFbCode = environment.SHARE_FB_URL+environment.SERVER_WEB_URL+"sign-up-user-email/referral/"+res.data.code;
          this.referLinkedInCode = environment.SHARE_LINKEDIN_URL+environment.SERVER_WEB_URL+"sign-up-user-email/referral/"+res.data.code;
          this.referWhatsAppCode = environment.SHARE_WHATSAPP_URL+environment.SERVER_WEB_URL+"sign-up-user-email/referral/"+res.data.code;
        }else{
          this.referCode = environment.SERVER_WEB_URL+"signup-talent-user/referral/"+res.data.code;
          this.referFbCode = environment.SHARE_FB_URL+environment.SERVER_WEB_URL+"signup-talent-user/referral/"+res.data.code;
          this.referLinkedInCode = environment.SHARE_LINKEDIN_URL+environment.SERVER_WEB_URL+"signup-talent-user/referral/"+res.data.code;
          this.referWhatsAppCode = environment.SHARE_WHATSAPP_URL+environment.SERVER_WEB_URL+"signup-talent-user/referral/"+res.data.code;
        }
        console.log("ref code url ================ ",this.referCode);
        console.log("ref fb code url ================ ",this.referFbCode);
        console.log("ref linkedin code url ================ ",this.referLinkedInCode);
        // this.referCode = res.data.code;
        $('#refer_talent').modal('show');
      }else{
        this.referCode = "";
        this.referFbCode = "";
        this.referLinkedInCode = "";
        $('#refer_talent').modal('hide');
      }
    },(err) => {
      this._service.handleError(err)
      console.log(err)
    })
  }

  getReferredUsersPagination(){
    var obj = {
      limit: this.reqData.limit,
      offset: this.reqData.offset,
      search: this.searchkey
    }

    this._service.getReferredUsersPagination(obj).subscribe( data => {
      console.log("referral data ========== : ",data);
      this.dataSource = data.list;
      this.length = data.count;
    },err => {
      console.log("Error: ",err);
    })
  }

  getReferredUsersData(){
    var obj = {
      limit: this.reqData.limit,
      offset: this.reqData.offset,
      search: this.searchkey
    }
    this._service.getReferredUsersPagination(obj).subscribe( data => {
      this.isLoading = false
      if(this.length>=0){
        this.talentCount = data.talent_count;
        this.clientCount = data.client_count;
        // this.generateReferralCodeForModal("client");
        // this.generateReferralCodeForModal("talent");
        // $("#link-modal").modal('show');
      }else{
        // alert('else');
      }
    },err => {
      console.log("Error: ",err);
    })
  }

  generateReferralCodeForModal(type){
    console.log("code type ========== ",environment.SERVER_WEB_URL)
    // alert(type);
    const obj = {};
    this._service.generateReferralCode(obj).subscribe(async res => {
      console.log("code resp =========== ",res);
      if(res.data && res.data.code){
        if(type=="client"){
          this.referCode = environment.SERVER_WEB_URL+"sign-up-user-email/referral/"+res.data.code;
          this.referWhatsAppCode = environment.SHARE_WHATSAPP_URL+environment.SERVER_WEB_URL+"sign-up-user-email/referral/"+res.data.code;
          this.referTwitterCode = environment.SHARE_TWITTER_URL+environment.SERVER_WEB_URL+"sign-up-user-email/referral/"+res.data.code;
          this.referFbCode = environment.SHARE_FB_URL+environment.SERVER_WEB_URL+"sign-up-user-email/referral/"+res.data.code;
          this.referLinkedInCode = environment.SHARE_LINKEDIN_URL+environment.SERVER_WEB_URL+"sign-up-user-email/referral/"+res.data.code;
        }else{
          this.referCode = environment.SERVER_WEB_URL+"signup-talent-user/referral/"+res.data.code;
          this.referWhatsAppCode = environment.SHARE_WHATSAPP_URL+environment.SERVER_WEB_URL+"signup-talent-user/referral/"+res.data.code;
          this.referTwitterCode = environment.SHARE_TWITTER_URL+environment.SERVER_WEB_URL+"signup-talent-user/referral/"+res.data.code;
          this.referFbCode = environment.SHARE_FB_URL+environment.SERVER_WEB_URL+"signup-talent-user/referral/"+res.data.code;
          this.referLinkedInCode = environment.SHARE_LINKEDIN_URL+environment.SERVER_WEB_URL+"signup-talent-user/referral/"+res.data.code;
        }
        console.log("ref code url ================ ",this.referCode);
        console.log("ref fb code url ================ ",this.referFbCode);
        console.log("ref linkedin code url ================ ",this.referLinkedInCode);
        // this.referCode = res.data.code;
        // $('#refer_talent').modal('show');
      }else{
        this.referCode = "";
        this.referFbCode = "";
        this.referLinkedInCode = "";
        // $('#refer_talent').modal('hide');
      }
    },(err) => {
      this._service.handleError(err)
      console.log(err)
    })
  }

  onChangeMatTab(event) {
    console.log("event ========== ",event.tab.textLabel)
    const tab = event.tab.textLabel;
    if(tab==="Refer Talents"){
      this.generateReferralCodeForModal("talent");
    }else{
      this.generateReferralCodeForModal("client");
    }

  }

  // modalBand(){
  //   $("#link-modal").modal('hide');
  // }

  paginationOptionChange(evt) {
    this.reqData.offset = (evt.pageIndex * evt.pageSize)
    this.reqData.limit = evt.pageSize
    this.currentPage = evt.pageSize
    this.currentIndex = evt.pageIndex

    this.getReferredUsersPagination();
    return
    var obj = {
      offset: this.reqData.offset,
      limit: this.reqData.limit
    }
    this._service.getReferredUsersPagination(obj).subscribe(res => {
      if (res) {
        this.length = res.count;
        this.dataSource = res.data;
        if (this.filterValue) {
          this.dataSource.filter = this.filterValue
        }
        console.log('dataSource', this.dataSource);
      }
    }, err => {
      console.log(err);
      if (err.status >= 400) {
        console.log('Invalid Credential!!!');
      } else {
        console.log('Internet Connection Error');
      }
    })
  }

  getPageSizeOptions() {
    return [10, 20, 30];
  }

  getUserProfile(){
    this._service.getUserProfile().subscribe(async res => {
      this.isLoading = false 
      
      // this._service.profile = res.profile;
      // console.log("profile resp ============== ",res)
      if(res.profile && res.profile.statusFlags && !res.profile.statusFlags.logged){
        // alert("already logged");
        this.generateReferralCodeForModal("talent");
        $("#link-modal").modal('show');
      }else{
        // alert("not logged");
      }
      

    },(err) => {
      this.isLoading = false
      this._service.handleError(err)
      console.log(err)
    })
  }

  talentCategories(){
    this._service.talentCategories().subscribe(async res => {
      console.log("talent categories =============== ",res)
      this.talentCategory = res.categories
      
    },(err) => {
      this._service.handleError(err)
      //this.isLoading = false
    })
  }

  getTalentCountToDiscipline(){
    var obj = {
      
    }
    this._service.getTalentCountToDiscipline(obj).subscribe( res => {
      this.isLoading = false
      console.log("disc talent ============= ",res)
      this.talentCountToDiscipline = res.data;
      this.getDisciplineList();
    },err => {
      console.log("Error: ",err);
    })
  }

  getDisciplineList(){
    this._service.getDisciplineList().subscribe(async res => {
      this.isLoading = false 
      this.list = res.list;
      // this.list = res.list.map((item => {
        
      //   return item = {
      //     country : item.discipline,
      //     visits : 10,
      //   }       
      // }))
      console.log("discipline list ============= ",this.list)
      this.callChart4();

    },(err) => {
      this.isLoading = false
      this._service.handleError(err)
      console.log(err)
    })
  }

  callChart4(){
    // ---------------------------------4 chart----------------------

    let chart4 = am4core.create("chartdiv4", am4charts.XYChart);
    chart4.scrollbarX = new am4core.Scrollbar();

    // Add data
    chart4.data = [{
      "country": "Architecture",
      "visits": 1809
    }, {
      "country": "Structure",
      "visits": 1122
    }, {
      "country": "Sustainability",
      "visits": 1114
    },{
      "country": "Planning & Scheduling",
      "visits": 1122
    }, {
      "country": "Claims",
      "visits": 1122
    },
    {
      "country": "BIM",
      "visits": 1122
    }, {
      "country": "QC/QA",
      "visits": 1122
    }
  ];

    // chart4.data = this.list;

    console.log("chart4.data ===================== ",chart4.data)

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


    // let paretoValueAxis = chart4.yAxes.push(new am4charts.ValueAxis());
    // paretoValueAxis.renderer.opposite = true;
    // paretoValueAxis.min = 0;
    // paretoValueAxis.max = 100;
    // paretoValueAxis.strictMinMax = true;
    // paretoValueAxis.renderer.grid.template.disabled = true;
    // paretoValueAxis.numberFormatter = new am4core.NumberFormatter();
    // paretoValueAxis.numberFormatter.numberFormat = "#'%'"
    // paretoValueAxis.cursorTooltipEnabled = false;

    // let paretoSeries = chart4.series.push(new am4charts.LineSeries())
    // paretoSeries.dataFields.valueY = "pareto";
    // paretoSeries.dataFields.categoryX = "country";
    // paretoSeries.yAxis = paretoValueAxis;
    // paretoSeries.tooltipText = "pareto: {valueY.formatNumber('#.0')}%[/]";
    // paretoSeries.bullets.push(new am4charts.CircleBullet());
    // paretoSeries.strokeWidth = 2;
    // paretoSeries.stroke = new am4core.InterfaceColorSet().getFor("alternativeBackground");
    // paretoSeries.strokeOpacity = 0.5;

    // Cursor
    chart4.cursor = new am4charts.XYCursor();
    chart4.cursor.behavior = "panX";
  }
  
  

}

function createNewUser(id: number): UserData {
  const name = NAMES[Math.round(Math.random() * (NAMES.length - 1))] + ' ' +
    NAMES[Math.round(Math.random() * (NAMES.length - 1))].charAt(0) + '.';

  return {
    // id: id.toString(),
    name: name,
    // progress: Math.round(Math.random() * 100).toString(),
    id: ID[Math.round(Math.random() * (ID.length - 1))],
    type: TYPE[Math.round(Math.random() * (TYPE.length - 1))],
    revenue: REVENUE[Math.round(Math.random() * (REVENUE.length - 1))],
    admission: ADMISSION[Math.round(Math.random() * (ADMISSION.length - 1))],
    percentage: PERCENTAGE[Math.round(Math.random() * (PERCENTAGE.length - 1))],
    bonus: BONUS[Math.round(Math.random() * (BONUS.length - 1))],
    status: STATUS[Math.round(Math.random() * (STATUS.length - 1))],
  };
}