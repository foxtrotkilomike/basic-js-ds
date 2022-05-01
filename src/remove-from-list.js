const { NotImplementedError } = require('../extensions/index.js');

// const { ListNode } = require('../extensions/list-node.js');

/**
 * Given a singly linked list of integers l and an integer k,
 * remove all elements from list l that have a value equal to k.
 *
 * @param {List} l
 * @param {Number} k
 * @return {List}
 *
 * @example
 * For l = [3, 1, 2, 3, 4, 5] and k = 3,
 * the output should be [1, 2, 4, 5]
 *
 * Singly - linked lists are already defined using interface
 * class ListNode {
 *   constructor(x) {
 *     this.value = x;
 *     this.next = null;
 *   }
 * }
 */
function removeKFromList(L, k) {
  let prev = L;
  let curr = L;
  let atFirstNode = true; // substitute for 'head' to deal the first Node

  while (prev.next !== null) { // not 'curr.next' to check last Node
    if (atFirstNode) {
      if (curr.value === k) { // changing the List by changing first Node
        L = curr.next;
        prev = L; // renew first Node
        curr = L;
      } else {
        prev = curr;
        curr = curr.next;
        atFirstNode = false;
      }
    } else if (curr.value === k) {
      prev.next = curr.next;
      curr = curr.next;
    } else {
      prev = curr;
      curr = curr.next;
    }
  }

  return L;
}

module.exports = {
  removeKFromList
};
