/**
 * Merges the default config for loadTypeDefs with provided config.
 * @param config The config provided to loadTypeDefs
 */
export function setConfig(config?: {}): {
    useRequire: boolean;
    requireMethod: (absPath: any) => {};
    exportNames: never[];
};
