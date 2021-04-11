export function setConfig(config?: {}, debug?: boolean): {
    useRequire: boolean;
    requireMethod: (absPath: any) => {};
    exportNames: never[];
};
