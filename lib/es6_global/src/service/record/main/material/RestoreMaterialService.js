// Generated by BUCKLESCRIPT VERSION 2.1.0, PLEASE EDIT WITH CARE
'use strict';

import * as ArrayService$Wonderjs        from "../../../atom/ArrayService.js";
import * as TypeArrayService$Wonderjs    from "../../../primitive/buffer/TypeArrayService.js";
import * as ArrayService$WonderCommonlib from "../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";

function resetShaderIndices(index, defaultShaderIndex, shaderIndices) {
  return ArrayService$WonderCommonlib.reduceOneParam((function (shaderIndices, i) {
                return TypeArrayService$Wonderjs.setUInt32_1(i, defaultShaderIndex, shaderIndices);
              }), shaderIndices, ArrayService$Wonderjs.range(0, index));
}

export {
  resetShaderIndices ,
  
}
/* ArrayService-Wonderjs Not a pure module */