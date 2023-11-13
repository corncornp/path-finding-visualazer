import { Observable } from 'rxjs';
import { AlgorithmsService } from '../servives/algorithms.service';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as ButtonAction from '../core/store/buttonStore/button.action';
import { environment } from 'src/environments/environment';
import { NotifierService } from 'angular-notifier';

@Component({
	selector: 'app-path-finding-visualizer',
	templateUrl: './path-finding-visualizer.component.html',
	styleUrls: ['./path-finding-visualizer.component.css']
})
export class PathFindingVisualizerComponent implements OnInit, AfterViewInit {
	isExcute = false;
	speed = {
		speedVisited: 0,
		speedPath: 0
	};
	config = {
		isStart: false,
		isFinish: false,
		isBomb: false
	};
	point: any = {};
	rows = 15;
	columns = 53;
	grid: any[] = [];
	ROW_START = 4;
	COLUMN_START = 4;
	ROW_FINISH = 4;
	COLUMN_FINISH = 30;
	button$: Observable<any>;
	constructor(private store: Store<any>,
		private algorithmsService: AlgorithmsService,
		private notifier: NotifierService) {
		this.button$ = store.select(state => state);
		this.watcherButtonState();
	}
	mouseIsPressed: boolean = false;
	ngOnInit(): void {
		this.prepareGrid();
	}

	ngAfterViewInit(): void {
	}

	watcherButtonState() {
		this.button$.subscribe((button) => {
			this.isExcute = button?.button?.checked ?? false;
			this.speed = {
				speedVisited: button?.buttonSpeed?.speedVisited ?? 0,
				speedPath: button?.buttonSpeed?.speedPath ?? 0
			};
			this.config = {
				isStart: button?.buttonConfig?.isStart ?? false,
				isFinish: button?.buttonConfig?.isFinish ?? false,
				isBomb: button?.buttonConfig?.isBomb ?? false
			}
			this.point = button?.point;
			this.ROW_START = this.point.rStart;
			this.COLUMN_START = this.point.cStart;
			this.ROW_FINISH = this.point.rFinish;
			this.COLUMN_FINISH = this.point.cFinish;
			if (button?.button?.status === 'finding' && this.grid[0][0].distance === Infinity) {
				this.visualizerPathFinding();
			}
			if (button?.button?.status === 'reset') {
				this.resetGrid();
			}
		}
		)
	}

	prepareGrid() {
		const cells = [];
		for (let row = 0; row < this.rows; row++) {
			const currentRow = [];
			for (let column = 0; column < this.columns; column++) {
				const currentCell = this.createCell(row, column);
				currentRow.push(currentCell);
			}
			cells.push(currentRow)
		}

		this.grid = cells;
		this.setPointState({rStart: -1, cStart: -1, rFinish: -1, cFinish: -1});
	}

	createCell(row: any, column: any) {
		return {
			row,
			column,
			isStart: row === this.ROW_START && column === this.COLUMN_START,
			isFinish: row === this.ROW_FINISH && column === this.COLUMN_FINISH,
			distance: Infinity,
			isVisited: false,
			isWall: false,
			isPath: false,
			isAnimate: false,
			previousCell: null
		}
	}

	visualizerPathFinding() {
		const start = this.grid[this.ROW_START][this.COLUMN_START];
		const finish = this.grid[this.ROW_FINISH][this.COLUMN_FINISH];
		const visitedCells = this.algorithmsService.dijkstra(this.grid, start, finish);
		const shortestPath = this.algorithmsService.getShortestPath(finish);
		this.animateVisitedCell(visitedCells, shortestPath);
	}

	animateVisitedCell(visitedCells: any, shortestPath: any) {
		for (let index = 0; index < visitedCells.length; index++) {
			setTimeout(() => {
				if (index === visitedCells.length - 1) {
					this.animateVisitedPath(shortestPath);
				}
				const cell = visitedCells[index];
				const newGrid = this.grid.slice();
				const newCell = {
					...cell,
					isAnimate: true
				};
				newGrid[cell.row][cell.column] = newCell;
				this.grid = newGrid;
			}, this.speed.speedVisited * index);
		}
	}

	animateVisitedPath(path: any) {
		for (let index = 0; index < path.length; index++) {
			setTimeout(() => {
				if (index === path.length - 1) {
					this.stopButtonAction('done');
				}
				const cell = path[index];
				const newGrid = this.grid.slice();
				const newCell = {
					...cell,
					isPath: true,
					isAnimate: true
				};
				newGrid[cell.row][cell.column] = newCell;
				this.grid = newGrid;
			}, this.speed.speedPath * index)
		}
	}

	getNewGridWithWall(grid: any, row: any, column: any) {
		const newGrid = grid.slice();
		const cell = newGrid[row][column];
		const newCell = {
			...cell,
			isWall: !cell.isWall
		};
		newGrid[row][column] = newCell;
		return newGrid;
	}

	resetGrid() {
		this.grid = [];
		this.prepareGrid();
		this.stopButtonAction('start');
	}

	// Solved mouse events
	OnMouseDown(row: any, column: any) {
		if (this.config.isBomb) {
			this.grid = this.getNewGridWithWall(this.grid, row, column);
		}
		if (this.config.isStart) {
			this.setStartPoint(row, column);
		}
		if (this.config.isFinish) {
			this.setFinishPoint(row, column);
		}
	}

	OnMouseEnter(row: any, column: any) {
		if (!this.mouseIsPressed) return;
		const newGrid = this.getNewGridWithWall(this.grid, row, column);
		this.grid = newGrid;
		this.mouseIsPressed = true;
	}

	OnMouseUp() {
		this.mouseIsPressed = false;
	}

	setStartPoint(row: number, col: number) {
		const newGrid = this.grid.slice();
		if (this.point.rStart !== environment.default.start && this.point.cStart !== environment.default.start) {
			newGrid[this.point.rStart][this.point.cStart].isStart = false;
		}
		this.setPointState({...this.point, rStart: row, cStart: col});
		newGrid[this.point.rStart][this.point.cStart].isStart = true;
		this.grid = newGrid;
	}

	setFinishPoint(row: number, col: number) {
		const newGrid = this.grid.slice();
		if (this.point.rFinish !== environment.default.start && this.point.cFinish !== environment.default.start) {
			newGrid[this.point.rFinish][this.point.cFinish].isFinish = false;
		}
		this.setPointState({...this.point, rFinish: row, cFinish: col});
		newGrid[this.point.rFinish][this.point.cFinish].isFinish = true;
		this.grid = newGrid;
	}

	//button state
	stopButtonAction(status: string) {
		let state = {
			checked: false,
			status
		};
		this.store.dispatch(ButtonAction.setExcutionButton(state));
	}

	setPointState(point: any) {
		this.store.dispatch(ButtonAction.setPoint(point));
	}

	//Notify
	showNotification(type: string, message: string): void {
		this.notifier.notify(type, message);
	}
}
