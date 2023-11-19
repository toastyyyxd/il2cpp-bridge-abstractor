import { AbstractedArray, AbstractedObject } from "./abstracted.js";
import { checkEquality } from "./instanceHelper.js";
let native;
export class List extends AbstractedObject {
    get object() {
        return this.native;
    }
    init() {
        const List = Il2Cpp.domain.assembly("System.Collections.Generic").image.class("List`1");
        const KeyValuePair = Il2Cpp.domain.assembly("System.Collections.Generic").image.class("KeyValuePair`2");
        const Dictionary = Il2Cpp.domain.assembly("System.Collections.Generic").image.class("Dictionary`2");
        native = {
            List, KeyValuePair, Dictionary
        };
    }
    constructor(nativeList) {
        super(nativeList);
    }
    static abstractify(nativeObject) {
        return new List(nativeObject);
    }
    static CreateEmpty(klass) {
        const nativeList = native.List.inflate(klass).method(".ctor", 0).invoke();
        return List.abstractify(nativeList);
    }
    static Create(klass, elements) {
        const nativeElements = Il2Cpp.array(klass, elements);
        const nativeList = native.List.inflate(klass).method(".ctor", 1).invoke(nativeElements);
        return List.abstractify(nativeList);
    }
    get(index) {
        return this.native.method("get_Item", 1).invoke(index);
    }
    set(index, value) {
        this.native.method("set_Item", 2).invoke(index, value);
    }
    add(value) {
        this.native.method("Add", 1).invoke(value);
    }
    get length() {
        return this.native.method("get_Count", 0).invoke();
    }
    forEach(callback) {
        for (let i = 0; i < this.length; i++) {
            callback(this.get(i), i, this);
        }
    }
    map(callback) {
        const result = [];
        for (let i = 0; i < this.length; i++) {
            result.push(callback(this.get(i), i, this));
        }
        return result;
    }
    filter(callback) {
        const result = List.CreateEmpty(this.native.class);
        for (let i = 0; i < this.length; i++) {
            if (callback(this.get(i), i, this)) {
                result.add(this.get(i));
            }
        }
        return result;
    }
    find(callback) {
        for (let i = 0; i < this.length; i++) {
            if (callback(this.get(i), i, this))
                return this.get(i);
        }
    }
    findIndex(callback) {
        for (let i = 0; i < this.length; i++) {
            if (callback(this.get(i), i, this))
                return i;
        }
        return -1;
    }
    includes(element) {
        for (let i = 0; i < this.length; i++) {
            if (checkEquality(this.get(i), (element)))
                return true;
        }
        return false;
    }
}
export class KeyValuePair {
    get object() {
        return this.native;
    }
    key;
    value;
    constructor(key, value) {
        this.key = key;
        this.value = value;
    }
    static abstractify(nativeObject) {
        const nativeKey = nativeObject.field("key").value;
        const nativeValue = nativeObject.field("value").value;
        return new KeyValuePair(nativeKey, nativeValue);
    }
    deabstractify(keyKlass, valueKlass) {
        const nativeObj = native.KeyValuePair.inflate(keyKlass, valueKlass).alloc();
        nativeObj.method(".ctor", 2).invoke(this.key, this.value);
        return nativeObj;
    }
}
export class Dictionary {
    native;
    get object() {
        return this.native;
    }
    init() {
        throw new Error("Not implemented: use List.init() instead");
    }
    constructor(nativeDictionary) {
        this.native = nativeDictionary;
    }
    static abstractify(nativeObject) {
        return new Dictionary(nativeObject);
    }
    static CreateEmpty(klass1, klass2) {
        const nativeDictionary = native.Dictionary.inflate(klass1, klass2).alloc();
        nativeDictionary.method(".ctor", 0).invoke();
        return Dictionary.abstractify(nativeDictionary);
    }
    static Create(klass1, klass2, kvPairs) {
        const dictionary = this.CreateEmpty(klass1, klass2);
        for (const pair of kvPairs) {
            dictionary.set(pair.key, pair.value);
        }
        return dictionary;
    }
    get(key) {
        return this.native.method("get_Item", 1).invoke(key);
    }
    set(key, value) {
        this.native.method("set_Item", 2).invoke(key, value);
    }
    get count() {
        return this.native.method("get_Count", 0).invoke();
    }
    get keys() {
        const nativeKeys = this.native.method("get_Keys", 0).invoke();
        return AbstractedArray.abstractify(nativeKeys).toJSArray();
    }
    get values() {
        const nativeValues = this.native.method("get_Values", 0).invoke();
        return AbstractedArray.abstractify(nativeValues).toJSArray();
    }
    get kvPairs() {
        const result = [];
        for (const k of this.keys) {
            result.push(new KeyValuePair(k, this.get(k)));
        }
        return result;
    }
    forIn(callback) {
        for (const k of this.keys) {
            callback(this.get(k), k, this);
        }
    }
    forOfEntries(callback) {
        for (const pair of this.kvPairs) {
            callback(pair, this);
        }
    }
}
//# sourceMappingURL=collections.js.map