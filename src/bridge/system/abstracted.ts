
export class AbstractedObject {
    protected native: Il2Cpp.Field.Type;
    public get object(): Il2Cpp.Field.Type {
        return this.native;
    }

    protected constructor(nativeObject: Il2Cpp.Field.Type) {
        this.native = nativeObject;
    }
    protected static abstractify(nativeObject: Il2Cpp.Field.Type): AbstractedObject {
        return new AbstractedObject(nativeObject);
    }
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
export class AbstractedArray<T extends Il2Cpp.Field.Type> extends AbstractedObject implements ICollection<T> {
    private nativeArray: Il2Cpp.Array;
    public get array(): Il2Cpp.Array {
        return this.nativeArray;
    }

    public constructor(nativeArray: Il2Cpp.Array) {
        super(nativeArray.object);
        this.nativeArray = nativeArray;
    }
    public static abstractify<T extends Il2Cpp.Field.Type>(nativeObject: Il2Cpp.Array<T>): AbstractedArray<T> {
        return new AbstractedArray(nativeObject as Il2Cpp.Array<T>);
    }
    public static createEmpty<T extends Il2Cpp.Field.Type>(klass: Il2Cpp.Class, length: number): AbstractedArray<T> {
        return AbstractedArray.abstractify(Il2Cpp.array(klass, length));
    }
    public static create<T extends Il2Cpp.Field.Type>(klass: Il2Cpp.Class, elements: T[]): AbstractedArray<T> {
        return AbstractedArray.abstractify<T>(Il2Cpp.array(klass, elements));
    }

    public get(index: number): T {
        return this.nativeArray.get(index) as T;
    }
    public set(index: number, value: T) {
        this.nativeArray.set(index, value);
    }
    public get length(): number {
        return this.nativeArray.length;
    }

    public forEach(callback: (value: T, index: number, array: AbstractedArray<T>) => void) {
        for (let i = 0; i < this.length; i++) {
            callback(this.get(i), i, this);
        }
    }
    public map<U>(callback: (value: T, index: number, array: AbstractedArray<T>) => U): U[] {
        const result: U[] = [];
        for (let i = 0; i < this.length; i++) {
            result.push(callback(this.get(i), i, this));
        }
        return result;
    }
    public filter(callback: (value: T, index: number, array: AbstractedArray<T>) => boolean): AbstractedArray<T> {
        const result: T[] = [];
        for (let i = 0; i < this.length; i++) {
            if (callback(this.get(i), i, this)) result.push(this.get(i));
        }
        return AbstractedArray.create<T>(this.nativeArray.elementType.class, result);
    }
    public find(callback: (value: T, index: number, array: AbstractedArray<T>) => boolean): T | undefined {
        for (let i = 0; i < this.length; i++) {
            if (callback(this.get(i), i, this)) return this.get(i);
        }
    }
    public findIndex(callback: (value: T, index: number, array: AbstractedArray<T>) => boolean): number {
        for (let i = 0; i < this.length; i++) {
            if (callback(this.get(i), i, this)) return i;
        }
        return -1;
    }
    public includes(element: T): boolean {
        for (let i = 0; i < this.length; i++) {
            const e = this.get(i);
            if (e instanceof NativeStruct &&
                element instanceof NativeStruct &&
                e.handle.equals(element.handle))
                return true; // NativeStructs are compared by handle
            else if (e === element) return true; // Other types are compared by value
        }
        return false;
    }

    public toJSArray(): T[] {
        return this.map<T>(e=>e);
    }
}
