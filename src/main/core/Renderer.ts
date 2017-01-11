import { AbstractHasSubject } from "./AbstractHasSubject"
import { IsRenderable } from "./IsRenderable"
import { EventBuilder } from "./event/EventFactory"
import { EventName } from "./event/Event"

import * as Rx from "rxjs/Rx"

export class Renderer extends AbstractHasSubject {
    constructor() {
        super();
    }

    protected _createSubject(): Rx.Subject<any> {
        return new Rx.Subject();
    }

    public render(renderable: IsRenderable): void {
        this._subject.next(EventBuilder.createEvent(EventName.RENDERER_NEXT_FRAME, this).withRenderable(renderable).build());
    }

     public registerObserver(observer: Rx.Observer<any>): Rx.Subscription {
        return this._subject.subscribe(observer); //as much as possible
        //return this._subject.throttleTime(16).subscribe(observer); //60fps -> issues with over event flickering
    }
}