import { GameObject } from "./objects";

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
}