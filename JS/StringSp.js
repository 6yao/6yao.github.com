/// <reference path="ObjectSp.js" />

var StringSp = {};
StringSp.exception_ = null;

StringSp.asciiToStr = function (asciiStr, radix) {
    /// <summary>Convert ascii string to string that is base on radix.</summary>
    /// <param name="asciiStr" type="String">Compose several char by radix every section.Radix 2,several is 8.Radix 8/10,several is 3.Radix 16,several is 2.</param>
    /// <param name="radix" type="int">2/8/10/16.Default is 10.</param>
    /// <returns type="String" />
    try {
        StringSp.exception_ = null;
        if (StringSp.isNullOrEmpty(asciiStr)) {
            return null;
        }
        else {
            var formatLens = { '_2': 8, '_8': 3, '_10': 3, '_16': 2 };
            var formatLen = parseInt(formatLens['_' + radix.toString()]);
            var destStr = '';
            for (var index = 0; index < asciiStr.length; index += formatLen) {
                var ascii = asciiStr.substring(index, index + formatLen);
                destStr += String.fromCharCode(parseInt(ascii, radix));
            }
            return destStr;
        }
    } catch (e) {
        StringSp.exception_ = e;
        return null;
    }
}

StringSp.format = function (sourceStr, totalLen, fillChar, fillDirection) {
    /// <summary>Format string</summary>
    /// <param name="sourceStr" type="String">source string</param>
    /// <param name="totalLen" type="int">The lengt of dest string.Length is more,need tuncate.Length is less,need fill by fillChar</param>
    /// <param name="fillChar" type="String">Fill by fillChar when length is not enoughe.</param>
    /// <param name="fillDirection" type="String">LEFT/RIGHT</param>
    /// <returns type="String" />
    var destStr = sourceStr;
    if (sourceStr.length < totalLen) {
        for (var i = 0; i < totalLen - sourceStr.length; i++) {
            if (fillDirection.toUpperCase() === "RIGHT") {

                destStr = destStr + fillChar;
            }
            else if (fillDirection.toUpperCase() === "LEFT") {

                destStr = fillChar + destStr;
            }
        }
    }
    return destStr;
}

StringSp.indent = function (obj, indent) {
    /// <summary>Format string base on indent.</summary>
    /// <param name="obj" type="object">format object.</param>
    /// <param name="indent" type="String">indent that format.</param>
    /// <returns type="String" />
    //Handle null,undefined,strings,and non-objects.
    if (obj === null) return "null";
    if (obj === undefined) return "undefined";
    if (typeof obj === "string") return "undefined";
    if (typeof obj !== "object") return String(obj);

    if (indent === undefined) indent = "";

    //Handle (non-null) objects.	
    var str = "{\n";
    for (var key in obj) {
        str += indent + " " + key + " = ";
        str += StringSp.indent(obj[key], indent + " ") + "\n";
    }
    return str + indent + "}";
};

StringSp.isAscii = function (sourceStr) {
    /// <summary>Check source string is ascii.</summary>
    /// <param name="sourceStr" type="String">source string.</param>
    /// <returns type="bool" />
    try {
        StringSp.exception_ = null;
        if (StringSp.isNullOrEmpty(sourceStr, false)) {
            StringSp.exception_ = 'Source string is null or empty.';
            return false;
        }
        else {
            var asciiReg = /[\x00-\x7F]/;
            for (var index = 0; index < sourceStr.length; index++) {
                var char = sourceStr.substring(index, index + 1);
                if (!asciiReg.test(char)) {
                    return false;
                }
            }
            return true;
        }
    } catch (e) {
        StringSp.exception_ = e;
        return false;
    }
}

StringSp.isLetter = function (sourceStr) {
    /// <summary>Check source string is letter.</summary>
    /// <param name="sourceStr" type="String">source string.</param>
    /// <returns type="bool" />
    try {
        StringSp.exception_ = null;
        if (StringSp.isNullOrEmpty(sourceStr, false)) {
            StringSp.exception_ = 'Source string is null or empty.';
            return false;
        }
        else {
            var asciiReg = /[A-Za-z]/;
            for (var index = 0; index < sourceStr.length; index++) {
                var char = sourceStr.substring(index, index + 1);
                if (!asciiReg.test(char)) {
                    return false;
                }
            }
            return true;
        }
    } catch (e) {
        StringSp.exception_ = e;
        return false;
    }
}

StringSp.isNullOrEmpty = function (soruceStr, needRemoveSpace) {
    /// <summary>Check string is null or empty.</summary>
    /// <param name="soruceStr" type="String">source string</param>
    /// <param name="needRemoveSpace" type="bool">true:remove space and check is null or empty.false:not remove space.</param>
    /// <returns type="bool" />
    if (typeof (soruceStr) === 'undefined' || soruceStr === undefined
        || soruceStr === null || soruceStr.toString().length <= 0) {
        return true;
    }
    else if (!ObjectSp.isUndefinedNull(needRemoveSpace) && needRemoveSpace) {
        if (soruceStr.toString().replace(/(^\s*)|(\s*$)/g, '').length <= 0) {
            return true;
        }
        else {
            return false;
        }
    }
    else {
        return false;
    }
}

