let _keyStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='

function _utf8_decode(e) {
  let t = '';
  let n = 0;
  let r = 0;
  let c1 = 0;
  let c2 = 0;
  let c3 = 0;
  while (n < e.length) {
    r = e.charCodeAt(n);
    if (r < 128) {
      t += String.fromCharCode(r);
      n++
    } else if (r > 191 && r < 224) {
      c2 = e.charCodeAt(n + 1);
      t += String.fromCharCode((r & 31) << 6 | c2 & 63);
      n += 2
    } else {
      c2 = e.charCodeAt(n + 1);
      c3 = e.charCodeAt(n + 2);
      t += String.fromCharCode((r & 15) << 12 | (c2 & 63) << 6 | c3 & 63);
      n += 3
    }
  }
  return t
}

function _utf8_encode(string) {
  string = string.replace(/\r\n/g, '\n');
  let utftext = '';
  for (let n = 0; n < string.length; n++) {
    let c = string.charCodeAt(n);
    if (c < 128) {
      utftext += String.fromCharCode(c);
    } else if ((c > 127) && (c < 2048)) {
      utftext += String.fromCharCode((c >> 6) | 192);
      utftext += String.fromCharCode((c & 63) | 128);
    } else {
      utftext += String.fromCharCode((c >> 12) | 224);
      utftext += String.fromCharCode(((c >> 6) & 63) | 128);
      utftext += String.fromCharCode((c & 63) | 128);
    }
  }
  return utftext;
}
export function encode(input) {
  let output = '';
  let chr1, chr2, chr3, enc1, enc2, enc3, enc4;
  let i = 0;
  input = _utf8_encode(input);
  while (i < input.length) {
    chr1 = input.charCodeAt(i++);
    chr2 = input.charCodeAt(i++);
    chr3 = input.charCodeAt(i++);
    enc1 = chr1 >> 2;
    enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
    enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
    enc4 = chr3 & 63;
    if (isNaN(chr2)) {
      enc3 = enc4 = 64;
    } else if (isNaN(chr3)) {
      enc4 = 64;
    }
    output = output +
      _keyStr.charAt(enc1) + _keyStr.charAt(enc2) +
      _keyStr.charAt(enc3) + _keyStr.charAt(enc4);
  }
  return output;
}
export function decode(e) {
  let t = '';
  let n, r, i;
  let s, o, u, a;
  let f = 0;
  e = e.replace(/[^A-Za-z0-9+/=]/g, '');
  while (f < e.length) {
    s = _keyStr.indexOf(e.charAt(f++));
    o = _keyStr.indexOf(e.charAt(f++));
    u = _keyStr.indexOf(e.charAt(f++));
    a = _keyStr.indexOf(e.charAt(f++));
    n = s << 2 | o >> 4;
    r = (o & 15) << 4 | u >> 2;
    i = (u & 3) << 6 | a;
    t = t + String.fromCharCode(n);
    if (u != 64) {
      t = t + String.fromCharCode(r)
    }
    if (a != 64) {
      t = t + String.fromCharCode(i)
    }
  }
  t = _utf8_decode(t);
  return t
}
