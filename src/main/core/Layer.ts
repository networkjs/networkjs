import { HasChildren } from "./HasChildren"
import { EventBuilder } from "./event/EventFactory"
import { EventName } from "./event/Event"
import { AbstractHasSubject } from "./AbstractHasSubject"
import { IsRenderable } from "./IsRenderable"

import * as Rx from "rxjs/Rx"

export class Layer<T> extends AbstractHasSubject implements HasChildren<T>, IsRenderable {
    private _children: Array<T> = []

    constructor() {
        super();
    }

    protected _createSubject(): Rx.Subject<any> {
        return new Rx.Subject();
    }

    public addChild(child: T): void {
        this._children.push(child);
        this._subject.next(EventBuilder.createEvent(EventName.LAYER_CHILD_ADDED, this).withChild(child).build());
    }

    public removeChild(child: T): void {
        let i = this._children.indexOf(child);
        if (i === -1)
            console.warn('Child mot found in layer, child was not remove');

        let c = this._children.splice(i, 1);
        this._subject.next(EventBuilder.createEvent(EventName.LAYER_CHILD_REMOVED, this).withChild(c[0]).build());
    }

    public removeChildren(): void {
        while (this._children.length > 0) {
            let child: T | undefined = this._children.pop();
            if (child === undefined) //FB
                continue;
            this._subject.next(EventBuilder.createEvent(EventName.LAYER_CHILD_REMOVED, this).withChild(child).build());
        }
    }

    public getChildAt(i: number): T {
        return this._children[i];
    }
}