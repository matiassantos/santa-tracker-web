/*
 * Copyright 2015 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not
 * use this file except in compliance with the License. You may obtain a copy of
 * the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations under
 * the License.
 */

goog.provide('app.TimeItem');

goog.require('app.Constants');
goog.require('app.Item');
goog.require('app.shared.pools');



/**
 * Constructor for clock items that the player can catch.
 * @constructor
 * @extends {Item}
 * @param {!Game} game The game object.
 */
app.TimeItem = function(game) {
  app.Item.call(this, game);
  this.types = app.Constants.CLOCK_TYPES;
};


/**
 * Inherit the Item prototype
 * @type {Item}
 */
app.TimeItem.prototype = Object.create(app.Item.prototype);


/**
 * Create a pool for app.TimeItem
 */
app.shared.pools.mixin(app.TimeItem);


/**
 * Initialize the clock for reuse.
 */
app.TimeItem.prototype.onInit = function() {
  this.type = this.weightedRandomType(app.Constants.CLOCK_WEIGHT);
  this.reset();

  // Override hit sound.
  this.sound = 'jetpack_clock';
};


/**
 * Registers a collision with the player.
 */
app.TimeItem.prototype.hit = function() {
  var time = app.TimeItem.calculateTime_(this.game.level, this.type);
  this.triggerHit(0, time, app.TimeItem.formatTime_(time));
};


/**
 * Returns the time received for catching this clock.
 * @param {number} level The current level, 0-based.
 * @param {Constants.ItemType} type The type of the item giving the score.
 * @return {number} The time received.
 * @private
 */
app.TimeItem.calculateTime_ = function(level, type) {
  return type.fast ? app.Constants.ITEM_TIME_FAST : app.Constants.ITEM_TIME_NORMAL;
};


/**
 * Return formatted time in the format '+ M:SS'
 * @param {number} time in seconds
 * @return {string} time in correct format
 * @private
 */
app.TimeItem.formatTime_ = function(time) {
  var min = Math.floor(time / 60);
  var sec = time - 60 * min;
  return '+ ' + ('00' + min).substr(-2) + ':' + ('00' + sec).substr(-2);
};
