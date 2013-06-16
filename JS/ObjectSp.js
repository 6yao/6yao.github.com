var ObjectSp = {};
ObjectSp.exception_ = null;

ObjectSp.bindEvent = function (objOrId, eventName, eventFunction, parentDocument) {
    /// <summary>Bind event to obj.</summary>
    /// <param name="objOrId" type="object">Object or id that bind.</param>
    /// <param name="eventName" type="String">Event name that bind.</param>
    /// <param name="eventFunction" type="function">Response function when event trigger.If bind circularly,function must be closure(eg:new function when bind every time.).</param>
    /// <param name="parentDocument" type="document">Default is document.</param>
    /// <returns type="bool" />
    try {
        ObjectSp.exception_ = null;
        var obj = ObjectSp.fetchObjcet(objOrId);
        if (ObjectSp.isUndefinedNull(obj)) {
            return false;
        }
        var target = obj;
        if (typeof (target[eventName]) === 'undefined') {
            ObjectSp.exception_ = eventName + ' is not exist in the ' + target.id;
            return false;
        }
        if (target.addEventListener) {
            target.addEventListener(eventName, eventFunction, false);
        }
        else if (target.attachEvent) {
            target.attachEvent(eventName, eventFunction);
        }
        return true;
    } catch (e) {
        ObjectSp.exception_ = e;
        return false;
    }
}

ObjectSp.calculateCursorPosInText = function (obj, event) {
    try {
        ObjectSp.exception_ = null;

        var cursorPosition = 0;
        if (obj.selectionStart) { //Not ie browser.
            cursorPosition = obj.selectionStart;
        } else { //IE
            var rng;
            if (obj.tagName === "TEXTAREA") {
                rng = event.srcElement.createTextRange();
                rng.moveToPoint(event.x, event.y);
            } else { //Input text.
                rng = document.selection.createRange();
            }
            rng.moveStart("character", -event.srcElement.value.length);
            cursorPosition = rng.text.length;
        }
        return cursorPosition;
    } catch (e) {
        ObjectSp.exception_ = e;
        return null;
    }
}

