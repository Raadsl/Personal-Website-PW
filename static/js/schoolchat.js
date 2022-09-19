//code from https://github.com/ScaleDrone/javascript-chat-room-tutorial
// PS! Replace this with your own channel ID
// If you use this channel ID your app will stop working in the future
const CLIENT_ID = 'Oxgjxq7sdwYxoVkr';

const drone = new ScaleDrone(CLIENT_ID, {
  data: { // Will be sent out as clientData via events
    name: getRandomName(),
    color: getRandomColor(),
  },
});

let members = [];

drone.on('open', error => {
  if (error) {
    return console.error(error);
  }
  console.log('Successfully connected to Scaledrone');

  const room = drone.subscribe('observable-room');
  room.on('open', error => {
    if (error) {
      return console.error(error);
    }
    console.log('Successfully joined room');
  });

  room.on('members', m => {
    members = m;
    updateMembersDOM();
  });

  room.on('member_join', member => {
    members.push(member);
    updateMembersDOM();
  });

  room.on('member_leave', ({id}) => {
    const index = members.findIndex(member => member.id === id);
    members.splice(index, 1);
    updateMembersDOM();
  });

  room.on('data', (text, member) => {
    if (member) {
      addMessageToListDOM(text, member);
    } else {
      // Message is from server
    }
  });
});

drone.on('close', event => {
  console.log('Connection was closed', event);
});

drone.on('error', error => {
  console.error(error);
});

function getRandomName() {
  const person = prompt("Voer hier je naam in: ", "Roger")
  if (person === '') {
  const adjs = ["herfst", "verborgen", "bitter", "mistig", "stil", "leeg", "droog", "donker", "zomer", "ijzig", "delicaat", "stil", "wit", "koel", "lente", "winter", "geduldig", "twilight", "dawn", "crimson", "wispy", "weathered", "blue", "billowing", "broken", "cold", "damp", "falling", "frosty", "green", "long", "late", "lingering", "moedig", "klein", "ochtend", "modderig", "oud", "rood", "ruwe", "stille", "klein", "sprankelend", "kloppend", "verlegen", "zwervende", "verdord", "wild", "zwart", "jonge", "heilig", "eenzaam", "geurig", "oud", "besneeuwde", "trotse", "bloemig", "rusteloos", "goddelijk", "gepolijst", "oud", "paars", "levendig", "naamloos"];
  const nouns = ["waterval", "rivier", "bries", "maan", "regen", "wind", "zee", "ochtend", "sneeuw", "meer", "zonsondergang", "den", "schaduw", "blad", "dageraad", "glitter", "woud", "heuvel", "wolk", "weide", "zon", "gazon", "vogel", "beek", "vlinder", "struik", "dauw", "stof", "veld", "vuur", "bloem", "vuurvlieg", "veer", "gras", "waas", "berg", "nacht", "vijver", "duisternis", "sneeuwvlok", "stilte", "geluid", "hemel", "vorm", "branding", "donder", "violet", "water", "wilde bloem", "golf", "water", "resonantie", "zon", "hout", "droom", "kers", "boom", "mist", "vorst", "stem", "papier", "kikker", "rook", "ster"];
  console.log('gebruiker zonder naam is gejoined')
  return (
    adjs[Math.floor(Math.random() * adjs.length)] +
    "_" +
    nouns[Math.floor(Math.random() * nouns.length)]
  );

  }
  if (person.toLowerCase() == 'jorik') {
    console.log('Jorik is gejoined (check of ie echt is)')
    w8woord = prompt('Hallo Raadsel, wat is het wachtwoord?', 'wachtwoord hier')
    if (w8woord.toLowerCase() == 'bababooey') {
      return person
    }
    else {
      return 'NEPPE NERD LLLL'
    }
  }
  if (person.toLowerCase() == 'raadsel') {
    console.log('Raadsel is gejoined (check of ie echt is)')
    w8woord = prompt('Hallo Raadsel, wat is het wachtwoord?', 'wachtwoord hier')
    if (w8woord.toLowerCase() == 'bababooey') {
      return person
    }
    else {
      return 'NEPPE NERD LLLL'
    }
  }
  if (person == 'Roger') {
  alert('Ey je bent een Roger faker!')
  const adjs = ["herfst", "verborgen", "bittere", "mistige", "stille", "lege", "droge", "donkere", "zomerachtige", "ijzige", "delicate", "stil", "witte", "koele", "lenteachtige", "winterachtige", "geduldige", "twilight", "ochtend", "eiken", "fluisterende", "vieze", "blauwe", "nerdachtige", "kapotte", "koude", "dampende", "vallende", "vriezende", "green", "long", "late", "lingering", "moedig", "klein", "ochtend", "modderig", "oud", "rood", "ruwe", "stille", "klein", "sprankelend", "kloppende", "verlegen", "zwervende", "verdorde", "wilde", "zwarte", "jonge", "heilige", "eenzame", "geurige", "oude", "besneeuwde", "trotse", "bloemige", "rusteloze", "goddelijke", "gepolijst", "oude", "paarse", "levendige", "naamloze"];
  const nouns = ["waterval", "rivier", "bries", "maan", "regen", "wind", "zee", "ochtend", "sneeuw", "meer", "zonsondergang", "den", "schaduw", "blad", "dageraad", "glitter", "woud", "heuvel", "wolk", "weide", "zon", "gazon", "vogel", "beek", "vlinder", "struik", "dauw", "stof", "veld", "vuur", "bloem", "vuurvlieg", "veer", "gras", "waas", "berg", "nacht", "vijver", "duisternis", "sneeuwvlok", "stilte", "geluid", "hemel", "vorm", "branding", "donder", "violet", "water", "wilde bloem", "golf", "water", "resonantie", "zon", "hout", "droom", "kers", "boom", "mist", "vorst", "stem", "papier", "kikker", "rook", "ster"];
  console.log('gebruiker zonder naam is gejoined (heeft eerst Roger geprobeert')
  return (
    adjs[Math.floor(Math.random() * adjs.length)] +
    "_" +
    nouns[Math.floor(Math.random() * nouns.length)]
  );
  
  }

    
  else {
    console.log(`gebruiker met naam ${person} is gejoined`)
    return person;
  }
}

