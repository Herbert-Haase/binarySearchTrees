import { Node } from "./node.js";

class Tree {
  constructor(arr) {
    this.arr = arr;
    this.sortedArr = this.removeDuplicates(this.sortNumbers(arr));
    this.root = this.buildtree(this.sortedArr);
  }
  buildtree(arr) {
    if (arr.length < 2) {
      return new Node(arr[0], null, null);
    }
    const start = 0;
    const end = arr.length - 1;
    const middle = (start + end) / 2;
    const leftArr = arr.slice(0, middle);
    const rightArr = arr.slice(middle + 1);
    return new Node(
      arr[middle],
      this.buildtree(leftArr),
      this.buildtree(rightArr)
    );
  }
  removeDuplicates(arr) {
    return Array.from(new Set(arr));
  }
  sortNumbers(arr) {
    return arr.sort((a, b) => a - b);
  }
}

export { Tree };
