class Node {
  constructor(value = null) {
    this.value = value;
    this.children = {};
    this.word = null;
    this.popularity = 0;
  }
}

class Trie {
  constructor() {
    this.root = null;
    this.count = 0;
  }

  insert(word) {
    word = word.toLowerCase();
    if(!this.root) {
      this.root = new Node();
    }

    let currNode = this.root.children;
    let index = 0;

    while(currNode[word[index]]) {
      currNode = currNode[word[index]].children;
      index++;
    }
    if(index === word.length) {
      return 'Duplicate word';
    }
    
    for(let i = index; i < word.length; i++) {
      currNode[word[i]] = new Node(word[i]);
      if(i === word.length - 1) {
        currNode[word[i]].word = word;
      }
      currNode = currNode[word[i]].children
    }
    this.count++;
  }

  delete(word) {
    let currNode = this.root.children;
    for (let i = 0; i < word.length; i++) {
      if(currNode[word[i]].word === word) {
        currNode[word[i]].word = null;
      }
      currNode = currNode[word[i]].children;
    }
  }

  suggest(prefix) {
    if(prefix.length >= 3) {
      prefix = prefix.toLowerCase();
      let currNode = this.root.children;

      for(let i = 0; i < prefix.length; i++) {
        if(!currNode[prefix[i]]) {
          return currNode;
        }
        currNode = currNode[prefix[i]].children;
      }

      let suggestedWords = this.buildWords(currNode);
      let sortedArray = suggestedWords.sort((a,b) => b[1] - a[1]);
      return sortedArray.map(word => word[0]);
    } else {
      return [prefix]
    }
  }

  buildWords(currNode, suggestedWords = []) { 
    let keys = Object.keys(currNode);

    keys.forEach(key => {
      if(currNode[key].word) {
        suggestedWords.push([currNode[key].word, currNode[key].popularity]);
      } 
      this.buildWords(currNode[key].children, suggestedWords)
    });

    return suggestedWords;
  }

  select(word) {
    word = word.toLowerCase();
    let currNode = this.root.children;

    for (let i = 0; i < word.length; i++) {
      if(currNode[word[i]].word === word) {
        currNode[word[i]].popularity++;
      }
      currNode = currNode[word[i]].children;
    }
  }

  count() {
    return this.count;
  }

  populate(data) {
    data.forEach(word => this.insert(word));
  }
}

module.exports = Trie;