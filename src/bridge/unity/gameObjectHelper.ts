import { printTree } from "../../util/printTree.js";
import { Component, GameObject } from "./objects.js";

export class GameObjectHelper {
    public static getGameObjectByPath(name: string[]): GameObject | undefined {
        const gameObjects = (GameObject.FindObjectsOfType(GameObject.klass) as GameObject[])
            .filter(go=>go.transform.parent === undefined) as GameObject[];
        let current = gameObjects.find(go=>go.name === name.shift());
        
        while (name.length > 1) {
            if (current === undefined || current.object.handle.equals(0x0)) return;
            current = current.transform.Find(name.shift()!).gameObject;
        }
        if (current === undefined || current.object.handle.equals(0x0)) return;
        return current;
    }
    public static printTree(root: GameObject | null = null) {
        let output = "";
        printTree<GameObject | null>(
            root,
            node=> {
                if (node === null) {
                    return "Scene root";
                }
                const componentNames = node.GetComponents(Component.klass).map(c=>c.object.class.name);
                return `${node.name} (${componentNames.join(", ")})`;
            },
            node=>{
                if (node === null) {
                    const allGameObjects = GameObject.FindObjectsOfType(GameObject.klass) as GameObject[];
                    return allGameObjects.filter(go=>go.transform.parent === undefined);
                }
                const children: GameObject[] = [];;
                const childCount = node.transform.childCount;
                for (let i = 0; i < childCount; i++) {
                    const child = node.transform.GetChild(i);
                    children.push(child.gameObject);
                }
                return children;
            },
            str => output += str + "\n"
        );
    }
}