// function to get particular period

var getPeriod = function (pt) {
    var periodtype = pt;
    // var periodtype = document.getElementById('period').innerText;
    var year = document.getElementById('year').innerText;
    if (periodtype == 'Monthly') {
        var month = document.getElementById('month').innerText;
        return year.trim() + getMonth(month.trim());
    }
    else if (periodtype == 'Quarterly') {
        var quarter = document.getElementById('quarter').innerText;
        return year.trim() + getQuarter(quarter.trim());
    }
    else if (periodtype == 'Six-monthly') {
        var sm = document.getElementById('sm').innerText;
        return year.trim() + getSm(sm.trim());
    }
    else {
        return year.trim();
    }
};

var getMonth = function (m) {
    var month = "";
    if (m == 'January') { month = "01" }
    if (m == 'February') { month = "02" }
    if (m == 'March') { month = "03" }
    if (m == 'April') { month = "04" }
    if (m == 'May') { month = "05" }
    if (m == 'June') { month = "06" }
    if (m == 'July') { month = "07" }
    if (m == 'August') { month = "08" }
    if (m == 'September') { month = "09" }
    if (m == 'October') { month = "10" }
    if (m == 'November') { month = "11" }
    if (m == 'December') { month = "12" }
    return month;
};

var getQuarter = function (q) {
    var quarter = "";
    if (q == "January-March") { quarter = "Q1" }
    if (q == "April-June") { quarter = "Q2" }
    if (q == "July-September") { quarter = "Q3" }
    if (q == "October-December") { quarter = "Q4" }
    return quarter;
};