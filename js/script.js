const { createApp } = Vue
let date = new Date();
let day = date.getDate();
let month = date.getMonth() + 1;
let year = date.getFullYear();
let hours = date.getHours();
let minutes = date.getMinutes();

if(minutes < 10){
    minutes = `0${minutes}`;
}

if(month < 10){
    month = `0${month}`;
} 

let hoursMinute = `${hours}:${minutes}`;

date = `${day}/${month}/${year} ${hoursMinute}`;


  createApp({
    data() {
      return {
        contacts: [
            {
                name: 'Michele',
                avatar: './img/avatar_1.jpg',
                visible: true,
                messages: [
                    {
                        date: '10/01/2020 15:30:55',
                        message: 'Hai portato a spasso il cane?',
                        status: 'sent'
                    },
                    {
                        date: '10/01/2020 15:50:00',
                        message: 'Ricordati di stendere i panni',
                        status: 'sent'
                    },
                    {
                        date: '10/01/2020 16:15:22',
                        message: 'Tutto fatto!',
                        status: 'received'
                    }
                ],
            },
            {
                name: 'Fabio',
                avatar: './img/avatar_2.jpg',
                visible: false,
                messages: [
                    {
                        date: '20/03/2020 16:30:00',
                        message: 'Ciao come stai?',
                        status: 'sent'
                    },
                    {
                        date: '20/03/2020 16:30:55',
                        message: 'Bene grazie! Stasera ci vediamo?',
                        status: 'received'
                    },
                    {
                        date: '20/03/2020 16:35:00',
                        message: 'Mi piacerebbe ma devo andare a fare la spesa.',
                        status: 'sent'
                    }
                ],
            },
            {
                name: 'Samuele',
                avatar: './img/avatar_3.jpg',
                visible: false,
                messages: [
                    {
                        date: '28/03/2020 10:10:40',
                        message: 'La Marianna va in campagna',
                        status: 'received'
                    },
                    {
                        date: '28/03/2020 10:20:10',
                        message: 'Sicuro di non aver sbagliato chat?',
                        status: 'sent'
                    },
                    {
                        date: '28/03/2020 16:15:22',
                        message: 'Ah scusa!',
                        status: 'received'
                    }
                ],
            },
            {
                name: 'Alessandro B.',
                avatar: './img/avatar_4.jpg',
                visible: false,
                messages: [
                    {
                        date: '10/01/2020 15:30:55',
                        message: 'Lo sai che ha aperto una nuova pizzeria?',
                        status: 'sent'
                    },
                    {
                        date: '10/01/2020 15:50:00',
                        message: 'Si, ma preferirei andare al cinema',
                        status: 'received'
                    }
                ],
            },
            {
                name: 'Alessandro L.',
                avatar: './img/avatar_5.jpg',
                visible: false,
                messages: [
                    {
                        date: '10/01/2020 15:30:55',
                        message: 'Ricordati di chiamare la nonna',
                        status: 'sent'
                    },
                    {
                        date: '10/01/2020 15:50:00',
                        message: 'Va bene, stasera la sento',
                        status: 'received'
                    }
                ],
            },
            {
                name: 'Claudia',
                avatar: './img/avatar_6.jpg',
                visible: false,
                messages: [
                    {
                        date: '10/01/2020 15:30:55',
                        message: 'Ciao Claudia, hai novità?',
                        status: 'sent'
                    },
                    {
                        date: '10/01/2020 15:50:00',
                        message: 'Non ancora',
                        status: 'received'
                    },
                    {
                        date: '10/01/2020 15:51:00',
                        message: 'Nessuna nuova, buona nuova',
                        status: 'sent'
                    }
                ],
            },
            {
                name: 'Federico',
                avatar: './img/avatar_7.jpg',
                visible: false,
                messages: [
                    {
                        date: '10/01/2020 15:30:55',
                        message: 'Fai gli auguri a Martina che è il suo compleanno!',
                        status: 'sent'
                    },
                    {
                        date: '10/01/2020 15:50:00',
                        message: 'Grazie per avermelo ricordato, le scrivo subito!',
                        status: 'received'
                    }
                ],
            },
            {
                name: 'Davide',
                avatar: './img/avatar_8.jpg',
                visible: false,
                messages: [
                    {
                        date: '10/01/2020 15:30:55',
                        message: 'Ciao, andiamo a mangiare la pizza stasera?',
                        status: 'received'
                    },
                    {
                        date: '10/01/2020 15:50:00',
                        message: 'No, l\'ho già mangiata ieri, ordiniamo sushi!',
                        status: 'sent'
                    },
                    {
                        date: '10/01/2020 15:51:00',
                        message: 'OK!!',
                        status: 'received'
                    }
                ],
            }
        ], 
        chatIndex: 0,
        newMessage : '',
        filteredContacts: [],
        searchContact: '',
        receivedMessages: [],
        lastDayOnline: '', 
        lastHourOnline: '',
        randomPhraseReceived: ['Ciao!', 'Grazie', 'Ok!', 'Non posso risponderti', 'Ti chiamo più tardi', 'Non so come risponderti..', 'Ci vediamo stasera?', 'Oggi non posso, mi spiace'],
      }
    }, 
    methods: {
        openChat(chatIndex){
            this.chatIndex = chatIndex;
            this.contacts.forEach((element)=>{
                element.visible = false;
            })
            this.contacts[chatIndex].visible = true;
        },

        sendMessage(){
            const newObject = {
                date: `${date}`,
                message: this.newMessage,
                status: 'sent'
            }

            if(this.newMessage==""){
                return false;
            } 

            this.contacts[this.chatIndex].messages.push(newObject);
            this.newMessage = '';

            setTimeout(this.receiveMessage, 1000);
        }, 

        receiveMessage(){
            const newObject = {
                date: `${date}`,
                // message: 'Ok!',
                message: this.randomPhrase(),
                status: 'received'
            }

            this.contacts[this.chatIndex].messages.push(newObject);
        },

        filterContact(){
            this.filteredContacts = this.contacts.filter((element) => {
                if(element.name.toLowerCase().includes(this.searchContact.toLowerCase())){
                    return true;
                }
            })
        },

        deleteMessage(messageIndex){
            this.contacts[this.chatIndex].messages.splice(messageIndex, 1);
        },

        filterMessages(){
            this.receivedMessages = this.contacts[this.chatIndex].messages.filter((element)=>{
                if(element.status=='received'){
                    return true;
                }
            });
        },

        getLastOnline(){
            this.lastDayOnline = this.receivedMessages[this.receivedMessages.length - 1].date.slice(0, 10);
            this.lastHourOnline = this.receivedMessages[this.receivedMessages.length - 1].date.slice(11, 16);
        }, 

        randomPhrase(){
            let randomNumber = Math.floor(Math.random() * this.randomPhraseReceived.length -1 ) + 1;
            return this.randomPhraseReceived[randomNumber];
        }, 

    },
    beforeMount(){
        this.filteredContacts = [...this.contacts];
    },

    mounted(){
        this.filterMessages();
        this.getLastOnline();
    },
  }).mount('#app')