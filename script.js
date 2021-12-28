Vue.filter ('date', time => moment(time)
.format('DD/MM/YY, HH:mm'))

new Vue({
    el: '#notebook',
    data () {
        return {
            // content: 'This is a note.',
            // content: localStorage.getItem('content') || 'You can write in **markdown**',
            notes: JSON.parse(localStorage.getItem('notes')) || [],
            selectedId: localStorage.getItem('selected-id') || null,
        }
    },
    watch: {
        // content: 'saveNote',
        notes: {
            handler: 'saveNotes',
            deep: true,
        },
        selectedId (val) {
            localStorage.setItem('selected-id', val)
        }   
    },
    created () {
        this.content = localStorage.getItem('content') || 'You can write in **markdown**'
    },
    methods: {
        selectNote (note) {
            this.selectedId = note.id
            console.log('selectNote click')
        },
        addNote () {
            console.log('click')
            const time = Date.now()
            const note = {
                id: String(time),
                title: 'New note' + (this.notes.length + 1),
                content: '**Hi!** This notebook is using [markdown] (https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet) for formatting!',
                created: time,
                favorite: false,
            }
            this.notes.push(note)
        },
        saveNotes () {
            localStorage.setItem('notes', JSON.stringify(this.notes))
            console.log('Notes saved!', new Date())
        },
        reportOperation (opName) {
            console.log('The', opName, 'operation was completed!')
        },
        removeNote () {
            if (this.selectedNote && confirm('Delete the note?')) {
                const index = this.notes.indexOf(this.selectedNote)
                if (index !== -1) {
                    this.notes.splice(index, 1)
                }
            }
        },
        favoriteNote () {
            this.selectedNote.favorite ^= true
        },
    },
    computed: {
        selectedNote () {
            console.log('selectedNote fire')
            return this.notes.find(note => note.id === this.selectedId)
        },
        notePreview () {
            return this.selectedNote ? marked.parse(this.selectedNote.content) : ''
        },
        addButtonTitle () {
            console.log('fire')
            return this.notes.length + ' note(s) already' 
        },
        sortedNotes () {
            return this.notes.slice ()
            .sort ((a, b) => a.created - b.created)
            .sort ((a, b) => (a.favorite === b.favorite) ? 0
            : a.favorite? -1
            : 1)
        },
        linesCount () {
            if (this.selectedNote) {
                return this.selectedNote.content.split(/\r\n|\r|\n/).length
            }
        },
        wordsCount () {
            var s = this.selectedNote.content
            s = s.replace(/\n/g, '')
            s = s.replace(/(^\s*)|(\s*$)/gi, '')
            s = s.replace(/\s\s+/gi, ' ')
            return s.split(' ').length
        },
        charactersCount () {
            if (this.selectedNote) {
                return this.selectedNote.content.split('').length
            }
        },
    },
})
console.log('restored note:', localStorage.getItem('content'))