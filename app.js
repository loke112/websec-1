const elA = document.getElementById('a');
const elB = document.getElementById('b');
const elOp = document.getElementById('op');
const elBtn = document.getElementById('calc');
const elOut = document.getElementById('out');

function normalizeNumberText(s) {
  return String(s).trim().replace(',', '.');
}

function isValidNumberText(s) {
  const t = normalizeNumberText(s);
  if (t.length === 0) return false;
  return /^[-+]?(?:\d+(?:\.\d+)?|\.\d+)$/.test(t);
}

function parseNumber(s) {
  return Number(normalizeNumberText(s));
}

function setError(el, on) {
  el.classList.toggle('error', !!on);
}

function compute(a, b, op) {
  switch (op) {
    case '+': return a + b;
    case '-': return a - b;
    case '*': return a * b;
    case '/': return a / b;
    default: return NaN;
  }
}

function formatResult(x) {
  if (!Number.isFinite(x)) return String(x); 
  if (Object.is(x, -0)) x = 0;  
  const s = String(x);
  if (s.includes('e')) return x.toPrecision(12).replace(/\.?0+$/,'');
  return s;
}

function run() {
  const aText = elA.value;
  const bText = elB.value;
  const op = elOp.value;

  const aOk = isValidNumberText(aText);
  const bOk = isValidNumberText(bText);

  setError(elA, !aOk);
  setError(elB, !bOk);

  if (!aOk || !bOk) {
    elOut.value = 'Ошибка: введите корректные числа (например 12, -3.5, .25)';
    return;
  }

  const a = parseNumber(aText);
  const b = parseNumber(bText);

  if (op === '/' && b === 0) {
    elOut.value = 'Ошибка: деление на 0';
    return;
  }

  const r = compute(a, b, op);
  elOut.value = `${normalizeNumberText(aText)} ${op} ${normalizeNumberText(bText)} = ${formatResult(r)}`;
}

elBtn.addEventListener('click', run);

[elA, elB].forEach(el => {
  el.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') run();
  });
});

run();
