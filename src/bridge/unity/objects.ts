import "frida-il2cpp-bridge";
import { AbstractedArray, AbstractedObject } from "../system/abstracted.js";
import * as math from "@math.gl/core";

let native: {
    GameObject: Il2Cpp.Class;
    Component: Il2Cpp.Class;
    Vector2: Il2Cpp.Class;
    Vector3: Il2Cpp.Class;
    Quaternion: Il2Cpp.Class;
    Transform: Il2Cpp.Class;
};

// Base UnityEngine.Object
export class UnityObject extends AbstractedObject {
    // Override AbstractedObject's native & object to be of type Il2Cpp.Object
    protected declare native: Il2Cpp.Object;
    public get object(): Il2Cpp.Object {
        return this.native;
    }

    public static init(): void {
        const GameObject = Il2Cpp.domain.assembly("UnityEngine").image.class("UnityEngine.GameObject");
        const Component = Il2Cpp.domain.assembly("UnityEngine").image.class("UnityEngine.Component");
        const Vector2 = Il2Cpp.domain.assembly("UnityEngine.CoreModule").image.class("UnityEngine.Vector2");
        const Vector3 = Il2Cpp.domain.assembly("UnityEngine.CoreModule").image.class("UnityEngine.Vector3");
        const Quaternion = Il2Cpp.domain.assembly("UnityEngine.CoreModule").image.class("UnityEngine.Quaternion");
        const Transform = Il2Cpp.domain.assembly("UnityEngine.CoreModule").image.class("UnityEngine.Transform");
        native = {
            GameObject,
            Component,
            Vector2,
            Vector3,
            Quaternion,
            Transform
        }
    }
    
    protected constructor(nativeObject: Il2Cpp.Object) {
        super(nativeObject);
    }
    public static abstractify(nativeObject: Il2Cpp.Object): UnityObject {
        if (nativeObject.class.equals(native.GameObject)) {
            return GameObject.abstractify(nativeObject);
        } else if (nativeObject.class.equals(native.Component)) {
            return Component.abstractify(nativeObject);
        } else {
            return new UnityObject(nativeObject);
        }
    }

    public static Instantiate(obj: UnityObject): UnityObject {
        const nativeRes = native.GameObject.method<Il2Cpp.Object>("Instantiate", 1)
            .inflate(obj.native.class)
            .invoke(obj.native);
        return UnityObject.abstractify(nativeRes);
    }
    public static Destroy(obj: UnityObject): void {
        obj.native.method("Destroy").invoke();
        obj.native = new Il2Cpp.Object(NULL);
    }
    public static DestroyImmediate(obj: UnityObject): void {
        obj.native.method("DestroyImmediate").invoke();
        obj.native = new Il2Cpp.Object(NULL);
    }
    public static DontDestroyOnLoad(obj: UnityObject): void {
        obj.native.method("DontDestroyOnLoad").invoke();
    }
    public static FindObjectOfType(klass: Il2Cpp.Class): UnityObject {
        const nativeRes = native.GameObject.method<Il2Cpp.Object>("FindObjectOfType", 0)
            .inflate(klass)
            .invoke();
        return UnityObject.abstractify(nativeRes);
    }
    public static FindObjectsOfType(klass: Il2Cpp.Class): UnityObject[] {
        const nativeRes = native.GameObject.method<Il2Cpp.Array<Il2Cpp.Object>>("FindObjectsOfType", 0)
            .inflate(klass)
            .invoke();
        return new AbstractedArray<Il2Cpp.Object>(nativeRes)
            .ToAbstractedJSArray<UnityObject>(UnityObject.abstractify);
    }

    public get name(): string {
        return this.native.method<Il2Cpp.String>("get_name").invoke().content!;
    }
    public set name(v: string) {
        this.native.method("set_name").invoke(Il2Cpp.string(v));
    }

    public GetInstanceID(): number {
        return this.native.method<number>("GetInstanceID").invoke();
    }
    public ToString(): string {
        return this.native.method<Il2Cpp.String>("ToString").invoke().content!;
    }
    public toString() { return this.ToString(); }
}


// GameObjects
export class GameObject extends UnityObject {
    public static get klass(): Il2Cpp.Class {
        return native.GameObject;
    }

    public constructor(nativeGameObject: Il2Cpp.Object) {
        super(nativeGameObject);
        const nativeTransform = nativeGameObject.method<Il2Cpp.Object>("get_transform").invoke();
        this._transform = Transform.abstractify(nativeTransform);
    }
    public static Create(): GameObject {
        const nativeRes = native.GameObject.alloc();
        nativeRes.method<Il2Cpp.Object>(".ctor", 0).invoke();
        return GameObject.abstractify(nativeRes);
    }

    public static abstractify(nativeGameObject: Il2Cpp.Object): GameObject {
        return super.abstractify(nativeGameObject) as GameObject;
    }

