const util = require("util");
const fs = require("fs");
const { v4: uuidv4 } = require('uuid');

const readNote = util.promisify(fs.readFile);
const writeNote = util.promisify(fs.writeFile);

class Store {
    read() {
        return readNote("db/db.json", "utf8")
    }

    write(note) {
        return writeNote("db/db.json", JSON.stringify(note))
    }

    getNotes() {
        return this.read().then(notes => {
            let parseNotes;

            try {
                parseNotes = [].concat(JSON.parse(notes));
            } catch (error) {
                parseNotes = [];
            }
        });
    }

    addNote(note) {
        const {title, text} = note
        if (!title || !text) {
            throw new Error("Title and Text Cannot be Empty!")
        }

        const newNote = {title, text, id: uuidv4()}
        return this.getNotes()
        .then(notes => [...notes, newNote])
        .then(updateNotes => this.write(updateNotes))
        .then(() => newNote)
    }

    removeNote(id) {
        return this.getNotes()
        .then(notes => notes.filter(note => note.id !== id))
        .then(filteredNotes => this.write(filteredNotes))
    }
}

module.exports = new Store();