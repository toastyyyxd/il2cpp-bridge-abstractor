import { Component } from "./objects.js";
let native;
export class MonoBehaviour extends Component {
    static init() {
        const MonoBehaviour = Il2Cpp.domain.assembly("UnityEngine").image.class("UnityEngine.MonoBehaviour");
        native = {
            MonoBehaviour
        };
    }
    static get klass() {
        return native.MonoBehaviour;
    }
    static abstractify(nativeComponent) {
        return super.abstractify(nativeComponent);
    }
}
//# sourceMappingURL=monoBehaviour.js.map