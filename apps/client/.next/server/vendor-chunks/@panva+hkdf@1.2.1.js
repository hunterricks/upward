"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/@panva+hkdf@1.2.1";
exports.ids = ["vendor-chunks/@panva+hkdf@1.2.1"];
exports.modules = {

/***/ "(rsc)/../../node_modules/.pnpm/@panva+hkdf@1.2.1/node_modules/@panva/hkdf/dist/node/cjs/index.js":
/*!**************************************************************************************************!*\
  !*** ../../node_modules/.pnpm/@panva+hkdf@1.2.1/node_modules/@panva/hkdf/dist/node/cjs/index.js ***!
  \**************************************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({\n    value: true\n}));\nexports[\"default\"] = exports.hkdf = void 0;\nconst hkdf_js_1 = __webpack_require__(/*! ./runtime/hkdf.js */ \"(rsc)/../../node_modules/.pnpm/@panva+hkdf@1.2.1/node_modules/@panva/hkdf/dist/node/cjs/runtime/hkdf.js\");\nfunction normalizeDigest(digest) {\n    switch(digest){\n        case \"sha256\":\n        case \"sha384\":\n        case \"sha512\":\n        case \"sha1\":\n            return digest;\n        default:\n            throw new TypeError('unsupported \"digest\" value');\n    }\n}\nfunction normalizeUint8Array(input, label) {\n    if (typeof input === \"string\") return new TextEncoder().encode(input);\n    if (!(input instanceof Uint8Array)) throw new TypeError(`\"${label}\"\" must be an instance of Uint8Array or a string`);\n    return input;\n}\nfunction normalizeIkm(input) {\n    const ikm = normalizeUint8Array(input, \"ikm\");\n    if (!ikm.byteLength) throw new TypeError(`\"ikm\" must be at least one byte in length`);\n    return ikm;\n}\nfunction normalizeInfo(input) {\n    const info = normalizeUint8Array(input, \"info\");\n    if (info.byteLength > 1024) {\n        throw TypeError('\"info\" must not contain more than 1024 bytes');\n    }\n    return info;\n}\nfunction normalizeKeylen(input, digest) {\n    if (typeof input !== \"number\" || !Number.isInteger(input) || input < 1) {\n        throw new TypeError('\"keylen\" must be a positive integer');\n    }\n    const hashlen = parseInt(digest.substr(3), 10) >> 3 || 20;\n    if (input > 255 * hashlen) {\n        throw new TypeError('\"keylen\" too large');\n    }\n    return input;\n}\nasync function hkdf(digest, ikm, salt, info, keylen) {\n    return (0, hkdf_js_1.default)(normalizeDigest(digest), normalizeIkm(ikm), normalizeUint8Array(salt, \"salt\"), normalizeInfo(info), normalizeKeylen(keylen, digest));\n}\nexports.hkdf = hkdf;\nexports[\"default\"] = hkdf;\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi4vLi4vbm9kZV9tb2R1bGVzLy5wbnBtL0BwYW52YStoa2RmQDEuMi4xL25vZGVfbW9kdWxlcy9AcGFudmEvaGtkZi9kaXN0L25vZGUvY2pzL2luZGV4LmpzIiwibWFwcGluZ3MiOiJBQUFhO0FBQ2JBLDhDQUE2QztJQUFFRyxPQUFPO0FBQUssQ0FBQyxFQUFDO0FBQzdERCxrQkFBZSxHQUFHQSxZQUFZLEdBQUcsS0FBSztBQUN0QyxNQUFNSSxZQUFZQyxtQkFBT0EsQ0FBQyxrSUFBbUI7QUFDN0MsU0FBU0MsZ0JBQWdCQyxNQUFNO0lBQzNCLE9BQVFBO1FBQ0osS0FBSztRQUNMLEtBQUs7UUFDTCxLQUFLO1FBQ0wsS0FBSztZQUNELE9BQU9BO1FBQ1g7WUFDSSxNQUFNLElBQUlDLFVBQVU7SUFDNUI7QUFDSjtBQUNBLFNBQVNDLG9CQUFvQkMsS0FBSyxFQUFFQyxLQUFLO0lBQ3JDLElBQUksT0FBT0QsVUFBVSxVQUNqQixPQUFPLElBQUlFLGNBQWNDLE1BQU0sQ0FBQ0g7SUFDcEMsSUFBSSxDQUFFQSxDQUFBQSxpQkFBaUJJLFVBQVMsR0FDNUIsTUFBTSxJQUFJTixVQUFVLENBQUMsQ0FBQyxFQUFFRyxNQUFNLGdEQUFnRCxDQUFDO0lBQ25GLE9BQU9EO0FBQ1g7QUFDQSxTQUFTSyxhQUFhTCxLQUFLO0lBQ3ZCLE1BQU1NLE1BQU1QLG9CQUFvQkMsT0FBTztJQUN2QyxJQUFJLENBQUNNLElBQUlDLFVBQVUsRUFDZixNQUFNLElBQUlULFVBQVUsQ0FBQyx5Q0FBeUMsQ0FBQztJQUNuRSxPQUFPUTtBQUNYO0FBQ0EsU0FBU0UsY0FBY1IsS0FBSztJQUN4QixNQUFNUyxPQUFPVixvQkFBb0JDLE9BQU87SUFDeEMsSUFBSVMsS0FBS0YsVUFBVSxHQUFHLE1BQU07UUFDeEIsTUFBTVQsVUFBVTtJQUNwQjtJQUNBLE9BQU9XO0FBQ1g7QUFDQSxTQUFTQyxnQkFBZ0JWLEtBQUssRUFBRUgsTUFBTTtJQUNsQyxJQUFJLE9BQU9HLFVBQVUsWUFBWSxDQUFDVyxPQUFPQyxTQUFTLENBQUNaLFVBQVVBLFFBQVEsR0FBRztRQUNwRSxNQUFNLElBQUlGLFVBQVU7SUFDeEI7SUFDQSxNQUFNZSxVQUFVQyxTQUFTakIsT0FBT2tCLE1BQU0sQ0FBQyxJQUFJLE9BQU8sS0FBSztJQUN2RCxJQUFJZixRQUFRLE1BQU1hLFNBQVM7UUFDdkIsTUFBTSxJQUFJZixVQUFVO0lBQ3hCO0lBQ0EsT0FBT0U7QUFDWDtBQUNBLGVBQWVQLEtBQUtJLE1BQU0sRUFBRVMsR0FBRyxFQUFFVSxJQUFJLEVBQUVQLElBQUksRUFBRVEsTUFBTTtJQUMvQyxPQUFPLENBQUMsR0FBR3ZCLFVBQVVGLE9BQU8sRUFBRUksZ0JBQWdCQyxTQUFTUSxhQUFhQyxNQUFNUCxvQkFBb0JpQixNQUFNLFNBQVNSLGNBQWNDLE9BQU9DLGdCQUFnQk8sUUFBUXBCO0FBQzlKO0FBQ0FQLFlBQVksR0FBR0c7QUFDZkgsa0JBQWUsR0FBR0ciLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9AdXB3YXJkL2NsaWVudC8uLi8uLi9ub2RlX21vZHVsZXMvLnBucG0vQHBhbnZhK2hrZGZAMS4yLjEvbm9kZV9tb2R1bGVzL0BwYW52YS9oa2RmL2Rpc3Qvbm9kZS9janMvaW5kZXguanM/YmI0MSJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuZGVmYXVsdCA9IGV4cG9ydHMuaGtkZiA9IHZvaWQgMDtcbmNvbnN0IGhrZGZfanNfMSA9IHJlcXVpcmUoXCIuL3J1bnRpbWUvaGtkZi5qc1wiKTtcbmZ1bmN0aW9uIG5vcm1hbGl6ZURpZ2VzdChkaWdlc3QpIHtcbiAgICBzd2l0Y2ggKGRpZ2VzdCkge1xuICAgICAgICBjYXNlICdzaGEyNTYnOlxuICAgICAgICBjYXNlICdzaGEzODQnOlxuICAgICAgICBjYXNlICdzaGE1MTInOlxuICAgICAgICBjYXNlICdzaGExJzpcbiAgICAgICAgICAgIHJldHVybiBkaWdlc3Q7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCd1bnN1cHBvcnRlZCBcImRpZ2VzdFwiIHZhbHVlJyk7XG4gICAgfVxufVxuZnVuY3Rpb24gbm9ybWFsaXplVWludDhBcnJheShpbnB1dCwgbGFiZWwpIHtcbiAgICBpZiAodHlwZW9mIGlucHV0ID09PSAnc3RyaW5nJylcbiAgICAgICAgcmV0dXJuIG5ldyBUZXh0RW5jb2RlcigpLmVuY29kZShpbnB1dCk7XG4gICAgaWYgKCEoaW5wdXQgaW5zdGFuY2VvZiBVaW50OEFycmF5KSlcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihgXCIke2xhYmVsfVwiXCIgbXVzdCBiZSBhbiBpbnN0YW5jZSBvZiBVaW50OEFycmF5IG9yIGEgc3RyaW5nYCk7XG4gICAgcmV0dXJuIGlucHV0O1xufVxuZnVuY3Rpb24gbm9ybWFsaXplSWttKGlucHV0KSB7XG4gICAgY29uc3QgaWttID0gbm9ybWFsaXplVWludDhBcnJheShpbnB1dCwgJ2lrbScpO1xuICAgIGlmICghaWttLmJ5dGVMZW5ndGgpXG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoYFwiaWttXCIgbXVzdCBiZSBhdCBsZWFzdCBvbmUgYnl0ZSBpbiBsZW5ndGhgKTtcbiAgICByZXR1cm4gaWttO1xufVxuZnVuY3Rpb24gbm9ybWFsaXplSW5mbyhpbnB1dCkge1xuICAgIGNvbnN0IGluZm8gPSBub3JtYWxpemVVaW50OEFycmF5KGlucHV0LCAnaW5mbycpO1xuICAgIGlmIChpbmZvLmJ5dGVMZW5ndGggPiAxMDI0KSB7XG4gICAgICAgIHRocm93IFR5cGVFcnJvcignXCJpbmZvXCIgbXVzdCBub3QgY29udGFpbiBtb3JlIHRoYW4gMTAyNCBieXRlcycpO1xuICAgIH1cbiAgICByZXR1cm4gaW5mbztcbn1cbmZ1bmN0aW9uIG5vcm1hbGl6ZUtleWxlbihpbnB1dCwgZGlnZXN0KSB7XG4gICAgaWYgKHR5cGVvZiBpbnB1dCAhPT0gJ251bWJlcicgfHwgIU51bWJlci5pc0ludGVnZXIoaW5wdXQpIHx8IGlucHV0IDwgMSkge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdcImtleWxlblwiIG11c3QgYmUgYSBwb3NpdGl2ZSBpbnRlZ2VyJyk7XG4gICAgfVxuICAgIGNvbnN0IGhhc2hsZW4gPSBwYXJzZUludChkaWdlc3Quc3Vic3RyKDMpLCAxMCkgPj4gMyB8fCAyMDtcbiAgICBpZiAoaW5wdXQgPiAyNTUgKiBoYXNobGVuKSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1wia2V5bGVuXCIgdG9vIGxhcmdlJyk7XG4gICAgfVxuICAgIHJldHVybiBpbnB1dDtcbn1cbmFzeW5jIGZ1bmN0aW9uIGhrZGYoZGlnZXN0LCBpa20sIHNhbHQsIGluZm8sIGtleWxlbikge1xuICAgIHJldHVybiAoMCwgaGtkZl9qc18xLmRlZmF1bHQpKG5vcm1hbGl6ZURpZ2VzdChkaWdlc3QpLCBub3JtYWxpemVJa20oaWttKSwgbm9ybWFsaXplVWludDhBcnJheShzYWx0LCAnc2FsdCcpLCBub3JtYWxpemVJbmZvKGluZm8pLCBub3JtYWxpemVLZXlsZW4oa2V5bGVuLCBkaWdlc3QpKTtcbn1cbmV4cG9ydHMuaGtkZiA9IGhrZGY7XG5leHBvcnRzLmRlZmF1bHQgPSBoa2RmO1xuIl0sIm5hbWVzIjpbIk9iamVjdCIsImRlZmluZVByb3BlcnR5IiwiZXhwb3J0cyIsInZhbHVlIiwiZGVmYXVsdCIsImhrZGYiLCJoa2RmX2pzXzEiLCJyZXF1aXJlIiwibm9ybWFsaXplRGlnZXN0IiwiZGlnZXN0IiwiVHlwZUVycm9yIiwibm9ybWFsaXplVWludDhBcnJheSIsImlucHV0IiwibGFiZWwiLCJUZXh0RW5jb2RlciIsImVuY29kZSIsIlVpbnQ4QXJyYXkiLCJub3JtYWxpemVJa20iLCJpa20iLCJieXRlTGVuZ3RoIiwibm9ybWFsaXplSW5mbyIsImluZm8iLCJub3JtYWxpemVLZXlsZW4iLCJOdW1iZXIiLCJpc0ludGVnZXIiLCJoYXNobGVuIiwicGFyc2VJbnQiLCJzdWJzdHIiLCJzYWx0Iiwia2V5bGVuIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/../../node_modules/.pnpm/@panva+hkdf@1.2.1/node_modules/@panva/hkdf/dist/node/cjs/index.js\n");

