const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const vm = require('node:vm');

class FakeElement {
    constructor({ value = '', type = '', textContent = '' } = {}) {
        this.value = value;
        this.type = type;
        this.textContent = textContent;
        this.style = {};
        this.listeners = new Map();
        this.attributes = new Map();
    }

    addEventListener(eventName, callback) {
        this.listeners.set(eventName, callback);
    }

    setAttribute(name, value) {
        this.attributes.set(name, value);
    }

    dispatch(eventName, event = {}) {
        this.listeners.get(eventName)?.({ preventDefault() {}, ...event });
    }
}

function loadLoginScript() {
    const elements = {
        loginForm: new FakeElement(),
        username: new FakeElement({ value: 'rustam' }),
        password: new FakeElement({ value: 'secret', type: 'password' }),
        'error-message': new FakeElement(),
        togglePassword: new FakeElement({ type: 'button', textContent: 'Show password' }),
    };
    const context = {
        document: { getElementById: (id) => elements[id] },
        alert: () => {},
    };
    const source = fs.readFileSync(path.join(__dirname, '..', 'script.js'), 'utf8');
    vm.runInNewContext(source, context);
    return elements;
}

test('password toggle reveals and hides the value with matching accessible state', () => {
    const elements = loadLoginScript();
    const { password, togglePassword } = elements;

    togglePassword.dispatch('click');
    assert.equal(password.type, 'text');
    assert.equal(togglePassword.textContent, 'Hide password');
    assert.equal(togglePassword.attributes.get('aria-pressed'), 'true');

    togglePassword.dispatch('click');
    assert.equal(password.type, 'password');
    assert.equal(togglePassword.textContent, 'Show password');
    assert.equal(togglePassword.attributes.get('aria-pressed'), 'false');
});
