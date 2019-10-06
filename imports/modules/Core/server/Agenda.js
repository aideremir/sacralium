import { Meteor } from 'meteor/meteor';
import { MongoInternals } from 'meteor/mongo';
import Agenda from 'agenda';

const { db } = MongoInternals.defaultRemoteCollectionDriver().mongo;
const agenda = new Agenda({ mongo: db });
agenda.start();

async function graceful() {
  await agenda.stop();
  process.exit(0);
}

process.on('SIGTERM', graceful);
process.on('SIGINT', graceful);

// Улучшаем совместимость с fibers
const originalDefine = agenda.define;
agenda.define = function (name, options, processor) {
  const callback = processor || options;
  const wrappedCallback = Meteor.bindEnvironment(callback);
  originalDefine.call(agenda, name, options, wrappedCallback);
};

export default agenda;
