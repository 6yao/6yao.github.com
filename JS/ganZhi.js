/// <reference path="ObjectSp.js" />
/// <reference path="DateTimeSp.js" />

var GanZhi = {};

//////////////////////////////////////////////////////////////////////////
//Parameters
//////////////////////////////////////////////////////////////////////////
GanZhi.Para = {};

GanZhi.Para.cTable = {
    //  立春，雨水，惊蛰，春分， 清明,  谷雨， 立夏， 小满， 芒种，夏至, 小暑,  大暑,  立秋,  处暑, 白露,   秋分, 寒露,  霜降,   立冬,   小雪, 大雪, 冬至, 小寒, 大寒,
    '1900': [4.15, -1.00, -1.0, -1.0, 5.59, 20.888, 6.318, 21.86, 6.5, 22.20, 7.928, 23.65, 8.35, 23.95, 8.44, 23.822, 9.098, 24.218, 8.218, 23.08, 7.9, 22.60, 6.11, 20.84], //1900-1999
    '2000': [3.87, 18.73, 5.63, 20.646, 4.81, 20.1, 5.52, 21.04, 5.678, 21.37, 7.108, 22.83, 7.5, 23.13, 7.646, 23.042, 8.318, 23.438, 7.438, 22.36, 7.18, 21.94, 5.4055, 20.11]//2000-2099
};
GanZhi.Para.jiaZiTable = [
    '甲子', '乙丑', '丙寅', '丁卯', '戊辰', '己巳', '庚午', '辛未', '壬申', '癸酉',
    '甲戌', '乙亥', '丙子', '丁丑', '戊寅', '己卯', '庚辰', '辛巳', '壬午', '癸未',
    '甲申', '乙酉', '丙戌', '丁亥', '戊子', '己丑', '庚寅', '辛卯', '壬辰', '癸巳',
    '甲午', '乙未', '丙申', '丁酉', '戊戌', '己亥', '庚子', '辛丑', '壬寅', '癸卯',
    '甲辰', '乙巳', '丙午', '丁未', '戊申', '己酉', '庚戌', '辛亥', '壬子', '癸丑',
    '甲寅', '乙卯', '丙辰', '丁巳', '戊午', '己未', '庚申', '辛酉', '壬戌', '癸亥'
];

//////////////////////////////////////////////////////////////////////////                                                 
//Priviate function                                                                                                        
//////////////////////////////////////////////////////////////////////////  
GanZhi.__computeJieQiChangeTime = function (year, jieQiInex) {//Some c is -1,need fix.
    /// <summary>Compute jie qi changed time that contains date,hour and minute.</summary>
    /// <param name="jieQiIndex" type="int">Index of jie qi.1-24</param>
    var cIndex = parseInt(year / 100) * 100;
    var jieQiTable = GanZhi.Para.cTable[cIndex];

    //[Y*D+C]-L.Y:last 2 digit of the year(1924 is 24).D:const value in the century.C:Const value in the centur every jie qi.L:leap year in the century.
    var y = (year % 100);
    var d = 0.2422;
    var c = jieQiTable[jieQiInex - 1];
    if (c < 0) {//If c is -1,get the near century value.Need fix.
        c = GanZhi.Para.cTable[cIndex + 100][jieQiInex - 1];
    }
    var l = (y - 1) / 4;
    var time = y * d + c - l;
    var date = parseInt(time);
    var hour = parseInt((time - date) * 24);
    var minute = parseInt(((time - date) * 24 - hour) * 60);
    return {
        "date": date,
        "hour": hour,
        "minute": minute
    };
}

GanZhi.__computeJiaZiIndex = function (ganZhi) {
    /// <summary>Compute jian zi index by gan zhi in the jiaZiTable</summary>                                              
    /// <param name="ganZhi" type="String">Gan zhi</param>                                                                 
    for (var i = 0; i < GanZhi.Para.jiaZiTable.length; i++) {
        if (ganZhi === GanZhi.Para.jiaZiTable[i]) {
            return i;
        }
    }
}

