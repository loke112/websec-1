const elA = document.getElementById("a");
const elB = document.getElementById("b");
const elOp = document.getElementById("op");
const elBtn = document.getElementById("calc");
const elOut = document.getElementById("out");

function parseNumberFromInput(el) {
  const value = el.value.trim();
  if (value === "") return NaN;
  return parseFloat(value);
}

function setError(el, on) {
  el.classList.toggle("error", !!on);
}

function compute(a, b, op) {
  switch (op) {
    case "+":
      return a + b;
    case "-":
      return a - b;
    case "*":
      return a * b;
    case "/":
      return a / b;
    default:
      return NaN;
  }
}

function formatResult(x) {
  if (!Number.isFinite(x)) return String(x);
  if (Object.is(x, -0)) x = 0;
  return x % 1 === 0 ? String(x) : x.toFixed(4);
}

function run() {
  const a = parseNumberFromInput(elA);
  const b = parseNumberFromInput(elB);
  const op = elOp.value;

  const aOk = !Number.isNaN(a);
  const bOk = !Number.isNaN(b);

  setError(elA, !aOk);
  setError(elB, !bOk);

  if (!aOk || !bOk) {
    elOut.value = "Ошибка: введите число";
    return;
  }

  if (op === "/" && b === 0) {
    elOut.value = "Ошибка: деление на 0";
    return;
  }

  const r = compute(a, b, op);
  elOut.value = `${a} ${op} ${b} = ${formatResult(r)}`;
}

elBtn.addEventListener("click", run);

[elA, elB].forEach((el) => {
  el.addEventListener("keydown", (e) => {
    if (e.key === "Enter") run();
  });
});

run();
