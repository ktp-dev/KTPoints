<template>
        <section id='admintools'>
            <div class="gradient pb4">

            <NavBar />

            <section id='addYear'>
                <div class="column is-one-third">
                    <div class="control">
                        <button class="button" v-on:click="toggle=!toggle"> Update Years </button>
                        <div class="modal" v-bind:class="{'is-active': toggle}">
                            <div class="modal-background"></div>
                            <div class="modal-card">
                                <header class="modal-card-head">
                                <p class="modal-card-title">Are you sure you want to update everyone's years?</p>
                                <button v-on:click="toggle=!toggle" class="delete" aria-label="close"></button>
                                </header>
                                <footer class="modal-card-foot" style="justify-content: flex-end;">
                                <button v-on:click="toggle=!toggle" class="button">Cancel</button>
                                <button v-on:click="updateYears()" class="button is-success">Update Years</button>
                                </footer>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            
            <section id='promotePledges'>
                <div class="column is-one-third">
                    <div class="control">
                        <button class="button" v-on:click="toggle=!toggle"> Promote Pledges </button>
                        <div class="modal" v-bind:class="{'is-active': toggle}">
                            <div class="modal-background"></div>
                            <div class="modal-card">
                                <header class="modal-card-head">
                                <p class="modal-card-title">Are you sure you want to promote pledges?</p>
                                <button v-on:click="toggle=!toggle" class="delete" aria-label="close"></button>
                                </header>
                                <footer class="modal-card-foot" style="justify-content: flex-end;">
                                <button v-on:click="toggle=!toggle" class="button">Cancel</button>
                                <button v-on:click="promotePledges()" class="button is-success">Promote Pledges</button>
                                </footer>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section id='addAnouncement'>
                <div class="column is-one-third ">
                    <form>
                    <div class="control mb1">
                        <textarea class="textarea" placeholder="Announcement" v-model="announcement"></textarea>
                    </div>
                    <div class="control mb1">
                        <input type="date" v-model="announcementDate">
                    </div>
                    <div class="control mb1">
                        <a v-on:click="addAnnouncement(announcement, announcementDate)" class="button">
                            Add Announcement
                        </a>
                    </div>
                    </form>
                </div>
            </section>

            <section id='addPoints'>
                <div class="column is-one-third">
                    <form>
                    <div class="field is-grouped">
                        <input class="input is-success mr1" type="text" placeholder="User" v-model="uniq">
                        <input class="input is-success mr1" type="number" placeholder="Points" v-model.number="points">
                        <div class="control">
                            <a v-on:click="addPoints(uniq, points)" class="button">
                                Add Points
                            </a>
                        </div>
                    </div>
                    </form>
                </div>
            </section>

            </div>
        </section>
</template>



<script>
import NavBar from '@/components/NavBar.vue';
import * as firebase from 'firebase/app';
import { db } from '@/main.js';

export default {
    name: 'admintools',
    data() {
        return {
            toggle: false, 
        }
    },
    methods: {
        updateYears() {
            db.collection('users').get().then(function(querySnapshot) {
                querySnapshot.forEach(function(doc) {
                    let ref = doc.data();
                    let data = {
                            attended: ref.attended,
                            career_interests: ref.career_interests,
                            imageURL: ref.imageURL,
                            major: ref.major,
                            meetings_left: ref.meetings_left,
                            name: ref.name,
                            pledge_class: ref.pledge_class,
                            points: ref.points,
                            standing: ref.standing,
                            uniqname: ref.uniqname,
                            year: ref.year
                        }
                    if(data.year === "Freshman") { data.year = "Sophomore"; }
                    else if(data.year === "Sophomore") { data.year = "Junior"; }
                    else if(data.year === "Junior") { data.year = "Senior"; }
                    else if(data.year === "Senior") { data.year = "Alumni"; }
                    else if(data.year === "Alumni") { data.year = "Junior"; }
                    let setDoc = db.collection('users').doc(doc.data().uniqname).set(data);
                });
            });
        },
        promotePledges() {
            db.collection('users').get().then(function(querySnapshot) {
                //bruh
                querySnapshot.forEach(function(doc) {
                    if(doc.data().standing === "Pledge") {
                        let ref = doc.data();
                        let data = {
                            attended: ref.attended,
                            career_interests: ref.career_interests,
                            imageURL: ref.imageURL,
                            major: ref.major,
                            meetings_left: ref.meetings_left,
                            name: ref.name,
                            pledge_class: "Active",
                            points: ref.points,
                            standing: ref.standing,
                            uniqname: ref.uniqname,
                            year: ref.year
                            }
                        let setDoc = db.collection('users').doc(doc.data().uniqname).set(data);
                    }
                });
            });
        },
        addAnnouncement(announcement, announcementDate) {
            let date = new Date(announcementDate);
            let data = {
                description: announcement,
                expires_at: date
            }
            let setDoc = db.collection('announcements').doc().set(data);
        },
        addPoints(uniq, points) {
            let userRef = db.collection('users').doc(uniq);
            let oldPoints;
            let getDoc = userRef.get().then(doc => {
                oldPoints = doc.data().points;
            }).then(()=>{
                let setWithPoints = userRef.update({
                    points: oldPoints + points
                });
            });
        },
    },
    components: {
        NavBar
    },
}

</script>