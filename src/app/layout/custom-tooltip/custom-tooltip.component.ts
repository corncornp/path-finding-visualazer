import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-custom-tooltip',
  templateUrl: './custom-tooltip.component.html',
  styleUrls: ['./custom-tooltip.component.css']
})
export class CustomTooltipComponent implements OnInit {
	@Input() title: string = '';
	@Input() content: string = '';
	@Input() footer: string = '';
	@Input() type: number = 0;
	
	ngOnInit(): void {
	}
}
