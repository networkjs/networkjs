import { AbstractHasSubject } from "./AbstractHasSubject"
import { IsRenderable } from "./IsRenderable"
import { EventFactory } from "./event/EventFactory"

import * as Rx from "rxjs/Rx"

export class Renderer extends AbstractHasSubject {
    constructor() {
        super();
    }

    protected _createSubject(): Rx.Subject<any> {
        return new Rx.Subject();
    }

    public render(renderable: IsRenderable): void {
        this._subject.next(EventFactory.createRendererRenderEvent(this, renderable));
    }
}