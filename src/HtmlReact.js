import React from "react";
import HtmlToReact, { Parser } from "html-to-react";
function Link(props) {
  return <a href="https://www.google.com"> {props.children}</a>;
}

export default function HtmlReact() {
  const htmlInput =
    "&lt;h1&gt;asdasd  &lt;/h1&gt; hello i have added <exlink> link </exlink>";
  const HtmlToReactParser = new Parser();
  //const reactElement = HtmlToReactParser.parse(htmlInput);
  //console.log(reactElement);
  const isValidNode = () => {
    return true;
  };
  const processNodeDefinitions = new HtmlToReact.ProcessNodeDefinitions(React);

  const processingInstructions = [
    {
      // This is REQUIRED, it tells the parser
      // that we want to insert our React
      // component as a child
      replaceChildren: true,
      shouldProcessNode: function (node) {
        return node.name === "exlink";
      },
      processNode: function (node, children, index) {
        return <Link>{children}</Link>;
      }
    },
    {
      // Anything else
      shouldProcessNode: function (node) {
        //console.log(node)

        return true;
      },
      processNode: processNodeDefinitions.processDefaultNode
    }
  ];

  const reactComponent = HtmlToReactParser.parseWithInstructions(
    htmlInput,
    isValidNode,
    processingInstructions
  );

  console.log(reactComponent);

  return (
    <>
      <div> {reactComponent}</div>
    </>
  );
}
