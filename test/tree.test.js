import { equal } from "assert";
import { deepEqual } from "assert";
import { Tree } from "../src/tree.js";

describe("tests", () => {
  let tree;
  beforeEach(() => {
    tree = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
  });
  it("removeDuplicates", () => {
    deepEqual(
      tree.removeDuplicates(tree.arr).sort(),
      [1, 7, 4, 23, 8, 3, 5, 9, 67, 6345, 324].sort()
    );
  });
  it("sortNumbers", () => {
    deepEqual(
      tree.sortNumbers(tree.arr),
      [1, 3, 4, 4, 5, 7, 7, 8, 9, 9, 23, 67, 324, 6345]
    );
  });
  it("root Node", () => {
    equal(tree.root.value, 8);
  });
  it("left & right Nodes", () => {
    equal(tree.root.left.value, 4);
    equal(tree.root.right.value, 67);
    equal(tree.root.left.left.left, undefined);
    equal(tree.root.left.right.value, 5);
    equal(tree.root.right.left.value, 9);
    equal(tree.root.right.right.value, 324);
  });
  it("checkForDuplicates", () => {
    equal(tree.checkForDuplicates(1), true);
    equal(tree.checkForDuplicates(4), true);
    equal(tree.checkForDuplicates(2), false);
  });
  it("insert", () => {
    tree.insert(2);
    equal(tree.root.left.left.right.left.value, 2);
  });
  it("find", () => {
    deepEqual(tree.find(8), tree.root);
    deepEqual(tree.find(4), tree.root.left);
    deepEqual(tree.find(67), tree.root.right);
  });
  it("deleteItem", () => {
    tree.deleteItem(23);
    equal(tree.root.right.left.right, null);
    tree.deleteItem(5);
    equal(tree.root.left.right.value, 7);
    tree.deleteItem(67);
    equal(tree.root.right.value, 324);
    tree.deleteItem(8);
    equal(tree.root.value, 9);
  });
  it("levelOrder", () => {
    const nodeList = [];
    tree.levelOrder((node) => {
      nodeList.push(node.value);
    });
    deepEqual(nodeList, [8, 4, 67, 1, 5, 9, 324, 3, 7, 23, 6345]);
    deepEqual(tree.levelOrder(), [8, 4, 67, 1, 5, 9, 324, 3, 7, 23, 6345]);
  });
  it("preOrder", () => {
    const nodeList = [];
    tree.preOrder((node) => {
      nodeList.push(node.value);
    });
    deepEqual(nodeList, [8, 4, 1, 3, 5, 7, 67, 9, 23, 324, 6345]);
    deepEqual(tree.preOrder(), [8, 4, 1, 3, 5, 7, 67, 9, 23, 324, 6345]);
  });
  it("postOrder", () => {
    const nodeList = [];
    tree.postOrder((node) => {
      nodeList.push(node.value);
    });
    deepEqual(nodeList, [3, 1, 7, 5, 4, 23, 9, 6345, 324, 67, 8]);
    deepEqual(tree.postOrder(), [3, 1, 7, 5, 4, 23, 9, 6345, 324, 67, 8]);
  });
  it("inOrder", () => {
    const nodeList = [];
    tree.inOrder((node) => {
      nodeList.push(node.value);
    });
    deepEqual(nodeList, [1, 3, 4, 5, 7, 8, 9, 23, 67, 324, 6345]);
    deepEqual(tree.inOrder(), [1, 3, 4, 5, 7, 8, 9, 23, 67, 324, 6345]);
  });
  it("height", () => {
    equal(tree.height(tree.find(1)), 2);
    equal(tree.height(), 4);
  });
  it("depth", () => {
    equal(tree.depth(tree.find(8)), 0);
    equal(tree.depth(tree.find(7)), 3);
  });
  it("isBalanced", () => {
    equal(tree.isBalanced(), true);
    tree.deleteItem(7);
    tree.deleteItem(3);
    equal(tree.isBalanced(), true);
    tree.deleteItem(5);
    tree.deleteItem(1);
    equal(tree.isBalanced(), false);
  });
  after(() => {
    const prettyPrint = (node, prefix = "", isLeft = true) => {
      if (node === null) {
        return;
      }
      if (node.right !== null) {
        prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
      }
      console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);
      if (node.left !== null) {
        prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
      }
    };
    prettyPrint(tree.root);
  });
});
