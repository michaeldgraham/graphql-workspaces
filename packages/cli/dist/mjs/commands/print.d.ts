export const command: "print <path|p>";
export const aliases: string[];
export const describe: "Prints the merged GraphQL Documents at the provided path.";
export function builder(yargs: any): void;
export function handler({ "path": pattern, "name": name, "watch": watch, "debug": debug }: {
    path: any;
    name: any;
    watch: any;
    debug: any;
}): void;
export const deprecated: false;
