export interface Event<T> {
    name: EventName | string,
    source?: T,
    data?: any
}

export enum EventName {
    VERTEX_MOVE,
    VERTEX_DRAW,
    VERTEX_ROTATE,
    VERTEX_DRAG_START,
    VERTEX_DRAG_END,
    VERTEX_OVER_START,
    VERTEX_OVER_END,
    VERTEX_SELECT_START,
    VERTEX_SELECT_END,
    EDGE_DRAW,
    LAYER_CHILD_ADDED,
    LAYER_CHILD_REMOVED,
    RENDERER_NEXT_FRAME,
    MODEL_VERTEX_CREATED,
    MODEL_EDGE_CREATED,

}

export function getSource<T>(event: Event<T>): T {
    if (event.source === undefined)
        throw new Error('Source object is undefined');
    return event.source;
}