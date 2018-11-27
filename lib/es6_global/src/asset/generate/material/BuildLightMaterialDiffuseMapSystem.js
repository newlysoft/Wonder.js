

import * as Curry from "../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Js_primitive from "../../../../../../node_modules/bs-platform/lib/es6/js_primitive.js";
import * as Log$WonderLog from "../../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as Contract$WonderLog from "../../../../../../node_modules/wonder-log/lib/es6_global/src/Contract.js";
import * as ImageUtils$Wonderjs from "../../utils/ImageUtils.js";
import * as BufferUtils$Wonderjs from "../../utils/BufferUtils.js";
import * as ArrayService$Wonderjs from "../../../service/atom/ArrayService.js";
import * as StateDataMain$Wonderjs from "../../../service/state/main/data/StateDataMain.js";
import * as FileNameService$Wonderjs from "../../../service/atom/FileNameService.js";
import * as SparseMapService$Wonderjs from "../../../service/atom/SparseMapService.js";
import * as BuildMaterialUtils$Wonderjs from "./utils/BuildMaterialUtils.js";
import * as IsDebugMainService$Wonderjs from "../../../service/state/main/state/IsDebugMainService.js";
import * as TextureSizeService$Wonderjs from "../../../service/primitive/texture/TextureSizeService.js";
import * as HashMapService$WonderCommonlib from "../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/HashMapService.js";
import * as SparseMapService$WonderCommonlib from "../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/SparseMapService.js";
import * as TypeSourceTextureMainService$Wonderjs from "../../../service/state/main/texture/TypeSourceTextureMainService.js";
import * as OperateLightMaterialMainService$Wonderjs from "../../../service/state/main/material/light/OperateLightMaterialMainService.js";
import * as NameBasicSourceTextureMainService$Wonderjs from "../../../service/state/main/texture/basic_source/NameBasicSourceTextureMainService.js";
import * as OperateBasicSourceTextureMainService$Wonderjs from "../../../service/state/main/texture/basic_source/OperateBasicSourceTextureMainService.js";

function _buildSamplerDataMapKey(wrapS, wrapT, magFilter, minFilter) {
  return wrapS.toString() + (wrapT.toString() + (magFilter.toString() + minFilter.toString()));
}

function _getWrapData(wrap) {
  switch (wrap) {
    case 0 : 
        return 33071;
    case 1 : 
        return 33648;
    case 2 : 
        return 10497;
    
  }
}

function _getFilterData(filter) {
  switch (filter) {
    case 0 : 
        return 9728;
    case 1 : 
        return 9729;
    case 2 : 
        return 9984;
    case 3 : 
        return 9985;
    case 4 : 
        return 9986;
    case 5 : 
        return 9987;
    
  }
}

function _addSamplerData(texture, samplerIndexMap, state, samplerDataArr) {
  var wrapS = OperateBasicSourceTextureMainService$Wonderjs.getWrapS(texture, state);
  var wrapT = OperateBasicSourceTextureMainService$Wonderjs.getWrapT(texture, state);
  var magFilter = OperateBasicSourceTextureMainService$Wonderjs.getMagFilter(texture, state);
  var minFilter = OperateBasicSourceTextureMainService$Wonderjs.getMinFilter(texture, state);
  var key = _buildSamplerDataMapKey(wrapS, wrapT, magFilter, minFilter);
  var match = HashMapService$WonderCommonlib.get(key, samplerIndexMap);
  if (match !== undefined) {
    return /* tuple */[
            match,
            samplerIndexMap,
            samplerDataArr
          ];
  } else {
    var samplerIndex = samplerDataArr.length;
    return /* tuple */[
            samplerIndex,
            HashMapService$WonderCommonlib.set(key, samplerIndex, samplerIndexMap),
            ArrayService$Wonderjs.push(/* record */[
                  /* wrapS */_getWrapData(wrapS),
                  /* wrapT */_getWrapData(wrapT),
                  /* magFilter */_getFilterData(magFilter),
                  /* minFilter */_getFilterData(minFilter)
                ], samplerDataArr)
          ];
  }
}

var _convertImageToBase64 = function (width,height,mimeType,image){
    var canvas = document.createElement("canvas");
    var ctx = canvas.getContext("2d");
    var dataURL = null;
    canvas.height = width;
    canvas.width = height;
    ctx.drawImage(image, 0, 0);
    return canvas.toDataURL(mimeType);
    };

