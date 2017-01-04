export interface Event<T> {
    name: string,
    source?: T,
    data?: any
}