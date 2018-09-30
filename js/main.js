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
  '蓝嵩杰',
'邓冬梅',
'白晓雨',
'邓建桥',
'蒋娜娜',
'陈家兴',
'刘鑫',
'陈池强',
'梁勇',
'卢艳微',
'刘容容',
'伍星霖',
'刘影',
'荣超',
'徐堂',
'龚君成',
'黄鑫',
'陈东东',
'漆祥',
'彭婷',
'蔡琴',
'黄洋桓',
'赵鹏',
'屈锐',
'宋东洪',
'陈湘',
'李加兴',
'王燕',
'谭宏双',
'王俊杰',
'莫中盼',
'熊健',
'刘涛',
'齐雪',
'漆升',
'唐敬',
'蔡茂琼',
'漆正旭',
'邓宁',
'漆文华',
'陈洪伟',
'程蝶',
'徐邈',
'彭建',
'刘源',
'廖振宇',
'唐晓燕',
'冯威',
'蔡勒见秋',
'李丹',
'胡雪梅',
'赵天兵',
'熊文蕃',
'李婷婷',
'陈昌荣',
'雷芷烨',
'杨小玲',
'胡齐康',
'周金鑫',
'何颖',
];


const groups = [dataNine,dataTen];

// 永远不会被抽到名字
const white_list = [

];

let link_data = dataNine;

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
