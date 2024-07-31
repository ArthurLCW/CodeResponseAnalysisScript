/**
* @param {string} s
* @return {number}
*/
var longestValidParentheses = function(s) {
 let maxLen = 0;
  // Initialize stack with base index -1
  let stack = [-1];

  for (let i = 0; i < s.length; i++) {
    if (s[i] === '(') {
      // Push index of '(' onto stack
      stack.push(i);
    } else {
      // Pop for matching ')'
      stack.pop();
      if (stack.length === 0) {
        // If stack is empty, push current index as base for future matches
        stack.push(i);
      } else {
        // Calculate maxLen if stack is not empty after popping
        maxLen = Math.max(maxLen, i - stack[stack.length - 1]);
      }
    }
  }

    return maxLen;
};