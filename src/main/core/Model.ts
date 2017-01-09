import { VertexOptions } from "../api/VertexOptions"
import { EdgeOptions } from "../api/EdgeOptions"
import { GraphOptions } from "../api/GraphOptions"

import * as Commons from "./Commons"
import { EventBuilder } from "./event/EventFactory"
import { EventName } from "./event/Event"
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
    private _vIdToEs: Map<string, Edge[]> = new Map<string, Edge[]>();

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
            this._subject.next(EventBuilder.createEvent(EventName.MODEL_VERTEX_CREATED, this).withVertex(vertex).build());
            this._vertices.push(vertex);
            this._idToV.set(vertex.getId(), vertex);
        }
    }

    public createEdges(eos: Array<EdgeOptions.Options>): void {
        for (let eo of eos) {
            let edge = new Edge(eo);
            this._subject.next(EventBuilder.createEvent(EventName.MODEL_EDGE_CREATED, this).withEdge(edge).build());
            this._edges.push(edge);

            let fromId = edge.getFromId();
            let toId = edge.getToId();
            this._addInVIdToEs(fromId, edge);
            if (fromId !== toId)
                this._addInVIdToEs(toId, edge);

            let from = this.getVertex(fromId);
            if (!from)
                throw new Error(`From vertex was not created with id; ${fromId}`);
            from.registerObserver(edge);

            if (fromId !== toId) {
                let to = this.getVertex(toId);
                if (!to)
                    throw new Error(`To vertex was not created with id; ${toId}`);

                to.registerObserver(edge);
            }
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

    public getCorrespondingEdges(vertexId: string): Edge[] | undefined {
        return this._vIdToEs.get(vertexId)
    }

    public getVertex(id: string): Vertex {
        let vertex = this._idToV.get(id);
        if (!vertex)
            throw new Error(`Could not find corresponding Vertex:${id}`);
        return vertex;
    }

    private _addInVIdToEs(vId: string, e: Edge) {
        let es = this._vIdToEs.get(vId);
        if (!es) {
            es = [];
            this._vIdToEs.set(vId, es);
        }
        es.push(e);
    }
}