    public static Find(name: string): GameObject {
        const nativeRes = native.GameObject.method<Il2Cpp.Object>("Find", 1)
            .invoke(Il2Cpp.string(name));
        return GameObject.abstractify(nativeRes);
    }

    protected _transform: Transform;
    public get transform(): Transform {
        return this._transform;
    }
    public get activeSelf(): boolean {
        return this.native.method<boolean>("get_activeSelf").invoke();
    }
    public set activeSelf(v: boolean) {
        this.native.method("SetActive").invoke(v);
    }
    public get activeInHierarchy(): boolean {
        return this.native.method<boolean>("get_activeInHierarchy").invoke();
    }

    public GetComponent(klass: Il2Cpp.Class): Component {
        const nativeRes = this.native.method<Il2Cpp.Object>("GetComponent", 0)
            .inflate(klass)
            .invoke();
        return Component.abstractify(nativeRes);
    }
    public GetComponentInChildren(klass: Il2Cpp.Class, includeInactive: boolean = true): Component {
        const nativeRes = this.native.method<Il2Cpp.Object>("GetComponentInChildren", 1)
            .overload("System.Boolean").inflate(klass)
            .invoke(includeInactive);
        return Component.abstractify(nativeRes);
    }
    public GetComponentInParent(klass: Il2Cpp.Class, includeInactive: boolean = true): Component {
        const nativeRes = this.native.method<Il2Cpp.Object>("GetComponentInParent", 1)
            .overload("System.Boolean").inflate(klass)
            .invoke(klass.type.object, includeInactive);
        return Component.abstractify(nativeRes);
    }
    public GetComponents(klass: Il2Cpp.Class): Component[] {
        const nativeRes = this.native.method<Il2Cpp.Array<Il2Cpp.Object>>("GetComponents", 0)
            .inflate(klass)
            .invoke();
        return new AbstractedArray<Il2Cpp.Object>(nativeRes)
        .ToAbstractedJSArray<Component>(Component.abstractify);
    }
    public GetCommponentsInChildren(klass: Il2Cpp.Class, includeInactive: boolean = true): Component[] {
        const nativeRes = this.native.method<Il2Cpp.Array<Il2Cpp.Object>>("GetCommponentsInChildren", 1)
            .overload("System.Boolean").inflate(klass)
            .invoke(includeInactive);
        return new AbstractedArray<Il2Cpp.Object>(nativeRes)
        .ToAbstractedJSArray<Component>(Component.abstractify);
    }
    public GetComponentsInParent(klass: Il2Cpp.Class, includeInactive: boolean = true): Component[] {
        const nativeRes = this.native.method<Il2Cpp.Array<Il2Cpp.Object>>("GetComponentsInParent", 1)
            .overload("System.Boolean").inflate(klass)
            .invoke(includeInactive);
        return new AbstractedArray<Il2Cpp.Object>(nativeRes)
        .ToAbstractedJSArray<Component>(Component.abstractify);
    }
    public AddComponent(klass: Il2Cpp.Class): Component {
        const nativeRes = this.native.method<Il2Cpp.Object>("AddComponent", 0)
            .inflate(klass)
            .invoke();
        return Component.abstractify(nativeRes);
    }
}

export class Component extends UnityObject {
    public static get klass(): Il2Cpp.Class {
        return native.Component;
    }
    public static init(): void {
        throw new Error("Not implemented: use UnityObject.init() instead");
    }

    public constructor(nativeComponent: Il2Cpp.Object) {
        super(nativeComponent);
    }
    public static abstractify(nativeObject: Il2Cpp.Object): Component {
        return super.abstractify(nativeObject) as Component;
    }

    public get gameObject(): GameObject {
        const nativeRes = this.native.method<Il2Cpp.Object>("get_gameObject").invoke();
        return GameObject.abstractify(nativeRes);
    }
    public get transform(): Transform {
        const nativeRes = this.native.method<Il2Cpp.Object>("get_transform").invoke();
        return Transform.abstractify(nativeRes);
    }
}

