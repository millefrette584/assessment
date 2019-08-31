'use strict';
const settingArea = document.getElementById('settingArea');
const startArea = document.getElementById('startArea');
const resultArea = document.getElementById('resultArea');
const countArea = document.getElementById('countArea');
const descriptionArea = document.getElementById('descriptionArea');

const titleText = document.getElementById('titleText');
const help = document.getElementById('help');
const navigation = document.getElementById('navigation');

const inputSeconds = document.getElementById('inputSeconds');
const setting = document.getElementById('setting');
const initialize = document.getElementById('initialize');

const confirm = document.getElementById('confirm');
const start = document.getElementById('start');
const closeStartArea = document.getElementById('closeStartArea');

const timer = document.getElementById('timer');
const currentCount = document.getElementById('currentCount');
const click = document.getElementById('click');
const closeCountArea = document.getElementById('closeCountArea');
const cancel = document.getElementById('cancel');

const closeResultArea = document.getElementById('closeResultArea');
const retry = document.getElementById('retry');

let clickCount = 0;
let showResultAreaId;
let remainingTimeId;
let setSeconds;
let showDescriptionArea = false;

help.onclick = () => {
  if (showDescriptionArea) {
    showDescriptionArea = false;
    help.innerText = '使い方';
    descriptionArea.style.display = 'none';
  } else {
    showDescriptionArea = true;
    help.innerText = '閉じる';
    descriptionArea.style.display = 'block';
  }
};

setting.onclick = () => {
  setSeconds = Math.floor(inputSeconds.value);
  if (setSeconds < 1) {
    return;
  }
  if (setSeconds < 61) {
    confirm.innerText = setSeconds + '秒間計測します';
    settingArea.style.display = 'none';
    showStartArea();
  }
};

initialize.onclick = () => {
  inputSeconds.value = 5;
};

start.onclick = () => {
  clickCount = 0;
  titleText.innerText = '計測中...';
  navigation.innerText = 'クリックボタンをクリックしてカウント';
  timer.innerText = '残り時間は' + setSeconds + '秒、';
  currentCount.innerText = 'クリックされた回数は' + clickCount + '回です。';
  countArea.style.display = 'block';
  startArea.style.display = 'none';
  function remainingTime() {
    if (setSeconds > 0) {
      setSeconds--;
      timer.innerText = '残り時間は' + setSeconds + '秒、';
    } else {
      clearInterval(remainingTimeId);
    }
  }
  remainingTimeId = setInterval(remainingTime, 1000);

  function showResultArea() {
    titleText.innerText = '計測結果';
    navigation.innerText = '計測終了です。お疲れ様でした';
    resultArea.style.display = 'block';
    countArea.style.display = 'none';

    const countedTime = document.getElementById('countedTime');
    countedTime.innerText = Math.floor(inputSeconds.value) + '秒';

    const clickedTimes = document.getElementById('clickedTimes');
    clickedTimes.innerText = clickCount + '回';

    const result = document.getElementById('result');
    result.innerText =
      Math.round((clickCount / Math.floor(inputSeconds.value)) * 100) / 100 +
      '回';
  }
  showResultAreaId = setTimeout(showResultArea, setSeconds * 1000);
};

closeStartArea.onclick = () => {
  startArea.style.display = 'none';
  showSettingArea();
};

click.onclick = () => {
  clickCount++;
  currentCount.innerText = 'クリックされた回数は' + clickCount + '回です。';
};

closeCountArea.onclick = () => {
  inputSeconds.value = 5;
  clearTimeout(showResultAreaId);
  clearInterval(remainingTimeId);
  countArea.style.display = 'none';
  showSettingArea();
};

cancel.onclick = () => {
  setSeconds = inputSeconds.value;
  clearTimeout(showResultAreaId);
  clearInterval(remainingTimeId);
  countArea.style.display = 'none';
  showStartArea();
};

closeResultArea.onclick = () => {
  inputSeconds.value = 5;
  resultArea.style.display = 'none';
  showSettingArea();
};

retry.onclick = () => {
  setSeconds = inputSeconds.value;
  resultArea.style.display = 'none';
  showStartArea();
};

function showStartArea() {
  titleText.innerText = '計測時間の確認';
  navigation.innerText = 'スタートボタンで計測開始します';
  startArea.style.display = 'block';
}

function showSettingArea() {
  titleText.innerText = 'マウスクリック計測ツール';
  navigation.innerText = '計測時間を設定して完了ボタンを押して下さい';
  settingArea.style.display = 'block';
}
