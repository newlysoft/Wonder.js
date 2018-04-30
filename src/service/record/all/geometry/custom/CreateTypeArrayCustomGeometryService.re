open Js.Typed_array;

open BufferCustomGeometryService;

let createTypeArrays = (buffer, count) => (
  Float32Array.fromBufferRange(
    Worker.sharedArrayBufferToArrayBuffer(buffer),
    ~offset=getVerticesOffset(count),
    ~length=getVertexLength(count)
  ),
  Float32Array.fromBufferRange(
    Worker.sharedArrayBufferToArrayBuffer(buffer),
    ~offset=getNormalsOffset(count),
    ~length=getVertexLength(count)
  ),
  Uint16Array.fromBufferRange(
    Worker.sharedArrayBufferToArrayBuffer(buffer),
    ~offset=getIndicesOffset(count),
    ~length=getIndicesLength(count)
  ),
  Uint8Array.fromBufferRange(
    Worker.sharedArrayBufferToArrayBuffer(buffer),
    ~offset=getVerticesInfosOffset(count),
    ~length=getVerticesInfosLength(count)
  ),
  Uint8Array.fromBufferRange(
    Worker.sharedArrayBufferToArrayBuffer(buffer),
    ~offset=getNormalsInfosOffset(count),
    ~length=getNormalsInfosLength(count)
  ),
  Uint8Array.fromBufferRange(
    Worker.sharedArrayBufferToArrayBuffer(buffer),
    ~offset=getIndicesInfosOffset(count),
    ~length=getIndicesInfosLength(count)
  )
);