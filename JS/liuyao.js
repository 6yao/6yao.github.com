/// <reference path="ObjectSp.js" />

var LiuYao = {};

//////////////////////////////////////////////////////////////////////////
//Parameter
//////////////////////////////////////////////////////////////////////////
LiuYao.Para = {};

LiuYao.Para.pureDivinatory_ = [
     '111', //乾
    '110', //兑
    '101', //离
     '100', //震
    '011', //巽
    '010', //坎
    '001', //艮
    '000'  //坤
];

LiuYao.Para.divinatoryTable_ = [
   { 11: "乾卦", 15: "天风姤", 17: "天山遯", 18: "天地否", 58: "风地观", 78: "山地剥", 38: "火地晋", 31: "火天大有" }, //乾宫
   {22: "兑卦", 26: "泽水困", 28: "泽地萃", 27: "泽山咸", 67: "水山蹇", 87: "地山谦", 47: "雷山小过", 42: "雷泽归妹" }, //兑宫
   {33: "离卦", 37: "火山旅", 35: "火风鼎", 36: "火水未济", 76: "山水蒙", 56: "风水涣", 16: "天水讼", 13: "天火同人" }, //离宫
   {44: "震卦", 48: "雷地豫", 46: "雷水解", 45: "雷风恒", 85: "地风升", 65: "水风井", 25: "泽风大过", 24: "泽雷随" }, //震宫
   {55: "巽卦", 51: "风天小畜", 53: "风火家人", 54: "风雷益", 14: "天雷无妄", 34: "火雷噬嗑", 74: "山雷颐", 75: "山风蛊" }, //巽宫
   {66: "坎卦", 62: "水泽节", 64: "水雷屯", 63: "水火既济", 23: "泽火革", 73: "山火丰", 83: "地火明夷", 86: "地水师" }, //坎宫
   {77: "艮卦", 73: "山火贲", 71: "山天大畜", 72: "山泽损", 32: "火泽睽", 12: "天泽履", 52: "风泽中孚", 57: "风山渐" }, //艮宫
   {88: "坤卦", 84: "地雷复", 82: "地泽临", 81: "地天泰", 41: "雷天大壮", 21: "泽天夬", 61: "水天需", 68: "水地比"}//坤宫
];

LiuYao.Para.naJiaTable_ = [
    { 1: "甲子", 2: "甲寅", 3: "甲辰", 4: "壬午", 5: "壬申", 6: "壬戌" }, //乾
    {1: "丁巳", 2: "丁卯", 3: "丁丑", 4: "丁亥", 5: "丁酉", 6: "丁未" }, //兑
    {1: "己卯", 2: "己丑", 3: "己亥", 4: "己酉", 5: "己未", 6: "己巳" }, //离
    {1: "庚子", 2: "庚寅", 3: "庚辰", 4: "庚午", 5: "庚申", 6: "庚戌" }, //震
    {1: "辛丑", 2: "辛亥", 3: "辛酉", 4: "辛未", 5: "辛巳", 6: "辛卯" }, //巽
    {1: "戊寅", 2: "戊辰", 3: "戊午", 4: "戊申", 5: "戊戌", 6: "戊子" }, //坎
    {1: "丙辰", 2: "丙午", 3: "丙申", 4: "丙戌", 5: "丙子", 6: "丙寅" }, //艮
    {1: "乙未", 2: "乙巳", 3: "乙卯", 4: "乙丑", 5: "乙亥", 6: "乙酉"} //坤
];

LiuYao.Para.yinYang_ = ["▅▅　▅▅", "▅▅▅▅▅"];

LiuYao.Para.WU_XING = {
    "甲": 1, "乙": 1, "寅": 1, "卯": 1, "震": 1, "巽": 1, //木
    "丙": 2, "丁": 2, "巳": 2, "午": 2, "离": 2, //火
    "戊": 3, "己": 3, "丑": 3, "辰": 3, "未": 3, "戌": 3, "艮": 3, "坤": 3, //土
    "庚": 4, "辛": 4, "申": 4, "酉": 4, "乾": 4, "兑": 4, //金
    "壬": 5, "癸": 5, "子": 5, "亥": 5, "坎": 5//水
};

