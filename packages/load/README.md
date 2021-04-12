# GraphQL Workspaces

This module is used to support loading GraphQL file contents in @graphql-workspaces/cli.

https://www.npmjs.com/package/@graphql-workspaces/load

## Motivation

There are two exports, `loadWorkspace` and `loadWorkspaceSync`, both of which are wrappers around [load-files](https://www.graphql-tools.com/docs/api/modules/load-files) and [merge](https://www.graphql-tools.com/docs/api/modules/merge#mergetypedefs) modules from [graphql-tools](https://www.graphql-tools.com/docs/schema-merging#merging-type-definitions). This [configuration](https://github.com/michaeldgraham/graphql-workspaces/blob/main/packages/load/src/options.js) is passed to [loadFiles](https://www.graphql-tools.com/docs/api/modules/load-files#loadfiles), with the [requireMethod](https://www.graphql-tools.com/docs/api/interfaces/load_files_src.loadfilesoptions#requiremethod) option defining a custom function that uses [esm](https://www.npmjs.com/package/esm) to support loading from [CommonJS](https://nodejs.org/docs/latest/api/modules.html) or [ES Modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules). This enables complex composition strategies by processing nested template literals when using the [gql](https://www.npmjs.com/package/graphql-tag) tag.
