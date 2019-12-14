import { Element } from './element';
import { Bounds } from './bounds';
import { TreeNode } from './treenode';
import { KDTreeNode } from './kd-treenode';

export class Algorithm {
    // initial elements to be put on the surface
    elements: Element[] = [];

    // tree datastructure representing the elements
    tree: TreeNode;

    constructor() {
        this.initExampleElements();
    }

    /**
     * Creates example areas
     */
    private initExampleElements(): void {
        for (let i = 1; i < 5; i++) {
            this.elements.push(new Element(new Bounds(i, i)));
        }
        // Sort areas in descending order
        this.elements.sort((a, b) =>
             (a.bounds.x + a.bounds.y > b.bounds.x + b.bounds.y) ? -1 : 1
        );
    }

    renderTreeNode(node: KDTreeNode): void {
        if (!!node) {

        }
    }

    createLayout(): void {
        this.tree = new TreeNode();
        const sumOfAllElementBounds = this.elements.map(x => x.bounds).reduce((prev, cur) => {
            return new Bounds(prev.x + cur.x, prev.y + cur.y);
        });
        this.tree.bounds = sumOfAllElementBounds;
        let coverage = new Bounds(0, 0);

        // Check for all nodes if element fits and calculate "waste" if placed in there.
        this.elements.forEach((element) => {
            let emptyNodes = this.getEmptyNodes([], this.tree);
            for (let i = 0; i < emptyNodes.length; i++) {
                // Check for each leaf how much space would be allocated when node is splitted.
                let leafNode = emptyNodes[i];

                if (leafNode.bounds.fits(element.bounds)) {
                    // Element does fit into leafnode
                    // Try to split using x axis first
                    let splittedBounds = leafNode.bounds.splitAtAxisX(element.bounds.x);
                    
                } else {
                    // Element does not fit

                }
            }
        });

    }

    /**
     * Retreves empty leaf nodes of a tree node recusively.
     */
    getEmptyNodes(result: TreeNode[], node: TreeNode): TreeNode[] {
        if (node !== null || node !== undefined) {
            if (!Array.isArray(node.children)) {
                // No children nodes, Check whether node is an element
                if (!node.element) {
                    // Empty leaf node
                    result.push(node);
                }
            } else {
                // Node has children
                node.children.forEach((child) => {
                    this.getEmptyNodes(result, child);
                });
            }
        }
        return result;
    }
}