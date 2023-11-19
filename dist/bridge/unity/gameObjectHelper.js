import { printTree } from "../../util/printTree.js";
import { Component, GameObject } from "./objects.js";
export class GameObjectHelper {
    static getGameObjectByPath(name) {
        const gameObjects = GameObject.FindObjectsOfType(GameObject.klass)
            .filter(go => go.transform.parent === undefined);
        let current = gameObjects.find(go => go.name === name.shift());
        while (name.length > 1) {
            if (current === undefined || current.object.handle.equals(0x0))
                return;
            current = current.transform.Find(name.shift()).gameObject;
        }
        if (current === undefined || current.object.handle.equals(0x0))
            return;
        return current;
    }
    static printTree(root = null) {
        let output = "";
        printTree(root, node => {
            if (node === null) {
                return "Scene root";
            }
            const componentNames = node.GetComponents(Component.klass).map(c => c.object.class.name);
            return `${node.name} (${componentNames.join(", ")})`;
        }, node => {
            if (node === null) {
                const allGameObjects = GameObject.FindObjectsOfType(GameObject.klass);
                return allGameObjects.filter(go => go.transform.parent === undefined);
            }
            const children = [];
            ;
            const childCount = node.transform.childCount;
            for (let i = 0; i < childCount; i++) {
                const child = node.transform.GetChild(i);
                children.push(child.gameObject);
            }
            return children;
        }, str => output += str + "\n");
        return output;
    }
}
//# sourceMappingURL=gameObjectHelper.js.map