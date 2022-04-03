import * as esbuild from "esbuild-wasm";

export const unpkgPathPlugin = () => {
  return {
    name: "unpkg-path-plugin",
    setup(build: esbuild.PluginBuild) {
      // handle entry file
      build.onResolve({ filter: /(^index\.js$)/ }, () => {
        return { path: "index.js", namespace: "a" };
      });

      // handle relative file
      build.onResolve({ filter: /^\.+\// }, (args: any) => {
        return {
          path: new URL(args.path, "https://unpkg.com" + args.resolveDir + "/")
            .href,
          namespace: "a",
        };
      });

      // handle main file
      build.onResolve({ filter: /.*/ }, (args: any) => {
        return { path: `https://unpkg.com/${args.path}`, namespace: "a" };
      });
    },
  };
};
