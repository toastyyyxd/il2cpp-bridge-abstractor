import { Component } from "./objects";

let native: {
    MonoBehaviour: Il2Cpp.Class;
}

export class MonoBehaviour extends Component {
    public static init() {
        const MonoBehaviour = Il2Cpp.domain.assembly("UnityEngine").image.class("UnityEngine.MonoBehaviour");
        native = {
            MonoBehaviour
        }
    }

    public static get klass() {
        return native.MonoBehaviour;
    }

    public static abstractify(nativeComponent: Il2Cpp.Object): MonoBehaviour {
        return super.abstractify(nativeComponent) as MonoBehaviour;
    }
    public static abstractifyArray(nativeComponents: Il2Cpp.Array<Il2Cpp.Object>): Component[] {
        return super.abstractifyArray(nativeComponents) as Component[];
    }
}