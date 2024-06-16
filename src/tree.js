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
  deleteItem(value, nodeParent = null, node = this.root, direction = null) {
    if (value === node.value) {
      // case 1: no child
      if (node.left === null && node.right === null) {
        nodeParent[direction] = null;
        return;
        // case 2: one child
      } else if (node.left === null || node.right === null) {
        if (node.left === null) {
          nodeParent[direction] = node.right;
        } else {
          nodeParent[direction] = node.left;
        }
        return;
      } else {
        // case 3: two children
        if (node.right.left === null) {
          node.right.left = node.left;
          nodeParent[direction] = node.right;
        } else {
          if (node.right.left === null) {
            if (node === this.root) {
              this.root = node.right;
            } else {
              nodeParent[direction] = node.right;
            }
          } else {
            node.value = _deleteItem(
              (nodeParent = node.right),
              (node = node.right.left)
            );
          }
          function _deleteItem(nodeParent, node) {
            if (node.left === null) {
              nodeParent.left = node.right;
              return node.value;
            }
            return _deleteItem(nodeParent, node);
          }
        }
        return;
      }
    }
    if (value < node.value) {
      this.deleteItem(value, node, node.left, "left");
    } else {
      this.deleteItem(value, node, node.right, "right");
    }
  }
  find(value, node = this.root) {
    if (value === node.value) {
      return node;
    } else if (node === null) {
      return;
    }
    if (value < node.value) {
      return this.find(value, node.left);
    } else {
      return this.find(value, node.right);
    }
  }
  levelOrder(callback = null) {
    const NodeQueue = [this.root];
    let resultArray = [];
    let useDefaultCallback = callback === null;

    for (let node of NodeQueue) {
      if (useDefaultCallback) {
        resultArray.push(node.value); // Collect nodes if using default behavior
      } else {
        callback(node); // Execute custom callback
      }
      if (node.left !== null) {
        NodeQueue.push(node.left);
      }
      if (node.right !== null) {
        NodeQueue.push(node.right);
      }
    }

    // Return the array of nodes if using default behavior
    if (useDefaultCallback) {
      return resultArray;
    }
  }
  postOrder(callback = null) {
    let resultArray = [];
    let useDefaultCallback = callback === null;
    (function _postOrder(callback, node) {
      // recursive function
      if (node.left === null && node.right === null) {
        if (useDefaultCallback) {
          resultArray.push(node.value); // Collect nodes if using default behavior
        } else {
          callback(node); // Execute custom callback
        }
        return;
      }

      if (node.left !== null) {
        _postOrder(callback, node.left);
      }
      if (node.right !== null) {
        _postOrder(callback, node.right);
      }
      if (useDefaultCallback) {
        resultArray.push(node.value); // Collect nodes if using default behavior
      } else {
        callback(node); // Execute custom callback
      }
    })(callback, this.root);
    // Return the array of nodes if using default behavior
    if (useDefaultCallback) {
      return resultArray;
    }
  }
  preOrder(callback = null) {
    let resultArray = [];
    let useDefaultCallback = callback === null;
    (function _preOrder(callback, node) {
      // recursive function
      if (useDefaultCallback) {
        resultArray.push(node.value); // Collect nodes if using default behavior
      } else {
        callback(node); // Execute custom callback
      }
      if (node.left === null && node.right === null) {
        return;
      }

      if (node.left !== null) {
        _preOrder(callback, node.left);
      }
      if (node.right !== null) {
        _preOrder(callback, node.right);
      }
    })(callback, this.root);
    // Return the array of nodes if using default behavior
    if (useDefaultCallback) {
      return resultArray;
    }
  }
  inOrder(callback = null) {
    let resultArray = [];
    let useDefaultCallback = callback === null;
    (function _inOrder(callback, node) {
      // recursive function
      if (node.left === null && node.right === null) {
        if (useDefaultCallback) {
          resultArray.push(node.value); // Collect nodes if using default behavior
        } else {
          callback(node); // Execute custom callback
        }
        return;
      }

      if (node.left !== null) {
        _inOrder(callback, node.left);
      }
      if (useDefaultCallback) {
        resultArray.push(node.value); // Collect nodes if using default behavior
      } else {
        callback(node); // Execute custom callback
      }
      if (node.right !== null) {
        _inOrder(callback, node.right);
      }
    })(callback, this.root);
    // Return the array of nodes if using default behavior
    if (useDefaultCallback) {
      return resultArray;
    }
  }

  height(node = this.root) {
    if (!node) return 0;

    const leftHeight = this.height(node.left);
    const rightHeight = this.height(node.right);

    // Return the larger height + 1 (for the current node)
    return Math.max(leftHeight, rightHeight) + 1;
  }
}

export { Tree };
