//EventListeners/Verificador de IDs
if (!document.getElementById('open-bkg-changer')) {
  console.warn('Bug!!! O id "open-bkg-changer" não existe!');
}
else {
  document.getElementById('open-bkg-changer').addEventListener('click', function() { toggle_visibility('change_bkgcolor') });
}


testCode('red', 'click', 'red', 'white');
testCode('green', 'click', '#00a800', 'white');
testCode('blue', 'click', '#0043e0', 'white');
testCode('yellow', 'click', '#e0a500', 'white');
testCode('black', 'click', '#0d0d0e', 'white');
testCode('white', 'click', 'white', 'black');

if (!document.querySelector('.funny-widgets-btn')) {
  console.warn('Bug!!! A classe "funny-widgets-btn" não existe!');
}
else {

  let funny_widgets = document.querySelector('.funny-widgets-btn');
  let funny_widgets_span = funny_widgets.querySelector('span');
  funny_widgets.addEventListener('mouseover', function() {
    funny_widgets_span.style.display = 'inline-block';
  });
  funny_widgets.addEventListener('mouseout', function() {
    funny_widgets_span.style.display = 'none';
  });

  let show_cordinates = document.getElementById('show-cordinates');
  show_cordinates.addEventListener('click', function(e) {
    show_cordinates.style.display = 'none';
    document.querySelector('.counters').style.display = 'flex';
  })

  document.body.addEventListener('mousemove', function(e) {
    let xCordinates = document.querySelector('#xCordinates');
    let yCordinates = document.querySelector('#yCordinates');
    xCordinates.textContent = e.clientX + ' px';
    yCordinates.textContent = e.clientY + ' px';

    let imgHover = document.querySelectorAll('.img-to-hover');
    let body = document.body;

    imgHover[0].addEventListener('mouseover', function(e) {
      body.style.backgroundColor = '#0043e0';
    })
    imgHover[0].addEventListener('mouseout', function(e) {
      body.style.backgroundColor = '#000000';
    })

    imgHover[1].addEventListener('mouseover', function() {
      body.style.backgroundColor = '#EE1D40';
    })
    imgHover[1].addEventListener('mouseout', function() {
      body.style.backgroundColor = '#000000';
    })
  })

  let fav_song_form = document.querySelector('#submit-fav-song');
  let insert_song_input = document.querySelector('#insert-fav-song');
  fav_song_form.addEventListener('click', function(event) {
    addListItem(event, insert_song_input, 'fav-songs-list-ul', 'music-list-item');

    const removeButton = document.querySelectorAll('.remove-list-item');
    let i = 0;
    removeButton.forEach(function() {
      removeButton[i].addEventListener('click', function(event) {
        removeListitem(event, 'fav-songs-list-ul');
      })
      i++;
    })
  })

  let searchNewBtn = document.getElementById('search-news-btn');
  let searchNewInpt = document.getElementById('search-news-input');

  searchNewBtn.addEventListener('click', function(e) {
    filter_news(searchNewInpt, e)
  })

}

function testCode(ID1, Evento, cor, cor2) {
  var ret = document.getElementById(ID1);
  if (ret != null) {
    ret.addEventListener(Evento, function() { changeBackgroundColor(cor, cor2) });
    return true;
  }
  else {
    console.warn('Bug!!! O id "' + ID1 + '" não existe!');
    return false;
  }
}

//#################################################################################################################



function changeBackgroundColor(color1, color2) {
  document.body.style.backgroundColor = color1;
  const p = document.querySelectorAll('p');
  const ol = document.querySelectorAll('ol');
  const a = document.querySelectorAll('a');

  p.forEach(function(i) {
    i.style.color = color2;
  });

  ol.forEach(function(i) {
    i.style.color = color2;
  })

  a.forEach(function(i) {
    i.style.color = color2;
  })
}

function toggle_visibility(id) {
  const obj = document.getElementById(id);
  if (obj.style.display === 'none') {
    obj.style.display = "flex"
  }
  else {
    obj.style.display = "none"
  }
}



function filter_news(searchInput, e) {
  e.preventDefault();
  let newsTitles = [];
  const announcementClass = document.querySelectorAll('.announcement');

  let counter = 0;
  let counter2 = 0;

  announcementClass.forEach(function() {
    newsTitles.push(announcementClass[counter].children[0].innerText.toLowerCase());
    counter++;
  })

  let searchValArr = searchInput.value.split(" ");

  counter = 0;

  searchValArr.map(function() {
    searchValArr[counter] = searchValArr[counter].trim();
    counter++;
  })

  let searchValArrClean = [];
  counter = 0;
  
  searchValArr.forEach(function() {
    if (searchValArr[counter].length != 0) {
      searchValArrClean.push(searchValArr[counter].toLowerCase());
    }
    counter++;
  })

  counter = 0;

  if (searchInput.value == "") {
    announcementClass.forEach(function() { announcementClass[counter].style.display = 'block'; counter++; });
  }
  else {
    for (counter; counter < newsTitles.length; counter++) {
      for (counter2; counter2 < searchValArrClean.length; counter2++) {
        if (newsTitles[counter].includes(searchValArrClean[counter2])) {
          announcementClass[counter].style.display = 'block';
        }
        else {
          announcementClass[counter].style.display = 'none';
        }
      }
      counter2 = 0;
    }
  }
}