//////////////////////////////////////////////////////////////////////////
//Exception
//////////////////////////////////////////////////////////////////////////
LiuYao.exception_ = null;

//////////////////////////////////////////////////////////////////////////
//Private function
//////////////////////////////////////////////////////////////////////////
LiuYao.__computePureDivinatoryIndex = function (index, changeLines) {
    /// <summary>Compute pure divinatory index by change lines.</summary>
    /// <param name="index" type="int">Divinatory index.1-8</param> 
    /// <param name="changeLines" type="int[]">Change lines.Length is 3.Default is 0.0 is no change.1 is change.</param> 
    if (ObjectSp.isUndefinedNull(changeLines)) {
        //changeLines = [0,0,0];
        return index;
    }
    var divinatoryValue = LiuYao.Para.pureDivinatory_[index - 1];
    var newDivinatoryValue = "";
    for (var i = 0; i < divinatoryValue.length; i++) {
        var yinYangIndex = divinatoryValue.substring(i, i + 1);
        if (changeLines[i] == 1) {
            yinYangIndex = (yinYangIndex == 1) ? 0 : 1;
        }
        newDivinatoryValue += yinYangIndex.toString();
    }

    for (var j = 0; j < LiuYao.Para.pureDivinatory_.length; j++) {
        if (newDivinatoryValue === LiuYao.Para.pureDivinatory_[j]) {
            return j + 1;
        }
    }
}

LiuYao.__getPureDivinatoryName = function (index, isChinese) {
    /// <summary>Get pure divinatory name by index.index is 1-8</summary>
    /// <param name="index" type="int">Divinatory index.1-8</param> 
    /// <param name="isChinese" type="bool">True:return chinese.False:return letter.</param> 
    if (ObjectSp.isUndefinedNull(isChinese)) {
        isChinese = false;
    }

    if (isChinese) {
        return ["乾", "兑", "离", "震", "巽", "坎", "艮", "坤"][parseInt(index) - 1];
    }
    else {
        return ["Qian", "Dui", "Li", "Zhen", "Xun", "Kan", "Gen", "Kun"][parseInt(index) - 1];
    }
}

LiuYao.__generatePureDivinatory = function (index) {
    /// <summary>Generate pure divinatory by index.</summary>
    /// <param name="index" type="int">Divinatory index.1-8</param>   

    var divinatoryValue = LiuYao.Para.pureDivinatory_[index - 1];
    var divinatoryImage = "";

    for (var i = divinatoryValue.length - 1; i >= 0; i--) {
        var yinYangIndex = divinatoryValue.substring(i, i + 1);
        divinatoryImage += LiuYao.Para.yinYang_[yinYangIndex] + "</br>";
    }
    return divinatoryImage;
}


//////////////////////////////////////////////////////////////////////////
//Public function
//////////////////////////////////////////////////////////////////////////
LiuYao.computeChangeLineSign = function (up, down, changLines) {
    /// <summary>Compute change line sign by up value and down value</summary>
    /// <param name="up" type="int">Up divinatory value.1-8</param>
    /// <param name="down" type="int">Down divinatory value.1-8</param> 
    /// <param name="changeLines" type="int[]">Change lines.Length is 6.Default is 0.0 is no change.1 is change.</param> 
    var signs = ["×", "○"];
    if (ObjectSp.isUndefinedNull(changLines)) {
        return "";
    }
    var upDivinatoryValue = LiuYao.Para.pureDivinatory_[up - 1];
    var downDivinatoryValue = LiuYao.Para.pureDivinatory_[down - 1];
    var divinatoryValue = downDivinatoryValue + upDivinatoryValue;
    var signResult = "";
    for (var i = changLines.length - 1; i >= 0; i--) {
        if (changLines[i] === 1) {
            signResult += signs[parseInt(divinatoryValue.substring(i, i + 1))];
        }
        signResult += "</br>";
    }
    return signResult;
}

