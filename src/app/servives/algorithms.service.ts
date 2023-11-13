import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AlgorithmsService {

  constructor() { }

  dijkstra(grid: any, cellStart: any, cellFinish: any): any {
	const visitedCellsInOrder: any[] = [];	
	cellStart.distance = 0;
	const unvisitedCells = this.getAllCells(grid);
	while (!!unvisitedCells.length) {
		this.sortByDistance(unvisitedCells);
		const closestCell = unvisitedCells.shift();
		if (closestCell.isWall === true) {
			continue;
		}
		if (closestCell.distance === Infinity) return visitedCellsInOrder;
		closestCell.isVisited = true;
		visitedCellsInOrder.push(closestCell);
		if (closestCell === cellFinish) return visitedCellsInOrder;
		this.updateUnvisitedNeighbors(closestCell, grid);	
	}
  }

  getAllCells(grid: any) {
	const cells = [];
	for (const row of grid) {
		for (const cell of row) {
			cells.push(cell);
		}
	}
	return cells;
  }

  sortByDistance(unvisitedCells: any) {
	unvisitedCells.sort((cellA: any, cellB: any) => cellA.distance - cellB.distance);
  }

  updateUnvisitedNeighbors(closestCell: any, grid: any) {
	const univistedNeighbors = this.getUnivistedNeighbors(closestCell, grid);
	for (const neighbor of univistedNeighbors) {
		neighbor.distance = closestCell.distance + 1;
		neighbor.previousCell = closestCell;
	}
  }

  getUnivistedNeighbors(cell: any, grid: any) {
	const neighbors = [];
	if (cell.row > 0) neighbors.push(grid[cell.row - 1][cell.column]);
	if (cell.row < grid.length - 1) neighbors.push(grid[cell.row + 1][cell.column]);
	if (cell.column > 0) neighbors.push(grid[cell.row][cell.column - 1]);
	if (cell.column < grid[0].length - 1) neighbors.push(grid[cell.row][cell.column + 1]);
	return neighbors.filter(e => !e.isVisited);
  }

  getShortestPath(finish: any) {
	const shortestPath = [];
	let currentCell = finish;
	while (currentCell !== null) {
		shortestPath.unshift(currentCell);
		currentCell = currentCell.previousCell;
	}
	return shortestPath;
  }
}
