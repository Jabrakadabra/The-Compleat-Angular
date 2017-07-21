import { Component } from '@angular/core';
import { trigger, state, style, transition, animate, keyframes, group } from '@angular/animations';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css'],
	animations: [
		trigger('divState', [
			state('initial', style({
				'background-color': 'red',
				transform: 'translateX(0)'
			})),
			state('final', style({
				'background-color': 'blue',
				transform: 'translateX(100px)'
			})),
			transition('initial <=> final', animate(2000))
		]),
		trigger('wildState', [
			state('initial', style({
				backgroundColor: 'red',
				borderRadius: '0px',
				transform: 'translateX(0) scale(1)'
			})),
			state('final', style({
				backgroundColor: 'blue',
				transform: 'translateX(100px) scale(1)'
			})),
			state('shrunken', style({
				backgroundColor: 'green',
				transform: 'translateX(1000px) scale(0.5)'
			})),
			transition('initial <=> final', animate(2000)),
			transition('* => shrunken', [
				animate(20000, style({
					backgroundColor: 'orange',
					borderRadius: '50px'
				})),
				animate(20000, style({
					backgroundColor: 'orange',
					borderRadius: '50px'
				})),
				animate(10000, style({
					backgroundColor: 'yellow',
					borderRadius: '10px'
				}))
			])
		]),
		trigger('list1', [
			state('in', style({
				opacity: 1,
				transform: 'translateX(0)'
			})),
			transition('void => *', [
				style({
					opacity: 0,
					transform: 'translateX(-100px)'
				}),
				animate(1000)
			]),
			transition('* => void', [
				animate(3000, style({
					opacity: 0,
					transform: 'translateX(-100px)'
				}))
			])
		]),
		trigger('list2', [
			state('in', style({
				opacity: 1,
				transform: 'translateX(0)'
			})),
			transition('void => *', [
				animate(1000, keyframes([
					style({
						transform: 'translateX(-100px)',
						opacity: 0,
						offset: 0
					}),
					style({
						transform: 'translateX(-50px)',
						opacity: 0.5,
						offset: .1
					}),
					style({
						transform: 'translateX(-120px)',
						opacity: 0.2,
						offset: .8
					}),
					style({
						transform: 'translateX(0)',
						opacity: 1,
						offset: 1
					})
				]))
			]),
			transition('* => void', [
				group([
					animate(500, style({
						color: 'red'
					})),
					animate(3000, style({
						opacity: 0,
						transform: 'translateX(-100px)'
					}))
				])
			])
		])
	]
})

export class AppComponent {
	status = 'initial';
	wildStatus = 'initial';
	list = ['Milk', 'Sugar', 'Bread'];

	onAnimate() {
		this.status = this.status === 'final' ? 'initial' : 'final';
		this.wildStatus = this.wildStatus === 'initial' ? 'final' : 'initial';
	}

	onShrink() {
		this.wildStatus = this.wildStatus === 'shrunken' ? 'initial' : 'shrunken';
	}

	onAdd(item) {
		this.list.push(item);
	}

	onDelete(item) {
		this.list.splice(this.list.indexOf(item), 1);
	}
}
