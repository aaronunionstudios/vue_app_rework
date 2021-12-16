new Vue({
    el: '#notebook',
    data () {
        return {
            // content: 'This is a note.',
            content: localStorage.getItem('content') || 'You can write in **markdown**',
            notes: [],
            selectedId: null,
        }
    },
    watch: {
        content: 'saveNote',
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
        saveNote () {
            console.log('saving note:', this.content)
            localStorage.setItem('content', this.content)
            this.reportOperation('saving')
        },
        reportOperation (opName) {
            console.log('The', opName, 'operation was completed!')
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
        }
    },
})
console.log('restored note:', localStorage.getItem('content'))