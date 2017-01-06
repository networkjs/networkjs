import * as Rx from "rxjs/Rx"

export abstract class AbstractHasSubject {
    protected _subject: Rx.Subject<any>;

    constructor(){
        this._subject = this._createSubject();
    }

    //To remember to create the subject
    protected abstract _createSubject(): Rx.Subject<any>;

    public registerObserver(observer: Rx.Observer<any>): Rx.Subscription {
        return this._subject.subscribe(observer);
    }

    public destroy(): void {
        this._subject.complete();
        console.debug('Observable completed');
        this._subject.unsubscribe();
        console.debug('Subject unsubscribed');
    }
}