import { VertexOptions } from "../api/VertexOptions"

import * as Commons from "./Commons"
import { EventBuilder } from "./event/EventFactory"
import { EventName } from "./event/Event"
import { AbstractHasSubject } from "./AbstractHasSubject"
import { IsRenderable } from "./IsRenderable"
import * as OH from "./OptionsHelper"

import * as Rx from "rxjs/Rx"
declare const _: any;


export class Vertex extends AbstractHasSubject implements IsRenderable {
    private _options: VertexOptions.Options
    private static _count: number = 0;
    private _dragged: boolean;
    private _overed: boolean;
    private _selected: boolean;

    constructor(vertexOptions?: VertexOptions.Options) {
        super();

        this._options = OH.getOptions(Vertex._count, vertexOptions);
        Vertex._count++;
    }

    protected _createSubject(): Rx.Subject<any> {
        return new Rx.Subject();
    }

    public getOptions(): VertexOptions.Options {
        return this._options;
    }

    public draw(): void {
        this._subject.next(EventBuilder.createEvent(EventName.VERTEX_DRAW, this).build());
    }

    public getId(): string {
        return this._options.id;
    }

    public isDragged(): boolean {
        return this._dragged;
    }

    public isOvered(): boolean {
        return this._overed;
    }

    public isSelected(): boolean {
        return this._selected;
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
            throw new Error('Could not clone undefined rotation');
        return this._options.rotation;
    }

    public move(position: Commons.Point): void {
        this._options.position = position;
        this._subject.next(EventBuilder.createEvent(EventName.VERTEX_MOVE, this).withPosition(position).build());
    }

    public rotate(rotation: number): void {
        this._options.rotation = rotation;
        this._subject.next(EventBuilder.createEvent(EventName.VERTEX_ROTATE, this).withRotation(rotation).build());
    }

    public startDrag(delta: Commons.Point) {
        this._dragged = true;
        this._subject.next(EventBuilder.createEvent(EventName.VERTEX_DRAG_START, this).withPosition(delta).build());
    }

    public endDrag() {
        this._dragged = false;
        this._subject.next(EventBuilder.createEvent(EventName.VERTEX_DRAG_END, this).build());
    }

    public startOver() {
        if (this.isDragged())
            return;
        this._overed = true;
        this._subject.next(EventBuilder.createEvent(EventName.VERTEX_OVER_START, this).build());
    }

    public endOver() {
         if (this.isDragged())
            return;
        this._overed = false;
        this._subject.next(EventBuilder.createEvent(EventName.VERTEX_OVER_END, this).build());
    }

    public select() {
         if (this.isDragged())
            return;
        this._selected = true;
        this._subject.next(EventBuilder.createEvent(EventName.VERTEX_SELECT_END, this).build());
    }

    public unselect() {
         if (this.isDragged())
            return;
        this._selected = false;
        this._subject.next(EventBuilder.createEvent(EventName.VERTEX_SELECT_END, this).build());
    }

    private _getShapeOptions(): VertexOptions.ShapeOptions {
        let options = this._options;
        if (options.shapeOptions === undefined)
            throw new Error('shapeOptions is undefined');
        return options.shapeOptions;
    }

    public getStateShape(): VertexOptions.Shape {
        let shape = this._getShapeOptions().default

        if (!this.isSelected() && this.isOvered() && !this.isDragged()) {
            let s = this._getShapeOptions().overed
            if (s === undefined)
                throw new Error('overed shape is undefined');
            shape = s;
        }
        else if (!this.isSelected() && this.isDragged()) {
            let s = this._getShapeOptions().dragged;
            if (s === undefined)
                throw new Error('dragged shape is undefined');
            shape = s;
        }
        else if (this.isSelected() && !this.isOvered() && !this.isDragged()) {
            let s = this._getShapeOptions().selected;
            if (s === undefined)
                throw new Error('selected shape is undefined');
            shape = s;
        }
        else if (this.isSelected() && this.isOvered() && !this.isDragged()) {
            let s = this._getShapeOptions().selected_overed;
            if (s === undefined)
                throw new Error('selected_overed shape is undefined');
            shape = s;
        }
        else if (this.isSelected() && this.isDragged()) {
            let s = this._getShapeOptions().selected_dragged;
            if (s === undefined)
                throw new Error('selected_dragged shape is undefined');
            shape = s;
        }

        return shape;

    }
}
