import { Event, EventName, getSource } from "../core/event/Event"

import { Model } from "../core/Model"
import { Vertex } from "../core/Vertex"
import { Edge } from "../core/Edge"
import { DelegationRegistry } from "../core/DelegationRegistry"

import { VertexDelegate } from "./VertexDelegate"
import { EdgeDelegate } from "./EdgeDelegate"

import * as Rx from "rxjs/Rx"

export class ModelDelegate {
    private _subscription: Rx.Subscription

    private _registry: DelegationRegistry = DelegationRegistry.getInstance();

    public next(event: Event<Model>): void {
        if (!event || event.name === undefined)
            throw new Error('Event does not contain the name property');
        switch (event.name) {
            case EventName.MODEL_VERTEX_CREATED:
                console.debug(`MODEL_VERTEX_CREATED received`);
                this._onVertexCreated(event);
                break;
            case EventName.MODEL_EDGE_CREATED:
                console.debug(`MODEL_EDGE_CREATED received`);
                this._onEdgeCreated(event);
                break;
        }
    }

    private _onVertexCreated(event: Event<Model>) {
        let vertex: Vertex = event.data.vertex;
        let delegate = new VertexDelegate();
        this._registry.addDelegate(vertex, delegate);
    }

    private _onEdgeCreated(event: Event<Model>) {
        let edge: Edge = event.data.edge;
        let delegate = new EdgeDelegate();
        this._registry.addDelegate(edge, delegate);
    }

    public complete(): void {
        this._subscription.unsubscribe();
        console.debug('Graph released its subscription');
    }

    public error(e: any): void {
        throw new Error('Error sent from graph observable' + e);
    }
}