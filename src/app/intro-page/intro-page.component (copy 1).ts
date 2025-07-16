import { Component, OnInit } from '@angular/core';

declare var $;
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-intro-page',
  templateUrl: './intro-page.component.html',
  styleUrls: ['./intro-page.component.scss']
})
export class IntroPageComponent implements OnInit {



	testimonial_slider: OwlOptions = {
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
	        items: 1
	      },
	      740: {
	        items: 1
	      },
	      940: {
	        items: 1
	      }
	    },
	}

  constructor() { }

  ngOnInit(): void {
  }

}
