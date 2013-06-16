
var DateTimeSp={};
DateTimeSp.exception_ = null;

DateTimeSp.addDay = function (year, month, date, addDays) {
    /// <summary>Add day to the assign date.</summary>
    /// <param name="year" type="int">year</param>
    /// <param name="month" type="int">month</param>
    /// <param name="date" type="int">date</param>
    /// <param name="addDays" type="int">add days</param>
    /// <returns type="date" />
    year = parseInt(year);
    month = parseInt(month);
    date = parseInt(date);
    addDays = parseInt(addDays);
    var restructDate = new Date((month - 1).toString() + '-' + date.toString() + '-' + year.toString()); //转换为MM-DD-YYYY格式  
    var millSeconds = Math.abs(restructDate) + (addDays * 24 * 60 * 60 * 1000);
    var newDate = new Date(millSeconds);
    return newDate;
}

DateTimeSp.calculateDifferentDays = function (date1, date2) {//date format:yyyy-mm-dd
    /// <summary>Calculate the different days between date1 and date2.</summary>
    var date1Arr = date1.split("-");
    var date2Arr = date2.split("-");
    var newDate1 = new Date(date1Arr[1] + '-' + date1Arr[2] + '-' + date1Arr[0]); //MM-DD-YY   
    var newDate2 = new Date(date2Arr[1] + '-' + date2Arr[2] + '-' + date2Arr[0])
    var millseconds = newDate1 - newDate2;
    var days = parseInt(millseconds / 1000 / 60 / 60 / 24);    //Millseconds to days  
    return days;
}

DateTimeSp.checkYear=function(year) {
    /// <summary>check year is legal</summary>
    var re = /^(\d{4})?$/;
    return re.test(year);
}

DateTimeSp.checkDateTime=function(dateTime) {
    /// <summary>check dateTime is legal</summary>
    var re = /^(\d{4}-\d{1,2}-\d{1,2})(\s?\d{2}:\d{2}:\d{2})?$/;
    return re.test(dateTime);
}

DateTimeSp.checkTime = function (time) {
    /// <summary>check time is legal</summary>
    var re = /^(\s?\d{2}:\d{2}:\d{2})?$/;
    return re.test(time);
}

DateTimeSp.formatHour = function (hour) {
    /// <summary>Format hour to standar format.If length is less than 2,fill 0 on the left.</summary>
    if (hour >= 24 || hour < 0) {
        hour = 0;
    }
    if (hour.length < 2) {
        hour = '0' + hour.toString();
    }
    else {
        hour.toString().substring(0, 2);
    }
    return hour;
}


DateTimeSp.formatMinute=function(minute) {
    /// <summary>Format minute to standar format.If length is less than 2,fill 0 on the left.</summary>
    if (minute > 60 || minute < 0) {
        minute = 0;
    }
    if (minute.length < 2) {
        minute = '0' + hour.toString();
    }
    else {
        hour.toString().substring(0, 2);
    }
}

DateTimeSp.getCurrentYear=function() {
    /// <summary>Get current year.</summary>
    var nowTime = new Date();
    var currentYear = nowTime.getYear();
    if (parseInt(currentYear) < 1900) {
        currentYear = parseInt(currentYear) + 1900;
    }
    return currentYear;
}

DateTimeSp.getCurrentDate=function() {
    /// <summary>Get current date.</summary>
    var date = "";
    var year = GetCurrentYear();
    var nowTime = new Date();
    date = year + "-" + nowTime.getMonth() + "-" + nowTime.getMinutes();
    return date;
}

DateTimeSp.getCurrentTime=function() {
    /// <summary>Get current time.</summary>
    var nowTime = new Date();
    var currentTime = StringSp.format(nowTime.getHours().toString(), 2, "0", "LEFT") +
                             ":" + StringSp.format(nowTime.getMinutes().toString(), 2, "0", "LEFT") +
                              ":" + StringSp.format(nowTime.getSeconds().toString(), 2, "0", "LEFT");
    return currentTime;
}

DateTimeSp.getCurrentDateTime=function() {
    /// <summary>Get current date and time.</summary>
    return DateTimeSp.getCurrentDate() + "  " + DateTimeSp.getCurrentTime();
}

DateTimeSp.getDateNO=function(year,month,date) {
    /// <summary>Get the date no in the assign time.</summary>
    var dateArr = new Array(31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);
    var dateNo = 0;
    for (var i = 0; i < month; i++) {
        dateNo += dateArr[i];
    }
    dateNo += date;
    //判断是否闰年
    if (month > 1 && (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
        dateNo += 1;
    }
    return dateNo;
}

DateTimeSp.getMonthEnglish = function (digit) {
    /// <summary>Get english month.</summary>
    try {
        DateTimeSp.exception_ = null;

        if (digit === undefined || digit === null || parseInt(digit) > 12 || parseInt(digit) < 0) {
            return null;
        }
        else {
            var monthList = { "01": "JANUARY", "02": "FEBRUARY", "03": "MARCH",
                "04": "APRIL", "05": "MAY", "06": "JUNE",
                "07": "JULY", "08": "AUGUST", "09": "SEPTEMBER",
                "10": "OCTOBER", "11": "NOVEMBER", "12": "DECEMBER"
            };
            var monthIndex = (digit.toString().length == 1) ? ('0' + digit.toString()) : digit.toString();
            var month = monthList[monthIndex];
            return month;
        }
    } catch (e) {
        DateTimeSp.exception_ = e;
        return null;
    }
}


DateTimeSp.getCurrentWeekDay=function(showLanguage/*Chinese/English*/) {
    /// <summary>Get current week day.</summary>
    var nowTime = new Date();
    var nowWeek = nowTime.getDay();
    if (showLanguage.toUpperCase() === "CHINESE") {
        if (nowWeek === 0) nowWeek = "星期日";
        if (nowWeek === 1) nowWeek = "星期一";
        if (nowWeek === 2) nowWeek = "星期二";
        if (nowWeek === 3) nowWeek = "星期三";
        if (nowWeek === 4) nowWeek = "星期四";
        if (nowWeek === 5) nowWeek = "星期五";
        if (nowWeek === 6) nowWeek = "星期六";
    }
    else if (showLanguage.toUpperCase() === "ENGLISH") {
        if (nowWeek === 0) nowWeek = "Sunday";
        if (nowWeek === 1) nowWeek = "Monday";
        if (nowWeek === 2) nowWeek = "Tuesday";
        if (nowWeek === 3) nowWeek = "Wednesday";
        if (nowWeek === 4) nowWeek = "Thursday";
        if (nowWeek === 5) nowWeek = "Friday";
        if (nowWeek === 6) nowWeek = "Saturday";
    }
    return nowWeek;
}

DateTimeSp.getWeekNO=function(year, month, date) {
    /// <summary>Get week no.</summary>
    var totalDays = 0;
    var days = new Array(31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31); // Array to hold the total days in a month

    //  Check to see if this is a leap year
    if (Math.round(year / 4) === year / 4) {
        days[1] = 29
    } else {
        days[1] = 28
    }

    //  If this is January no need for any fancy calculation otherwise figure out the
    //  total number of days to date and then determine what week

    if (month === 0) {
        totalDays = totalDays + date;
    } else {  
        for (var count = 1; count <= month; count++) {
            totalDays = totalDays + days[count - 1];
        }
        totalDays = totalDays + date;
    }
    var week = Math.round(totalDays / 7);
    return week;
}

DateTimeSp.isLeapYear = function (year) {
    var yearTemp = parseInt(year);
    return (yearTemp % 4 === 0 && yearTemp % 100 !== 0) || yearTemp % 400 === 0;
}