/***/ }),

/***/ "(rsc)/../../node_modules/.pnpm/@panva+hkdf@1.2.1/node_modules/@panva/hkdf/dist/node/cjs/runtime/fallback.js":
/*!*************************************************************************************************************!*\
  !*** ../../node_modules/.pnpm/@panva+hkdf@1.2.1/node_modules/@panva/hkdf/dist/node/cjs/runtime/fallback.js ***!
  \*************************************************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({\n    value: true\n}));\nconst crypto_1 = __webpack_require__(/*! crypto */ \"crypto\");\nexports[\"default\"] = (digest, ikm, salt, info, keylen)=>{\n    const hashlen = parseInt(digest.substr(3), 10) >> 3 || 20;\n    const prk = (0, crypto_1.createHmac)(digest, salt.byteLength ? salt : new Uint8Array(hashlen)).update(ikm).digest();\n    const N = Math.ceil(keylen / hashlen);\n    const T = new Uint8Array(hashlen * N + info.byteLength + 1);\n    let prev = 0;\n    let start = 0;\n    for(let c = 1; c <= N; c++){\n        T.set(info, start);\n        T[start + info.byteLength] = c;\n        T.set((0, crypto_1.createHmac)(digest, prk).update(T.subarray(prev, start + info.byteLength + 1)).digest(), start);\n        prev = start;\n        start += hashlen;\n    }\n    return T.slice(0, keylen);\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi4vLi4vbm9kZV9tb2R1bGVzLy5wbnBtL0BwYW52YStoa2RmQDEuMi4xL25vZGVfbW9kdWxlcy9AcGFudmEvaGtkZi9kaXN0L25vZGUvY2pzL3J1bnRpbWUvZmFsbGJhY2suanMiLCJtYXBwaW5ncyI6IkFBQWE7QUFDYkEsOENBQTZDO0lBQUVHLE9BQU87QUFBSyxDQUFDLEVBQUM7QUFDN0QsTUFBTUMsV0FBV0MsbUJBQU9BLENBQUMsc0JBQVE7QUFDakNILGtCQUFlLEdBQUcsQ0FBQ0ssUUFBUUMsS0FBS0MsTUFBTUMsTUFBTUM7SUFDeEMsTUFBTUMsVUFBVUMsU0FBU04sT0FBT08sTUFBTSxDQUFDLElBQUksT0FBTyxLQUFLO0lBQ3ZELE1BQU1DLE1BQU0sQ0FBQyxHQUFHWCxTQUFTWSxVQUFVLEVBQUVULFFBQVFFLEtBQUtRLFVBQVUsR0FBR1IsT0FBTyxJQUFJUyxXQUFXTixVQUNoRk8sTUFBTSxDQUFDWCxLQUNQRCxNQUFNO0lBQ1gsTUFBTWEsSUFBSUMsS0FBS0MsSUFBSSxDQUFDWCxTQUFTQztJQUM3QixNQUFNVyxJQUFJLElBQUlMLFdBQVdOLFVBQVVRLElBQUlWLEtBQUtPLFVBQVUsR0FBRztJQUN6RCxJQUFJTyxPQUFPO0lBQ1gsSUFBSUMsUUFBUTtJQUNaLElBQUssSUFBSUMsSUFBSSxHQUFHQSxLQUFLTixHQUFHTSxJQUFLO1FBQ3pCSCxFQUFFSSxHQUFHLENBQUNqQixNQUFNZTtRQUNaRixDQUFDLENBQUNFLFFBQVFmLEtBQUtPLFVBQVUsQ0FBQyxHQUFHUztRQUM3QkgsRUFBRUksR0FBRyxDQUFDLENBQUMsR0FBR3ZCLFNBQVNZLFVBQVUsRUFBRVQsUUFBUVEsS0FDbENJLE1BQU0sQ0FBQ0ksRUFBRUssUUFBUSxDQUFDSixNQUFNQyxRQUFRZixLQUFLTyxVQUFVLEdBQUcsSUFDbERWLE1BQU0sSUFBSWtCO1FBQ2ZELE9BQU9DO1FBQ1BBLFNBQVNiO0lBQ2I7SUFDQSxPQUFPVyxFQUFFTSxLQUFLLENBQUMsR0FBR2xCO0FBQ3RCIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vQHVwd2FyZC9jbGllbnQvLi4vLi4vbm9kZV9tb2R1bGVzLy5wbnBtL0BwYW52YStoa2RmQDEuMi4xL25vZGVfbW9kdWxlcy9AcGFudmEvaGtkZi9kaXN0L25vZGUvY2pzL3J1bnRpbWUvZmFsbGJhY2suanM/NmQ1MSJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IGNyeXB0b18xID0gcmVxdWlyZShcImNyeXB0b1wiKTtcbmV4cG9ydHMuZGVmYXVsdCA9IChkaWdlc3QsIGlrbSwgc2FsdCwgaW5mbywga2V5bGVuKSA9PiB7XG4gICAgY29uc3QgaGFzaGxlbiA9IHBhcnNlSW50KGRpZ2VzdC5zdWJzdHIoMyksIDEwKSA+PiAzIHx8IDIwO1xuICAgIGNvbnN0IHByayA9ICgwLCBjcnlwdG9fMS5jcmVhdGVIbWFjKShkaWdlc3QsIHNhbHQuYnl0ZUxlbmd0aCA/IHNhbHQgOiBuZXcgVWludDhBcnJheShoYXNobGVuKSlcbiAgICAgICAgLnVwZGF0ZShpa20pXG4gICAgICAgIC5kaWdlc3QoKTtcbiAgICBjb25zdCBOID0gTWF0aC5jZWlsKGtleWxlbiAvIGhhc2hsZW4pO1xuICAgIGNvbnN0IFQgPSBuZXcgVWludDhBcnJheShoYXNobGVuICogTiArIGluZm8uYnl0ZUxlbmd0aCArIDEpO1xuICAgIGxldCBwcmV2ID0gMDtcbiAgICBsZXQgc3RhcnQgPSAwO1xuICAgIGZvciAobGV0IGMgPSAxOyBjIDw9IE47IGMrKykge1xuICAgICAgICBULnNldChpbmZvLCBzdGFydCk7XG4gICAgICAgIFRbc3RhcnQgKyBpbmZvLmJ5dGVMZW5ndGhdID0gYztcbiAgICAgICAgVC5zZXQoKDAsIGNyeXB0b18xLmNyZWF0ZUhtYWMpKGRpZ2VzdCwgcHJrKVxuICAgICAgICAgICAgLnVwZGF0ZShULnN1YmFycmF5KHByZXYsIHN0YXJ0ICsgaW5mby5ieXRlTGVuZ3RoICsgMSkpXG4gICAgICAgICAgICAuZGlnZXN0KCksIHN0YXJ0KTtcbiAgICAgICAgcHJldiA9IHN0YXJ0O1xuICAgICAgICBzdGFydCArPSBoYXNobGVuO1xuICAgIH1cbiAgICByZXR1cm4gVC5zbGljZSgwLCBrZXlsZW4pO1xufTtcbiJdLCJuYW1lcyI6WyJPYmplY3QiLCJkZWZpbmVQcm9wZXJ0eSIsImV4cG9ydHMiLCJ2YWx1ZSIsImNyeXB0b18xIiwicmVxdWlyZSIsImRlZmF1bHQiLCJkaWdlc3QiLCJpa20iLCJzYWx0IiwiaW5mbyIsImtleWxlbiIsImhhc2hsZW4iLCJwYXJzZUludCIsInN1YnN0ciIsInByayIsImNyZWF0ZUhtYWMiLCJieXRlTGVuZ3RoIiwiVWludDhBcnJheSIsInVwZGF0ZSIsIk4iLCJNYXRoIiwiY2VpbCIsIlQiLCJwcmV2Iiwic3RhcnQiLCJjIiwic2V0Iiwic3ViYXJyYXkiLCJzbGljZSJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/../../node_modules/.pnpm/@panva+hkdf@1.2.1/node_modules/@panva/hkdf/dist/node/cjs/runtime/fallback.js\n");

