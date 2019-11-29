import execa from "execa";
import { resolve, parse } from "path";
import { vscFolder, _SUFFIX } from "../../utils/paths";

export default {
  launchVsc(parent, { name }: { name: string }, info) {
    let filename = name;
    if (!filename.startsWith("/")) {
      const { name: barename } = parse(name);
      filename = resolve(vscFolder, `${barename}${_SUFFIX}`);
    }
    return execa("code", [filename]).then(({ stderr, stdout }) => {
      console.info("launchVsc:", stdout, stderr);
      return !stderr;
    });
  }
};
