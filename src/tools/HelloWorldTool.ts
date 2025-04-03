import { MCPTool } from "mcp-framework";
import { z } from "zod";

interface HelloWorldInput {
  message: string;
}

class HelloWorldTool extends MCPTool<HelloWorldInput> {
  name = "hello-world";
  description = "HelloWorld tool description";

  schema = {
    message: {
      type: z.string(),
      description: "Message to process",
    },
  };

  async execute(input: HelloWorldInput) {
    return `Processed: ${input.message}`;
  }
}

export default HelloWorldTool;