/***/ }),

/***/ "(rsc)/../../node_modules/.pnpm/@panva+hkdf@1.2.1/node_modules/@panva/hkdf/dist/node/cjs/runtime/hkdf.js":
/*!*********************************************************************************************************!*\
  !*** ../../node_modules/.pnpm/@panva+hkdf@1.2.1/node_modules/@panva/hkdf/dist/node/cjs/runtime/hkdf.js ***!
  \*********************************************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({\n    value: true\n}));\nconst crypto = __webpack_require__(/*! crypto */ \"crypto\");\nconst fallback_js_1 = __webpack_require__(/*! ./fallback.js */ \"(rsc)/../../node_modules/.pnpm/@panva+hkdf@1.2.1/node_modules/@panva/hkdf/dist/node/cjs/runtime/fallback.js\");\nlet hkdf;\nif (typeof crypto.hkdf === \"function\" && !process.versions.electron) {\n    hkdf = async (...args)=>new Promise((resolve, reject)=>{\n            crypto.hkdf(...args, (err, arrayBuffer)=>{\n                if (err) reject(err);\n                else resolve(new Uint8Array(arrayBuffer));\n            });\n        });\n}\nexports[\"default\"] = async (digest, ikm, salt, info, keylen)=>(hkdf || fallback_js_1.default)(digest, ikm, salt, info, keylen);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi4vLi4vbm9kZV9tb2R1bGVzLy5wbnBtL0BwYW52YStoa2RmQDEuMi4xL25vZGVfbW9kdWxlcy9AcGFudmEvaGtkZi9kaXN0L25vZGUvY2pzL3J1bnRpbWUvaGtkZi5qcyIsIm1hcHBpbmdzIjoiQUFBYTtBQUNiQSw4Q0FBNkM7SUFBRUcsT0FBTztBQUFLLENBQUMsRUFBQztBQUM3RCxNQUFNQyxTQUFTQyxtQkFBT0EsQ0FBQyxzQkFBUTtBQUMvQixNQUFNQyxnQkFBZ0JELG1CQUFPQSxDQUFDLGtJQUFlO0FBQzdDLElBQUlFO0FBQ0osSUFBSSxPQUFPSCxPQUFPRyxJQUFJLEtBQUssY0FBYyxDQUFDQyxRQUFRQyxRQUFRLENBQUNDLFFBQVEsRUFBRTtJQUNqRUgsT0FBTyxPQUFPLEdBQUdJLE9BQVMsSUFBSUMsUUFBUSxDQUFDQyxTQUFTQztZQUM1Q1YsT0FBT0csSUFBSSxJQUFJSSxNQUFNLENBQUNJLEtBQUtDO2dCQUN2QixJQUFJRCxLQUNBRCxPQUFPQztxQkFFUEYsUUFBUSxJQUFJSSxXQUFXRDtZQUMvQjtRQUNKO0FBQ0o7QUFDQWQsa0JBQWUsR0FBRyxPQUFPaUIsUUFBUUMsS0FBS0MsTUFBTUMsTUFBTUMsU0FBVyxDQUFDaEIsUUFBUUQsY0FBY1ksT0FBTyxFQUFFQyxRQUFRQyxLQUFLQyxNQUFNQyxNQUFNQyIsInNvdXJjZXMiOlsid2VicGFjazovL0B1cHdhcmQvY2xpZW50Ly4uLy4uL25vZGVfbW9kdWxlcy8ucG5wbS9AcGFudmEraGtkZkAxLjIuMS9ub2RlX21vZHVsZXMvQHBhbnZhL2hrZGYvZGlzdC9ub2RlL2Nqcy9ydW50aW1lL2hrZGYuanM/ZjU4NiJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IGNyeXB0byA9IHJlcXVpcmUoXCJjcnlwdG9cIik7XG5jb25zdCBmYWxsYmFja19qc18xID0gcmVxdWlyZShcIi4vZmFsbGJhY2suanNcIik7XG5sZXQgaGtkZjtcbmlmICh0eXBlb2YgY3J5cHRvLmhrZGYgPT09ICdmdW5jdGlvbicgJiYgIXByb2Nlc3MudmVyc2lvbnMuZWxlY3Ryb24pIHtcbiAgICBoa2RmID0gYXN5bmMgKC4uLmFyZ3MpID0+IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgY3J5cHRvLmhrZGYoLi4uYXJncywgKGVyciwgYXJyYXlCdWZmZXIpID0+IHtcbiAgICAgICAgICAgIGlmIChlcnIpXG4gICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgcmVzb2x2ZShuZXcgVWludDhBcnJheShhcnJheUJ1ZmZlcikpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbn1cbmV4cG9ydHMuZGVmYXVsdCA9IGFzeW5jIChkaWdlc3QsIGlrbSwgc2FsdCwgaW5mbywga2V5bGVuKSA9PiAoaGtkZiB8fCBmYWxsYmFja19qc18xLmRlZmF1bHQpKGRpZ2VzdCwgaWttLCBzYWx0LCBpbmZvLCBrZXlsZW4pO1xuIl0sIm5hbWVzIjpbIk9iamVjdCIsImRlZmluZVByb3BlcnR5IiwiZXhwb3J0cyIsInZhbHVlIiwiY3J5cHRvIiwicmVxdWlyZSIsImZhbGxiYWNrX2pzXzEiLCJoa2RmIiwicHJvY2VzcyIsInZlcnNpb25zIiwiZWxlY3Ryb24iLCJhcmdzIiwiUHJvbWlzZSIsInJlc29sdmUiLCJyZWplY3QiLCJlcnIiLCJhcnJheUJ1ZmZlciIsIlVpbnQ4QXJyYXkiLCJkZWZhdWx0IiwiZGlnZXN0IiwiaWttIiwic2FsdCIsImluZm8iLCJrZXlsZW4iXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/../../node_modules/.pnpm/@panva+hkdf@1.2.1/node_modules/@panva/hkdf/dist/node/cjs/runtime/hkdf.js\n");

/***/ })

};
;