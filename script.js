new Vue({
    el: '#notebook',
    data () {
        return {
            content: 'This is a note.',
        }
    },
    computed: {
        notePreview () {
            return marked.parse(this.content)
        }
    },
    watch: {
        content: 'saveNote',
    },
    methods: {
        saveNote () {
            console.log('saving note:', this.content)
            localStorage.setItem('content', this.content)
            this.reportOperation('saving')
        },
        reportOperation (opName) {
            console.log('The', opName, 'operation was completed!')
        }
    }
})
console.log('restored note:', localStorage.getItem('content'))