LiuYao.computeDivinatoryTitle = function (up, down) {
    /// <summary>Compute divinatory palace.</summary>
    /// <param name="up" type="int">Up divinatory value.1-8</param>
    /// <param name="down" type="int">Down divinatory value.1-8</param>
    var complexDivinatoryIndex = up * 10 + down;
    for (var i = 0; i < LiuYao.Para.divinatoryTable_.length; i++) {
        if (!ObjectSp.isUndefinedNull(LiuYao.Para.divinatoryTable_[i][complexDivinatoryIndex])) {
            return LiuYao.__getPureDivinatoryName(i + 1, true) + "宫"
                   + "   " + LiuYao.Para.divinatoryTable_[i][complexDivinatoryIndex] + "</br>";
        }
    }
}

LiuYao.computeLiuQin = function (naJias, palace) {
    /// <summary>Compute divinatory palace.</summary>
    /// <param name="naJias" type="string[]">NaJia array of the complex divinatory.</param>  
    /// <param name="palace" type="string">Divinatory palace.</param>    
    var palaceWuXing = LiuYao.Para.WU_XING[palace];
    var liuQins = ["兄弟", "父母", "官鬼", "妻财", "子孙"];
    var liuQinResult = "";
    for (var naJiaIndex = 0; naJiaIndex < 6; naJiaIndex++) {
        var diZhi = naJias[naJiaIndex].substring(1, 2);
        var diZhiWuXing = LiuYao.Para.WU_XING[diZhi];
        var liuQinIndex = ((palaceWuXing + 5) - diZhiWuXing) % 5;
        liuQinResult += liuQins[liuQinIndex] + "</br>";
    }
    return liuQinResult;
}

LiuYao.computeFuShen = function (palace) {
    var palaces = { "乾": 11, "兑": 22, "离": 33, "震": 44, "巽": 55, "坎": 66, "艮": 77, "坤": 88 };
    var up = parseInt(palaces[palace] / 10);
    var down = parseInt(palaces[palace] % 10);
    var naJia = LiuYao.computeNaJia(up, down);
    var liuQin = LiuYao.computeLiuQin(naJia.split('</br>'), palace);
    return { "naJia": naJia, "liuQin": liuQin };
}

LiuYao.computeLiuShen = function (dateGanZhi) {
    /// <summary>Compute liu shen.</summary>
    /// <param name="dateGanZhi" type="String">Gan zhi of the date.</param>
    var liuShens = ["青龙", "朱雀", "勾陈", "腾蛇", "白虎", "玄武"];
    var liuShenFirsts = {
        "甲": 0, "乙": 0,
        "丙": 1, "丁": 1,
        "戊": 2,
        "己": 3,
        "庚": 4, "辛": 4,
        "壬": 5, "癸": 5
    };
    var liuShenResult = "";
    var liuShenIndex = liuShenFirsts[dateGanZhi.substring(0, 1)];
    for (var i = 0; i < 6; i++) {
        liuShenResult += liuShens[5 - (liuShenIndex + i) % 6] + "</br>";
    }
    return liuShenResult;
}

LiuYao.computeNaJia = function (up, down) {
    /// <summary>Compute NaJia</summary>
    /// <param name="up" type="int">Up divinatory value.1-8</param>
    /// <param name="down" type="int">Down divinatory value.1-8</param>
    var downNaJia = LiuYao.Para.naJiaTable_[down - 1][3] + "</br>"
                    + LiuYao.Para.naJiaTable_[down - 1][2] + "</br>"
                    + LiuYao.Para.naJiaTable_[down - 1][1] + "</br>";
    var upNaJia = LiuYao.Para.naJiaTable_[up - 1][6] + "</br>"
                    + LiuYao.Para.naJiaTable_[up - 1][5] + "</br>"
                    + LiuYao.Para.naJiaTable_[up - 1][4] + "</br>";
    return upNaJia + downNaJia;
}

