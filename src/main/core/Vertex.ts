import * as Commons from "../api/Commons"
import { VertexOptions } from "../api/VertexOptions"
import { EventFactory } from "./event/EventFactory"
import { defaultCenterEvaluator } from "./DefaultCenterEvaluator"
import * as Rx from "rxjs/Rx"

export class Vertex {
    private _options: VertexOptions.Options
    private static _count: number
    private _subject: Rx.Subject<any>
    private _centerEvaluator : (shapeOption: VertexOptions.Options) => Commons.Point

    constructor(vertexOptions?: VertexOptions.Options, 
        centerEvaluator?: (shapeOption: VertexOptions.Options) => Commons.Point) {
        this._options = Object.assign(this.createDefaultVertex(), {} || vertexOptions);
        this._subject = new Rx.Subject();
        this._centerEvaluator = centerEvaluator || defaultCenterEvaluator;
        Vertex._count++;
    }

    private createDefaultVertex(): VertexOptions.Options {
        return {
            id: `Vertex ${Vertex._count}`,
            label: `Label for Vertex ${Vertex._count}`,
            position: { x: 0, y: 0 },
            shapeOptions: {
                type: 'circle',
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

    public move(position: Commons.Point): void {
        this._subject.next(EventFactory.createVertexMoveEvent(position, this));
    }

    public getCenter(): Commons.Point {
        if (!this._options)
            throw new Error(`Vertex options are not defined`);
        
        return this._centerEvaluator.call(this, this._options);
        //return this._centerEvaluator.apply(this, this._options.shapeOptions);
    }

    public subscribe(observer: Rx.Observer<any>) {
        this._subject.subscribe(observer);
    }

    public destroy(): void {
        this._subject.complete();
    }

}