function _convertBase64MimeTypeToWDBMimeType(mimeType) {
  switch (mimeType) {
    case "image/jpeg" : 
    case "image/png" : 
        return mimeType;
    default:
      return Log$WonderLog.fatal(Log$WonderLog.buildFatalMessage("_convertBase64MimeTypeToWDBMimeType", "unknown mimeType: " + (String(mimeType) + ""), "", "", ""));
  }
}

function _getImageMimeType(source) {
  var mimeType = FileNameService$Wonderjs.getFileExtName(source.name);
  if (mimeType !== undefined) {
    switch (mimeType) {
      case ".jpeg" : 
      case ".jpg" : 
          return "image/jpeg";
      case ".png" : 
          return "image/png";
      default:
        return Log$WonderLog.fatal(Log$WonderLog.buildFatalMessage("_getImageMimeType", "unknown image mimeType: " + (String(mimeType) + ""), "", "", ""));
    }
  } else {
    return "image/png";
  }
}

function _getImageBase64(_, source) {
  return _convertImageToBase64(TextureSizeService$Wonderjs.getWidth(source), TextureSizeService$Wonderjs.getHeight(source), _getImageMimeType(source), source);
}

function _addImageData(param, param$1, imageUint8DataArr, param$2, getResultUint8ArrayDataFunc) {
  var bufferViewDataArr = param$2[2];
  var byteOffset = param$2[1];
  var totalByteLength = param$2[0];
  var imageResultUint8ArrayMap = param$1[1];
  var imageUint8ArrayMap = param[2];
  var imageMap = param[1];
  var texture = param[0];
  Contract$WonderLog.requireCheck((function () {
          return Contract$WonderLog.test(Log$WonderLog.buildAssertMessage("byteOffset aligned with multiple of 4", "not"), (function () {
                        return Contract$WonderLog.Operators[/* = */0](byteOffset % 4, 0);
                      }));
        }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
  var source = OperateBasicSourceTextureMainService$Wonderjs.unsafeGetSource(texture, param[3]);
  var imageIndex = SparseMapService$Wonderjs.indexOf(source, imageMap);
  if (imageIndex === -1) {
    var imageIndex$1 = imageUint8DataArr.length;
    var match = SparseMapService$WonderCommonlib.get(texture, param$1[0]);
    var match$1;
    if (match !== undefined) {
      match$1 = match;
    } else {
      var imageBase64 = _getImageBase64(texture, source);
      match$1 = /* tuple */[
        BufferUtils$Wonderjs.getBase64MimeType(imageBase64),
        BufferUtils$Wonderjs.convertBase64ToBinary(imageBase64)
      ];
    }
    var imageUint8Array = match$1[1];
    var imageUint8ArrayMap$1 = SparseMapService$WonderCommonlib.set(imageIndex$1, imageUint8Array, imageUint8ArrayMap);
    var imageResultUint8Array = Curry._1(getResultUint8ArrayDataFunc, imageUint8Array);
    var imageResultUint8ArrayMap$1 = SparseMapService$WonderCommonlib.set(texture, imageUint8Array, imageResultUint8ArrayMap);
    var imageResultUint8ArrayByteLength = imageResultUint8Array.byteLength;
    var imageResultUint8ArrayAlignedByteLength = BufferUtils$Wonderjs.alignedLength(imageResultUint8ArrayByteLength);
    return /* tuple */[
            imageIndex$1,
            SparseMapService$WonderCommonlib.set(imageIndex$1, source, imageMap),
            imageUint8ArrayMap$1,
            ArrayService$Wonderjs.push(/* record */[
                  /* name */Js_primitive.nullable_to_opt(ImageUtils$Wonderjs.getImageName(source)),
                  /* bufferView */bufferViewDataArr.length,
                  /* mimeType */_convertBase64MimeTypeToWDBMimeType(match$1[0]),
                  /* uint8Array */imageResultUint8Array,
                  /* byteOffset */byteOffset
                ], imageUint8DataArr),
            imageResultUint8ArrayMap$1,
            /* tuple */[
              totalByteLength + imageResultUint8ArrayAlignedByteLength | 0,
              byteOffset + imageResultUint8ArrayAlignedByteLength | 0,
              ArrayService$Wonderjs.push(/* record */[
                    /* buffer */0,
                    /* byteOffset */byteOffset,
                    /* byteLength */imageResultUint8ArrayByteLength
                  ], bufferViewDataArr)
            ]
          ];
  } else {
    var imageResultUint8ArrayMap$2 = SparseMapService$WonderCommonlib.set(texture, SparseMapService$WonderCommonlib.unsafeGet(imageIndex, imageUint8ArrayMap), imageResultUint8ArrayMap);
    return /* tuple */[
            imageIndex,
            imageMap,
            imageUint8ArrayMap,
            imageUint8DataArr,
            imageResultUint8ArrayMap$2,
            /* tuple */[
              totalByteLength,
              byteOffset,
              bufferViewDataArr
            ]
          ];
  }
}

function _addTextureData(texture, param, state, textureDataArr) {
  return ArrayService$Wonderjs.push(/* record */[
              /* name */NameBasicSourceTextureMainService$Wonderjs.getName(texture, state),
              /* sampler */param[0],
              /* source */param[1]
            ], textureDataArr);
}

function build(param, param$1, param$2, getResultUint8ArrayDataFunc, state) {
  var bufferViewDataArr = param$2[2];
  var byteOffset = param$2[1];
  var totalByteLength = param$2[0];
  var match = param$1[1];
  var imageResultUint8ArrayMap = match[5];
  var imageUint8ArrayMap = match[3];
  var imageMap = match[2];
  var samplerIndexMap = match[1];
  var textureIndexMap = match[0];
  var match$1 = param$1[0];
  var imageUint8DataArr = match$1[3];
  var samplerDataArr = match$1[2];
  var textureDataArr = match$1[1];
  var materialDataArr = match$1[0];
  var name = param[2];
  var diffuseMap = param[1];
  Contract$WonderLog.requireCheck((function () {
          return Contract$WonderLog.test(Log$WonderLog.buildAssertMessage("map be basicSourceTexture", "not"), (function () {
                        return Contract$WonderLog.assertTrue(TypeSourceTextureMainService$Wonderjs.isBasicSourceTexture(diffuseMap, state));
                      }));
        }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
  var diffuseColor = OperateLightMaterialMainService$Wonderjs.getDiffuseColor(param[0], state);
  var baseColorFactor = BuildMaterialUtils$Wonderjs.buildColorFactor(diffuseColor);
  var match$2 = SparseMapService$WonderCommonlib.get(diffuseMap, textureIndexMap);
  if (match$2 !== undefined) {
    return /* tuple */[
            /* tuple */[
              ArrayService$Wonderjs.push(/* record */[
                    /* baseColorFactor */baseColorFactor,
                    /* baseColorTexture */match$2,
                    /* name */name
                  ], materialDataArr),
              textureDataArr,
              samplerDataArr,
              imageUint8DataArr
            ],
            /* tuple */[
              textureIndexMap,
              samplerIndexMap,
              imageMap,
              imageUint8ArrayMap,
              imageResultUint8ArrayMap
            ],
            /* tuple */[
              totalByteLength,
              byteOffset,
              bufferViewDataArr
            ]
          ];
  } else {
    var textureIndex = textureDataArr.length;
    var textureIndexMap$1 = SparseMapService$WonderCommonlib.set(diffuseMap, textureIndex, textureIndexMap);
    var match$3 = _addSamplerData(diffuseMap, samplerIndexMap, state, samplerDataArr);
    var match$4 = _addImageData(/* tuple */[
          diffuseMap,
          imageMap,
          imageUint8ArrayMap,
          state
        ], /* tuple */[
          match[4],
          imageResultUint8ArrayMap
        ], imageUint8DataArr, /* tuple */[
          totalByteLength,
          byteOffset,
          bufferViewDataArr
        ], getResultUint8ArrayDataFunc);
    var match$5 = match$4[5];
    return /* tuple */[
            /* tuple */[
              ArrayService$Wonderjs.push(/* record */[
                    /* baseColorFactor */baseColorFactor,
                    /* baseColorTexture */textureIndex,
                    /* name */name
                  ], materialDataArr),
              _addTextureData(diffuseMap, /* tuple */[
                    match$3[0],
                    match$4[0]
                  ], state, textureDataArr),
              match$3[2],
              match$4[3]
            ],
            /* tuple */[
              textureIndexMap$1,
              match$3[1],
              match$4[1],
              match$4[2],
              match$4[4]
            ],
            /* tuple */[
              match$5[0],
              match$5[1],
              match$5[2]
            ]
          ];
  }
}

export {
  _buildSamplerDataMapKey ,
  _getWrapData ,
  _getFilterData ,
  _addSamplerData ,
  _convertImageToBase64 ,
  _convertBase64MimeTypeToWDBMimeType ,
  _getImageMimeType ,
  _getImageBase64 ,
  _addImageData ,
  _addTextureData ,
  build ,
  
}
/* Log-WonderLog Not a pure module */