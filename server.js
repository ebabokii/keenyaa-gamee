const express = require("express");
const crypto = require("crypto");
const Database = require("better-sqlite3");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;
const ADMIN_KEY = process.env.ADMIN_KEY || "CHANGE_ME";

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

const db = new Database("keenyaa.db");

db.pragma("journal_mode = WAL");

db.exec(`
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  telegram_id TEXT UNIQUE NOT NULL,
  balance REAL NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS transactions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  telegram_id TEXT NOT NULL,
  type TEXT NOT NULL,
  amount REAL NOT NULL,
  status TEXT NOT NULL,
  reference TEXT UNIQUE NOT NULL,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);
`);

function getUser(telegramId) {
  let user = db
    .prepare("SELECT * FROM users WHERE telegram_id = ?")
    .get(telegramId);

  if (!user) {
    db.prepare(
      "INSERT INTO users (telegram_id, balance) VALUES (?, 0)"
    ).run(telegramId);

    user = db
      .prepare("SELECT * FROM users WHERE telegram_id = ?")
      .get(telegramId);
  }

  return user;
}

function makeReference() {
  return crypto.randomUUID();
}

function requireUser(req, res, next) {
  const telegramId = String(
    req.header("X-Telegram-User") || ""
  ).trim();

  if (!telegramId) {
    return res.status(401).json({
      error: "Telegram user ID is required"
    });
  }

  req.telegramId = telegramId;
  getUser(telegramId);

  next();
}

/* USER BALANCE + TRANSACTIONS */

app.get("/api/me", requireUser, (req, res) => {
  const user = getUser(req.telegramId);

  const transactions = db
    .prepare(`
      SELECT *
      FROM transactions
      WHERE telegram_id = ?
      ORDER BY id DESC
      LIMIT 50
    `)
    .all(req.telegramId);

  res.json({
    telegram_id: req.telegramId,
    balance: user.balance,
    transactions
  });
});

/* DEMO DEPOSIT
   Kun TEST qofa.
   Maallaqa dhugaa hin fudhatu.
*/

app.post("/api/demo/deposit", requireUser, (req, res) => {
  const amount = Number(req.body.amount);

  if (
    !Number.isFinite(amount) ||
    amount <= 0 ||
    amount > 100000
  ) {
    return res.status(400).json({
      error: "Invalid deposit amount"
    });
  }

  const reference = makeReference();

  const transaction = db.transaction(() => {

    db.prepare(`
      UPDATE users
      SET balance = balance + ?
      WHERE telegram_id = ?
    `).run(amount, req.telegramId);

    db.prepare(`
      INSERT INTO transactions
      (
        telegram_id,
        type,
        amount,
        status,
        reference
      )
      VALUES (?, ?, ?, ?, ?)
    `).run(
      req.telegramId,
      "DEPOSIT",
      amount,
      "TEST_SUCCESS",
      reference
    );

  });

  transaction();

  const user = getUser(req.telegramId);

  res.json({
    ok: true,
    mode: "demo",
    reference,
    balance: user.balance
  });
});

/* WITHDRAW
   Withdrawal kun PENDING ta'a.
   Maallaqa dhugaa hin ergu.
*/

app.post("/api/withdraw", requireUser, (req, res) => {

  const amount = Number(req.body.amount);
  const method = String(req.body.method || "");
  const account = String(req.body.account || "").trim();

  if (!Number.isFinite(amount) || amount <= 0) {
    return res.status(400).json({
      error: "Invalid withdrawal amount"
    });
  }

  if (!method || !account) {
    return res.status(400).json({
      error: "Payment method and account are required"
    });
  }

  const user = getUser(req.telegramId);

  if (amount > user.balance) {
    return res.status(400).json({
      error: "Insufficient balance"
    });
  }

  const reference = makeReference();

  const transaction = db.transaction(() => {

    db.prepare(`
      UPDATE users
      SET balance = balance - ?
      WHERE telegram_id = ?
    `).run(amount, req.telegramId);

    db.prepare(`
      INSERT INTO transactions
      (
        telegram_id,
        type,
        amount,
        status,
        reference
      )
      VALUES (?, ?, ?, ?, ?)
    `).run(
      req.telegramId,
      "WITHDRAW",
      amount,
      "PENDING",
      reference
    );

  });

  transaction();

  const updatedUser = getUser(req.telegramId);

  res.json({
    ok: true,
    status: "PENDING",
    reference,
    balance: updatedUser.balance
  });
});

/* ADMIN: PENDING WITHDRAWALS */

app.get("/api/admin/pending", (req, res) => {

  if (req.header("X-Admin-Key") !== ADMIN_KEY) {
    return res.status(403).json({
      error: "Forbidden"
    });
  }

  const withdrawals = db
    .prepare(`
      SELECT *
      FROM transactions
