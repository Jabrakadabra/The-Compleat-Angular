import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observer } from 'rxjs/Observer';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/Rx';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  myNumbersSub: Subscription;
  myObservableSub: Subscription;

  constructor() { }

  ngOnInit() {
    const myNumbers = Observable.interval(5000)
    .map((data: number) => data * 2);
    this.myNumbersSub = myNumbers.subscribe(
      (num: number) => {
        console.log(num);
      }
    );
    const myObservable = Observable.create((observer: Observer<string>) => {
      setTimeout(() => {
        observer.next('first package');
      }, 2000);
      setTimeout(() => {
        observer.next('second package');
      }, 4000);
      // setTimeout(() => {
      //   observer.error('this does not work');
      // }, 5000);
      setTimeout(() => {
        observer.complete();
      }, 8000);
      setTimeout(() => {
        observer.next('third package');
      }, 10000);
    });
    this.myObservableSub = myObservable.subscribe(
      (data: string) => {
        console.log(data);
      },
      (err: string) => {
        console.log(err);
      },
      () => {
        console.log('All aboard!');
      }
    );
  }

  ngOnDestroy() {
    this.myObservableSub ? this.myObservableSub.unsubscribe() : null;
    this.myNumbersSub ? this.myNumbersSub.unsubscribe() : null;
  }

}
