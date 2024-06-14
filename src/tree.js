import { Node } from "./node.js";

class Tree {
  constructor(arr) {
    this.arr = arr;
    this.sortedArr = this.removeDuplicates(this.sortNumbers(arr));
    this.root = this.buildtree(this.sortedArr);
  }
  buildtree(arr) {
    if (arr.length === 1) {
      return new Node(arr[0]);
    } else if (arr.length === 2) {
      return new Node(arr[0], null, new Node(arr[1]));
    }
    const start = 0;
    const end = arr.length - 1;
    const middleIndex = Math.floor((start + end) / 2);
    const leftArr = arr.slice(0, middleIndex);
    const rightArr = arr.slice(middleIndex + 1);
    return new Node(
      arr[middleIndex],
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
  checkForDuplicates(value) {
    return this.arr.includes(value);
  }
  insert(value, node = this.root) {
    if (!this.checkForDuplicates(value)) {
      if (value < node.value) {
        if (node.left === null) {
          node.left = new Node(value);
        } else {
          this.insert(value, node.left);
        }
      } else {
        if (node.right === null) {
          node.right = new Node(value);
        } else {
          this.insert(value, node.right);
        }
      }
    }
  }
}

export { Tree };
