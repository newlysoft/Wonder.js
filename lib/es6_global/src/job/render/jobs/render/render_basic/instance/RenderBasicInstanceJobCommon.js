// Generated by BUCKLESCRIPT VERSION 2.1.0, PLEASE EDIT WITH CARE
'use strict';

import * as InstanceUtils$Wonderjs                        from "../../../../../../renderer/utils/InstanceUtils.js";
import * as RenderBasicBatchInstanceJobCommon$Wonderjs    from "./RenderBasicBatchInstanceJobCommon.js";
import * as RenderBasicHardwareInstanceJobCommon$Wonderjs from "./RenderBasicHardwareInstanceJobCommon.js";

function render(gl, uid, state) {
  if (InstanceUtils$Wonderjs.isSupportInstance(state)) {
    return RenderBasicHardwareInstanceJobCommon$Wonderjs.render(gl, uid, state);
  } else {
    return RenderBasicBatchInstanceJobCommon$Wonderjs.render(gl, uid, state);
  }
}

export {
  render ,
  
}
/* InstanceUtils-Wonderjs Not a pure module */