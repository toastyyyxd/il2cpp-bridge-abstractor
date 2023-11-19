/**
 * Modified from a Gist.
 * DM me on Discord or email me if you're the original writer of this script and you'd like to be credited.
 * Contact info on https://toasty.is-a.dev
 */
export interface Tree {
    name: string;
    children: readonly Tree[];
}
type PrintNode<T> = (node: T, branch: string) => string | undefined;
type GetChildren<T> = (node: T) => T[];
export declare function printTree<T = Tree>(initialTree: T, printNode: PrintNode<T>, getChildren: GetChildren<T>, print?: (str: string) => void): void;
export {};
