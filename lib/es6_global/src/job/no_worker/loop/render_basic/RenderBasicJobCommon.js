// Generated by BUCKLESCRIPT VERSION 2.1.0, PLEASE EDIT WITH CARE
'use strict';

import * as RenderJobUtils$Wonderjs                      from "../utils/RenderJobUtils.js";
import * as GetComponentGameObjectService$Wonderjs       from "../../../../service/record/gameObject/GetComponentGameObjectService.js";
import * as ShaderIndexBasicMaterialMainService$Wonderjs from "../../../../service/state/main/material/basic/ShaderIndexBasicMaterialMainService.js";

function render(gl, uid, state) {
  var materialIndex = GetComponentGameObjectService$Wonderjs.unsafeGetBasicMaterialComponent(uid, state[/* gameObjectRecord */10]);
  return RenderJobUtils$Wonderjs.render(gl, /* tuple */[
              materialIndex,
              ShaderIndexBasicMaterialMainService$Wonderjs.unsafeGetShaderIndex(materialIndex, state),
              uid
            ], state);
}

export {
  render ,
  
}
/* RenderJobUtils-Wonderjs Not a pure module */