import { HasChildren } from "./HasChildren"
import { EventFactory } from "./event/EventFactory"
import * as Rx from "rxjs/Rx"

export class Layer<T> implements HasChildren<T> {
    private _children: Array<T> = []
    private _subject: Rx.Subject<any> = new Rx.Subject();

    public addChild(child: T): void {
        this._children.push(child);
        this._subject.next(EventFactory.createLayerChildAddedEvent(this, child));
    }

    removeChildren(): void {
        while(this._children.length>0){
            let child:T|undefined = this._children.pop();
            if (child === undefined)
                continue;
            this._subject.next(EventFactory.createLayerChildRemovedEvent(this, child));
        }
    }

    getChildAt(i: number): T{
        return this._children[i];
    }
}