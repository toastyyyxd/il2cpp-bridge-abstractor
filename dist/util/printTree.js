/**
 * Modified from a Gist.
 * DM me on Discord or email me if you're the original writer of this script and you'd like to be credited.
 * Contact info on https://toasty.is-a.dev
 */
export function printTree(initialTree, printNode, getChildren, print = console.log) {
    function printBranch(tree, branch) {
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
//# sourceMappingURL=printTree.js.map