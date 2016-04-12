// Base
import {Meteor} from 'meteor/meteor';
import {FlowRouter} from 'meteor/kadira:flow-router-ssr';
import {ReactiveDict} from 'meteor/reactive-dict';
import {Tracker} from 'meteor/tracker';
// Collections
import * as Collections from '/lib/collections';
// LocalCollections
import {FlashMessages as Flash} from '/lib/client/collections';

const ENV = Meteor.settings.public.env;

const context = function () {
  return {
    Meteor,
    FlowRouter,
    Collections,
    Flash,
    LocalState: new ReactiveDict(),
    Tracker
  };
};

if (ENV.development) {
  window.ReactContext = context;
}

export default context;