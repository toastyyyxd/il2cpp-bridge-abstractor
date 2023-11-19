export type Abstractor<T1 extends Il2Cpp.Field.Type, T2 extends AbstractedObject> = (nativeObject: T1) => T2;
export declare class AbstractedObject {
    protected native: Il2Cpp.Field.Type;
    get object(): Il2Cpp.Field.Type;
    protected constructor(nativeObject: Il2Cpp.Field.Type);
    protected static abstractify(nativeObject: Il2Cpp.Field.Type): AbstractedObject;
}
export interface ICollection<T extends Il2Cpp.Field.Type> {
    readonly length: number;
    get(index: number): T;
    set(index: number, value: T): void;
    forEach(callback: (value: T, index: number, array: ICollection<T>) => void): void;
    map<U>(callback: (value: T, index: number, array: ICollection<T>) => U): U[];
    filter(callback: (value: T, index: number, array: ICollection<T>) => boolean): ICollection<T>;
    find(callback: (value: T, index: number, array: ICollection<T>) => boolean): T | undefined;
    findIndex(callback: (value: T, index: number, array: ICollection<T>) => boolean): number;
    includes(element: T): boolean;
}
export declare class AbstractedArray<T extends Il2Cpp.Field.Type> extends AbstractedObject implements ICollection<T> {
    private nativeArray;
    get array(): Il2Cpp.Array;
    constructor(nativeArray: Il2Cpp.Array);
    static abstractify<T extends Il2Cpp.Field.Type>(nativeObject: Il2Cpp.Array<T>): AbstractedArray<T>;
    static createEmpty<T extends Il2Cpp.Field.Type>(klass: Il2Cpp.Class, length: number): AbstractedArray<T>;
    static create<T extends Il2Cpp.Field.Type>(klass: Il2Cpp.Class, elements: T[]): AbstractedArray<T>;
    get(index: number): T;
    set(index: number, value: T): void;
    get length(): number;
    forEach(callback: (value: T, index: number, array: AbstractedArray<T>) => void): void;
    map<U>(callback: (value: T, index: number, array: AbstractedArray<T>) => U): U[];
    filter(callback: (value: T, index: number, array: AbstractedArray<T>) => boolean): AbstractedArray<T>;
    find(callback: (value: T, index: number, array: AbstractedArray<T>) => boolean): T | undefined;
    findIndex(callback: (value: T, index: number, array: AbstractedArray<T>) => boolean): number;
    includes(element: T): boolean;
    toJSArray(): T[];
    ToAbstractedJSArray<T2 extends AbstractedObject>(abstractor: Abstractor<T, T2>): T2[];
}
