## GraphQL Workspaces

A project to experiment with and develop tooling for GraphQL project architecture and workflow.

### Packages
This is a monorepo for all modules created for the GraphQL Workspaces project:

* [@graphql-workspaces/cli](https://github.com/michaeldgraham/graphql-workspaces/tree/main/packages/cli)
* [@graphql-workspaces/load](https://github.com/michaeldgraham/graphql-workspaces/tree/main/packages/load)
### Roadmap

* `@graphql-workspaces/cli`:
  * Command to generate file directory scaffolding to assist creation of new GraphQL type definitions
    * Experiment with user defined `<name>.workspace.graphql` files for providing the semantics of a file directory graph with field names used as command arguments for what to generate at some path
  * Command to remove all printed GraphQL files within a path
  * Use the diff function from [@graphql-inspector/core](https://www.npmjs.com/package/@graphql-inspector/core) to generate readable descriptions into log files for every change during `--watch` mode.
<br>

* Corresponding VSCode extension
   * Workspace directory graph visualization UI
     * Visualization of GraphQL files
       * Schema files
       * Operations
         * Initial experiments for query building: <br>
![Experimental Query Visualization](media/query-vis.gif)
