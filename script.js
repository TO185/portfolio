document.getElementById('copyEmail').addEventListener('click', function(){

const email = document.getElementById('email').textContent;

navigator.clipboard.writeText(email)
.then(() => {
alert('Email copied to clipboard');
})
.catch(() => {
alert('Copy failed — select manually');
});

});