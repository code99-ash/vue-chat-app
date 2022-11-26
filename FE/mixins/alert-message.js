export default {
    name: 'AlertMessage',
    data() {
        return {
            message: {severity: false, text: ''},
        }
    },
    methods: {
        resetMessage() {
            this.message.severity = false; 
        },
        setMessage(severity, text) {
            this.message = {severity, text}
        },
        toastMessage(severity, text, time) {
            const heading = severity=='error'? 'Error Norification' : 'Success Notification' 
            var sec = time? time : null
            this.openToast(severity, heading, text, sec)
        },
        handleError(err) {
            const resp = err.message
            var feedback;
            console.log(err.response)

            if(resp=='Network Error') {
                feedback = 'There is an internet connection problem'
            }else {
                feedback = !err.response? 'An error occured.' : err.response.data
            }
            return feedback;
        },
        openToast(severity='info', summary='Notification', detail, life=3000) {
            this.$toast.add({
                severity, 
                summary,
                detail, 
                life
            });
        }
    }
}