function getRandomColor() {
  return '#' + Math.floor(Math.random() * 0xFFFFFF).toString(16);
}

//------------- DOM STUFF

const DOM = {
  membersCount: document.querySelector('.members-count'),
  membersList: document.querySelector('.members-list'),
  messages: document.querySelector('.messages'),
  input: document.querySelector('.message-form__input'),
  form: document.querySelector('.message-form'),
};

DOM.form.addEventListener('submit', sendMessage);

function sendMessage() {
  const value = DOM.input.value;
  if (value === '') {
    return;
  }
  //hier
  DOM.input.value = '';
  drone.publish({
    room: 'observable-room',
    message: value,
  });
}

function createMemberElement(member) {
  const { name, color } = member.clientData;
  const el = document.createElement('div');
  el.appendChild(document.createTextNode(name));
  el.className = 'member';
  el.style.color = color;
  return el;
}

function updateMembersDOM() {
  if (members.length == 1) {
    DOM.membersCount.innerText = `${members.length} gigachad is hier:`;
    DOM.membersList.innerHTML = '';
    members.forEach(member =>
      DOM.membersList.appendChild(createMemberElement(member))
  );
  }
  else {
    DOM.membersCount.innerText = `${members.length} nerds zijn hier:`;
    DOM.membersList.innerHTML = '';
    members.forEach(member =>
      DOM.membersList.appendChild(createMemberElement(member))
  );
  }

}

function createMessageElement(text, member) {
  const el = document.createElement('div');
  el.appendChild(createMemberElement(member));
  el.appendChild(document.createTextNode(text));
  el.className = 'message';
  return el;
}

function addMessageToListDOM(text, member) {
  const el = DOM.messages;
  const wasTop = el.scrollTop === el.scrollHeight - el.clientHeight;
  el.appendChild(createMessageElement(text, member));
  if (wasTop) {
    el.scrollTop = el.scrollHeight - el.clientHeight;
  }
}
