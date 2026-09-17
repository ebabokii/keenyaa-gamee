<!DOCTYPE html>
<html lang="om">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<title>  —  Demo</title>

<style>
*{
  box-sizing:border-box;
  margin:0;
  padding:0;
}

body{
  font-family:Arial,Helvetica,sans-serif;
  background:
    radial-gradient(circle at top,#222a45 0,#0b0e17 48%,#070910 100%);
  color:#fff;
  min-height:100vh;
  padding:14px;
}

.app{
  max-width:520px;
  margin:auto;
}

.header{
  display:flex;
  align-items:center;
  justify-content:space-between;
  gap:10px;
  margin-bottom:14px;
}

.logo{
  display:flex;
  align-items:center;
  gap:9px;
}

.logo-icon{
  width:42px;
  height:42px;
  border-radius:13px;
  display:flex;
  align-items:center;
  justify-content:center;
  background:linear-gradient(135deg,#ff2d55,#ff7a18);
  font-size:22px;
  box-shadow:0 7px 25px rgba(255,65,50,.25);
}

.logo h1{
  font-size:17px;
}

.logo p{
  color:#8e96aa;
  font-size:11px;
  margin-top:3px;
}

.balance{
  background:rgba(255,255,255,.07);
  border:1px solid rgba(255,255,255,.08);
  border-radius:13px;
  padding:9px 12px;
  text-align:right;
}

.balance small{
  color:#8e96aa;
  display:block;
  font-size:10px;
}

.balance strong{
  font-size:14px;
}

.game-card{
  position:relative;
  overflow:hidden;
  border-radius:20px;
  border:1px solid rgba(255,255,255,.08);
  background:#101522;
  box-shadow:0 15px 50px rgba(0,0,0,.35);
}

.game-screen{
  height:310px;
  position:relative;
  overflow:hidden;
  display:flex;
  align-items:center;
  justify-content:center;
  background:
    radial-gradient(circle at 50% 70%,
      rgba(255,70,40,.16),
      transparent 34%),
    linear-gradient(160deg,#151c30,#090c14);
}

.game-screen::before{
  content:"";
  position:absolute;
  inset:0;
  opacity:.35;
  background-image:
    radial-gradient(circle,#fff 1px,transparent 1px);
  background-size:45px 45px;
}

.center{
  position:relative;
  z-index:2;
  text-align:center;
}

.multiplier{
  font-size:64px;
  font-weight:900;
  letter-spacing:-3px;
  text-shadow:0 0 25px rgba(255,75,45,.4);
}

.status{
  color:#969daf;
  margin-top:7px;
  font-size:13px;
}

.plane{
  position:absolute;
  left:12%;
  bottom:24%;
  font-size:42px;
  transform:rotate(-15deg);
  filter:drop-shadow(0 8px 12px rgba(255,80,40,.35));
  transition:.1s linear;
}

.trail{
  position:absolute;
  left:4%;
  bottom:19%;
  width:48%;
  height:3px;
  transform:rotate(-14deg);
  background:linear-gradient(
    90deg,
    transparent,
    rgba(255,90,40,.7)
  );
  filter:blur(1px);
}

.controls{
  padding:14px;
}

.bet-row{
  display:grid;
  grid-template-columns:1fr 1fr;
  gap:10px;
}

.field{
  background:#171d2b;
  border:1px solid #252d40;
  border-radius:13px;
  padding:11px;
}

.field label{
  display:block;
  color:#8e96aa;
  font-size:11px;
  margin-bottom:7px;
}

input{
  width:100%;
  border:0;
  outline:0;
  background:transparent;
  color:white;
  font-size:18px;
  font-weight:bold;
}

button{
  width:100%;
  border:0;
  min-height:48px;
  border-radius:13px;
  margin-top:10px;
  color:white;
  font-size:16px;
  font-weight:800;
  cursor:pointer;
  transition:.15s;
}

button:active{
  transform:scale(.98);
}

.start{
  background:linear-gradient(135deg,#ff3151,#ff6b22);
  box-shadow:0 8px 25px rgba(255,65,45,.22);
}

.cash{
  background:linear-gradient(135deg,#10b981,#059669);
}

button:disabled{
  opacity:.35;
  cursor:not-allowed;
  box-shadow:none;
}

.section-title{
  display:flex;
  justify-content:space-between;
  margin:16px 2px 9px;
  color:#9da5b8;
  font-size:12px;
}

.history{
  display:flex;
  flex-wrap:wrap;
  gap:7px;
}

.history span{
  padding:7px 10px;
  background:#171d2b;
  border:1px solid #252d40;
  border-radius:9px;
  font-size:12px;
}

.notice{
  margin-top:12px;
  padding:10px 12px;
  border:1px solid rgba(255,193,7,.25);
  border-radius:11px;
  background:rgba(255,193,7,.08);
  color:#d9c98a;
  font-size:11px;
  line-height:1.45;
  text-align:center;
}

.footer{
  text-align:center;
  color:#626b7e;
  font-size:10px;
  margin-top:15px;
}

@media(max-width:390px){

  .multiplier{
    font-size:52px;
  }

  .game-screen{
    height:280px;
  }

  .bet-row{
    grid-template-columns:1fr;
  }
}
</style>
</head>

<body>

<div class="app">

  <div class="header">

    <div class="logo">

      <div class="logo-icon">
        🤖
      </div>

      <div>
        <h1>Huluugameedemobot Hojjedheera</h1>
        <p>Tapha Demo Qofa • Qarshii Dhugaa Hin Qabu</p>
      </div>

    </div>

    <div class="balance">
      <small>QARSHII VIRTUAL DEMO</small>
      <strong id="balance">1,000.00</strong>
    </div>

  </div>

  <div class="game-card">

    <div class="game-screen">

      <div class="trail" id="trail"></div>

      <div class="plane" id="plane">
        🤖
      </div>

      <div class="center">

        <div
          class="multiplier"
          id="multiplier"
        >
          1.00x
        </div>

        <div
          class="status"
          id="status"
        >
          Jalqabuuf qophiidha
        </div>

      </div>

    </div>

    <div class="controls">

      <div class="bet-row">

        <div class="field">

          <label>
            QARSHII VIRTUAL DEMO
          </label>

          <input
            id="bet"
            type="number"
            min="1"
            value="10"
          >

        </div>

        <div class="field">

          <label>
            MARA
          </label>

          <div
            id="round"
            style="
              font-size:18px;
              font-weight:bold;
              padding:1px 0;
            "
          >
            #1
          </div>

        </div>

      </div>

      <button
        class="start"
        id="start"
      >
        🚀 MARA DEMO JALQABI
      </button>

      <button
        class="cash"
        id="cashout"
        disabled
      >
        💰 QARSHII VIRTUAL BAASI
      </button>

      <div class="section-title">
        <span>MARAWWAN DHIHOO</span>
        <span>DEMO QOFA</span>
      </div>

      <div
        class="history"
        id="history"
      ></div>

      <div class="notice">
        Itti gaafatamummaa taphaa: Kun tapha bashannanaa fi demo qofa.
        Qarshii dhugaa, badhaasa dhugaa, kuusaa, kaffaltii ykn bu’aa maallaqaa
        hin qabu. Qarshiin agarsiifamu hundi virtual dha; murtii maallaqaa
        irratti hin hundaa’in.
      </div>

    </div>

  </div>

  <div class="footer">
    Tapha demo qofa • Qarshii fi badhaasa dhugaa hin qabu
  </div>

</div>

<script>

let balance = 1000;
let round = 1;
let running = false;
let cashedOut = false;
let bet = 10;
let multiplier = 1;
let crashPoint = 2;
let timer = null;

const balanceEl =
  document.getElementById("balance");

const multiplierEl =
  document.getElementById("multiplier");

const statusEl =
  document.getElementById("status");

const betEl =
  document.getElementById("bet");

const startEl =
  document.getElementById("start");

const cashoutEl =
  document.getElementById("cashout");

const historyEl =
  document.getElementById("history");

const planeEl =
  document.getElementById("plane");

function updateBalance(){

  balanceEl.textContent =
    balance.toFixed(2);

}

function startGame(){

  if(running) return;

  const value =
    Number(betEl.value);

  if(!Number.isFinite(value) || value < 1){

    statusEl.textContent =
      "Qarshii virtual demo sirrii galchi.";

    return;
  }

  if(value > balance){

    statusEl.textContent =
      "Qarshiin virtual demo gahaa miti.";

    return;
  }

  bet = value;

  balance -= bet;

  updateBalance();

  multiplier = 1;

  crashPoint =
    Number(
      (1.20 + Math.random() * 4.80)
      .toFixed(2)
    );

  running = true;
  cashedOut = false;

  startEl.disabled = true;
  cashoutEl.disabled = false;

  statusEl.textContent =
    "Demo qofa: botichi hojjechaa jira...";

  multiplierEl.textContent =
    "1.00x";

  planeEl.style.left = "12%";

  timer =
    setInterval(updateGame,50);

}

function updateGame(){

  multiplier +=
    0.01 + multiplier * 0.006;

  multiplierEl.textContent =
    multiplier.toFixed(2) + "x";

  let movement =
    Math.min(
      72,
      12 + (multiplier - 1) * 15
    );

  planeEl.style.left =
    movement + "%";

  if(multiplier >= crashPoint){

    crashGame();

  }

}

function cashOut(){

  if(!running || cashedOut)
    return;

  const payout =
    bet * multiplier;

  balance += payout;

  updateBalance();

  cashedOut = true;

  cashoutEl.disabled = true;

  statusEl.textContent =
    "Ati " +
    multiplier.toFixed(2) +
    "x irratti qarshii virtual baafatte.";

}

function crashGame(){

  clearInterval(timer);

  running = false;

  cashoutEl.disabled = true;

  startEl.disabled = false;

  multiplierEl.textContent =
    crashPoint.toFixed(2) + "x";

  if(cashedOut){

    statusEl.textContent =
      "Marichi xumurame; kun demo qofa.";

  }else{

    statusEl.textContent =
      "💥 CACCABE! Qarshiin virtual qofa hir’ate.";

  }

  const item =
    document.createElement("span");

  item.textContent =
    crashPoint.toFixed(2) + "x";

  historyEl.prepend(item);

  while(historyEl.children.length > 12){

    historyEl.removeChild(
      historyEl.lastChild
    );

  }

  round++;

  document.getElementById("round")
    .textContent =
    "#" + round;

}

startEl.addEventListener(
  "click",
  startGame
);

cashoutEl.addEventListener(
  "click",
  cashOut
);

updateBalance();

</script>

</body>
</html>
