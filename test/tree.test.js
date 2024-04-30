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
    equal();
  });
});
