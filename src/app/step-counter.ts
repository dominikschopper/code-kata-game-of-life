export const stepCounter = {
    steps: 0,
    _subscriptions: [],
    add: function () {
        this.steps += 1;
        this._notify();
    },
    subscribe: function (callback) {
        this._subscriptions.push(callback);
        this._notify();
    },
    reset: function () {
        this.steps = 0;
        this._notify();
    },
    _notify: function () {
        this._subscriptions.forEach(cb => cb(this.steps));
    },
};

