/*!
 * Edited from https://github.com/chaijs/chai-null
 *
 * Chai.js Team - http://chaijs.com/
 * Copyright (c) 2012 Veselin Todorov <hi@vesln.com>
 *
 * Modifications by Gabriel Dehan
 *
 * MIT Licensed
 */

/**
 * Null Object builder.
 *
 * @param {Object|Function} [optional] subject
 * @api public
 */
NullObject = function(subject) {
  this.object = Object.create(null);
  this.handle(subject);
};

/**
 * Handle supplied subject.
 *
 * @param {Object|Function} subject
 * @api private
 */
NullObject.prototype.handle = function(object) {
  switch (typeof object) {
  case 'object':   this.object = new Objekt(object); break;
  case 'function': this.object = new Klass(object);  break;
  }
};

/**
 * Builds a null method.
 *
 * @param {String} name.
 * @returns `this`
 * @api public
 */
NullObject.prototype.method = function(name) {
  this.object[name] = function() { return null; };
  return this;
};

/**
 * Returns the null object.
 *
 * @returns {Object}
 */
NullObject.prototype.create = function() {
  return this.object;
};

/**
 * Null Object builder for objects.
 *
 * @param {Object} subject
 * @api private
 */
function Objekt(subject) {
  for (var property in subject) {
    subject[property] = ('function' === typeof subject[property])
      ? function () { return null; }
    : null;
  }

  return subject;
};

/**
 * Null Object builder for classes.
 *
 * @param {Object} subject
 * @api private
 */
function Klass(subject) {
  return new Objekt(new subject);
};
