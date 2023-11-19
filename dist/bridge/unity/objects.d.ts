import "frida-il2cpp-bridge";
import { AbstractedObject } from "../system/abstracted.js";
import * as math from "@math.gl/core";
export declare class UnityObject extends AbstractedObject {
    protected native: Il2Cpp.Object;
    get object(): Il2Cpp.Object;
    static init(): void;
    protected constructor(nativeObject: Il2Cpp.Object);
    static abstractify(nativeObject: Il2Cpp.Object): UnityObject;
    static Instantiate(obj: UnityObject): UnityObject;
    static Destroy(obj: UnityObject): void;
    static DestroyImmediate(obj: UnityObject): void;
    static DontDestroyOnLoad(obj: UnityObject): void;
    static FindObjectOfType(klass: Il2Cpp.Class): UnityObject;
    static FindObjectsOfType(klass: Il2Cpp.Class): UnityObject[];
    get name(): string;
    set name(v: string);
    GetInstanceID(): number;
    ToString(): string;
    toString(): string;
}
export declare class GameObject extends UnityObject {
    static get klass(): Il2Cpp.Class;
    constructor(nativeGameObject: Il2Cpp.Object);
    static Create(): GameObject;
    static abstractify(nativeGameObject: Il2Cpp.Object): GameObject;
    static Find(name: string): GameObject;
    protected _transform: Transform;
    get transform(): Transform;
    get activeSelf(): boolean;
    set activeSelf(v: boolean);
    get activeInHierarchy(): boolean;
    GetComponent(klass: Il2Cpp.Class): Component;
    GetComponentInChildren(klass: Il2Cpp.Class, includeInactive?: boolean): Component;
    GetComponentInParent(klass: Il2Cpp.Class, includeInactive?: boolean): Component;
    GetComponents(klass: Il2Cpp.Class): Component[];
    GetCommponentsInChildren(klass: Il2Cpp.Class, includeInactive?: boolean): Component[];
    GetComponentsInParent(klass: Il2Cpp.Class, includeInactive?: boolean): Component[];
    AddComponent(klass: Il2Cpp.Class): Component;
}
export declare class Component extends UnityObject {
    static get klass(): Il2Cpp.Class;
    static init(): void;
    constructor(nativeComponent: Il2Cpp.Object);
    static abstractify(nativeObject: Il2Cpp.Object): Component;
    get gameObject(): GameObject;
    get transform(): Transform;
}
export declare class Vector2 extends math.Vector3 {
    constructor(x: number, y: number);
    static abstractify(nativeObject: Il2Cpp.Object): Vector2;
    deabstractify(): Il2Cpp.Object;
}
export declare class Vector3 extends math.Vector3 {
    constructor(x: number, y: number, z: number);
    static abstractify(nativeObject: Il2Cpp.Object): Vector3;
    deabstractify(): Il2Cpp.Object;
}
export declare class Quaternion extends math.Quaternion {
    constructor(x: number, y: number, z: number, w: number);
    static abstractify(nativeObject: Il2Cpp.Object): Quaternion;
    deabstractify(): Il2Cpp.Object;
}
export declare class Transform extends Component {
    constructor(nativeTransform: Il2Cpp.Object);
    static abstractify(nativeObject: Il2Cpp.Object): Transform;
    get gameObject(): GameObject;
    get position(): Vector3;
    set position(value: Vector3);
    get localPosition(): Vector3;
    set localPosition(value: Vector3);
    get eulerAngles(): Vector3;
    set eulerAngles(value: Vector3);
    get localEulerAngles(): Vector3;
    set localEulerAngles(value: Vector3);
    get rotation(): Quaternion;
    set rotation(value: Quaternion);
    get localRotation(): Quaternion;
    set localRotation(value: Quaternion);
    get localScale(): Vector3;
    set localScale(value: Vector3);
    get lossyScale(): Vector3;
    get parent(): Transform | undefined;
    set parent(value: Transform);
    get childCount(): number;
    get right(): Vector3;
    get up(): Vector3;
    get forward(): Vector3;
    GetChild(index: number): Transform;
    Find(name: string): Transform;
}
