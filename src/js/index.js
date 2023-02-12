import myJson from '../../dataset.json' assert {type: 'json'};
localStorage.setItem("myJson", JSON.stringify(myJson));
const value = localStorage.getItem("myJson");
const data=JSON.parse(value);
