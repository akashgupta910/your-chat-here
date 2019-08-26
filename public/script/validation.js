
class Validation {
    constructor (elem_id, alert_id, min_len, max_len, field) {
        this.elem_id = elem_id;
        this.alert_id = alert_id;
        this.min_len = min_len;
        this.max_len = max_len;
        this.field = field;
    }

    formValidate () {
        let elem = document.getElementById(this.elem_id);
        let alert = document.getElementById(this.alert_id);

        if (elem.value.length < this.min_len) {
            elem.style.borderBottom = '1.5px solid red';
            alert.innerText = `${this.field} must be at least ${this.min_len} characters`;
        } 
        else if (elem.value.length > this.max_len) {
            elem.style.borderBottom = '1.5px solid red';
            alert.innerText = `${this.field} must be between ${this.min_len} to ${this.max_len} characters`;
        }
        else {
            elem.style.borderBottom = '1.5px solid #1287A5';
            alert.innerText = '';
        }
    }
} // class

// Claim Form Validation

document.getElementById('claim-id').addEventListener('keyup', () => {
    let check = new Validation('claim-id', 'alert-claim-id', 1, 12, 'ID');
    check.formValidate();
});

document.getElementById('claim-pass').addEventListener('keyup', () => {
    let check = new Validation('claim-pass', 'alert-claim-pass', 1, 15, 'Password');
    check.formValidate();
});

// on submit Claim Form
document.getElementById('bth-claim').addEventListener('click', (event) => {
    let check_ = new Validation('claim-id', 'alert-claim-id', 1, 12, 'ID');
    check_.formValidate();
    let _check = new Validation('claim-pass', 'alert-claim-pass', 1, 15, 'Password');
    _check.formValidate();

    let x = document.getElementById('alert-claim-id').innerText.length;
    let y = document.getElementById('alert-claim-pass').innerText.length;

    if (x > 0 || y > 0) {
        event.preventDefault();
    } 
    
});

// Enter Room Form Validation

document.getElementById('room-id').addEventListener('keyup', () => {
    let check = new Validation('room-id', 'alert-room-id', 1, 15, 'ID');
    check.formValidate();
});

document.getElementById('room-pass').addEventListener('keyup', () => {
    let check = new Validation('room-pass', 'alert-room-pass', 1, 15, 'Password');
    check.formValidate();
});

// on submit Enter Room Form
document.getElementById('btn-room').addEventListener('click', (event) => {

    let check = new Validation('room-id', 'alert-room-id', 1, 12, 'ID');
    check.formValidate();
    let _check = new Validation('room-pass', 'alert-room-pass', 1, 15, 'Password');
    _check.formValidate();

    let x = document.getElementById('alert-room-id').innerText.length;
    let y = document.getElementById('alert-room-pass').innerText.length;

    if ( x > 0 || y > 0) {
        event.preventDefault();
    }  
});