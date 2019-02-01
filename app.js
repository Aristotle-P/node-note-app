const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');

const notes = require('./notes.js');

const titleOptions = {
  describe: 'Title of note',
  demand: true,
  alias: 't'
};
const bodyOptions = {
  describe: 'Body of note',
  demand: true,
  alias: 'b'
};

const argv = yargs
  .command('add', 'Add a new note', {
    title: titleOptions,
    body: bodyOptions
  })
  .command('list', 'List all notes')
  .command('read', 'Reads indivudual note', {
    title: titleOptions
  })
  .command('delete', 'Deletes note', {
    title: titleOptions
  })
  .help().argv;
const command = argv._[0];

switch (command) {
  case 'add':
    const note = notes.addNote(argv.title, argv.body);
    if (note) {
      notes.logNote(note);
    } else {
      console.log('That note already exists');
    }
    break;

  case 'read':
    const readNote = notes.getNote(argv.title);
    if (readNote) {
      notes.logNote(readNote);
    } else {
      console.log('Note not found');
    }
    break;

  case 'list':
    const allNotes = notes.getAll();
    console.log(`Printing ${allNotes.length} note(s)`);
    allNotes.forEach(note => notes.logNote(note));
    break;

  case 'delete':
    const noteDeleted = notes.deleteNote(argv.title);
    const message = noteDeleted ? 'Note deleted' : 'Note not found';
    console.log(message);
    break;

  default:
    console.log('Command not found');
}
