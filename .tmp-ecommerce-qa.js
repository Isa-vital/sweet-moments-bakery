const { spawn } = require('node:child_process');
const fs = require('node:fs');
const path = require('node:path');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const profilePath = path.join(process.cwd(), '.tmp-ecommerce-chrome');
const port = 9333;
const failures = [];
const results = [];

function record(name, condition, detail = '') {
  results.push({ name, passed: Boolean(condition), detail });
  if (!condition) failures.push(name + (detail ? ': ' + detail : ''));
}

function delay(ms) { return new Promise(resolve => setTimeout(resolve, ms)); }

async function waitForChrome() {
  for (let index = 0; index < 50; index += 1) {
    try {
      const response = await fetch(`http://127.0.0.1:${port}/json/version`);
      if (response.ok) return;
    } catch (_) {}
    await delay(200);
  }
  throw new Error('Chrome debugging endpoint did not start.');
}

async function newPage() {
  const response = await fetch(`http://127.0.0.1:${port}/json/new?about:blank`, { method: 'PUT' });
  if (!response.ok) throw new Error('Could not create a Chrome page.');
  return response.json();
}

async function run() {
  fs.mkdirSync(profilePath, { recursive: true });
  const chrome = spawn(chromePath, [
    '--headless=new',
    `--remote-debugging-port=${port}`,
    `--user-data-dir=${profilePath}`,
    '--disable-gpu',
    '--no-first-run',
    '--no-default-browser-check',
    '--hide-scrollbars',
    'about:blank'
  ], { stdio: 'ignore' });

  try {
    await waitForChrome();
    const page = await newPage();
    const socket = new WebSocket(page.webSocketDebuggerUrl);
    const pending = new Map();
    let commandId = 0;
    const exceptions = [];

    await new Promise((resolve, reject) => {
      socket.addEventListener('open', resolve, { once: true });
      socket.addEventListener('error', reject, { once: true });
    });

    socket.addEventListener('message', event => {
      const message = JSON.parse(event.data);
      if (message.id && pending.has(message.id)) {
        const { resolve, reject } = pending.get(message.id);
        pending.delete(message.id);
        if (message.error) reject(new Error(message.error.message));
        else resolve(message.result);
      }
      if (message.method === 'Runtime.exceptionThrown') {
        exceptions.push(message.params.exceptionDetails.text || 'Runtime exception');
      }
    });

    function send(method, params = {}) {
      commandId += 1;
      const id = commandId;
      return new Promise((resolve, reject) => {
        pending.set(id, { resolve, reject });
        socket.send(JSON.stringify({ id, method, params }));
      });
    }

    async function evaluate(expression) {
      const response = await send('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true });
      if (response.exceptionDetails) throw new Error(response.exceptionDetails.text);
      return response.result.value;
    }

    async function waitFor(expression, timeout = 5000) {
      const started = Date.now();
      while (Date.now() - started < timeout) {
        if (await evaluate(`Boolean(${expression})`)) return;
        await delay(80);
      }
      throw new Error('Timed out waiting for: ' + expression);
    }

    async function navigate(url) {
      await send('Page.navigate', { url });
      await waitFor("document.readyState === 'complete'");
      await delay(180);
    }

    async function viewport(width, height, mobile = false) {
      await send('Emulation.setDeviceMetricsOverride', { width, height, deviceScaleFactor: mobile ? 2 : 1, mobile, screenWidth: width, screenHeight: height });
    }

    await send('Page.enable');
    await send('Runtime.enable');
    await viewport(1280, 900, false);
    await navigate('http://127.0.0.1:5500/products.html');
    await evaluate("localStorage.removeItem('sweetMomentsCartV1'); location.reload()");
    await waitFor("document.readyState === 'complete' && document.querySelector('[data-add-to-cart]')");

    record('Cart starts empty', await evaluate("document.querySelector('[data-cart-count]').textContent === '0'"));
    await evaluate("document.querySelector('[data-add-to-cart=\"loaf-of-bread\"]').click()");
    await waitFor("document.querySelector('[data-cart-count]').textContent === '1'");
    record('Add to cart updates count', true);

    await evaluate("document.querySelector('[data-cart-open]').click()");
    await waitFor("document.querySelector('[data-cart-drawer]').classList.contains('is-open')");
    record('Cart drawer opens as dialog', await evaluate("document.querySelector('[data-cart-drawer]').getAttribute('aria-hidden') === 'false'"));
    record('Cart total is UGX 5,000', await evaluate("document.querySelector('[data-cart-total]').textContent === 'UGX 5,000'"));

    await evaluate("document.querySelector('[data-cart-action=\"increase\"]').click()");
    await waitFor("document.querySelector('[data-cart-count]').textContent === '2'");
    record('Quantity increase recalculates total', await evaluate("document.querySelector('[data-cart-total]').textContent === 'UGX 10,000'"));
    await evaluate("document.querySelector('[data-cart-action=\"decrease\"]').click()");
    await waitFor("document.querySelector('[data-cart-count]').textContent === '1'");
    record('Quantity decrease recalculates total', await evaluate("document.querySelector('[data-cart-total]').textContent === 'UGX 5,000'"));

    await evaluate("document.querySelector('[data-cart-close]').click()");
    await evaluate("document.querySelector('[data-add-to-cart=\"birthday-cake\"]').click()");
    await waitFor("document.querySelector('[data-cart-count]').textContent === '2'");
    await navigate('http://127.0.0.1:5500/pay.html#checkout');
    record('Cart persists to checkout', await evaluate("document.querySelectorAll('.checkout-item').length === 2"));
    record('Checkout total is UGX 65,000', await evaluate("document.querySelector('[data-checkout-total]').textContent === 'UGX 65,000'"));
    record('Final demo button enabled with cart', await evaluate("!document.querySelector('[data-stop-checkout]').disabled"));

    await evaluate("const radio=document.querySelector('input[value=\"airtel\"]'); radio.click()");
    await waitFor("document.querySelector('.selected-payment h4').textContent.includes('Airtel')");
    record('Payment method switches dynamically', true);
    record('Selected method has exactly three steps', await evaluate("document.querySelectorAll('.selected-payment .payment-steps li').length === 3"));
    record('Selected method shows sample details', await evaluate("document.querySelector('.selected-payment .sample-label').textContent.includes('SAMPLE')"));
    record('Verification and refund guidance visible', await evaluate("document.querySelector('.method-safeguards').textContent.includes('verification') && document.querySelector('.method-safeguards').textContent.includes('refund')"));

    await evaluate("document.querySelector('[data-stop-checkout]').click()");
    await waitFor("document.querySelector('[data-simulation-dialog]').open");
    record('Checkout stops at safety dialog', await evaluate("document.querySelector('[data-simulation-dialog]').textContent.includes('Payments are not active')"));
    record('No order confirmation is generated', await evaluate("document.querySelector('[data-simulation-dialog]').textContent.includes('No order or confirmation was generated')"));
    await evaluate("document.querySelector('[data-simulation-close]').click()");

    await evaluate("document.querySelector('.checkout-item [data-product-id=\"loaf-of-bread\"][data-cart-action=\"remove\"]').click()");
    await waitFor("document.querySelectorAll('.checkout-item').length === 1");
    record('Remove updates checkout summary', await evaluate("document.querySelector('[data-checkout-total]').textContent === 'UGX 60,000'"));

    await viewport(320, 568, true);
    await navigate('http://127.0.0.1:5500/products.html');
    record('iPhone SE width has no horizontal overflow', await evaluate("document.documentElement.scrollWidth <= document.documentElement.clientWidth"));
    record('Mobile cart trigger is visible', await evaluate("Boolean(document.querySelector('[data-cart-open]').getBoundingClientRect().width)"));
    await evaluate("document.querySelector('[data-cart-open]').click()");
    await waitFor("document.querySelector('[data-cart-drawer]').classList.contains('is-open')");
    record('Cart drawer fits 320px viewport', await evaluate("const r=document.querySelector('[data-cart-drawer]').getBoundingClientRect(); r.left >= 0 && r.right <= innerWidth + 1"));

    await viewport(390, 844, true);
    await navigate('http://127.0.0.1:5500/pay.html#checkout');
    record('iPhone 13 checkout has no horizontal overflow', await evaluate("document.documentElement.scrollWidth <= document.documentElement.clientWidth"));
    record('Checkout stacks to one column on mobile', await evaluate("getComputedStyle(document.querySelector('.checkout-layout')).gridTemplateColumns.split(' ').length === 1"));
    record('No customer-data form fields exist', await evaluate("document.querySelectorAll('input:not([type=\"radio\"]), textarea, select').length === 0"));
    record('No runtime exceptions', exceptions.length === 0, exceptions.join('; '));

    console.log(JSON.stringify({ results, failures }, null, 2));
    socket.close();
  } finally {
    chrome.kill();
  }
}

run().catch(error => {
  console.error(error.stack || error.message);
  process.exitCode = 1;
});
