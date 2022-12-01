/** Node: node for a singly linked list. */

class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

/** LinkedList: chained together nodes. */

class LinkedList {
  constructor(vals = []) {
    this.head = null;
    this.tail = null;
    this.length = 0;

    for (let val of vals) this.push(val);
  }

  /** _get(idx): retrieve node at idx. */

  _get(idx) {
    let cur = this.head;
    let count = 0;

    while (cur !== null && count != idx) {
      count += 1;
      cur = cur.next;
    }

    return cur;
  }

  /** push(val): Appends a new node with value val to the tail. Returns undefined.
*/

  push(val) {
    let newNode = new Node(val);

    if(!this.head) {
      this.head = newNode;
      this.tail = this.head;
    } else {
      this.tail.next = newNode;
      this.tail = newNode;
    }
    // why is this.tail.next and this.tail both newNode?

    this.length += 1;

  }

  /** unshift(val): Add a new node with value val to the head. Returns undefined. */

  unshift(val) {
    let newNode = new Node(val);

    if (this.head === null) {
      this.head = newNode;
    } else {
      newNode.next = this.head;
      this.head = newNode;
    }

    if (this.length === 0) {
      this.tail = this.tail;
    }

  }

  /** pop(): Remove & return tail value. Throws error if list is empty. */

  pop() {
    if (this.length === 0) {
      throw new Error("empty list");
    }
    return this.removeAt(this.length - 1);

  }

  /** shift(): Remove & return head value. Throws error if list is empty. */

  shift() {
    if (this.length === 0) {
      throw new Error("empty list");
    }
    return this.removeAt(0);

  }

  /** getAt(idx): Retrieve value at index position idx. Throws error if index is invalid. */

  getAt(idx) {
    if (idx >= this.length || idx < 0) {
      throw new Error("enter valid index");
    }
    return this._get(idx).val;

  }

  /** setAt(idx, val): Set value of node at index position idx to val. Throws error if index is invalid. */

  setAt(idx, val) {
    if (idx >= this.length || idx < 0) {
      throw new Error("Invalid index.");
    }

    let cur = this._get(idx);
    cur.val = val;

  }

  /** insertAt(idx, val): Insert a new node at position idx with value val. Throws error if index is invalid. Returns undefined. */

  insertAt(idx, val) {
    if (idx > this.length || idx < 0) {
      throw new Error("Invalid index.");
    }

    if (idx === 0) return this.unshift(val);
    if (idx === this.length) return this.push(val);    

    let prev = this._get(idx - 1);

    let newNode = new Node(val);
    newNode.next = prev.next;
    prev.next = newNode;

    this.length += 1;

  }

  /** removeAt(idx): Remove & return value at position idx. Throws error if index is invalid. */

  removeAt(idx) {
    if (idx >= this.length || idx < 0) {
      throw new Error("Invalid index.");
    }

    // special case: remove first item

    if (idx === 0) {
      let val = this.head.val;
      this.head = this.head.next;
      this.length -= 1;
      if (this.length < 2) this.tail = this.head;
      return val;
    }

    let prev = this._get(idx - 1);

    // special case: remove tail

    if (idx === this.length - 1) {
      let val = prev.next.val;
      prev.next = null;
      this.tail = prev;
      this.length -= 1;
      return val;
    }

    // normal case: remove in middle

    let val = prev.next.val;
    prev.next = prev.next.next;
    this.length -= 1;
    return val;
  }


  /** average(): return an average of all values in the list */

  average() {
    if (this.length === 0) return 0;

    let total = 0;
    let current = this.head;

    while (current) {
      total += current.val;
      current = current.next;
    }

    return total / this.length;
  }
}


module.exports = LinkedList;
