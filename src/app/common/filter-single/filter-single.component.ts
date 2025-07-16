import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-filter-single',
  templateUrl: './filter-single.component.html',
  styleUrls: ['./filter-single.component.scss']
})
export class FilterSingleComponent implements OnInit {

  panelOpenState = false;
  constructor() { }

  ngOnInit(): void {
  }

}