StringSp.isUppercase = function (sourceStr) {
    /// <summary>Check source string is uppercase.</summary>
    /// <param name="sourceStr" type="String">source string.</param>
    /// <returns type="bool" />
    try {
        StringSp.exception_ = null;
        if (StringSp.isNullOrEmpty(sourceStr, false)) {
            StringSp.exception_ = 'Source string is null or empty.';
            return false;
        }
        else {
            var asciiReg = /[A-Z]/;
            for (var index = 0; index < sourceStr.length; index++) {
                var char = sourceStr.substring(index, index + 1);
                if (!asciiReg.test(char)) {
                    return false;
                }
            }
            return true;
        }
    } catch (e) {
        StringSp.exception_ = e;
        return false;
    }
}

StringSp.isLowercase = function (sourceStr) {
    /// <summary>Check source string is lowercase.</summary>
    /// <param name="sourceStr" type="String">source string.</param>
    /// <returns type="bool" />
    try {
        StringSp.exception_ = null;
        if (StringSp.isNullOrEmpty(sourceStr, false)) {
            StringSp.exception_ = 'Source string is null or empty.';
            return false;
        }
        else {
            var asciiReg = /[a-z]/;
            for (var index = 0; index < sourceStr.length; index++) {
                var char = sourceStr.substring(index, index + 1);
                if (!asciiReg.test(char)) {
                    return false;
                }
            }
            return true;
        }
    } catch (e) {
        StringSp.exception_ = e;
        return false;
    }
}

StringSp.toAscii = function (sourceStr, radix, needRemoveNotAscii) {
    /// <summary>Convert to ascii code.</summary>
    /// <param name="radix" type="int">2/8/10/16.Default is 10.</param>
    /// <param name="needRemoveNotAscii" type="bool">true:remove not ascii.eg:chinese.false:not remvove.Default is true.</param>
    /// <returns type="String" />
    try {
        StringSp.exception_ = null;
        if (StringSp.isNullOrEmpty(radix)) {
            radix = 10;
        }
        if (StringSp.isNullOrEmpty(needRemoveNotAscii)) {
            needRemoveNotAscii = true;
        }
        if (StringSp.isNullOrEmpty(sourceStr)) {
            return null;
        }
        else {
            var asciiReg = /[\x00-\x7F]/;
            var asciiStr = '';
            var formatLens = { '_2': 8, '_8': 3, '_10': 3, '_16': 2 };
            var formatLen = parseInt(formatLens['_' + radix.toString()]);
            for (var index = 0; index < sourceStr.length; index++) {
                var char = sourceStr.substring(index, index + 1);
                if (asciiReg.test(char)) {
                    var ascii = char.charCodeAt(0).toString(radix);
                    ascii = StringSp.format(ascii, formatLen, '0', 'LEFT');
                    asciiStr += ascii;
                }
                else {
                    asciiStr += needRemoveNotAscii ? '' : char;
                }
            }
            return asciiStr;
        }
    } catch (e) {
        StringSp.exception_ = e;
        return null;
    }
}

StringSp.toUpperEx = function (sourceStr, needRemoveNotLetter) {
    try {
        StringSp.exception_ = null;
        if (needRemoveNotLetter === undefined || needRemoveNotLetter === null || !needRemoveNotLetter) {
            return sourceStr.toString().toUpperCase();
        }
        else {
            var temp = sourceStr.replace(/[^a-zA-Z]/g, '');
            return temp.toString().toUpperCase();
        }
    } catch (e) {
        StringSp.exception_ = e;
        return "";
    }
}

StringSp.trim = function (sourceStr) {
    return sourceStr.replace(/(^\s*)|(\s*$)/g, '');
}

StringSp.trimLeft = function (sourceStr) {
    return sourceStr.replace(/(^\s*)/g, '');
}

StringSp.trimRight = function (sourceStr) {
    return sourceStr.replace(/(\s*$)/g, '');
}

StringSp.removeChinese = function (sourceStr) {

    var destStr = "";
    if (sourceStr !== undefined && sourceStr !== null && sourceStr.length > 0) {
        for (var index = 0; index < sourceStr.length; index++) {
            var checkChar = sourceStr.substring(index, index + 1);
            if (StringSp.isAscii(checkChar)) {
                destStr += checkChar;
            }
        }
    }
    return destStr;
}


StringSp.removeNotLetter = function (sourceStr) {

    var destStr = "";
    if (sourceStr !== undefined && sourceStr !== null && sourceStr.length > 0) {
        for (var index = 0; index < sourceStr.length; index++) {
            var checkChar = sourceStr.substring(index, index + 1);
            if (StringSp.checkCharIsLetter(checkChar)) {
                destStr += checkChar;
            }
        }
    }
    return destStr;
}

StringSp.reverse = function (sourceStr) {

    var destStr = "";
    if (sourceStr !== null && sourceStr.length > 0) {
        destStr = sourceStr.split("").reverse().join("");
    }
    return destStr;
}




StringSp.utf16to8 = function (str) {

    var out, i, len, c;
    out = "";
    len = str.length;
    for (i = 0; i < len; i++) {
        c = str.charCodeAt(i);
        if ((c >= 0x0001) && (c <= 0x007F)) {
            out += str.charAt(i);
        } else if (c > 0x07FF) {
            out += String.fromCharCode(0xE0 | ((c >> 12) & 0x0F));
            out += String.fromCharCode(0x80 | ((c >> 6) & 0x3F));
            out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
        } else {
            out += String.fromCharCode(0xC0 | ((c >> 6) & 0x1F));
            out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
        }
    }
    return out;
}