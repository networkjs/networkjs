import { VertexOptions } from "../api/VertexOptions"

import * as Commons from "./Commons"
import { EventFactory } from "./event/EventFactory"
import { AbstractHasSubject } from "./AbstractHasSubject"
import { IsRenderable } from "./IsRenderable"

import * as Rx from "rxjs/Rx"
declare const _: any;

function _createDefaultVertex(vertexId: string) {
    return {
        id: `Vertex ${vertexId}`,
        label: `Label for Vertex ${vertexId}`,
        position: { x: 0, y: 0 }, //center
        shapeOptions: {
            type: VertexOptions.ShapeType.CIRCLE,
            options: {
                backgroundAlpha: 1,
                backgroundColor: 0xccf5ff,
                borderWidth: 2,
                borderAlpha: 0.8,
                borderColor: 0x00b5e2,
                radius: 20
            }
        },
        textOptions: {}
    };
}

export class Vertex extends AbstractHasSubject implements IsRenderable {
    private _options: VertexOptions.Options
    private static _count: number = 0;

    constructor(vertexOptions?: VertexOptions.Options) {
        super();
        let defOpt = _createDefaultVertex(`${Vertex._count}`);
        //use lodash merge as assign is copying reference of sub objects
        this._options = _.merge(defOpt, vertexOptions);
        // this.move(this._options.position || { x: 0, y: 0 });
        // this.rotate(this._options.rotation || 0);
        Vertex._count++;
    }

    protected _createSubject(): Rx.Subject<any> {
        return new Rx.Subject();
    }

    public getOptions(): VertexOptions.Options {
        return this._options;
    }

    public draw(): void {
        this._subject.next(EventFactory.createVertexDrawEvent(this));
    }

    public getId(): string {
        return this._options.id;
    }

    //copy to be sure the move event will be send using move method
    public getPosition(): Commons.Point {
        let cloned = _.clone(this._options.position);
        if (cloned === undefined)
            throw new Error('Could not clone undefined position');
        return cloned;
    }

    public getRotation(): number {
        if (this._options.rotation === undefined)
            throw new Error('Could not clone undefined position');
        return this._options.rotation;
    }

    public move(position: Commons.Point): void {
        this._options.position = position;
        this._subject.next(EventFactory.createVertexMoveEvent(this));
    }

    public rotate(rotation: number): void {
        this._options.rotation = rotation;
        this._subject.next(EventFactory.createVertexRotateEvent(this));
    }
}
