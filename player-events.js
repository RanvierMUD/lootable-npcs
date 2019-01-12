'use strict';

const { Broadcast: B } = require('ranvier');

module.exports = {
  listeners: {
    currency: state => function (currency, amount) {
      const friendlyName = currency.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase());
      const key = `currencies.${currency}`;

      if (!this.getMeta('currencies')) {
        this.setMeta('currencies', {});
      }
      this.setMeta(key, (this.getMeta(key) || 0) + amount);
      this.save();

      B.sayAt(this, `<green>You receive currency: <b><white>[${friendlyName}]</white></b> x${amount}.`);
    },
  },
};
