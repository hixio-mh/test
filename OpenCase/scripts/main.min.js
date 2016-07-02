var caseId = 0, win, winNumber = 35, inventory = [], caseOpening = !1, caseOpenAudio = new Audio;
caseOpenAudio.src = "../sound/open.wav";
caseOpenAudio.volume = .2;
var caseCloseAudio = new Audio;
caseCloseAudio.src = "../sound/close.wav";
caseCloseAudio.volume = .2;
var caseBackAudio = new Audio;
caseBackAudio.src = "../sound/back.wav";
caseBackAudio.volume = .1;
var caseScrollAudio = new Audio;
caseScrollAudio.src = "../sound/scroll.wav";
caseScrollAudio.playbackRate = 1;
caseScrollAudio.volume = .2;
getInventory();
$(document).on("click", ".case", function() {
  caseId = this.id;
  null != getURLParameter("from") ? window.location = "open.html?caseId=" + caseId + "&from=" + getURLParameter("from") : window.location = "open.html?caseId=" + caseId;
});
function fillCarusel(a) {
  var b = cases[a].weapons.filter(function(a) {
    return "consumer" == a.rarity;
  }).mul(7).shuffle();
  cases[a].weapons.filter(function(a) {
    return "industrial" == a.rarity;
  }).mul(7).shuffle();
  var c = cases[a].weapons.filter(function(a) {
    return "milspec" == a.rarity;
  }).mul(5).shuffle(), d = cases[a].weapons.filter(function(a) {
    return "restricted" == a.rarity;
  }).mul(5).shuffle(), f = cases[a].weapons.filter(function(a) {
    return "classified" == a.rarity;
  }).mul(4).shuffle(), e = cases[a].weapons.filter(function(a) {
    return "covert" == a.rarity;
  }).mul(1).shuffle();
  a = cases[a].weapons.filter(function(a) {
    return "rare" == a.rarity;
  }).mul(1).shuffle();
  7 < Math.rand(0, 10) && 0 != a.length + e.length + d.length + c.length && (f = []);
  5 < Math.rand(0, 10) && 0 != a.length + f.length + d.length + c.length && (e = []);
  3 < Math.rand(0, 10) && 0 != e.length + f.length + d.length + c.length && (a = []);
  var b = void 0 == b ? c.concat(d, f, e, a).shuffle().shuffle().shuffle() : b.concat(c, d, f, e, a).shuffle().shuffle().shuffle(), g = "";
  if (b.length <= winNumber) {
    for (;b.length <= winNumber;) {
      b = b.concat(c, d, f, e).shuffle().shuffle();
    }
  }
  b.forEach(function(a, b) {
    var d = getImgUrl(a.img), c = a.type;
    -1 != c.indexOf("|") && (c = c.split("|")[1]);
    var e = getSkinName(a.skinName, Settings.language);
    g += '<div class="weapon"><img src="' + d + '" /><div class="weaponInfo ' + a.rarity + '"><span class="type">' + c + "<br>" + e + "</span></div></div>";
  });
  win = b[winNumber];
  $(".casesCarusel").html(g);
  $(".casesCarusel").css("margin-left", "0px");
}
$(".openCase").on("click", function() {
  $(".weapons").scrollTop(0);
  if (caseOpening || $(".openCase").text() == Localization.openCase2.opening[Settings.language]) {
    return !1;
  }
  $(".win").slideUp("slow");
  $(".zabor-bot").css("display", "none");
  $(".openCase").text() == Localization.openCase2.tryAgain[Settings.language] && backToZero();
  $(".openCase").text(Localization.openCase2.opening[Settings.language]);
  $(".openCase").attr("disabled", "disabled");
  var a = 127 * winNumber, b = 0, c = 0;
  $(".casesCarusel").animate({marginLeft:-1 * Math.rand(a - 50, a + 60)}, {duration:1E4, easing:"easeOutCubic", start:function() {
    caseOpenAudio.play();
    var a = win.type, b = ifStatTrak(a), c = getItemQuality()[1];
    caseOpening = !0;
    -1 != a.indexOf("|") && (a = a.split("|")[1]);
    for (var g = win.skinName, h = getPrice(a, getSkinName(g), c, b), k = 0;0 == h;) {
      c = getItemQuality()[1];
      h = getPrice(a, getSkinName(g), c, b);
      if (15 == k) {
        break;
      }
      k++;
    }
    $(".winPrice").html(h + "$");
    0 == h && getMarketPrice(a, getSkinName(g, "EN"), getQualityName(c), b, ".winPrice");
    b && (a = "StatTrak\u2122 " + a, statisticPlusOne("statTrak"));
    $(".winName").html(a + " | " + getSkinName(g, "RU"));
    $(".winQuality").html(c);
    $(".winImg").attr("src", getImgUrl(win.img, 1));
    $(".openCase").attr("disabled", "disabled");
    win.statTrak = b;
    win.quality = c;
    win.price = h;
    null != a.match(/.*(\u041d|\u043d)\u043e\u0436.*/) && statisticPlusOne("knifes");
  }, progress:function(a, f) {
    progress_animate = Math.round(100 * f);
    c = parseInt(parseInt($(".casesCarusel").css("marginLeft").replace(/[^0-9.]/g, "") - 65.5) / 131);
    c > b && (caseScrollAudio.pause(), caseScrollAudio.currentTime = 0, caseScrollAudio.play(), b++);
  }, complete:function() {
    var a = parseFloat($(".winPrice").html());
    win.price = a;
    inventory.push(win);
    saveInventory();
    caseCloseAudio.play();
    $(".openCase").text(Localization.openCase2.tryAgain[Settings.language]);
    $(".win").slideDown("slow");
    $(".zabor-bot").css("display", "block");
    caseOpening = !1;
    $(".openCase").attr("disabled", null);
    $(".weapons").scrollTop(185);
    a = $("#caseID").text();
    statisticPlusOne("case" + a);
    statisticPlusOne("weapon-" + win.rarity);
  }, always:function() {
    caseOpening = !1;
  }});
});
function backToZero() {
  $(".casesCarusel").animate({marginLeft:0}, {duration:1E3, easing:"easeOutQuad", start:function() {
    fillCarusel(caseId);
  }, always:function() {
    caseOpening = !1;
  }});
}
$(".closeCase").on("click", function() {
  window.location = "cases.html";
  caseOpening = !1;
});
function statisticPlusOne(a) {
  var b = $.cookie(a), b = "undefined" == typeof b ? 0 : parseInt(b);
  b++;
  $.cookie(a, b);
}
function saveInventory() {
  localStorage.clear();
  localStorage["inventory.count"] = inventory.length;
  for (var a = 0;a < inventory.length;a++) {
    localStorage["inventory.item." + a + ".type"] = inventory[a].type, localStorage["inventory.item." + a + ".skinName"] = inventory[a].skinName, localStorage["inventory.item." + a + ".rarity"] = inventory[a].rarity, localStorage["inventory.item." + a + ".img"] = inventory[a].img, localStorage["inventory.item." + a + ".quality"] = inventory[a].quality, localStorage["inventory.item." + a + ".statTrak"] = inventory[a].statTrak, localStorage["inventory.item." + a + ".price"] = inventory[a].price;
  }
}
function getInventory() {
  for (var a = parseInt(localStorage["inventory.count"], 10), b = 0;b < a;b++) {
    var c, d = {};
    d.type = localStorage["inventory.item." + b + ".type"];
    d.skinName = localStorage["inventory.item." + b + ".skinName"];
    d.rarity = localStorage["inventory.item." + b + ".rarity"];
    d.img = localStorage["inventory.item." + b + ".img"];
    d.quality = localStorage["inventory.item." + b + ".quality"];
    c = localStorage["inventory.item." + b + ".statTrak"];
    d.price = Number(localStorage["inventory.item." + b + ".price"]);
    d.statTrak = "true" == c || "1" == c ? 1 : 0;
    inventory.push(d);
  }
}
function getImgUrl(a, b) {
  return -1 != a.indexOf("images/") ? "undefined" != typeof b ? a.replace("125fx125f", "383fx383f") : a : -1 != a.indexOf(".png") ? "../images/Weapons/" + a : -1 == a.indexOf("steamcommunity") ? "undefined" != typeof b ? prefix + a + postfixBig : prefix + a + postfix : "undefined" != typeof b ? a.replace("125fx125f", "383fx383f") : a;
}
function parseURLParams(a) {
  var b = a.indexOf("?") + 1, c = a.indexOf("#") + 1 || a.length + 1, d = a.slice(b, c - 1), b = d.replace(/\+/g, " ").split("&"), c = {}, f, e;
  if (d !== a && "" !== d) {
    for (a = 0;a < b.length;a++) {
      e = b[a].split("="), d = decodeURIComponent(e[0]), f = decodeURIComponent(e[1]), c.hasOwnProperty(d) || (c[d] = []), c[d].push(2 === e.length ? f : null);
    }
    return c;
  }
}
function getURLParameter(a) {
  return decodeURIComponent(((new RegExp("[?|&]" + a + "=([^&;]+?)(&|#|;|$)")).exec(location.search) || [, ""])[1].replace(/\+/g, "%20")) || null;
}
Array.prototype.shuffle = function() {
  for (var a, b, c = this.length;c;a = Math.floor(Math.random() * c), b = this[--c], this[c] = this[a], this[a] = b) {
  }
  return this;
};
Array.prototype.mul = function(a) {
  for (var b = [], c = 0;c < a;++c) {
    b = b.concat(this.slice(0));
  }
  return b;
};
Math.rand = function(a, b) {
  return Math.floor(Math.random() * (b - a + 1)) + a;
};