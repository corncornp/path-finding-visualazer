export const environment = {
	production: true,
	apiUrl: 'http://localhost: 4200',
	button: {
		excuteButton: {
			excute: 'excute',
			stop: 'stop',
			reset: 'reset'
		},
		algorithms: [
			{ name: "BFS Algo", value: 1 },
			{ name: "DFS Algo", value: 2 },
			{ name: "Dijkstra Algo", value: 3 }
		],
		speeds: [
			{
				name: "Fast",
				speedVisited: 10,
				speedPath: 80
			},
			{
				name: "Medium",
				speedVisited: 30,
				speedPath: 100
			},
			{
				name: "Slow",
				speedVisited: 50,
				speedPath: 120
			}
		],
		configButton: {
			startPoint: {
				title: "Start Point",
				content: "The start point is the beginning point.",
				footer: "Select and place it on any square cell in the grid below."
			},
			finishPoint: {
				title: "Finish Point",
				content: "The finish point is the destination point. The algorithm will find the shortest path from the start point to the finish point.",
				footer: "Select and place it on any square cell in the grid below."
			},
			bomb: {
				title: "Bomb",
				content: "A bomb is an obstacle on the path.",
				footer: "Select and place it on any square cell in the grid below."
			}
		}
	},
	default: {
		speedVisited: 30,
		speedPath: 100,
		start: -1
	}
};
