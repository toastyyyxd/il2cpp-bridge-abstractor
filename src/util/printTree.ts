/**
 * Modified from a Gist.
 * DM me on Discord or email me if you're the original writer of this script and you'd like to be credited.
 * Contact info on https://toasty.is-a.dev
 */

export interface Tree { name: string, children: readonly Tree[] }
type PrintNode<T> = (node: T, branch: string) => string | undefined;
type GetChildren<T> = (node: T) => T[];

export function printTree<T = Tree>(
    initialTree: T,
    printNode: PrintNode<T>,
    getChildren: GetChildren<T>,
    print: (str: string) => void = console.log
) {
    function printBranch(tree: T, branch: string) {
        const isGraphHead = branch.length === 0;
        const children = getChildren(tree) || [];

        let branchHead = '';

        if (!isGraphHead) {
            branchHead = children && children.length !== 0 ? '┬ ' : '─ ';
        }

        const toPrint = printNode(tree, `${branch}${branchHead}`);

        if (typeof toPrint === 'string') {
            print(`${branch}${branchHead}${toPrint}`);
        }

        let baseBranch = branch;

        if (!isGraphHead) {
            const isChildOfLastBranch = branch.slice(-2) === '└─';
            baseBranch = branch.slice(0, -2) + (isChildOfLastBranch ? '  ' : '│ ');
        }

        const nextBranch = baseBranch + '├─';
        const lastBranch = baseBranch + '└─';

        children.forEach((child, index) => {
            printBranch(child, children.length - 1 === index ? lastBranch : nextBranch);
        });
    }

    printBranch(initialTree, '');
}