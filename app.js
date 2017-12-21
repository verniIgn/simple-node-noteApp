const fs = require("fs");
const _ = require("lodash");
const yargs = require("yargs");

const notes = require("./notes.js");
const titleOptions = {
	describe: "Title of note",
	demand: true,
	alias: "t"
};
const bodyOptions = {
	describe: "Content of note",
	demand: true,
	alias: "b"
};

const argv = yargs
	.command("add", "Add a new note", {
		title: titleOptions,
		body: bodyOptions
	})
	.command("list", "List all notes")
	.command("read", "Read a note", {
		title: titleOptions
	})
	.command("remove", "Remove a note", {
		title: titleOptions
	})
	.help()
	.argv; //here yargs stores the arguments

var command = argv._[0]; //getting the first argument

if (command === "add") {
	//var note gets the return value of addNOte func (THE NOTE BEING ADDED)
	//If note exist, then note was created.
	//If note doesn't exit then is was duplicate 
	var note = notes.addNote(argv.title, argv.body); 
	if (note) {
		console.log(`Note ${argv.title} was created!`);
		notes.logNote(note);
	} else {
		console.log("ERROR --> Title is in use. Note was not created.");
	}
} else if (command === "list") {
	//getting all notes
	var allNotes = notes.getAll();
	//printing # of notes
	console.log(`Printing ${allNotes.length} note(s).`);
	allNotes.forEach((note) => notes.logNote(note));

} else if (command === "read") {
	var note = notes.getNote(argv.title);
	
	if (note) {
		console.log("Note found!");
		notes.logNote(note); //calling func in notes.js file, thus the notes.logNote
		
	} else {
		console.log("NOTE NOT FOUND");
	}
} else if (command === "remove") {
	var noteRemoved = notes.removeNote(argv.title);
	var message = noteRemoved ? "Note was removed" : "Note not found";
	console.log(message);
} else {
	console.log("Command not recognize");
}