function addListItem(e, input, listId, listItemClass) {
  e.preventDefault();
  if (input.value != '') {
    const inputVal = document.createTextNode(input.value);
    const emptyTXT = document.getElementById('void-music-list');
    let musicsList = document.getElementById(listId);

    emptyTXT.style.display = 'none';
    let musicsListItem = document.createElement('li');
    let leftItemSide = document.createElement('p');
    let removeItem = document.createElement('button');

    removeItem.innerHTML = '<i class="fa-solid fa-xmark"></i>';

    musicsListItem.setAttribute('class', listItemClass);
    leftItemSide.setAttribute('class', 'list-item-l-side');
    removeItem.setAttribute('class', 'remove-list-item');

    leftItemSide.appendChild(inputVal);
    musicsListItem.appendChild(leftItemSide);
    musicsListItem.appendChild(removeItem);
    musicsList.appendChild(musicsListItem);

    input.value = '';
  }
  else {
    alert('Please fill the input before submitting!');
  }
}

function removeListitem(e, list) {
  const listId = document.getElementById(list);
  const listItem = e.target.parentNode;
  let i = 0;

  if (e.target.parentNode.classList.contains('music-list-item')) {
    i = 1;
  }
  else {
    i = 2;
  }

  switch (i) {
    case 1:
      listId.removeChild(listItem);
      break;
    case 2:
      listId.removeChild(listItem.parentNode);
      break;
  }

  if (!listId.hasChildNodes()) {
    document.getElementById('void-music-list').style.display = 'block';
  }
}


var music;
var musicId;

function musicOver(id) {
  document.querySelector(id).style.display = 'flex';
}

function musicOut(id) {
  document.querySelector(id).style.display = 'none';
}

function playMusic(id, music_list) {
  const playBtnEnabled = document.getElementById('play-btn-enabled');
  const playBtnDisabled = document.getElementById('play-btn-disabled');
  const playerPauseBtn = document.getElementById('pause-btn');

  if (id != 'none') {
    var playBtn = document.getElementById(musicId + '_play');
    var pauseBtn = document.getElementById(musicId + '_pause');

    if (music) {
      music.pause();
      playBtn.style.display = "block";
      pauseBtn.style.display = "none";
    }

    music = new Audio(music_list[id]);

    musicId = id;

    playBtn = document.getElementById(id + '_play');
    pauseBtn = document.getElementById(id + '_pause');
  }
  else {
    var playBtn = document.getElementById(musicId + '_play');
    var pauseBtn = document.getElementById(musicId + '_pause');
  }

  music.play();

  playBtn.style.display = "none";
  pauseBtn.style.display = "block";
  playBtnDisabled.style.display = "none";
  playBtnEnabled.style.display = "none";
  playerPauseBtn.style.display = "block";
}



function pauseMusic(id) {
  const playBtnEnabled = document.getElementById('play-btn-enabled');
  const playerPauseBtn = document.getElementById('pause-btn');

  if (id != 'none') {
    var playBtn = document.getElementById(id + '_play');
    var pauseBtn = document.getElementById(id + '_pause');
  }
  else {
    var playBtn = document.getElementById(musicId + '_play');
    var pauseBtn = document.getElementById(musicId + '_pause');
  }


  music.pause();

  playBtn.style.display = "block";
  pauseBtn.style.display = "none";
  playBtnEnabled.style.display = "block";
  playerPauseBtn.style.display = "none";
}

function nextMusic(music_list) {
  const id_length = musicId.length;
  const id_first_part = musicId.substring(0, 6);
  const id_second_part = musicId.substring(6, id_length);
  musicId = id_first_part + (Number(id_second_part) + 1);
  music.pause();
  music = new Audio(music_list[musicId]);
  music.play();
}

function prevMusic(music_list) {
  const id_length = musicId.length;
  const id_first_part = musicId.substring(0, 6);
  const id_second_part = musicId.substring(6, id_length);
  musicId = id_first_part + (Number(id_second_part) - 1);
  music.pause();
  music = new Audio(music_list[musicId]);
  music.play();
}