// Transforms and vectors
export class Vector2 extends math.Vector3   {
    public constructor(x: number, y: number) {
        super(x, y, 0);
    }
    public static abstractify(nativeObject: Il2Cpp.Object): Vector2 {
        const x = nativeObject.field<number>("x").value;
        const y = nativeObject.field<number>("y").value;
        return new Vector2(x, y);
    }
    public deabstractify(): Il2Cpp.Object {
        const nativeObj = native.Vector2.alloc();
        nativeObj.method("ctor", 2).invoke(super.x, super.y);
        return nativeObj;
    }
}
export class Vector3 extends math.Vector3 {
    public constructor(x: number, y: number, z: number) {
        super(x, y, z);
    }
    public static abstractify(nativeObject: Il2Cpp.Object): Vector3 {
        const x = nativeObject.field<number>("x").value;
        const y = nativeObject.field<number>("y").value;
        const z = nativeObject.field<number>("z").value;
        return new Vector3(x, y, z);
    }
    public deabstractify(): Il2Cpp.Object {
        const nativeObj = native.Vector3.alloc();
        nativeObj.method("ctor", 3).invoke(super.x, super.y, super.z);
        return nativeObj;
    }
}
export class Quaternion extends math.Quaternion {
    public constructor(x: number, y: number, z: number, w: number) {
        super(x, y, z, w);
    }
    public static abstractify(nativeObject: Il2Cpp.Object): Quaternion {
        const x = nativeObject.field<number>("x").value;
        const y = nativeObject.field<number>("y").value;
        const z = nativeObject.field<number>("z").value;
        const w = nativeObject.field<number>("w").value;
        return new Quaternion(x, y, z, w);
    }
    public deabstractify(): Il2Cpp.Object {
        const nativeObj = native.Quaternion.alloc();
        nativeObj.method("ctor", 4).invoke(super.x, super.y, super.z, super.w);
        return nativeObj;
    }
}
export class Transform extends Component {
    public constructor(nativeTransform: Il2Cpp.Object) {
        super(nativeTransform);
    }
    public static abstractify(nativeObject: Il2Cpp.Object): Transform {
        return new Transform(nativeObject);
    }

    public get gameObject(): GameObject {
        return GameObject.abstractify(this.native.method<Il2Cpp.Object>("get_gameObject").invoke());
    }

    public get position(): Vector3 {
        return Vector3.abstractify(this.native.method<Il2Cpp.Object>("get_position").invoke());
    }
    public set position(value: Vector3) {
        this.native.method("set_position").invoke(value.deabstractify());
    }
    public get localPosition(): Vector3 {
        return Vector3.abstractify(this.native.method<Il2Cpp.Object>("get_localPosition").invoke());
    }
    public set localPosition(value: Vector3) {
        this.native.method("set_localPosition").invoke(value.deabstractify());
    }
    public get eulerAngles(): Vector3 {
        return Vector3.abstractify(this.native.method<Il2Cpp.Object>("get_eulerAngles").invoke());
    }
    public set eulerAngles(value: Vector3) {
        this.native.method("set_eulerAngles").invoke(value.deabstractify());
    }
    public get localEulerAngles(): Vector3 {
        return Vector3.abstractify(this.native.method<Il2Cpp.Object>("get_localEulerAngles").invoke());
    }
    public set localEulerAngles(value: Vector3) {
        this.native.method("set_localEulerAngles").invoke(value.deabstractify());
    }
    public get rotation(): Quaternion {
        return Quaternion.abstractify(this.native.method<Il2Cpp.Object>("get_rotation").invoke());
    }
    public set rotation(value: Quaternion) {
        this.native.method("set_rotation").invoke(value.deabstractify());
    }
    public get localRotation(): Quaternion {
        return Quaternion.abstractify(this.native.method<Il2Cpp.Object>("get_localRotation").invoke());
    }
    public set localRotation(value: Quaternion) {
        this.native.method("set_localRotation").invoke(value.deabstractify());
    }
    public get localScale(): Vector3 {
        return Vector3.abstractify(this.native.method<Il2Cpp.Object>("get_localScale").invoke());
    }
    public set localScale(value: Vector3) {
        this.native.method("set_localScale").invoke(value.deabstractify());
    }
    public get lossyScale(): Vector3 {
        return Vector3.abstractify(this.native.method<Il2Cpp.Object>("get_lossyScale").invoke());
    }
    public get parent(): Transform | undefined {
        const nativeRes = this.native.method<Il2Cpp.Object>("get_parent").invoke();
        return !nativeRes.handle.equals(0x0) ? Transform.abstractify(nativeRes) : undefined;
    }
    public set parent(value: Transform) {
        this.native.method("set_parent").invoke(value.object);
    }
    public get childCount(): number {
        return this.native.method<number>("get_childCount").invoke();
    }

    public get right(): Vector3 {
        return Vector3.abstractify(this.native.method<Il2Cpp.Object>("get_right").invoke());
    }
    public get up(): Vector3 {
        return Vector3.abstractify(this.native.method<Il2Cpp.Object>("get_up").invoke());
    }
    public get forward(): Vector3 {
        return Vector3.abstractify(this.native.method<Il2Cpp.Object>("get_forward").invoke());
    }

    public GetChild(index: number): Transform {
        return Transform.abstractify(this.native.method<Il2Cpp.Object>("GetChild", 1)
            .invoke(index));
    }
    public Find(name: string): Transform {
        const nativeRes = native.Transform.method<Il2Cpp.Object>("Find", 1)
            .invoke(Il2Cpp.string(name));
        return Transform.abstractify(nativeRes);
    }
}