ObjectSp.excuteFunction = function () {
    /// <summary>
    ///  Call function of the iframe outside of iframe.
    ///  Pass param by arguments.
    ///  arguments[0]:iframeOrId.
    ///  arguments[1]:If arguments[0] is iframe,arguments[1] is functionName or namespace.functionName.
    ///               If arguments[0] is iframe id,arguments[1] is document.
    ///  arguments[2]:If arguments[1] is functionName or namespace.functionName,arguments[2] is first param of function that call.
    ///               If arguments[1] is document,arguments[2] is functionName or namespace.functionName.   
    ///  arguments[3]--arguments[n]:The params of the function that call.
    /// </summary>
    /// <returns type="object" />   
    try {
        ObjectSp.exception_ = null;
        var frameWin = null;
        var paramBeginIndex = 3;
        if (typeof (arguments[0]) === 'string') {
            var iframeId = arguments[0];
            var parentDocument = arguments[1];
            frameWin = parentDocument.getElementsByTagName("iframe")[iframeId].contentWindow;
            paramBeginIndex = 3;
        }
        else if (typeof (arguments[0] === 'object')) {
            frameWin = arguments[0].contentWindow;
            paramBeginIndex = 2;
        }
        else {
            ObjectSp.exception_ = 'Can not find iframe window.';
            return undefined;
        }

        var functionName = arguments[paramBeginIndex - 1]
        var functionArgumentCount = arguments.length - paramBeginIndex;

        for (var index = paramBeginIndex, newArgumentIndex = 0; index < arguments.length; index++, newArgumentIndex++) {
            arguments[newArgumentIndex] = arguments[index];
        }
        for (var index = arguments.length - paramBeginIndex; index < arguments.length - 1; index++) {
            arguments[index] = null;
        }
        var excuteResult = null;

        var functionNameObj = functionName.split(".");
        switch (functionArgumentCount) {
            case 0:
                {
                    if (functionNameObj.length > 1) {
                        excuteResult = frameWin[functionNameObj[0]][functionNameObj[1]]();
                    }
                    else {
                        excuteResult = frameWin[functionName]();
                    }
                    break;
                }
            case 1:
                {
                    if (functionNameObj.length > 1) {
                        excuteResult = frameWin[functionNameObj[0]][functionNameObj[1]](arguments[0]);
                    }
                    else {
                        excuteResult = frameWin[functionName](arguments[0]);
                    }
                    break;
                }
            case 2:
                {
                    if (functionNameObj.length > 1) {
                        excuteResult = frameWin[functionNameObj[0]][functionNameObj[1]](arguments[0], arguments[1]);
                    }
                    else {
                        excuteResult = frameWin[functionName](arguments[0], arguments[1]);
                    }
                    break;
                }
            case 3:
                {
                    if (functionNameObj.length > 1) {
                        excuteResult = frameWin[functionNameObj[0]][functionNameObj[1]](arguments[0], arguments[1], arguments[2]);
                    }
                    else {
                        excuteResult = frameWin[functionName](arguments[0], arguments[1], arguments[2]);
                    }
                    break;
                }
            case 4:
                {
                    if (functionNameObj.length > 1) {
                        excuteResult = frameWin[functionNameObj[0]][functionNameObj[1]](arguments[0], arguments[1], arguments[2], arguments[3]);
                    }
                    else {
                        excuteResult = frameWin[functionName](arguments[0], arguments[1], arguments[2], arguments[3]);
                    }
                    break;
                }
            case 5:
                {
                    if (functionNameObj.length > 1) {
                        excuteResult = frameWin[functionNameObj[0]][functionNameObj[1]](arguments[0], arguments[1], arguments[2], arguments[3], arguments[4]);
                    }
                    else {
                        excuteResult = frameWin[functionName](arguments[0], arguments[1], arguments[2], arguments[3], arguments[4]);
                    }
                    break;
                }
            case 6:
                {
                    if (functionNameObj.length > 1) {
                        excuteResult = frameWin[functionNameObj[0]][functionNameObj[1]](arguments[0], arguments[1], arguments[2], arguments[3], arguments[4], arguments[5]);
                    }
                    else {
                        excuteResult = frameWin[functionName](arguments[0], arguments[1], arguments[2], arguments[3], arguments[4], arguments[5]);
                    }
                    break;
                }
            case 7:
                {
                    if (functionNameObj.length > 1) {
                        excuteResult = frameWin[functionNameObj[0]][functionNameObj[1]](arguments[0], arguments[1], arguments[2], arguments[3], arguments[4], arguments[5], arguments[6]);
                    }
                    else {
                        excuteResult = frameWin[functionName](arguments[0], arguments[1], arguments[2], arguments[3], arguments[4], arguments[5], arguments[6]);
                    }
                    break;
                }
            case 8:
                {
                    if (functionNameObj.length > 1) {
                        excuteResult = frameWin[functionNameObj[0]][functionNameObj[1]](arguments[0], arguments[1], arguments[2], arguments[3], arguments[4], arguments[5], arguments[6], arguments[7]);
                    }
                    else {
                        excuteResult = frameWin[functionName](arguments[0], arguments[1], arguments[2], arguments[3], arguments[4], arguments[5], arguments[6], arguments[7]);
                    }
                    break;
                }
            case 9:
                {
                    if (functionNameObj.length > 1) {
                        excuteResult = frameWin[functionNameObj[0]][functionNameObj[1]](arguments[0], arguments[1], arguments[2], arguments[3], arguments[4], arguments[5], arguments[6], arguments[7], arguments[8]);
                    }
                    else {
                        excuteResult = frameWin[functionName](arguments[0], arguments[1], arguments[2], arguments[3], arguments[4], arguments[5], arguments[6], arguments[7], arguments[8]);
                    }
                    break;
                }
            case 10:
                {
                    if (functionNameObj.length > 1) {
                        excuteResult = frameWin[functionNameObj[0]][functionNameObj[1]](arguments[0], arguments[1], arguments[2], arguments[3], arguments[4], arguments[5], arguments[6], arguments[7], arguments[8], arguments[9]);
                    }
                    else {
                        excuteResult = frameWin[functionName](arguments[0], arguments[1], arguments[2], arguments[3], arguments[4], arguments[5], arguments[6], arguments[7], arguments[8], arguments[9]);
                    }
                    break;
                }
            default:
                {
                    excuteResult = frameWin[functionName]();
                    break;
                }
        }
        return excuteResult;
    }
    catch (e) {
        ObjectSp.exception_ = e;
        return null;
    }
}

