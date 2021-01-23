var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var yyyy = today.getFullYear();

const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

today = dd + ' ' + monthNames[today.getMonth()] + ' ' + yyyy;

module.exports =  today