export interface HasChildren<T> {
    addChild(child: T): void

    removeChildren(): void

    getChildAt(i: number): T
}