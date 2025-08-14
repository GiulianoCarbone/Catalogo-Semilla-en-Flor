const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

describe('loadProducts', () => {
  test('handles empty storage and fetch error gracefully', async () => {
    let html = fs.readFileSync(path.resolve(__dirname, '../panel.html'), 'utf8');
    html = html
      .replace(/<script src="https:\/\/cdn.tailwindcss.com"><\/script>/, '')
      .replace(/<link[^>]*>/g, '');
    const dom = new JSDOM(html, { runScripts: 'dangerously' });
    const { window } = dom;

    Object.defineProperty(window, 'localStorage', {
      value: { getItem: jest.fn(() => null), setItem: jest.fn() },
      configurable: true,
    });
    Object.defineProperty(window, 'sessionStorage', {
      value: { getItem: jest.fn(() => 'true'), setItem: jest.fn(), removeItem: jest.fn() },
      configurable: true,
    });
    window.fetch = jest.fn(() => Promise.reject(new Error('network')));
    window.alert = jest.fn();
    window.confirm = jest.fn();

    window.document.dispatchEvent(new window.Event('DOMContentLoaded'));

    await window.loadProducts();

    expect(window.document.getElementById('product-list').textContent).toContain('No hay productos');
  });
});
