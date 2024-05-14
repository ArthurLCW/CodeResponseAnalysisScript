/**
* Definition for a binary tree node.
* function TreeNode(val, left, right) {
*   this.val = (val===undefined ? 0 : val)
*   this.left = (left===undefined ? null : left)
*   this.right = (right===undefined ? null : right)
* }
*/
/**
  * @param {TreeNode} root
  * @return {boolean}
**

Page 4 / 6
Please finish all the questions on this page within 10 minute(s) and 0 second(s).
Please spend at least 1 minute(s) and 0 second(s) to finish the questions on this page.
You still have 8 minutes and 32 seconds remaining
Now, you can modify your previous code. The code snippet below is generated by an AI code generator. You may use the entire code or integrate part of it into your own code.

Please notice that your payment depends on the quality of your final submitted codes. You will receive 4.2 GBP for high-quality codes and only 3.2 GBP for low-quality codes. The additional 1 pound reward for high-quality code will be paid as a bonus to your Prolific account.

/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {boolean}
 */
var isValidBST = function (root) {
  function validate(node, min, max) {
    if (!node) return true;

    if (
      (min !== null && node.val <= min) ||
      (max !== null && node.val >= max)
    ) {
      return false;
    }

    return (
      validate(node.left, min, node.val) && validate(node.right, node.val, max)
    );
  }

  return validate(root, null, null);
};