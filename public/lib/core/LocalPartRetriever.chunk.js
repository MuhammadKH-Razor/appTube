/** Notice * This file contains works from many authors under various (but compatible) licenses. Please see legal.txt for more information. **/
(function(){(window.wpCoreControlsBundle=window.wpCoreControlsBundle||[]).push([[8],{329:function(ha,da,f){f.r(da);var aa=f(3),ea=f(1),fa=f(109);ha=f(71);var ba=f(137);f=f(280);var z=window;ha=function(f){function x(w,r,n){r=f.call(this,w,r,n)||this;if(w.name&&"xod"!==w.name.toLowerCase().split(".").pop())throw Error("Not an XOD file");if(!z.FileReader||!z.File||!z.Blob)throw Error("File API is not supported in this browser");r.file=w;r.Vu=[];r.Wz=0;return r}Object(aa.c)(x,f);x.prototype.OB=function(f,r,n){var e=
this,w=new FileReader;w.onloadend=function(f){if(0<e.Vu.length){var h=e.Vu.shift();h.jZ.readAsBinaryString(h.file)}else e.Wz--;if(w.error){f=w.error;if(f.code===f.ABORT_ERR){Object(ea.h)("Request for chunk "+r.start+"-"+r.stop+" was aborted");return}return n(f)}if(f=w.content||f.target.result)return n(!1,f);Object(ea.h)("No data was returned from FileReader.")};r&&(f=(f.slice||f.webkitSlice||f.mozSlice||f.w3).call(f,r.start,r.stop));0===e.Vu.length&&50>e.Wz?(w.readAsBinaryString(f),e.Wz++):e.Vu.push({jZ:w,
file:f});return function(){w.abort()}};x.prototype.Uo=function(f){var r=this;r.Uu=!0;var n=fa.a;r.OB(r.file,{start:-n,stop:r.file.size},function(e,w){if(e)return Object(ea.h)("Error loading end header: %s "+e),f(e);if(w.length!==n)throw Error("Zip end header data is wrong size!");r.ud=new ba.a(w);var h=r.ud.BI();r.OB(r.file,h,function(e,n){if(e)return Object(ea.h)("Error loading central directory: %s "+e),f(e);if(n.length!==h.stop-h.start)throw Error("Zip central directory data is wrong size!");r.ud.cL(n);
r.Lz=!0;r.Uu=!1;return f(!1)})})};x.prototype.nC=function(f,r){var n=this,e=n.Dg[f];if(n.ud.iH(f)){var w=n.ud.qr(f),h=n.OB(n.file,w,function(e,h){delete n.Dg[f];if(e)return Object(ea.h)('Error loading part "%s": %s, '+f+", "+e),r(e);if(h.length!==w.stop-w.start)throw Error("Part data is wrong size!");r(!1,f,h,n.ud.LJ(f))});e.JM=!0;e.cancel=h}else r(Error('File not found: "'+f+'"'),f)};return x}(ha.a);Object(f.a)(ha);Object(f.b)(ha);da["default"]=ha}}]);}).call(this || window)
