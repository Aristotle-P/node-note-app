console.log('Starting app.js');

const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');

const notes = require('./notes.js');

const argv = yargs.argv;
const command = argv._[0];
console.log('Command: ', command);
console.log('Yargs', argv);

if (command === 'add') {
  const note = notes.addNote(argv.title, argv.body);
  if (note) {
    notes.logNote(note);
  } else {
    console.log('That note already exists');
  }
} else if (command === 'list') {
  notes.getAll();
} else if (command === 'read') {
  const note = notes.getNote(argv.title);
  if (note) {
    notes.logNote(note);
  } else {
    console.log('Note not found');
  }
} else if (command === 'delete') {
  const noteDeleted = notes.deleteNote(argv.title);
  const message = noteDeleted ? 'Note deleted' : 'Note not found';
  console.log(message);
} else {
  console.log('Command not recognized');
}
