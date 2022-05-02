const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class BinarySearchTree {

  root() {
    return (this.rootNode || null)
  }

  add(data) {
    const newNode = new Node(data);
    if (!this.rootNode) {
      this.rootNode = newNode;
    } else {
      // find parent for newNode
      let parent = this.rootNode;
      while (parent.left || parent.right) { // not a leaf
        if (data < parent.data) {
          if (!parent.left)
            break
          parent = parent.left;
        } else {
          if (!parent.right)
            break
          parent = parent.right;
        }
      }

      // attach newNode to parent
      if (data < parent.data) {
        parent.left = newNode;
      } else {
        parent.right = newNode;
      }
    }
  }

  has(data) {
    return Boolean(this.find(data))
  }

  find(data) {
    if (!this.rootNode)
      return null

    if (this.rootNode.data === data)
      return this.rootNode

    let node = this.rootNode;
    let dataFound = null;
    while (node) {
      if (data === node.data) {
        dataFound = node;
        break
      }

      if (data < node.data) {
        if (!node.left)
          break
        node = node.left;
      } else {
        if (!node.right)
          break
        node = node.right;
      }
    }

    return dataFound
  }

  remove(data) {
    if (this.rootNode) {
      let node = this.rootNode;
      let targetNode = null;
      let targetNodeParent = null;

      while (node) {
        if (data < node.data) {
          if (!node.left)
            break

          if (data === node.left.data) {
            targetNode = node.left;
            targetNodeParent = node;
            targetNodeParent.link = 'left'; // remember the link to aviod further checks
            break
          } 

          node = node.left;

        } else if (data > node.data){
          if (!node.right)
            break
          
          if (data === node.right.data) {
            targetNode = node.right;
            targetNodeParent = node;
            targetNodeParent.link = 'right'; // remember the link to aviod further checks
            break
          }

          node = node.right;

        } else { // root element to delete
          targetNode = node;
          break
        }
      }

      if (targetNode) {
        if (targetNode.left && targetNode.right) {
          const maxFromLeftSide = maxNode(targetNode.left);
          this.remove(maxFromLeftSide.data);
          targetNode.data = maxFromLeftSide.data;
        } else if (targetNode.left) { // has only left link
          targetNodeParent[targetNodeParent.link] = targetNode.left;
        } else if (targetNode.right) { // has only right link
          targetNodeParent[targetNodeParent.link] = targetNode.right;
        } else { // remove (=forget) the leaf
          targetNodeParent[targetNodeParent.link] = null;
        }
      }

      function maxNode(subTree) {
        let node = subTree;
        while (node) {
          if (!node.right) {
            break
          }
          node = node.right;
        }

        return node
      }
    }
  }

  min() {
    if (!this.rootNode)
      return null

    let node = this.rootNode;
    let minData = node.data;
    while (node) {
      if (!node.left) {
        minData = node.data;
        break
      }
      node = node.left;
    }

    return minData
  }

  max() {
    if (!this.rootNode)
      return null

    let node = this.rootNode;
    let maxData = node.data;
    while (node) {
      if (!node.right) {
        maxData = node.data;
        break
      }
      node = node.right;
    }

    return maxData
  }
}

module.exports = {
  BinarySearchTree
};