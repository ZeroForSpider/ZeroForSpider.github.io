const dataNine = [
  '曾甜',
'王鑫',
'景慧萍',
'杨成菊',
'蔡承园',
'陈思凡',
'杨慧',
'钱程',
'陈兴秀',
'邓先帅',
'马青山',
'王严鑫',
'曹龙强',
'吴奎',
'邓永华',
'杨俊',
'赵龙',
'梁志平',
'吴金钟',
'邹宇',
'刘家友',
'漆济甫',
'刘雷',
'李佳豪',
'钟静成',
'胡先燚',
'卢佳伟',
'刘静',
'邓斯宇',
'杨柳',
'周鑫',
'邓帅',
'张成东',
'王丹',
'王磊',
'廖珍凤',
'彭新富',
'彭堂',
'廖禄萍',
'李悟熊',
'赵辉',
'邓承容',
'郭佳佳',
'刘德全',
'郭玲',
'王丹',
'王梓澄',
'肖逸',
'熊雪莲',
'陈康宁',

];


const dataTen = [
  "常钜沅",
  "陈明宇",
  "陈雨欣",
  "程麒璇",
  "崔于龙博",
  "崔兆瑞",
  "樊宇霞",
  "范鑫荣",
  "范益佳",
  "郭昌兴",
  "郭荣旺",
  "郭效言",
  "韩宇",
  "韩玉欣",
  "郝星宇",
  "冀青香",
  "贾皓",
  "江昢",
  "郎圣春",
  "李丹晨",
  "李瑾瑶",
  "李靖",
  "李可飞",
  "李尚伦",
  "连浩毅",
  "刘宇康",
  "孟菁昀",
  "师佳琪",
  "史睿思",
  "史宇辉",
  "苏洋",
  "孙熠晖",
  "唐瑜",
  "陶思娟",
  "王文宣",
  "王雯佳",
  "王奕夫",
  "王泽寰",
  "魏瑞龙",
  "武超仪",
  "武文琪",
  "武宇凡",
  "许鑫苑",
  "杨涵舒",
  "杨薪煜",
  "杨泽宇",
  "杨铮",
  "张皓翔",
  "张佳琦",
  "张琳浠",
  "张晟瑄",
  "张子钰",
  "赵航宇",
  "赵继鑫",
  "赵佳慧",
  "赵美琳",
  "赵心嫣",
  "赵阳阳",
  "赵泽宇",
  "周博涛"
];


const groups = [dataNine,dataTen];

// 永远不会被抽到名字
const white_list = [

];

let link_data = data;

// random a int from [minNum, maxNum]
function randomNum(minNum, maxNum) {
  switch (arguments.length) {
    case 1:
      return parseInt(Math.random() * minNum + 1, 10);
      break;
    case 2:
      return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
      break;
    default:
      return 0;
      break;
  }
}

// 全局变量 slide表示已经有多少个卡片
var slidecount = 0;
function restart() {
  console.log("restart");
  $("div.roll-card.clickable")
    .nextAll()
    .remove();
  showCard("div.card.clickable", 300);
}

function randStart() {
  (function () {
    tail = $("div.roll-card.clickable");
    slidecount = 0;
    slide();
    $("div.roll-card.clickable");
  })();
}

function getNextCardText(from) {
  let len = randomNum(0, from.length - 1);
  let name = from[len];
  return name;
}

// 将卡片向上移动
function showCard(selector, duration, complete) {
  $(selector).animate(
    {
      top: "-1px"
    },
    duration,
    "swing",
    complete
  );
}

function finish_roll() {
  // 最后一个卡片时的动画
}

function contains(arr, obj) {
  var i = arr.length;
  while (i--) {
    if (arr[i] === obj) {
      return true;
    }
  }
  return false;
}

function check_name() {
  // Check
  let title = $(`.roll-card-id-${slidecount - 1}`).text();
  while (contains(white_list, title)) {
    title = getNextCardText(link_data);
  }
  card = $(
    '<div class="roll-card">' +
    '<div class="title">' +
    title +
    "</div>" +
    "</div>"
  );
  card.addClass(`roll-card-id-${slidecount}`);
  tail.after(card);
  tail = card;
  slidecount++; // imp
  showCard(card, 1200, finish_roll);
}

function slide() {
  if (slidecount > 25) {
    check_name();
    return;
  }
  // 滑动时间

  const duration =
    slidecount > 23
      ? 800
      : slidecount > 20
        ? 500
        : slidecount > 15
          ? 300
          : slidecount > 10
            ? 150
            : 100;
  let cardName = getNextCardText(link_data);
  card = $(
    '<div class="roll-card">' +
    '<div class="title">' +
    cardName +
    "</div>" +
    "</div>"
  );
  card.addClass(`roll-card-id-${slidecount}`);
  tail.after(card);
  tail = card;
  slidecount++;
  showCard(card, duration, slide);
}
