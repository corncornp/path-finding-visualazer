import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
	title = 'path-finding';
	button$: Observable<any>;
	config = {
		isStart: false,
		isFinish: false,
		isBomb: false
	};
	constructor(
		private store: Store,
		private render: Renderer2,
		private elf: ElementRef
	) {
		this.button$ = store.select(state => state);
		this.watcherButtonState();
	}
	ngOnInit(): void {
	}

	changeMouseIcon() {
		const element = this.elf.nativeElement.parentElement;
		if (this.config.isStart) {
			this.render.addClass(element, 'start-cursor');
		} else {
			this.render.removeClass(element, 'start-cursor');
		}
		if (this.config.isFinish) {
			this.render.addClass(element, 'finish-cursor');
		} else {
			this.render.removeClass(element, 'finish-cursor');
		}
		if (this.config.isBomb) {
			this.render.addClass(element, 'bomb-cursor');
		} else {
			this.render.removeClass(element, 'bomb-cursor');
		}
	}

	watcherButtonState() {
		this.button$.subscribe((button) => {
			this.config = button?.buttonConfig ?? {};
			this.changeMouseIcon();
		})
	}
}
