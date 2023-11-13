import { Component, Input, OnInit } from '@angular/core';

const DEFAULT_CELL = {
	column: 0,
	row: 0
}

@Component({
	selector: 'app-cell',
	templateUrl: './cell.component.html',
	styleUrls: ['./cell.component.css']
})

export class CellComponent implements OnInit {
	@Input() cell: any;
	ngOnInit(): void {
	}
}
