import { GameObject } from "./objects.js";
export declare class GameObjectHelper {
    static getGameObjectByPath(name: string[]): GameObject | undefined;
    static printTree(root?: GameObject | null): string;
}