//////////////////////////////////////////////////////////////////////////
//Public function
//////////////////////////////////////////////////////////////////////////
GanZhi.computeDate = function (year, month, date) {
    /// <summary>Compute year gan zhi.</summary>
    /// <param name="year" type="int">year</param>
    /// <param name="month" type="int">month.1-12</param>
    /// <param name="date" type="int">date</param>
    var newYearGanZhis = [//80 year is loop.
        "己卯", //1924.1.1
        "壬申", //1934.1.1
        "甲子", //1944.1.1 
        "丁巳", //1954.1.1 
        "己酉", //1964.1.1 
        "壬寅", //1974.1.1 
        "甲午", //1984.1.1
        "丁亥" //1994.1.1
    ];
    var yearTemp = parseInt(year);
    if (yearTemp < 1924) {
        yearTemp = parseInt(((1924 - yearTemp) + 79) / 80) * 80 + year;
    }
    if (yearTemp >= 2004) {
        yearTemp = yearTemp - parseInt(((yearTemp - 2004) + 79) / 80) * 80;
    }

    var baseGanZhiIndex = parseInt((yearTemp - 1924) / 10);
    var baseGanZhi = newYearGanZhis[baseGanZhiIndex];
    var baseGanZhiJiaZiIndex = GanZhi.__computeJiaZiIndex(baseGanZhi);
    var baseYear = [1924, 1934, 1944, 1954, 1964, 1974, 1984, 1994][baseGanZhiIndex];
    var yearSpanDays = parseInt((yearTemp - baseYear) * 5);
    for (var yearIndex = 1; yearIndex <= yearTemp - baseYear; yearIndex++) {
        if (DateTimeSp.isLeapYear(baseYear + yearIndex)) {
            yearSpanDays += 1;
        }
    }

    var daysPerMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    var monthSpanDays = date;
    if (month > 1) {
        for (var monthIndex = 0; monthIndex < month - 1; monthIndex++) {//Substract self.
            monthSpanDays += daysPerMonth[monthIndex];
        }
    }

    var ganZhiJiaZiIndex = (baseGanZhiJiaZiIndex + (yearSpanDays + monthSpanDays) % 60 - 1) % 60; //Substract self.
    return GanZhi.Para.jiaZiTable[ganZhiJiaZiIndex];
}

GanZhi.computeHour = function (dateGanZhi, hour) {
    /// <summary>Compute hour gan zhi.</summary>
    /// <param name="dateGanZhi" type="String">Gan zhi of date.</param>
    /// <param name="hour" type="int">24 hours</param>
    var ziHourGanZhi = {
        "甲": "甲", "己": "甲",
        "乙": "丙", "庚": "丙",
        "丙": "戊", "辛": "戊",
        "丁": "庚", "壬": "庚",
        "戊": "壬", "癸": "壬"
    };
    var ziHourGanZhi = ziHourGanZhi[dateGanZhi.substring(0, 1)] + "子";
    var ziHourIndex = GanZhi.__computeJiaZiIndex(ziHourGanZhi);
    ziHourIndex += parseInt((hour + 1) / 2);
    return GanZhi.Para.jiaZiTable[ziHourIndex % 60];
}

GanZhi.computeKongWang = function (dateGanZhi) {
    var dateGanZhiIndex = GanZhi.__computeJiaZiIndex(dateGanZhi);
    var kongWangs = ["戌亥", "申酉", "午未", "辰巳", "寅卯", "子丑"];
    var kongWangIndex = parseInt(dateGanZhiIndex / 10);
    return kongWangs[kongWangIndex];
}

GanZhi.computeMonth = function (year, month, date) {
    /// <summary>Compute year gan zhi.</summary>
    /// <param name="year" type="int">year.</param>
    /// <param name="month" type="int">month.1-12</param>
    /// <param name="date" type="int">date</param>
    var monthChangDates = {
        2: 4, 3: 6, 4: 5, 5: 6, 6: 6, 7: 7, //2-7month:465667
        8: 8, 9: 8, 10: 8, 11: 8, 12: 7, 1: 6//8-1month:888876
    };

    var yinMonthTianGans = {
        "甲": "丙", "己": "丙",
        "乙": "戊", "庚": "戊",
        "丙": "庚", "辛": "庚",
        "丁": "壬", "壬": "壬",
        "戊": "甲", "癸": "甲"
    };
    var ganZhiYear = GanZhi.computeYear(year, month, date);
    var yinMonthGanZhi = yinMonthTianGans[ganZhiYear.substring(0, 1)] + "寅";
    var yinMonthIndex = GanZhi.__computeJiaZiIndex(yinMonthGanZhi);

    //    var changeDate = monthChangDates[month];
    var changeTie = GanZhi.__computeJieQiChangeTime(year,(month+12-1)%12);
    var changeDate = monthChangDates[month];

    var monthSpan = (month + 10) % 12;
    if (date < changeDate) {
        monthSpan = ((monthSpan - 1) + 12) % 12;
    }

    return GanZhi.Para.jiaZiTable[(yinMonthIndex + monthSpan) % 60];
}

GanZhi.computeYear = function (year, month, date) {//Not accurate.Need fix.
    /// <summary>Compute year gan zhi.</summary>
    /// <param name="year" type="int">year</param>
    /// <param name="month" type="int">month.1-12</param>
    /// <param name="date" type="int">date</param>

    var span = year - 1924; //1924 is 甲子
    if (span < 0) {
        span += (span * (-1) + 59) / 60 * 60;
    }

    var liChunTime = GanZhi.__computeJieQiChangeTime(year, 1);

    var jiaZiIndex = span % 60;
    if (month < 2 || (month === 2 && date < liChunTime.date)) {
        jiaZiIndex = ((jiaZiIndex - 1) + 60) % 60;
    }
    return GanZhi.Para.jiaZiTable[jiaZiIndex];
}
