import { HasChildren } from "./HasChildren"
import { EventFactory } from "./event/EventFactory"
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
        this._subject.next(EventFactory.createLayerChildAddedEvent(this, child));
    }

    public removeChild(child: T): void {
        let i = this._children.indexOf(child);
        if (i === -1)
            console.warn('Child mot found in layer, child was not remove');

        let c = this._children.splice(i, 1);
        this._subject.next(EventFactory.createLayerChildRemovedEvent(this, c[0]));
    }

    public removeChildren(): void {
        while (this._children.length > 0) {
            let child: T | undefined = this._children.pop();
            if (child === undefined) //FB
                continue;
            this._subject.next(EventFactory.createLayerChildRemovedEvent(this, child));
        }
    }

    public getChildAt(i: number): T {
        return this._children[i];
    }
}