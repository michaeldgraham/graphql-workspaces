/**
 * Synchronously loads GraphQL Documents using the provided glob pattern.
 * @param pattern Glob pattern or patterns to use when loading files
 * @param options Additional options
 */
export function loadWorkspace(pattern?: string, config?: {}): Promise<import("graphql").DocumentNode>;
/**
 * Asynchronously loads GraphQL Documents using the provided glob pattern.
 * @param pattern Glob pattern or patterns to use when loading files
 * @param options Additional options
 */
export function loadWorkspaceSync(pattern?: string, config?: {}): import("graphql").DocumentNode;
