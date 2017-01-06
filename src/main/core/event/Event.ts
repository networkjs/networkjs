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
    LAYER_CHILD_REMOVED,
    RENDERER_RENDER
}

export function getSource<T>(event: Event<T>): T {
    if (event.source === undefined)
        throw new Error('Source object is undefined');
    return event.source;
}