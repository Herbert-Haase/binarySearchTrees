import "./styles/reset.css";
import "./styles/style.css";
import ".tree.js";

function randomNumbers(amount) {
  const numArr = [];
  for (let number = 0; number < amount; number++) {
    numArr.push(Math.floor(Math.random() * 100));
  }
  return numArr;
}

/* 
1. Create a binary search tree from an array of random numbers < 100. 
You can create a function that returns an array of random numbers every time you call it if you wish. 
*/
const tree = new Tree(randomNumbers(10));

/*
2. Confirm that the tree is balanced by calling isBalanced.
*/
console.log(tree.isBalanced());

/*
3. Print out all elements in level, pre, post, and in order.
*/
console.log(tree.preOrder());
console.log(tree.postOrder());
console.log(tree.inOrder());

/*
4. Unbalance the tree by adding several numbers > 100.
*/
tree.insert(300);
tree.insert(301);
tree.insert(302);
tree.insert(303);
tree.insert(304);
tree.insert(305);

/*
5. Confirm that the tree is unbalanced by calling isBalanced.
*/
console.log(tree.isBalanced());

/*
6. Balance the tree by calling rebalance.
*/
tree.reBalance();

/*
7. Confirm that the tree is balanced by calling isBalanced.
*/
tree.isBalanced();

/*
8. Print out all elements in level, pre, post, and in order.
*/
console.log(tree.preOrder());
console.log(tree.postOrder());
console.log(tree.inOrder());