ObjectSp.exist = function (objOrId, parentDocument) {
    /// <summary>Check object is exist.</summary>
    /// <param name="objOrId" type="object">String is Id.Object is obj.</param>
    /// <param name="parentDocument" type="document">Default is document.</param>
    /// <returns type="bool" />
    try {
        ObjectSp.exception_ = null;
        var obj = ObjectSp.fetchObjcet(objOrId, parentDocument);
        if (ObjectSp.isUndefinedNull(obj)) {
            return false;
        }
        else {
            return true;
        }
    } catch (e) {
        ObjectSp.exception_ = e;
        return false;
    }
}

ObjectSp.fetchChildObjectsByTagName = function (parentObj, tagName, filterType) {
    /// <summary>Fetch child objects by tag name.</summary>
    /// <param name="parentObj" type="object">Parent object that child object.</param>
    /// <param name="tagName" type="String">tag name.</param>
    /// <param name="filterType" type="String">Filter type.If is undefined or null or empty,get all child objects.</param>
    /// <returns type="object" />
    try {
        ObjectSp.exception_ = null;
        var childObjs = null;
        if (parentObj !== undefined && parentObj !== null) {
            var childObjsTemp = parentObj.getElementsByTagName(tagName);
            if (filterType !== undefined && filterType !== null && filterType.length > 0) {
                childObjs = [];
                childIndex = 0;
                for (var index = 0; index < childObjsTemp.length; index++) {
                    if (childObjsTemp[index].type !== undefined && childObjsTemp[index].type === filterType) {
                        childObjs.push(childObjsTemp[index]);
                    }
                }
            }
            else {
                childObjs = childObjsTemp;
            }
        }
        return childObjs;
    } catch (e) {
        ObjectSp.exception_ = e;
        return null;

    }
}

ObjectSp.fetchIframeWin = function (iframeId, parentDocument) {
    try {
        ObjectSp.exception_ = null;
        if (ObjectSp.isUndefinedNull(parentDocument)) {
            parentDocument = document;
        }
        var frameWin = parentDocument.getElementsByTagName("iframe")[iframeId].contentWindow;
        return frameWin;
    } catch (e) {
        ObjectSp.exception_ = e;
        return null;
    }
}

ObjectSp.fetchObjcet = function (objOrId, parentDocument) {
    /// <summary>Fetch object by id or object in the parentDocument.</summary>
    /// <param name="objOrId" type="object or string">String is id.Object is obj.</param>
    /// <returns type="Object" />
    try {
        ObjectSp.exception_ = null;
        if (typeof (objOrId) === 'string') {
            if (ObjectSp.isUndefinedNull(parentDocument)) {
                parentDocument = document;
            }
            var obj = parentDocument.getElementById(objOrId);
            if (ObjectSp.isUndefinedNull(obj)) {
                ObjectSp.exception_ = 'Can not find object in the document.'
            }
            return obj;
        }
        else if (typeof (objOrId) !== 'object') {
            return objOrId;
        }
        else {
            ObjectSp.exception_ = 'Not object or id!';
            return null;
        }
    } catch (e) {
        ObjectSp.exception_ = e;
        return null;
    }
}

ObjectSp.fetchPropertyNames = function (obj, hasFunction) {
    /// <summary>Fetch all property name in the obj.</summary>
    /// <param name="obj" type="object">Object that fetch.</param>
    /// <param name="hasFunction" type="bool">true:fetch property name that contain function.false:fetch property name that not contain function.Default is true.</param>
    /// <returns type="object" />
    try {
        ObjectSp.exception_ = null;

        var propertyNames = [];
        var index = 0;
        if (ObjectSp.isUndefinedNull(hasFunction)) {
            hasFunction = true;
        }
        for (var p in obj) {
            if (typeof (obj[p]) === "function") {
                if (hasFunction) {
                    propertyNames.push(p);
                }
            } else { //p is property name.obj[p] is value.
                propertyNames.push(p);
            }
        }
        return propertyNames;
    } catch (e) {
        ObjectSp.exception_ = e;
        return null;

    }
}

