import { AfterViewInit, Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as ButtonAction from '../../core/store/buttonStore/button.action';
import { environment } from 'src/environments/environment';
import { NotifierService } from 'angular-notifier';
@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.css']
})
export class HeaderComponent implements AfterViewInit {
	configs = {
		speedTitle: "Speed",
		algorithmTitle: "Algorithms"
	};
	speedSelected: any;
	status = '';
	config = {
		isStart: false,
		isFinish: false,
		isBomb: false
	};
	notification: NotifierService;
	point: any = {};
	button$: Observable<any>;
	env = environment;
	constructor(private store: Store<any>,
			notifierService: NotifierService) {
		this.button$ = store.select(state => state);
		this.speedSelected = this.env.default.speedVisited;
		this.notification = notifierService;
		this.watcherButtonState();
	}
	ngAfterViewInit() {
	}

	handleButtonAction() {
		if (Object.values(this.point).some((e: any) => e === this.env.default.start)) {
			this.showNotification('error', 'You must set start point and finish point');
			return;
		}
		let state = {
			checked: true,
			status: ''
		}

		switch (this.status) {
			case 'finding':
				state.status = 'finding'; 
				break;
			case 'start':
				state.status = 'finding';
				this.resetStateButton();
				break;
			case 'done':
				state.status = 'reset'
				break;
			case 'reset':
				state.status = 'start'
				break;
			default:
				break;
		}
		this.store.dispatch(ButtonAction.setExcutionButton(state));
	}

	handleButtonSpeed() {
		const speed = this.env.button.speeds.find(e => e.name === this.configs.speedTitle);
		if (speed) {
			let state = {
				speedVisited: speed.speedVisited,
				speedPath: speed.speedPath
			};
			this.store.dispatch(ButtonAction.setSpeedButton(state));
		}
	}

	handleButtonConfig(state: number) {
		if (this.status === 'finding') {
			return;
		}
		let config = {
			isStart: false,
			isFinish: false,
			isBomb: false
		}
		switch (state) {
			case 1:
				this.config.isStart === false ? config.isStart = true : config.isStart = false;
				this.store.dispatch(ButtonAction.setConfigButton(config));
				break;
			case 2: 
				this.config.isFinish === false ? config.isFinish = true : config.isFinish = false;
				this.store.dispatch(ButtonAction.setConfigButton(config));
				break;
			case 3: 
				this.config.isBomb === false ? config.isBomb = true : config.isBomb = false;
				this.store.dispatch(ButtonAction.setConfigButton(config));
				break;
			default:
				break;
		}
	}

	watcherButtonState() {
		this.button$.subscribe((button) => {
			this.status = button?.button?.status ?? '';
			this.config = button?.buttonConfig ?? {};
			this.point = button?.point ?? {}
		})
	}

	resetStateButton() {
		let config = {
			isStart: false,
			isFinish: false,
			isBomb: false
		}
		this.store.dispatch(ButtonAction.setConfigButton(config));
	}

	showNotification(type: string, message: string): void {
		this.notification.notify(type, message);
	}
}


