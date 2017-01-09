import { EdgeOptions } from "../api/EdgeOptions"

import * as Commons from "./Commons"
import { EventBuilder } from "./event/EventFactory"
import { EventName, Event } from "./event/Event"
import { AbstractHasSubject } from "./AbstractHasSubject"
import { IsRenderable } from "./IsRenderable"

import * as Rx from "rxjs/Rx"
declare const _: any;

function _createDefaultEdge() {
    return {
        from: '0',
        to: '0',
        shapeOptions: {
            type: EdgeOptions.ShapeType.LINE,
            color: 0x00617f,
            width: 2,
            alpha: 1
        }
    };
}


export class Edge extends AbstractHasSubject implements IsRenderable {
    private _options: EdgeOptions.Options
    private static _count: number = 0;

    constructor(edgeOptions: EdgeOptions.Options) {
        super();
        let defOpt = _createDefaultEdge();
        //use lodash merge as assign is copying reference of sub objects
        this._options = _.merge(defOpt, edgeOptions);
        Edge._count++;
    }

    protected _createSubject(): Rx.Subject<any> {
        return new Rx.Subject();
    }

    public getOptions(): EdgeOptions.Options {
        return this._options;
    }

    public draw(): void {
        this._subject.next(EventBuilder.createEvent(EventName.EDGE_DRAW, this).build());
    }

    public getFromId(): string {
        return this._options.from;
    }

    public getToId(): string {
        return this._options.to;
    }

    public next(event: Event<any>): void {
        if (!event || event.name === undefined)
            throw new Error('Event does not contain the name property');
        switch (event.name) {
            case EventName.VERTEX_MOVE: {
                console.debug(`VERTEX_MOVE received by edge`);
                this.draw();
            }
        }
    }

    public complete(): void {
        console.debug('Edge received complete event');
    }

    public error(e: any): void {
        throw new Error('Edge received error event' + e);
    }


}
