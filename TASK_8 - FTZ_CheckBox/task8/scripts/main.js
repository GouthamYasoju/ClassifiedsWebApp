var details = /** @class */ (function () {
    function details(x, y, z) {
        this.name = x;
        this.score = y;
        this.email = z;
    }
    return details;
}());
var scores = [];
var addtotable = /** @class */ (function () {
    function addtotable() {
        this.chk = document.getElementsByClassName('check');
    }
    addtotable.prototype.initialise = function (x) {
        var sum = 0;
        var arr = [];
        var max = 0;
        for (var _i = 0, x_1 = x; _i < x_1.length; _i++) {
            var i = x_1[_i];
            var row = new addtotable();
            row.addrow(new details(i[0], i[1], i[2]));
            var n = i[1];
            scores.push(n);
        }
        arr.push(sum);
        arr.push(max);
        return arr;
    };
    addtotable.prototype.checkall = function () {
        if ((box1 === null || box1 === void 0 ? void 0 : box1.checked) == true) {
            for (var i in chk) {
                var x = chk[i];
                x.checked = true;
            }
        }
        if ((box1 === null || box1 === void 0 ? void 0 : box1.checked) == false) {
            for (var i_1 in chk) {
                var x = chk[i_1];
                x.checked = false;
            }
        }
    };
    addtotable.prototype.monitor = function () {
        var s = 0;
        for (var i in chk) {
            var x = chk[i];
            if (x.checked == false) {
                s = 1;
            }
        }
        if (s == 1) {
            box1.checked = false;
        }
        else {
            box1.checked = true;
        }
    };
    addtotable.prototype.calci = function () {
        var sum = 0;
        var len = 0;
        var max = 0;
        for (var i in scores) {
            if (chk[i].checked == true) {
                sum = sum + scores[i];
                len += 1;
                if (scores[i] > max) {
                    max = scores[i];
                }
            }
        }
        var avg = sum / (len);
        var f = document.getElementById('avg');
        if (len == 0) {
            f.innerHTML = "Please select the desired rows";
        }
        else {
            f.innerHTML = avg.toString();
        }
        var g = document.getElementById('max');
        g.innerText = max.toString();
    };
    addtotable.prototype.addrow = function (x) {
        var _a;
        var g = document.createElement('tr');
        g.className = 'table-row';
        var c1 = document.createElement('td');
        c1.setAttribute('name', 'chbox');
        var inp = document.createElement('input');
        inp.setAttribute('type', 'checkbox');
        inp.className = 'check';
        c1.appendChild(inp);
        c1.className = 'table-data ';
        g.appendChild(c1);
        var c2 = document.createElement('td');
        c2.innerText = x.name;
        c2.className = 'table-data';
        c2.setAttribute('name', 'text');
        g.appendChild(c2);
        var c3 = document.createElement('td');
        c3.innerHTML = x.score;
        c3.className = 'score';
        c3.setAttribute("name", "text");
        g.appendChild(c3);
        var c4 = document.createElement('td');
        c4.innerText = x.email;
        c4.className = 'table-data';
        c4.setAttribute('name', 'text');
        g.appendChild(c4);
        var c5 = document.createElement('td');
        c5.className = 'table-data';
        g.appendChild(c5);
        (_a = document.getElementById('table')) === null || _a === void 0 ? void 0 : _a.appendChild(g);
    };
    addtotable.prototype.search = function () {
        if (searchtext.value.length > 0) {
            dataarray.forEach(function (ele, index) {
                var ind = ele.indexOf(searchtext.value);
                if (ind >= 0) {
                    var t = ele.substring(0, ind) + '<span class="highlight">' + ele.substring(ind, ind + searchtext.value.length) + '</span>' + ele.substring(ind + searchtext.value.length);
                    data[index].innerHTML = t;
                }
                else {
                    data[index].innerText = ele;
                }
            });
        }
        else {
            dataarray.forEach(function (ele, index) {
                data[index].innerText = ele;
            });
        }
    };
    return addtotable;
}());
var start = new addtotable();
var arr = start.initialise([["goutham y", 20, "abc@yahoo.com"], ["spiderman", 80, "spidy@keka.com"], ["ironman", 30, "ironman@yahoo.com"], ["kabali", 70, "daa@keka.com"], ["thor", 70, "thor@keka.com"], ["superman", 70, "super@keka.com"], ["batman", 70, "dark@keka.com"]]);
var box1 = document.getElementById("box1");
box1 === null || box1 === void 0 ? void 0 : box1.addEventListener('change', start.checkall);
var chk = document.getElementsByClassName('check');
for (var i = 0; i < chk.length; ++i) {
    chk[i].addEventListener('change', start.monitor);
}
var cal = document.getElementById('calculate');
cal === null || cal === void 0 ? void 0 : cal.addEventListener('click', start.calci);
var data = document.getElementsByName("text");
var dataarray = [];
for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
    var i = data_1[_i];
    dataarray.push(i.innerText);
}
var searchtext = document.getElementById('fetch');
searchtext === null || searchtext === void 0 ? void 0 : searchtext.addEventListener('input', start.search);
