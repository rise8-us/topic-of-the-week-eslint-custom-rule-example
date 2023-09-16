export default {
  meta: {
    type: "problem",
    docs: {
      description: "disallow console.log",
      category: "Possible Errors",
      recommended: true,
    },
    fixable: "code",
    schema: [],
  },
  create: function (context) {
    const sourceCode = context.getSourceCode();

    return {
      ExpressionStatement: function (node) {
        if (
          node.expression.type === "CallExpression" &&
          node.expression.callee.type === "MemberExpression" &&
          node.expression.callee.object.name === "console" &&
          node.expression.callee.property.name === "log"
        ) {
          context.report({
            node,
            sourceCode,
            message: "This console.log is garbage",
            fix(fixer) {
              const start = node.range[0];
              const end = node.range[1];
              const beforeStart = sourceCode.getText().slice(start - 1, start);
              const afterEnd = sourceCode.getText().slice(end, end + 1);

              let fixStart = start;
              let fixEnd = end;

              // Check if the console.log statement is on its own line
              if (beforeStart === "\n" || beforeStart === "\r\n") {
                fixStart = start - beforeStart.length;
              }

              if (afterEnd === "\n" || afterEnd === "\r\n") {
                fixEnd = end + afterEnd.length;
              }

              return fixer.removeRange([fixStart, fixEnd]);
            },
          });
        }
      },
    };
  },
};
