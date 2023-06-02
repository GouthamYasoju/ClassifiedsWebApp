class detailsobject {
    constructor(x) {
        this.name = x[0].value;
        this.email = x[1].value;
        this.phone = x[2].value;
        this.landline = x[3].value;
        this.website = x[4].value;
        this.address = x[5].value;
    }
}
class functions {
    constructor() {
        this.deny = 0;
        this.getindex = document.getElementById('id');
        this.right = document.getElementById('Right');
        this.nocontact = document.getElementById('nothing');
        this.new = document.getElementById("nav-add");
        this.form = document.getElementById("form-id");
        this.flag = 0;
        this.add = document.getElementById("add-button");
        this.formDetails = document.getElementsByClassName('details');
        this.detailsArray = [];
        this.contactsArray = [];
        this.detailcount = 0;
        this.Display = document.getElementById("table");
        this.contactTabs = document.getElementsByClassName('contact-info');
        this.contactInfo = document.getElementById("contact-info-block");
        this.infoblocks = document.getElementsByClassName('info-block');
        this.delete = document.getElementById('delete');
        this.edit = document.getElementById('edit');
        this.editflag = 0;
        this.cancel = document.getElementById('cancel-button');
        this.prevtab = -1;
        this.prev = -1;
        this.currtab = -1;
        this.curr = () => {
            if ((this.currtab >= 0) && (this.prevtab < 0)) {
                console.log('hi');
                var t = this.currtab;
                t++;
                (this.Display.children[t]).className = 'backg';
                this.prevtab = this.currtab;
            }
            else if ((this.prevtab >= 0) && (this.currtab >= 0)) {
                var t = this.currtab;
                var q = this.prevtab;
                q++;
                t++;
                (this.Display.children[q]).classList.remove('backg');
                (this.Display.children[q]).className = 'contact-info';
                (this.Display.children[t]).className = 'backg';
                this.prevtab = this.currtab;
            }
        };
        this.cancelform = () => {
            this.add.value = 'Add';
            this.form.reset();
            this.form.style.display = 'none';
            if (this.detailcount > 0) {
                this.showdetails();
                this.infoblocks[0].innerHTML = this.detailsArray[this.currtab].name;
                this.infoblocks[1].innerHTML = this.detailsArray[this.currtab].email;
                this.infoblocks[2].innerHTML = this.detailsArray[this.currtab].phone;
                this.infoblocks[3].innerHTML = this.detailsArray[this.currtab].landline;
                this.infoblocks[4].innerHTML = this.detailsArray[this.currtab].website;
                this.infoblocks[5].innerHTML = this.detailsArray[this.currtab].address;
            }
        };
        this.editcontact = () => {
            this.editflag = 1;
            this.showform();
            this.add.value = 'Update';
            this.editindex = +this.getindex.innerHTML;
            var editing = this.detailsArray[this.editindex];
            console.log(this.detailsArray[this.editindex]);
            console.log(this.formDetails[0]);
            this.formDetails[0].value = editing.name;
            this.formDetails[1].value = editing.email;
            this.formDetails[2].value = editing.phone;
            this.formDetails[3].value = editing.landline;
            this.formDetails[4].value = editing.website;
            this.formDetails[5].value = editing.address;
        };
        this.nothing = () => {
            if (this.detailcount > 0) {
                this.nocontact.style.display = 'none';
            }
            else {
                this.nocontact.style.display = 'block';
            }
        };
        this.deletecontact = () => {
            this.prevtab = -1;
            this.detailcount -= 1;
            this.nothing();
            console.log(this.Display.children);
            var delindex;
            delindex = +this.currtab;
            var x = delindex + 1;
            console.log(delindex);
            console.log(x);
            this.Display.removeChild(this.Display.children[x]);
            this.detailsArray.splice(delindex, 1);
            for (let i = delindex; i < this.contactsArray.length; ++i) {
                var f = this.contactsArray[i].firstChild;
                var g;
                g = +f.innerHTML;
                g -= 1;
                f.innerHTML = g.toString();
            }
            this.contactInfo.style.display = 'none';
            this.showlast();
            this.curr();
        };
        this.showlast = () => {
            this.currtab = this.detailcount - 1;
            console.log(this.currtab);
            if (this.detailcount > 0) {
                this.showdetails();
                this.infoblocks[0].innerHTML = this.detailsArray[this.detailcount - 1].name;
                this.infoblocks[1].innerHTML = this.detailsArray[this.detailcount - 1].email;
                this.infoblocks[2].innerHTML = this.detailsArray[this.detailcount - 1].phone;
                this.infoblocks[3].innerHTML = this.detailsArray[this.detailcount - 1].landline;
                this.infoblocks[4].innerHTML = this.detailsArray[this.detailcount - 1].website;
                this.infoblocks[5].innerHTML = this.detailsArray[this.detailcount - 1].address;
            }
        };
        this.storecontact = () => {
            if (this.editflag == 0) {
                var persondetails = new detailsobject(this.formDetails);
                this.detailsArray.push(persondetails);
                this.deny = 0;
                for (let i = 0; i < this.detailsArray.length - 1; ++i) {
                    if (this.detailsArray[i].phone == this.detailsArray[this.detailsArray.length - 1].phone) {
                        this.deny = 1;
                    }
                }
                if ((this.detailsArray[this.detailsArray.length - 1].name.length <= 0) || (this.detailsArray[this.detailsArray.length - 1].email.length <= 0) || (this.detailsArray[this.detailsArray.length - 1].phone.length <= 0)) {
                    alert('Please Enter all the mandatory fields');
                    this.detailsArray.pop();
                }
                else if (this.deny == 1) {
                    alert('Oops...Contact Already Exists!...Try Changing the Number');
                    this.detailsArray.pop();
                }
                else {
                    var row = document.createElement('tr');
                    row.className = 'contact-info';
                    var id = document.createElement('span');
                    id.className = 'curr-index';
                    id.innerHTML = this.detailcount.toString();
                    this.detailcount += 1;
                    this.nothing();
                    var contactname = document.createElement('td');
                    contactname.className = 'names';
                    contactname.innerHTML = persondetails.name;
                    var contactmail = document.createElement('td');
                    contactmail.innerHTML = persondetails.email;
                    var contactphone = document.createElement('td');
                    contactphone.innerHTML = persondetails.phone.toString();
                    row.appendChild(id);
                    row.appendChild(contactname);
                    row.appendChild(contactmail);
                    row.appendChild(contactphone);
                    row.addEventListener('click', () => {
                        var x = id.innerHTML;
                        this.currtab = x;
                        this.showdetails();
                        this.getindex.innerHTML = id.innerHTML;
                        this.infoblocks[0].innerHTML = this.detailsArray[x].name;
                        this.infoblocks[1].innerHTML = this.detailsArray[x].email;
                        this.infoblocks[2].innerHTML = this.detailsArray[x].phone;
                        this.infoblocks[3].innerHTML = this.detailsArray[x].landline;
                        this.infoblocks[4].innerHTML = this.detailsArray[x].website;
                        this.infoblocks[5].innerHTML = this.detailsArray[x].address;
                    });
                    this.contactsArray.push(row);
                    this.Display.appendChild(row);
                    row.addEventListener('click', this.curr);
                    this.currtab = this.detailcount - 1;
                    console.log(this.currtab);
                    this.curr();
                    this.showlast();
                    this.form.reset();
                }
            }
            else {
                this.add.value = 'Add';
                this.deny = 0;
                for (let i = 0; i < this.detailsArray.length; ++i) {
                    if ((i != this.editindex) && (this.detailsArray[i].phone == this.formDetails[2].value)) {
                        this.deny = 1;
                    }
                }
                if (this.formDetails[0].value.length <= 0) {
                    alert('enter all details');
                }
                else if (this.deny == 1) {
                    alert('Contact Already Exists!');
                }
                else {
                    this.editflag = 0;
                    this.detailsArray[this.editindex].name = this.formDetails[0].value;
                    this.detailsArray[this.editindex].email = this.formDetails[1].value;
                    this.detailsArray[this.editindex].phone = this.formDetails[2].value;
                    this.detailsArray[this.editindex].landline = this.formDetails[3].value;
                    this.detailsArray[this.editindex].website = this.formDetails[4].value;
                    this.detailsArray[this.editindex].address = this.formDetails[5].value;
                    this.contactsArray[this.editindex].children[1].innerHTML = this.formDetails[0].value;
                    this.contactsArray[this.editindex].children[2].innerHTML = this.formDetails[1].value;
                    this.contactsArray[this.editindex].children[3].innerHTML = this.formDetails[2].value;
                    this.cancelform();
                    if (this.prev < 0) {
                        var t = this.editindex;
                        t++;
                        (this.Display.children[t]).className = 'backg';
                        this.prev = this.detailcount;
                    }
                    else if (this.prev >= 0) {
                        var q = this.prev;
                        (this.Display.children[q]).classList.remove('backg');
                        (this.Display.children[q]).className = 'contact-info';
                        (this.Display.children[this.editindex + 1]).className = 'backg';
                        this.prev = this.editindex;
                    }
                    this.showdetails();
                    this.infoblocks[0].innerHTML = this.detailsArray[this.editindex].name;
                    this.infoblocks[1].innerHTML = this.detailsArray[this.editindex].email;
                    this.infoblocks[2].innerHTML = this.detailsArray[this.editindex].phone;
                    this.infoblocks[3].innerHTML = this.detailsArray[this.editindex].landline;
                    this.infoblocks[4].innerHTML = this.detailsArray[this.editindex].website;
                    this.infoblocks[5].innerHTML = this.detailsArray[this.editindex].address;
                    this.form.reset();
                    this.form.reset();
                }
            }
        };
        this.showdetails = () => {
            this.contactInfo.style.display = 'block';
            this.form.style.display = 'none';
            this.flag = 0;
        };
        this.showform = () => {
            this.form.style.display = 'block';
            this.contactInfo.style.display = 'none';
        };
        this.Show = () => {
            this.editflag = 0;
            this.contactInfo.style.display = 'none';
            this.form.style.display = "block";
            this.form.reset();
        };
        this.new.addEventListener('click', this.Show);
        this.add.addEventListener('click', this.storecontact);
        this.delete.addEventListener('click', this.deletecontact);
        this.edit.addEventListener('click', this.editcontact);
        this.cancel.addEventListener('click', this.cancelform);
    }
}
var start =new functions(); 
// var x=0;
//fetch('https://localhost:7208/api/Contact/GetContacts').then((msg) => msg.json).then((data) => console.log(data));