LiuYao.generateComplexDivinatory = function (up, down) {
    /// <summary>Generate divinatory by up value and down value</summary>
    /// <param name="up" type="int">Up divinatory value.1-8</param>
    /// <param name="down" type="int">Down divinatory value.1-8</param> 

    var upDivinatory = LiuYao.__generatePureDivinatory(up);
    var downDivinatory = LiuYao.__generatePureDivinatory(down);
    return upDivinatory + downDivinatory;
}

//////////////////////////////////////////////////////////////////////////
//UI
//////////////////////////////////////////////////////////////////////////
LiuYao.generateDivinatory = function () {
    var up = parseInt(document.getElementById('up_divinatory_index').value);
    var down = parseInt(document.getElementById('down_divinatory_index').value);
    var palace = "";

    var liuShen = LiuYao.computeLiuShen("甲子");
    document.getElementById("liu_shen").innerHTML = liuShen;

    var divinatoryTitleMain = LiuYao.computeDivinatoryTitle(up, down);
    document.getElementById('divinatory_title_main').innerHTML = divinatoryTitleMain;
    palace = divinatoryTitleMain.substring(0, 1);


    var fuShen = LiuYao.computeFuShen(palace);
    document.getElementById('na_jia_fu_shen').innerHTML = fuShen.naJia;
    document.getElementById('liu_qin_fu_shen').innerHTML = fuShen.liuQin;
    showFuShen();


    var divinatoryImageMain = LiuYao.generateComplexDivinatory(up, down);
    document.getElementById('divinatory_main').innerHTML = divinatoryImageMain;

    var naJiaMain = LiuYao.computeNaJia(up, down);
    document.getElementById('na_jia_main').innerHTML = naJiaMain;

    var liuQinMain = LiuYao.computeLiuQin(naJiaMain.split('</br>'), palace);
    document.getElementById('liu_qin_main').innerHTML = liuQinMain;

    var changeLinesUp = [0, 0, 0];
    var changeLinesDown = [0, 0, 0];
    var changeLineId = 'change_line_';
    for (var i = 1; i <= 3; i++) {//Need fix
        if (document.getElementById(changeLineId + i.toString()).checked) {
            changeLinesDown[i - 1] = 1;
        }
    }

    for (var i = 4; i <= 6; i++) {//Need fix
        if (document.getElementById(changeLineId + i.toString()).checked) {
            changeLinesUp[i - 4] = 1;
        }
    }

    var changLineSigns = LiuYao.computeChangeLineSign(up, down, changeLinesDown.concat(changeLinesUp));
    document.getElementById('divinatory_change_lines').innerHTML = changLineSigns;

    var changeUp = LiuYao.__computePureDivinatoryIndex(up, changeLinesUp);
    var changeDown = LiuYao.__computePureDivinatoryIndex(down, changeLinesDown);

    var divinatoryTitleChange = LiuYao.computeDivinatoryTitle(changeUp, changeDown);
    document.getElementById('divinatory_title_change').innerHTML = divinatoryTitleChange;

    var divinatoryImageChange = LiuYao.generateComplexDivinatory(changeUp, changeDown);
    document.getElementById('divinatory_change').innerHTML = divinatoryImageChange;

    var naJiaChange = LiuYao.computeNaJia(changeUp, changeDown);
    document.getElementById('na_jia_change').innerHTML = naJiaChange;

    var liuQinChange = LiuYao.computeLiuQin(naJiaChange.split('</br>'), palace);
    document.getElementById('liu_qin_change').innerHTML = liuQinChange;

}
