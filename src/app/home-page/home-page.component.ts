import { Component, OnInit } from '@angular/core';
declare var $;

import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  talent_slider: OwlOptions = {
	    loop: true,
	    mouseDrag: true,
	    touchDrag: true,
	    pullDrag: true,
	    dots: true,
	    navSpeed: 700,
	    margin: 10,
	    nav: false,
	    center: true,
	    autoplay: true,
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
	        items: 3
	      }
	    },
	}

  constructor() { }

  ngOnInit(): void {
  }

}
