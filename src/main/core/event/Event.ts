export interface Event<T> {
    name: EventName | string,
    source?: T,
    data?: any
}

export enum EventName {
    VERTEX_RENDER,
    VERTEX_MOVE,
    VERTEX_DRAW,
    VERTEX_ROTATE,
    LAYER_CHILD_ADDED,
    LAYER_CHILD_REMOVED
}