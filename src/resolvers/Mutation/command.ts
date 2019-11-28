import { openTmuxWithPanes } from "../../utils/openTmux";

export default {
  async openTmux(parent, { name, force }, info) {
    try {
      openTmuxWithPanes(name, force);
    } catch (error) {
      return false;
    }
    return true;
  }
};
