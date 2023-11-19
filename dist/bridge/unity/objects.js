import "frida-il2cpp-bridge";
import { AbstractedArray, AbstractedObject } from "../system/abstracted.js";
import * as math from "@math.gl/core";
let native;
// Base UnityEngine.Object
export class UnityObject extends AbstractedObject {
    get object() {
        return this.native;
    }
    static init() {
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
        };
    }
    constructor(nativeObject) {
        super(nativeObject);
    }
    static abstractify(nativeObject) {
        if (nativeObject.class.equals(native.GameObject)) {
            return GameObject.abstractify(nativeObject);
        }
        else if (nativeObject.class.equals(native.Component)) {
            return Component.abstractify(nativeObject);
        }
        else {
            return new UnityObject(nativeObject);
        }
    }
    static Instantiate(obj) {
        const nativeRes = native.GameObject.method("Instantiate", 1)
            .inflate(obj.native.class)
            .invoke(obj.native);
        return UnityObject.abstractify(nativeRes);
    }
    static Destroy(obj) {
        obj.native.method("Destroy").invoke();
        obj.native = new Il2Cpp.Object(NULL);
    }
    static DestroyImmediate(obj) {
        obj.native.method("DestroyImmediate").invoke();
        obj.native = new Il2Cpp.Object(NULL);
    }
    static DontDestroyOnLoad(obj) {
        obj.native.method("DontDestroyOnLoad").invoke();
    }
    static FindObjectOfType(klass) {
        const nativeRes = native.GameObject.method("FindObjectOfType", 0)
            .inflate(klass)
            .invoke();
        return UnityObject.abstractify(nativeRes);
    }
    static FindObjectsOfType(klass) {
        const nativeRes = native.GameObject.method("FindObjectsOfType", 0)
            .inflate(klass)
            .invoke();
        return new AbstractedArray(nativeRes)
            .ToAbstractedJSArray(UnityObject.abstractify);
    }
    get name() {
        return this.native.method("get_name").invoke().content;
    }
    set name(v) {
        this.native.method("set_name").invoke(Il2Cpp.string(v));
    }
    GetInstanceID() {
        return this.native.method("GetInstanceID").invoke();
    }
    ToString() {
        return this.native.method("ToString").invoke().content;
    }
    toString() { return this.ToString(); }
}
// GameObjects
export class GameObject extends UnityObject {
    static get klass() {
        return native.GameObject;
    }
    constructor(nativeGameObject) {
        super(nativeGameObject);
        const nativeTransform = nativeGameObject.method("get_transform").invoke();
        this._transform = Transform.abstractify(nativeTransform);
    }
    static Create() {
        const nativeRes = native.GameObject.alloc();
        nativeRes.method(".ctor", 0).invoke();
        return GameObject.abstractify(nativeRes);
    }
    static abstractify(nativeGameObject) {
        return super.abstractify(nativeGameObject);
    }
    static Find(name) {
        const nativeRes = native.GameObject.method("Find", 1)
            .invoke(Il2Cpp.string(name));
        return GameObject.abstractify(nativeRes);
    }
    _transform;
    get transform() {
        return this._transform;
    }
    get activeSelf() {
        return this.native.method("get_activeSelf").invoke();
    }
    set activeSelf(v) {
        this.native.method("SetActive").invoke(v);
    }
    get activeInHierarchy() {
        return this.native.method("get_activeInHierarchy").invoke();
    }
    GetComponent(klass) {
        const nativeRes = this.native.method("GetComponent", 0)
            .inflate(klass)
            .invoke();
        return Component.abstractify(nativeRes);
    }
    GetComponentInChildren(klass, includeInactive = true) {
        const nativeRes = this.native.method("GetComponentInChildren", 1)
            .overload("System.Boolean").inflate(klass)
            .invoke(includeInactive);
        return Component.abstractify(nativeRes);
    }
    GetComponentInParent(klass, includeInactive = true) {
        const nativeRes = this.native.method("GetComponentInParent", 1)
            .overload("System.Boolean").inflate(klass)
            .invoke(klass.type.object, includeInactive);
        return Component.abstractify(nativeRes);
    }
    GetComponents(klass) {
        const nativeRes = this.native.method("GetComponents", 0)
            .inflate(klass)
            .invoke();
        return new AbstractedArray(nativeRes)
            .ToAbstractedJSArray(Component.abstractify);
    }
    GetCommponentsInChildren(klass, includeInactive = true) {
        const nativeRes = this.native.method("GetCommponentsInChildren", 1)
            .overload("System.Boolean").inflate(klass)
            .invoke(includeInactive);
        return new AbstractedArray(nativeRes)
            .ToAbstractedJSArray(Component.abstractify);
    }
    GetComponentsInParent(klass, includeInactive = true) {
        const nativeRes = this.native.method("GetComponentsInParent", 1)
            .overload("System.Boolean").inflate(klass)
            .invoke(includeInactive);
        return new AbstractedArray(nativeRes)
            .ToAbstractedJSArray(Component.abstractify);
    }
    AddComponent(klass) {
        const nativeRes = this.native.method("AddComponent", 0)
            .inflate(klass)
            .invoke();
        return Component.abstractify(nativeRes);
    }
}
export class Component extends UnityObject {
    static get klass() {
        return native.Component;
    }
    static init() {
        throw new Error("Not implemented: use UnityObject.init() instead");
    }
    constructor(nativeComponent) {
        super(nativeComponent);
    }
    static abstractify(nativeObject) {
        return super.abstractify(nativeObject);
    }
    get gameObject() {
        const nativeRes = this.native.method("get_gameObject").invoke();
        return GameObject.abstractify(nativeRes);
    }
    get transform() {
        const nativeRes = this.native.method("get_transform").invoke();
        return Transform.abstractify(nativeRes);
    }
}
// Transforms and vectors
export class Vector2 extends math.Vector3 {
    constructor(x, y) {
        super(x, y, 0);
    }
    static abstractify(nativeObject) {
        const x = nativeObject.field("x").value;
        const y = nativeObject.field("y").value;
        return new Vector2(x, y);
    }
    deabstractify() {
        const nativeObj = native.Vector2.alloc();
        nativeObj.method("ctor", 2).invoke(super.x, super.y);
        return nativeObj;
    }
}
export class Vector3 extends math.Vector3 {
    constructor(x, y, z) {
        super(x, y, z);
    }
    static abstractify(nativeObject) {
        const x = nativeObject.field("x").value;
        const y = nativeObject.field("y").value;
        const z = nativeObject.field("z").value;
        return new Vector3(x, y, z);
    }
    deabstractify() {
        const nativeObj = native.Vector3.alloc();
        nativeObj.method("ctor", 3).invoke(super.x, super.y, super.z);
        return nativeObj;
    }
}
export class Quaternion extends math.Quaternion {
    constructor(x, y, z, w) {
        super(x, y, z, w);
    }
    static abstractify(nativeObject) {
        const x = nativeObject.field("x").value;
        const y = nativeObject.field("y").value;
        const z = nativeObject.field("z").value;
        const w = nativeObject.field("w").value;
        return new Quaternion(x, y, z, w);
    }
    deabstractify() {
        const nativeObj = native.Quaternion.alloc();
        nativeObj.method("ctor", 4).invoke(super.x, super.y, super.z, super.w);
        return nativeObj;
    }
}
export class Transform extends Component {
    constructor(nativeTransform) {
        super(nativeTransform);
    }
    static abstractify(nativeObject) {
        return new Transform(nativeObject);
    }
    get gameObject() {
        return GameObject.abstractify(this.native.method("get_gameObject").invoke());
    }
    get position() {
        return Vector3.abstractify(this.native.method("get_position").invoke());
    }
    set position(value) {
        this.native.method("set_position").invoke(value.deabstractify());
    }
    get localPosition() {
        return Vector3.abstractify(this.native.method("get_localPosition").invoke());
    }
    set localPosition(value) {
        this.native.method("set_localPosition").invoke(value.deabstractify());
    }
    get eulerAngles() {
        return Vector3.abstractify(this.native.method("get_eulerAngles").invoke());
    }
    set eulerAngles(value) {
        this.native.method("set_eulerAngles").invoke(value.deabstractify());
    }
    get localEulerAngles() {
        return Vector3.abstractify(this.native.method("get_localEulerAngles").invoke());
    }
    set localEulerAngles(value) {
        this.native.method("set_localEulerAngles").invoke(value.deabstractify());
    }
    get rotation() {
        return Quaternion.abstractify(this.native.method("get_rotation").invoke());
    }
    set rotation(value) {
        this.native.method("set_rotation").invoke(value.deabstractify());
    }
    get localRotation() {
        return Quaternion.abstractify(this.native.method("get_localRotation").invoke());
    }
    set localRotation(value) {
        this.native.method("set_localRotation").invoke(value.deabstractify());
    }
    get localScale() {
        return Vector3.abstractify(this.native.method("get_localScale").invoke());
    }
    set localScale(value) {
        this.native.method("set_localScale").invoke(value.deabstractify());
    }
    get lossyScale() {
        return Vector3.abstractify(this.native.method("get_lossyScale").invoke());
    }
    get parent() {
        const nativeRes = this.native.method("get_parent").invoke();
        return !nativeRes.handle.equals(0x0) ? Transform.abstractify(nativeRes) : undefined;
    }
    set parent(value) {
        this.native.method("set_parent").invoke(value.object);
    }
    get childCount() {
        return this.native.method("get_childCount").invoke();
    }
    get right() {
        return Vector3.abstractify(this.native.method("get_right").invoke());
    }
    get up() {
        return Vector3.abstractify(this.native.method("get_up").invoke());
    }
    get forward() {
        return Vector3.abstractify(this.native.method("get_forward").invoke());
    }
    GetChild(index) {
        return Transform.abstractify(this.native.method("GetChild", 1)
            .invoke(index));
    }
    Find(name) {
        const nativeRes = native.Transform.method("Find", 1)
            .invoke(Il2Cpp.string(name));
        return Transform.abstractify(nativeRes);
    }
}
//# sourceMappingURL=objects.js.map