ObjectSp.fetchValue = function (objOrId, valueKey, parentDocument) {
    /// <summary>Fetch object value by id or object in the parentDocument.</summary>
    /// <param name="objOrId" type="object_or_string">String is id.Object is obj.</param>
    /// <param name="valueKey" type="String">The key of the value.Default is value.</param>
    /// <returns type="object" />
    try {
        ObjectSp.exception_ = null;
        var obj = ObjectSp.fetchObjcet(objOrId, parentDocument);
        if (ObjectSp.isUndefinedNull(obj)) {
            return null;
        }
        else {
            if (ObjectSp.isUndefinedNull(valueKey)){ 
                valueKey='value';
            }
            if (typeof (obj[valueKey]) === 'undefined') {
                ObjectSp.exception_ = 'Can not read ' + valueKey.toString() + ' property in the ' + obj.id + '!';
                return null;
            }
            else {
                if (valueKey === 'checked') {
                    if (obj[valueKey] || obj[valueKey] === 'checked') {//Compatible checkbox in different browser.
                        return true;
                    }
                    else {
                        return false;
                    }
                }
                return obj[valueKey];
            }

        }
    } catch (e) {
        ObjectSp.exception_ = e;
        return null;
    }
}

ObjectSp.getStandarEvent = function (event) {
    ///<summary>Get standar event.</summary>
    /// <param name="event" type="event">event</param>
    /// <returns type="event" />
    if (!event) {    //Compatible IE.
        event = window.event;
        event.target = event.srcElement;
        event.layerX = event.offsetX;
        event.layerY = event.offsetY;
    }
    event.mouseDownX = event.pageX || event.clientX + document.body.scrollLeft; // Calculate x distance of the mouse pointer.
    event.mouseDownY = event.pageY || event.clientY + document.body.scrollTop;  //Calculate y distance of the mouse pointer.
    return event;   // return standar object event.
}

ObjectSp.isUndefinedNull = function (obj) {
    /// <summary>check object is undefined or null</summary>
    /// <param name="obj" type="object">input object</param>
    /// <returns type="bool" />
    if (typeof (obj) === 'undefined' || obj === undefined || obj === null) {
        return true;
    }
    else {
        return false;
    }
}

ObjectSp.removeChildByName = function (parentObj, tagName, name) {
    /// <summary>Remove child by name.</summary>
    /// <param name="parentObj" type="object">parent object</param>
    /// <param name="tagName" type="String">tag name.</param>
    /// <param name="name" type="String">The name of the object that need remove.If name is undefined or null or empty,remove all.</param>
    if (parentObj !== undefined && parentObj !== null) {
        var removeByName = (name === undefined || name === null || name.length <= 0) ? false : true; //true:remove assign obj.false:remove all obj.
        var childs = parentObj.getElementsByTagName(tagName);
        var childCount = childs.length;
        for (var index = 0; index < childCount; index++) {
            if (removeByName) {
                if (childs[index].name !== undefined && childs[index].name === name) {
                    parentObj.removeChild(childs[index]);
                }
            }
            else {
                parentObj.removeChild(childs[0]);
            }
        }
    }
}

ObjectSp.setChecked = function (objOrId, isCheck, parentDocument) {
    /// <summary>Set checked by id or object in the parentDocument.</summary>
    /// <param name="objOrId" type="object">String is id.Object is obj.</param>
    /// <param name="isCheck" type="bool">true:checked.false:unchecked.If not true or false,checked and unchecked is interconversion.</param>
    /// <returns type="bool" />
    try {
        ObjectSp.exception_ = null;
        var obj = ObjectSp.fetchObjcet(objOrId, parentDocument);
        if (ObjectSp.isUndefinedNull(obj)) {
            return false;
        }
        else {
            if (ObjectSp.isUndefinedNull(isCheck) || typeof (isCheck) !== 'boolean') {
                if (obj.checked || obj.checked === 'checked') {
                    obj.checked = '';
                }
                else {
                    obj.checked = 'checked';
                }
            }
            else {
                obj.checked = isCheck ? 'checked' : '';
            }
            return true;
        }
    } catch (e) {
        ObjectSp.exception_ = e;
        return false;
    }
}

