var position = [0];

$('#light-button').on('click', function () {
  movePosition();
});
$('#strong-button').on('click', function () {
  enterPosition();
});

const enterPosition = () => {
  // 現在の階層以外は非表示にする
  if(checkHavingItem(position.concat(0))) {
    $(checkHavingItem(position)).children('.menu').addClass('show');
    position.push(0)
    focusItem();
    movePx(false);
    return
  }
  if(position[position.length - 1] == 0) {
    position.pop();
    $(checkHavingItem(position)).children('.menu').removeClass('show');
    focusItem();
    movePx(true);
    return
  }
  execItem();
}
const execItem = () => {
  let titleDom = $(checkHavingItem(position)).children('.title');
  let url = $(titleDom).attr('data-url');
  let videoid = $(titleDom).attr('data-id');
  var tag;
  if(videoid == "0") {
    let img_url = $(titleDom).attr('data-image');
    tag = `<div class="img-content" style="background:url(${img_url}) center;background-size:cover;"></div>`
  } else {
    tag = `<iframe width="100%" height="100%" src="https://www.youtube.com/embed/${videoid}?autoplay=1" frameborder="0"></iframe>`
  }
  $('#magictv .main-window').html(tag);
  $(titleDom).addClass('exec');
  setTimeout(() => {
    $(titleDom).removeClass('exec');
  }, 1200);
}
const movePosition = () => {
  let limit = $(checkHavingItem(position)).siblings('.menu').length + 1;
  if (position[position.length - 1] == limit - 1) {
    position[position.length - 1] = 0;
  } else {
    position[position.length - 1] += 1;
  }
  focusItem();
}
const focusItem = () => {
  var targetNode = checkHavingItem(position);
  if(!targetNode) return false;
  $('#magictv .menu').removeClass('selected');
  $(targetNode).addClass('selected');
};
const movePx = (isBack) => {
  let move_px;
  console.log(position)
  for(let i in position) {
    if(i==0) {
      move_px = position[0]*80;
      continue;
    }
    if(!isBack) move_px += position[i]*40;
  }
  if(position.length == 1) move_px = 0;
  $('#magictv .side-menu').css('top',`-${move_px}px`);
}
const checkHavingItem = (pos) => {
  var parentNode = $('#magictv .side-menu');
  var targetNode;
  for(let i in pos) {
    parentNode = $(parentNode).children('.menu').eq(pos[i]);
    if(parentNode.length == 0) return false;
    targetNode = parentNode;
  }
  return targetNode;
}
