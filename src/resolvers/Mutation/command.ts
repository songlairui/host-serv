import { openTmuxWithPanes } from "../../utils/openTmux";

export default {
  async openTmux(parent, { name, force, new: _new }, info) {
    return openTmuxWithPanes(name, force, _new);
  }
};
