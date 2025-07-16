import { Component, OnInit } from '@angular/core';
import { Options } from '@angular-slider/ngx-slider';
// interface Food {
//   value: string;
//   viewValue: string;
// }

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {
  value: number = 30;
  options: Options = {
    floor: 0,
    ceil: 80,
    // step: 10,
    // showTicks: true,
    // showTicksValues: true,
    // stepsArray: [
    //   { value: 0, },
    //   { value: 800,legend: "$"}
      
    // ]
    translate: (value: number): string => {
      if(value==80){
      return value+"$";
      }else{
      return value+"";
      }
      }
  };

  value1: number = 10;
  options1: Options = {
    floor: 0,
    ceil: 30,
    // step: 10,
    // showTicks: true,
    // showTicksValues: true,
    // stepsArray: [
    //   { value: 0, },
    //   { value: 800,legend: "$"}
      
    // ]
  };

  
  
  panelOpenState = false;
  constructor() {}

  ngOnInit(): void {
  }

}



