const fs = require("fs");

var fetchNotes = () => {
	try {
		var notesString = fs.readFileSync("notes-data.json");
		return JSON.parse(notesString);
	} catch (e) {
		return []; //if there's no notes, return empty array
	}
};

var saveNotes = (notes) => {
	fs.writeFileSync("notes-data.json", JSON.stringify(notes));
};
	
var addNote = (title, body) => {
	var notes = fetchNotes();
	var note = {
		title,
		body	
	};

	var duplicateNotes = notes.filter((note) => note.title === title);
	
	if (duplicateNotes.length === 0) {
		notes.push(note);
		saveNotes(notes);
		return note;
	}
};
	
var getAll = () => {
	return fetchNotes();
};
var getNote = (title) => {
	//fetch notes
	var notes = fetchNotes();
	//filter to only return note title matching argument
	var noteFound = notes.filter((note) => note.title === title);
	//return that note (1ts item in that array)
	return noteFound[0];
};

var removeNote = (title) => {
	//fetch notes
	var notes = fetchNotes();
	var filteredNotes = notes.filter((note) => note.title !== title); 
	//save new notes array
	saveNotes(filteredNotes);
	return notes.length !== filteredNotes.length;	
};

var logNote = (note) => {
	console.log("--------");
	console.log(`Title: ${note.title}`);
	console.log(`Body: ${note.body}`);
};


module.exports = {
	addNote, 
	getAll,
	getNote,
	removeNote,
	logNote
};