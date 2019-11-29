import execa from "execa";
import { resolve, parse } from "path";
import { vscFolder, _SUFFIX } from "../../utils/paths";

export default {
  launchVsc(parent, { name }: { name: string }, info) {
    const { name: barename } = parse(name);
    const filename = resolve(vscFolder, `${barename}${_SUFFIX}`);
    return execa("code", [filename]).then(({ stderr, stdout }) => {
      console.info("launchVsc:", stdout, stderr);
      return !stderr;
    });
  }
};
