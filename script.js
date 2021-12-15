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
        content: {
            handler (val, oldVal) {
                console.log(
                    'new note:', val, 
                    'old note:', oldVal
                    )
                    localStorage.setItem('content',val)
            }
        }
    }
})