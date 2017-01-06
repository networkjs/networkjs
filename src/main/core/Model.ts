import { VertexOptions } from "../api/VertexOptions"
import { EdgeOptions } from "../api/EdgeOptions"
import { GraphOptions } from "../api/GraphOptions"

import * as Commons from "./Commons"
import { EventFactory } from "./event/EventFactory"
import { AbstractHasSubject } from "./AbstractHasSubject"
import { IsRenderable } from "./IsRenderable"
import { Vertex } from "./Vertex"
import { Edge } from "./Edge"

import * as Rx from "rxjs/Rx"

export class Model extends AbstractHasSubject {
    private _vertices: Array<Vertex> = [];
    private _edges: Array<Edge> = [];
    private static _instance: Model = new Model();
    private _idToV: Map<string, Vertex> = new Map<string, Vertex>();

    constructor() {
        super();
        if (Model._instance) {
            throw new Error("Error: Instantiation failed: Use Model.getInstance() instead of new.");
        }

        Model._instance = this;
    }

    public static getInstance(): Model {
        return Model._instance;
    }

    protected _createSubject(): Rx.Subject<any> {
        return new Rx.Subject();
    }

    public createVertices(vos: Array<VertexOptions.Options>): void {
        for (let vo of vos) {
            let vertex = new Vertex(vo);
            this._subject.next(EventFactory.createModelVertexCreatedEvent(this, vertex));
            this._vertices.push(vertex);
            this._idToV.set(vertex.getId(), vertex);
        }
    }

    public createEdges(eos: Array<EdgeOptions.Options>): void {
        for (let eo of eos) {
            let edge = new Edge(eo);
            this._subject.next(EventFactory.createModelEdgeCreatedEvent(this, edge));
            this._edges.push(edge);
        }
    }

    public draw() {
        for (let v of this._vertices) {
            v.draw();
        }

        for (let e of this._edges) {
            e.draw();
        }
    }

    public getVertices(): Array<Vertex> {
        return this._vertices;
    }

    public getEdges(): Array<Edge> {
        return this._edges;
    }

    public getVertex(id: string): Vertex {
        let vertex = this._idToV.get(id);
        if (!vertex)
            throw new Error(`Could not find corresponding Vertex:${id}`);
        return vertex;
    }
}