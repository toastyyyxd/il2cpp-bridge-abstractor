import { AbstractedArray, AbstractedObject, ICollection } from "./abstracted.js";
import { checkEquality } from "./instanceHelper.js";

let native: {
    List: Il2Cpp.Class,
    KeyValuePair: Il2Cpp.Class,
    Dictionary: Il2Cpp.Class
}

export class List<T extends Il2Cpp.Field.Type> extends AbstractedObject implements ICollection<T> {
    protected declare native: Il2Cpp.Object;
    public get object(): Il2Cpp.Object {
        return this.native;
    }

    public init() {
        const List = Il2Cpp.domain.assembly("System.Collections.Generic").image.class("List`1");
        const KeyValuePair = Il2Cpp.domain.assembly("System.Collections.Generic").image.class("KeyValuePair`2");
        const Dictionary = Il2Cpp.domain.assembly("System.Collections.Generic").image.class("Dictionary`2");
        native = {
            List, KeyValuePair, Dictionary
        }
    }

    protected constructor(nativeList: Il2Cpp.Field.Type) {
        super(nativeList);
    }
    public static abstractify<T extends Il2Cpp.Field.Type>(nativeObject: Il2Cpp.Field.Type): List<T> {
        return new List(nativeObject);
    }
    public static CreateEmpty<T extends Il2Cpp.Field.Type>(klass: Il2Cpp.Class): List<T> {
        const nativeList = native.List.inflate(klass).method<Il2Cpp.Object>(".ctor", 0).invoke();
        return List.abstractify<T>(nativeList);
    }
    public static Create<T extends Il2Cpp.Field.Type>(klass: Il2Cpp.Class, elements: T[]): List<T> {
        const nativeElements = Il2Cpp.array(klass, elements);
        const nativeList = native.List.inflate(klass).method<Il2Cpp.Object>(".ctor", 1).invoke(nativeElements);
        return List.abstractify<T>(nativeList);
    }

    public get(index: number): T {
        return this.native.method<T>("get_Item", 1).invoke(index);
    }
    public set(index: number, value: T) {
        this.native.method<T>("set_Item", 2).invoke(index, value);
    }
    public add(value: T) {
        this.native.method<T>("Add", 1).invoke(value);
    }
    public get length(): number {
        return this.native.method<number>("get_Count", 0).invoke();
    }

    public forEach(callback: (value: T, index: number, array: List<T>) => void) {
        for (let i = 0; i < this.length; i++) {
            callback(this.get(i), i, this);
        }
    }
    public map<U>(callback: (value: T, index: number, array: List<T>) => U): U[] {
        const result: U[] = [];
        for (let i = 0; i < this.length; i++) {
            result.push(callback(this.get(i), i, this));
        }
        return result;
    }
    public filter(callback: (value: T, index: number, array: List<T>) => boolean): List<T> {
        const result = List.CreateEmpty<T>(this.native.class);
        for (let i = 0; i < this.length; i++) {
            if (callback(this.get(i), i, this)) {
                result.add(this.get(i));
            }
        }
        return result;
    }
    public find(callback: (value: T, index: number, array: List<T>) => boolean): T | undefined {
        for (let i = 0; i < this.length; i++) {
            if (callback(this.get(i), i, this)) return this.get(i);
        }
    }
    public findIndex(callback: (value: T, index: number, array: List<T>) => boolean): number {
        for (let i = 0; i < this.length; i++) {
            if (callback(this.get(i), i, this)) return i;
        }
        return -1;
    }
    public includes(element: T): boolean {
        for (let i = 0; i < this.length; i++) {
            if (checkEquality(this.get(i), (element)))
                return true;
        }
        return false;
    }
}
export class KeyValuePair<T1 extends Il2Cpp.Field.Type, T2 extends Il2Cpp.Field.Type> {
    protected declare native: Il2Cpp.ValueType;
    public get object(): Il2Cpp.ValueType {
        return this.native;
    }

    public key: T1;
    public value: T2;
    
