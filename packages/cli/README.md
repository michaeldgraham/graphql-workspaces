# @graphql-workspaces/cli
A CLI for GQL Workflow.
## Motivation
When a GraphQL schema grows enough to motivate distributing its type definitions into separate files, one might find themselves writing scripts to merge a directory containing them into a single file or variable. The merged schema can then be provided to a server to start and test the API. 

It can also be useful to print the merged schema to a file for inspection, especially to view the results of libraries that transform and augment the merged schema (such as with database language integrations). But this workflow can bring the overhead of updating the paths used in printing script when wanting to merge and print the contents of only a file or sub-directory.

[GraphQL Tools](https://www.graphql-tools.com/) provides modules for [loading](https://www.graphql-tools.com/docs/schema-merging#file-loading) and [merging](https://www.graphql-tools.com/docs/schema-merging#merging-type-definitions) GraphQL documents and schemas from files (.graphql, .gql, .js and .ts exports) that are very useful for this workflow. To generalize for it, this module uses [@graphql-workspaces/load](https://www.npmjs.com/package/@graphql-workspaces/load), a wrapper over [loadFiles](https://www.graphql-tools.com/docs/api/modules/load-files#loadfiles) and [mergeTypeDefs](https://www.graphql-tools.com/docs/api/modules/merge#mergetypedefs), to support the below cli:
## Install
```
npm install -g @graphql-workspaces/cli
```
## gql
```
gql [command] [options]
```
The `print` command loads and merges a file or directory at the provided path and prints the results to a `.printed.graphql` file at the same location.
```
Command:
  print <path|p>  Prints the merged GraphQL Documents at the provided path.

Options:
  <path|p>        Required optional argument for path to directory or file.
  -n, --name      Optional argument for file extension prefix (default: <path>.printed.graphql).
```