ObjectSp.setDisabled = function (objOrId, isActive, parentDocument) {
    /// <summary>Set object is actived or disabled.</summary>
    /// <param name="objOrId" type="object">String is Id.Object is obj.</param>
    /// <param name="isActive" type="bool">true:actived.false:disabled.If not true or false,actived and disabled is interconversion.</param>
    /// <param name="parentDocument" type="document">Default is document.</param>
    /// <returns type="bool" />
    try {
        ObjectSp.exception_ = null;
        var obj = ObjectSp.fetchObjcet(objOrId, parentDocument);
        if (ObjectSp.isUndefinedNull(obj)) {
            return false;
        }
        else {
            if (ObjectSp.isUndefinedNull(isActive) || typeof (isActive) !== 'boolean') {
                if (!obj.disabled) {
                    obj.disabled = 'disabled';
                }
                else {
                    obj.disabled = false;
                }
            }
            else {
                if (!isActive) {
                    obj.disabled = "disabled";
                }
                else {
                    obj.disabled = false;
                }
            }
            return true;
        }
    } catch (e) {
        ObjectSp.exception_ = e;
        return false;
    }
}

ObjectSp.setInnerHtml = function (objOrId, innerHtml, parentDocument) {
    /// <summary>Set checked by id or object in the parentDocument.</summary>
    /// <param name="objOrId" type="object">String is id.Object is obj.</param>
    /// <param name="innerHtml" type="String">innerHtml</param>
    /// <returns type="bool" />
    try {
        ObjectSp.exception_ = null;
        var obj = ObjectSp.fetchObjcet(objOrId, parentDocument);
        if (ObjectSp.isUndefinedNull(obj)) {
            return false;
        }
        else {
            if (typeof (obj.innerHTML) === 'undefined') {
                ObjectSp.exception_ = 'Can not read innerHTML property in the ' + obj.id;
                return false;
            }
            else {
                obj.innerHTML = innerHtml;
                return true;
            }
        }
    } catch (e) {
        ObjectSp.exception_ = e;
        return false;
    }
}

ObjectSp.setMaskLayer = function (parentDocument, divMaskLayerId, isVisible) {//设置遮罩层

    var divMaskLayer = null;
    if (divMaskLayerId !== undefined && divMaskLayerId !== null && divMaskLayerId.length > 0) {
        divMaskLayer = parentDocument.getElementById(divMaskLayerId);
    }
    else {
        divMaskLayerId = "divMaskLayer";
    }

    if (divMaskLayer === undefined || divMaskLayer === null) {
        var divMaskLayer = parentDocument.createElement("div");
        divMaskLayer.id = divMaskLayerId;
        divMaskLayer.className = 'maskLayer';
        parentDocument.body.appendChild(divMaskLayer);
    }
    if (divMaskLayer !== undefined && divMaskLayer !== null) {
        divMaskLayer.style.display = isVisible ? 'block' : 'none';
    }

    if (isVisible) {
        if (divMaskLayer !== undefined && divMaskLayer !== null) {
            var height = parseInt(parentDocument.height | parentDocument.documentElement.clientHeight);
            divMaskLayer.style.height = height.toString() + "px";  //"100%";        
        }
    }
    return divMaskLayerId;
}

ObjectSp.setReadOnly = function (objOrId, isReadOnly, parentDocument) {
    /// <summary>Set object src.</summary>
    /// <param name="objOrId" type="object">String is Id.Object is obj.</param>
    /// <param name="isReadOnly" type="bool">true:read only.false:not..If not true or false,raedonly and not-readonly is interconversion.</param>
    /// <param name="parentDocument" type="document">Default is document.</param>
    /// <returns type="bool" />
    try {
        ObjectSp.exception_ = null;
        var obj = ObjectSp.fetchObjcet(objOrId, parentDocument);
        if (ObjectSp.isUndefinedNull(obj)) {
            return false;
        }
        if (typeof (obj.readOnly) === 'undefined') {
            ObjectSp.exception_ = 'Can not read readOnly property in the ' + obj.id;
            return false;
        }
        else {
            if (ObjectSp.isUndefinedNull(isReadOnly) || typeof (isReadOnly) !== 'boolean') {
                if (obj.readOnly || obj.readOnly === 'readOnly') {
                    obj.readOnly = false;
                }
                else {
                    obj.readOnly = true;
                }
            }
            else {
                obj.readOnly = isReadOnly;
                return true;
            }

        }
    } catch (e) {
        ObjectSp.exception_ = e;
        return false;
    }
}

