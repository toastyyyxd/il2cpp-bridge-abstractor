import { AbstractedObject, ICollection } from "./abstracted.js";
export declare class List<T extends Il2Cpp.Field.Type> extends AbstractedObject implements ICollection<T> {
    protected native: Il2Cpp.Object;
    get object(): Il2Cpp.Object;
    init(): void;
    protected constructor(nativeList: Il2Cpp.Field.Type);
    static abstractify<T extends Il2Cpp.Field.Type>(nativeObject: Il2Cpp.Field.Type): List<T>;
    static CreateEmpty<T extends Il2Cpp.Field.Type>(klass: Il2Cpp.Class): List<T>;
    static Create<T extends Il2Cpp.Field.Type>(klass: Il2Cpp.Class, elements: T[]): List<T>;
    get(index: number): T;
    set(index: number, value: T): void;
    add(value: T): void;
    get length(): number;
    forEach(callback: (value: T, index: number, array: List<T>) => void): void;
    map<U>(callback: (value: T, index: number, array: List<T>) => U): U[];
    filter(callback: (value: T, index: number, array: List<T>) => boolean): List<T>;
    find(callback: (value: T, index: number, array: List<T>) => boolean): T | undefined;
    findIndex(callback: (value: T, index: number, array: List<T>) => boolean): number;
    includes(element: T): boolean;
}
export declare class KeyValuePair<T1 extends Il2Cpp.Field.Type, T2 extends Il2Cpp.Field.Type> {
    protected native: Il2Cpp.ValueType;
    get object(): Il2Cpp.ValueType;
    key: T1;
    value: T2;
    constructor(key: T1, value: T2);
    static abstractify<T1 extends Il2Cpp.Field.Type, T2 extends Il2Cpp.Field.Type>(nativeObject: Il2Cpp.Object): KeyValuePair<T1, T2>;
    deabstractify(keyKlass: Il2Cpp.Class, valueKlass: Il2Cpp.Class): Il2Cpp.Object;
}
export declare class Dictionary<T1 extends Il2Cpp.Field.Type, T2 extends Il2Cpp.Field.Type> {
    protected native: Il2Cpp.Object;
    get object(): Il2Cpp.Object;
    init(): void;
    protected constructor(nativeDictionary: Il2Cpp.Object);
    static abstractify<T1 extends Il2Cpp.Field.Type, T2 extends Il2Cpp.Field.Type>(nativeObject: Il2Cpp.Object): Dictionary<T1, T2>;
    static CreateEmpty<T1 extends Il2Cpp.Field.Type, T2 extends Il2Cpp.Field.Type>(klass1: Il2Cpp.Class, klass2: Il2Cpp.Class): Dictionary<T1, T2>;
    static Create<T1 extends Il2Cpp.Field.Type, T2 extends Il2Cpp.Field.Type>(klass1: Il2Cpp.Class, klass2: Il2Cpp.Class, kvPairs: KeyValuePair<T1, T2>[]): Dictionary<T1, T2>;
    get(key: T1): T2;
    set(key: T1, value: T2): void;
    get count(): number;
    get keys(): T1[];
    get values(): T2[];
    get kvPairs(): KeyValuePair<T1, T2>[];
    forIn(callback: (value: T2, key: T1, dictionary: Dictionary<T1, T2>) => void): void;
    forOfEntries(callback: (entry: KeyValuePair<T1, T2>, dictionary: Dictionary<T1, T2>) => void): void;
}
