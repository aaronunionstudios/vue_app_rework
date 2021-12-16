new Vue({
    el: '#notebook',
    data () {
        return {
            // content: 'This is a note.',
            content: localStorage.getItem('content') || 'You can write in **markdown**',
            notes: []
        }
    },
    watch: {
        content: 'saveNote',
    },
    created () {
        this.content = localStorage.getItem('content') || 'You can write in **markdown**'
    },
    methods: {
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
        notePreview () {
            return marked.parse(this.content)
        },
        addButtonTitle () {
            console.log('fire')
            return notes.length + 'note(s) already' 
        }
    },
})
console.log('restored note:', localStorage.getItem('content'))