ObjectSp.setSrc = function (objOrId, url, parentDocument) {
    /// <summary>Set object src.</summary>
    /// <param name="objOrId" type="object">String is Id.Object is obj.</param>
    /// <param name="url" type="url">url</param>
    /// <param name="parentDocument" type="document">Default is document.</param>
    /// <returns type="bool" />
    try {
        ObjectSp.exception_ = null;
        var obj = ObjectSp.fetchObjcet(objOrId, parentDocument);
        if (ObjectSp.isUndefinedNull(obj)) {
            return false;
        }
        if (typeof (obj.src) === 'undefined') {
            ObjectSp.exception_ = 'Can not read src property in the ' + obj.id;
            return false;
        }
        else {
            obj.src = url;
            return true;
        }
    } catch (e) {
        ObjectSp.exception_ = e;
        return false;
    }
}

ObjectSp.setSelectedIndex = function (objOrId, selectedIndex, parentDocument) {
    /// <summary>Set object src.</summary>
    /// <param name="objOrId" type="object">String is Id.Object is obj.</param>
    /// <param name="selectedIndex" type="int">selected index</param>
    /// <param name="parentDocument" type="document">Default is document.</param>
    /// <returns type="bool" />
    try {
        ObjectSp.exception_ = null;
        var obj = ObjectSp.fetchObjcet(objOrId, parentDocument);
        if (ObjectSp.isUndefinedNull(obj)) {
            return false;
        }
        if (typeof (obj.selectedIndex) === 'undefined') {
            ObjectSp.exception_ = 'Can not read src property in the ' + obj.id;
            return false;
        }
        else {
            obj.selectedIndex = selectedIndex;
            return true;
        }
    } catch (e) {
        ObjectSp.exception_ = e;
        return false;
    }
}

ObjectSp.setValue = function (objOrId, value, parentDocument) {
    /// <summary>Set checked by id or object in the parentDocument.</summary>
    /// <param name="objOrId" type="object">String is id.Object is obj.</param>
    /// <param name="value" type="String">value</param>
    /// <returns type="bool" />
    try {
        ObjectSp.exception_ = null;
        var obj = ObjectSp.fetchObjcet(objOrId, parentDocument);
        if (ObjectSp.isUndefinedNull(obj)) {
            return false;
        }
        else {
            if (typeof (obj.value) === 'undefined') {
                ObjectSp.exception_ = 'Can not read value property in the ' + obj.id;
                return false;
            }
            else {
                obj.value = value;
                return true;
            }
        }
    } catch (e) {
        ObjectSp.exception_ = e;
        return false;
    }
}

ObjectSp.setVisible = function (objOrId, isVisible, parentDocument) {
    /// <summary>Set object is visible.</summary>
    /// <param name="objOrId" type="object">String is Id.Object is obj.</param>
    /// <param name="isVisible" type="bool">true:visible.false:unvisible.If not true or false,visible and unvisible is interconversion.</param>
    /// <param name="parentDocument" type="document">Default is document.</param>
    /// <returns type="bool" />
    try {
        ObjectSp.exception_ = null;
        var obj = ObjectSp.fetchObjcet(objOrId, parentDocument);
        if (ObjectSp.isUndefinedNull(obj)) {
            return false;
        }
        else {
            if (ObjectSp.isUndefinedNull(isVisible)) {
                if (obj.style.display === 'block') {
                    obj.style.display = 'none';
                }
                else {
                    obj.style.display = 'block';
                }
            }
            else {
                obj.style.display = isVisible ? 'block' : 'none';
            }
        }
    } catch (e) {
        ObjectSp.exception_ = e;
        return false;
    }
}

ObjectSp.submit = function (formId, parentDocument) {
    try {
        ObjectSp.exception_ = null;
        var form = ObjectSp.fetchObjcet(formId, parentDocument);
        if (ObjectSp.isUndefinedNull(form)) {
            return false;
        }
        else {
            if (typeof (form['submit']) === 'undefined') {
                ObjectSp.exception_ = 'Can not find method submit in the ' + form.id;
                return false;
            }
            else {
                form.submit();
                return true;
            }
        }
    }
    catch (e) {
        ObjectSp.exception_ = e;
        return false;
    }
}



