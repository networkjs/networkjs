import * as Commons from "./Commons"
import { VertexOptions } from "../api/VertexOptions"
import { EventFactory } from "./event/EventFactory"
import * as Rx from "rxjs/Rx"

function createDefaultVertex(vertexId: string) {
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

export class Vertex {
    private _options: VertexOptions.Options
    private static _count: number = 0;
    private _subject: Rx.Subject<any> = new Rx.ReplaySubject(2); //number of event trigger in constructor

    constructor(vertexOptions?: VertexOptions.Options) {
        let defOpt = createDefaultVertex(`${Vertex._count}`);
        this._options = Object.assign({} || vertexOptions, defOpt);
        Vertex._count++;
        this.move(this._options.position || { x: 0, y: 0 });
        this.rotate(this._options.rotation || 0);
    }

    public getOptions(): VertexOptions.Options {
        return this._options;
    }

    /**
     * Render the vertex to screen using a delegate function.
     * 
     * @param {(vertexOptions : VertexOptions.Options) => void} fn
     * 
     * @memberOf Vertex
     */
    public render(): void {
        this._subject.next(EventFactory.createVertexRenderEvent(this));
    }

    public draw(): void {
        this._subject.next(EventFactory.createVertexDrawEvent(this));
    }

    public move(position: Commons.Point): void {
        if (this._options.shapeOptions === undefined)
            throw new Error('shapeOptions should not be undefined');
        this._options.shapeOptions.options.position = position;
        this._subject.next(EventFactory.createVertexMoveEvent(this));
    }

    public rotate(rotation: number): void {
        if (this._options.shapeOptions === undefined)
            throw new Error('shapeOptions should not be undefined');
        this._options.shapeOptions.options.rotation = rotation;
        this._subject.next(EventFactory.createVertexRotateEvent(this));
    }

    public registerObserver(observer: Rx.Observer<any>): Rx.Subscription {
        return this._subject.subscribe(observer);
    }

    public destroy(): void {
        this._subject.complete();
        console.debug('Vertex sent the complete event');
        this._subject.unsubscribe();
        console.debug('Vertex unsubscribe its subject');
    }

}