    public constructor(key: T1, value: T2) {
        this.key = key;
        this.value = value;
    }
    public static abstractify<T1 extends Il2Cpp.Field.Type, T2 extends Il2Cpp.Field.Type>(nativeObject: Il2Cpp.Object): KeyValuePair<T1,T2> {
        const nativeKey = nativeObject.field<T1>("key").value;
        const nativeValue = nativeObject.field<T2>("value").value;
        return new KeyValuePair<T1,T2>(nativeKey, nativeValue);
    }
    public deabstractify(keyKlass: Il2Cpp.Class, valueKlass: Il2Cpp.Class): Il2Cpp.Object {
        const nativeObj = native.KeyValuePair.inflate(keyKlass, valueKlass).alloc();
        nativeObj.method(".ctor", 2).invoke(this.key, this.value);
        return nativeObj;
    }
}
export class Dictionary<T1 extends Il2Cpp.Field.Type, T2 extends Il2Cpp.Field.Type> {
    protected native: Il2Cpp.Object;
    public get object(): Il2Cpp.Object {
        return this.native;
    }

    public init() {
        throw new Error("Not implemented: use List.init() instead");
    }

    protected constructor(nativeDictionary: Il2Cpp.Object) {
        this.native = nativeDictionary;
    }
    public static abstractify<T1 extends Il2Cpp.Field.Type,T2 extends Il2Cpp.Field.Type>(nativeObject: Il2Cpp.Object): Dictionary<T1,T2> {
        return new Dictionary(nativeObject);
    }
    public static CreateEmpty<T1 extends Il2Cpp.Field.Type,T2 extends Il2Cpp.Field.Type>(klass1: Il2Cpp.Class, klass2: Il2Cpp.Class): Dictionary<T1,T2> {
        const nativeDictionary = native.Dictionary.inflate(klass1, klass2).alloc();
        nativeDictionary.method<Il2Cpp.Object>(".ctor", 0).invoke();
        return Dictionary.abstractify<T1,T2>(nativeDictionary);
    }
    public static Create<T1 extends Il2Cpp.Field.Type,T2 extends Il2Cpp.Field.Type>(klass1: Il2Cpp.Class, klass2: Il2Cpp.Class, kvPairs: KeyValuePair<T1,T2>[]): Dictionary<T1,T2> {
        const dictionary = this.CreateEmpty<T1,T2>(klass1, klass2);
        for (const pair of kvPairs) {
            dictionary.set(pair.key, pair.value);
        }
        return dictionary;
    }

    public get(key: T1): T2 {
        return this.native.method<T2>("get_Item", 1).invoke(key);
    }
    public set(key: T1, value: T2) {
        this.native.method<T2>("set_Item", 2).invoke(key, value);
    }
    public get count(): number {
        return this.native.method<number>("get_Count", 0).invoke();
    }
    public get keys(): T1[] {
        const nativeKeys = this.native.method<Il2Cpp.Array<T1>>("get_Keys", 0).invoke();
        return AbstractedArray.abstractify<T1>(nativeKeys).toJSArray();
    }
    public get values(): T2[] {
        const nativeValues = this.native.method<Il2Cpp.Array<T2>>("get_Values", 0).invoke();
        return AbstractedArray.abstractify<T2>(nativeValues).toJSArray();
    }
    public get kvPairs(): KeyValuePair<T1,T2>[] {
        const result: KeyValuePair<T1,T2>[] = [];
        for (const k of this.keys) {
            result.push(new KeyValuePair<T1,T2>(k, this.get(k)));
        }
        return result;
    }

    public forIn(callback: (value: T2, key: T1, dictionary: Dictionary<T1,T2>) => void) {
        for (const k of this.keys) {
            callback(this.get(k), k, this);
        }
    }
    public forOfEntries(callback: (entry: KeyValuePair<T1,T2>, dictionary: Dictionary<T1,T2>) => void) {
        for (const pair of this.kvPairs) {
            callback(pair, this);
        }
    }
}