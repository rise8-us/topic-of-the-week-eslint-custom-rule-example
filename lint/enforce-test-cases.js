
import fs from 'fs';
import path from 'path';

function checkTestFileExists(formattedName) {
  const testFileName = `test${path.basename(formattedName, path.extname(formattedName))}.js`;
  const testFilePath = path.join('tests', 'unit', testFileName);
  return fs.existsSync(testFilePath);
}

export default {
    meta: {
      type: "problem",
      docs: {
        description: "enforce test case written for each function",
        category: "Possible Errors",
        recommended: true,
      },
      fixable: "code",
      schema: [],
    },
    create: function (context) {
      const sourceCode = context.getSourceCode();
  
      return {
        FunctionDeclaration: function (node) {
          const functionName = node.id.name;
          const formattedName = functionName.charAt(0).toUpperCase()+ functionName.slice(1);
          if (!functionName.startsWith("test") && !checkTestFileExists(formattedName)) {
            context.report({
              node,
              sourceCode,
              message: `Function ${functionName} should have a corresponding test file`,
              fix() {
                const testFilePath = path.join('tests', 'unit', `test${formattedName}.js`);
                const sourceFilePath = context.getFilename();
                
                const relativeImportPath = path.relative(path.dirname(testFilePath), sourceFilePath.replace(/\.jsx?$/, ''));
                const newTestFileContent = `import ${functionName} from '${relativeImportPath}';\n\n`;
                const newTestFileContentWithTest = newTestFileContent + `test('${functionName} should be defined', () => {\n  expect(${functionName}).toBeDefined();\n});\n`;
                const fixContent = `${newTestFileContentWithTest}`;
                fs.writeFileSync(testFilePath, fixContent);
                return;
              }
            })
          }
        },
      };
    },
  };
  