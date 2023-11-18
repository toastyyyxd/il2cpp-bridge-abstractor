import { Component } from "./objects.js";

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
}