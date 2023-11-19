export class AbstractedObject {
    native;
    get object() {
        return this.native;
    }
    constructor(nativeObject) {
        this.native = nativeObject;
    }
    static abstractify(nativeObject) {
        return new AbstractedObject(nativeObject);
    }
}
export class AbstractedArray extends AbstractedObject {
    nativeArray;
    get array() {
        return this.nativeArray;
    }
    constructor(nativeArray) {
        super(nativeArray.object);
        this.nativeArray = nativeArray;
    }
    static abstractify(nativeObject) {
        return new AbstractedArray(nativeObject);
    }
    static createEmpty(klass, length) {
        return AbstractedArray.abstractify(Il2Cpp.array(klass, length));
    }
    static create(klass, elements) {
        return AbstractedArray.abstractify(Il2Cpp.array(klass, elements));
    }
    get(index) {
        return this.nativeArray.get(index);
    }
    set(index, value) {
        this.nativeArray.set(index, value);
    }
    get length() {
        return this.nativeArray.length;
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
        const result = [];
        for (let i = 0; i < this.length; i++) {
            if (callback(this.get(i), i, this))
                result.push(this.get(i));
        }
        return AbstractedArray.create(this.nativeArray.elementType.class, result);
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
            const e = this.get(i);
            if (e instanceof NativeStruct &&
                element instanceof NativeStruct &&
                e.handle.equals(element.handle))
                return true; // NativeStructs are compared by handle
            else if (e === element)
                return true; // Other types are compared by value
        }
        return false;
    }
    toJSArray() {
        return this.map(e => e);
    }
    ToAbstractedJSArray(abstractor) {
        return this.map(e => abstractor(e));
    }
}
//# sourceMappingURL=abstracted.js.map