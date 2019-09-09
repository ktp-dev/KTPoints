<template>
	<section id='authenticate' class="outer">
	<div class="modal" v-bind:class="{ 'is-active': signup_error }">
		<div class="modal-background"></div>
		<div class="modal-card">
		<modalHeader title="Oops!" />
		<section class="modal-card-body">
			<p>It appears we recieved the error <span class="has-text-danger">"{{this.error_message}}"</span> while trying to sign you up, please try again!</p>
		</section>
		<footer class="modal-card-foot">
			<button class="button" v-on:click="disableGeneralError()">Close</button>
		</footer>
		</div>
		<button class="modal-close is-large" v-on:click="disableGeneralError()" aria-label="close"></button>
	</div>
	<div class="modal" v-bind:class="{ 'is-active': !passwordsMatch }">
		<div class="modal-background"></div>
		<div class="modal-card">
		<modalHeader title="Passwords do not match" />
		<section class="modal-card-body">
			<p>It appears we recieved the error <span class="has-text-danger">Your passwords did not match! Please try again!</span> while trying to sign you up, please try again!</p>
		</section>
		<footer class="modal-card-foot">
			<button class="button" v-on:click="togglePasswordError()">Close</button>
		</footer>
		</div>
		<button class="modal-close is-large" v-on:click="togglePasswordError()" aria-label="close"></button>
	</div>
	<div class="modal" v-bind:class="{ 'is-active': !userVerifiedError }">
		<div class="modal-background"></div>
		<div class="modal-card">
		<modalHeader title="Verification Issue" />
		<section class="modal-card-body">
			<p>Your email is not verified. Contact an adminstrator to make sure your email is correct.</p>
			<p>Click here to <span class="sky-blue-text" @click="resendEmail()">resend</span> the email</p>
		</section>
		<footer class="modal-card-foot">
			<button class="button" v-on:click="toggleLackingVerification()">Close</button>
		</footer>
		</div>
		<button class="modal-close is-large" v-on:click="toggleLackingVerification()" aria-label="close"></button>
	</div>
	<div class="modal" v-bind:class="{ 'is-active': resetPasswordScreen }">
		<div class="modal-background"></div>
		<div class="modal-card">
		<modalHeader title="Let's Reset your Password!" />
		<section class="modal-card-body">
			Enter your email, click the <span class="has-text-success">Reset Password</span> Button, and follow the directions listed in the email you recieve.
		<br><br>
		<InputString label="Uniqname" t="string" :dataLabel="uniqname" @newLabel="uniqname = $event"/>
		</section>
		<footer class="modal-card-foot">
			<button class="button is-success" v-on:click="resetPassword()">Reset Password</button>
			<button class="button" v-on:click="toggleResetPassword()">Close</button>
		</footer>
		</div>
		<button class="modal-close is-large" v-on:click="toggleResetPassword()" aria-label="close"></button>
	</div>
	<div class="modal" v-bind:class="{ 'is-active': sent_email_verification }">
		<div class="modal-background"></div>
		<div class="modal-card">
		<modalHeader title="Email was Sent!" />
		<section class="modal-card-body">
			<p>A verification email was sent to <span class="light-green">"{{this.email}}"</span> please check your email
				and verify your email. Click <span class="has-text-info" @click="refreshPage()">here</span> to refresh the page and login!
			</p>
		</section>
		</div>
	</div>
	<div class="container middle">
		<div class="columns is-centered inner">
		<div class="column is-narrow max-width-login">
			<!-- Level setup to center KTP Logo -->
			<div class="mb4">
			<div class="mt4">
				<img class="" src="@/assets/ktp_logo.png" alt="KTP Logo">
			</div>
			</div>
			<transition name="slide-left" mode="out-in">
			<div v-if="current_screen == 'landing'" key="landing" class="mt4 pt4">
			<!-- Button for Logging in -->
			<div class="control">
			<button v-on:click="goToLogin()" class="button is-medium is-rounded button-background is-fullwidth fs-s3 fira-mono fw-bold pointer">
				Log In
			</button>
			</div>
			<!-- Button for Signing up -->
			<div class="control mt2">
			<button v-on:click="goToSignup()" class="button is-medium is-rounded button-background is-fullwidth fs-s3 fira-mono fw-bold pointer">
				Sign up
			</button>
			</div>
			<!-- Continue as Guest -->
			<router-link to="/landing">
			<div class="align-center fira-sans-light-italic mt2 dark-blue">
				or continue <a class="sky-blue-text fw-lb">  Without an Account</a>
			</div>
			</router-link>
			<ResetPassword :RPWScreen="resetPasswordScreen" @toggledVal="resetPasswordScreen = $event" />
		</div>
			<div v-if="current_screen == 'login'" key="login" >
				<!-- uniqname and @umich.edu box -->
				<div class="field has-addons">
				<div class="control is-expanded">
					<div class="fira-sans-light-italic slate">
					Uniqname
					</div>
					<input v-model='uniqname' class="input is-primary" type="text">
					<div class="divider slate"></div>
				</div>
				</div>
				<!-- Password -->
				<div class="field">
				<div class="control">
					<div class="fira-sans-light-italic slate">
						Password
					</div>
						<input v-on:keyup.enter="login()" v-model='password' class="input is-primary" type="password">
						<div class="divider slate"></div>
					</div>
				</div>
				<div class="control">
					<button v-on:click="login()" class="button is-medium is-rounded button-background is-fullwidth fs-s3 fira-mono fw-bold pointer" v-bind:class="{'is-loading' : firebaseRunning }">
						Log In
					</button>
				</div>
				<div class="align-center fira-sans-light-italic mt3">
					Don't have an Account?
					<a class="sky-blue-text fw-lb" v-on:click='goToSignup()'>Sign Up Here</a>
				</div>
				<ResetPassword />
			</div>
			<div v-if="current_screen == 'signup'" key="signup">
				<div v-if="!isSignup4" class="fs-s2 fira-mono fw-bold pb3 has-text-centered">
					Sign up
				</div>
				<!-- First Name, Last Name, KTP Standing -->
				<div v-if="isSignup1" key="signup-1">
					<div class='field' >
						<InputString label="First Name" t="string" :dataLabel="payload.firstname" @newLabel="payload.firstname = $event"/>
						<InputString label="Last Name" t="string" :dataLabel="payload.lastname" @newLabel="payload.lastname = $event"/>
						<div class="control is-expanded pb3">
							<div class="fira-sans-light-italic slate">
								KTP Standing
							</div>
							<div class="select is-fullwidth no-border">
								<select class="no-border" v-model='payload.standing'>
									<option value=""></option>
									<option value="Guest">Rushee</option>
									<option value="Pledge">Pledge</option>
									<option>Active</option>
								</select>
							</div>
							<div class="divider slate"></div>
						</div>
						<div class="columns is-centered is-vcentered is-mobile">
							<div class="column is-quarter"></div>
							<Dots :S1="isSignup1" :S2="isSignup2" :S3="isSignup3" :S4="isSignup4" />
							<RightArrow nextSignup="S2" @S1="isSignup1 = $event" @S2="isSignup2 = $event" @S3="isSignup3 = $event" @S4="isSignup4 = $event"/>
						</div>
						<AlreadyHaveAccount :chooseScreen="current_screen" @screenChanged="current_screen = $event"/>
					</div>
				</div>
				<!-- Major, Year, Pledge Class -->
				<div v-if="isSignup2" key="signup-2">
					<div class='field' >
            <div class="control is-expanded pb3">
              <div class="fira-sans-light-italic slate">
                Major
              </div>
              <div class="select is-fullwidth no-border">
                <select class="no-border" v-model='tempMajor'>
                  <option value=""></option>
                  <option>Computer Science</option>
                  <option>SI - UX</option>
                  <option>SI - IA</option>
                  <option>Data Science</option>
                  <option>Prospective SI</option>
                  <option>Computer Engineering</option>
                  <option>BBA</option>
                  <option>Undeclared</option>
                  <option>Other</option>
                </select>
              </div>
              <div v-if="tempMajor === 'Other'" class="mt1">
                <input v-model='payload.major' class="input is-primary" type="text" placeholder="Enter other major here">
              </div>
              <div class="divider slate"></div>
            </div>
						<div class="control is-expanded pb3">
							<div class="fira-sans-light-italic slate">
								Year
							</div>
							<div class="select is-fullwidth no-border">
								<select class="no-border" v-model='payload.year'>
									<option value=""></option>
									<option>Freshman</option>
									<option>Sophomore</option>
									<option>Junior</option>
									<option>Senior</option>
									<option>Alumni</option>
								</select>
							</div>
							<div class="divider slate"></div>
						</div>
						<div class="control is-expanded pb3">
							<div class="fira-sans-light-italic slate">
								Pledge Class
							</div>
							<div class="select is-fullwidth no-border">
								<select class="no-border" v-model='payload.pledge_class' :disabled='disablePledgeClass'>
									<option value="">Pledge Class</option>
									<option>Alpha</option>
									<option>Beta</option>
									<option>Gamma</option>
									<option>Delta</option>
									<option>Epsilon</option>
									<option>Zeta</option>
									<option>Eta</option>
									<option>Theta</option>
									<option>Iota</option>
									<option>Kappa</option>
									<option>Lambda</option>
									<option>Mu</option>
									<option>Nu</option>
									<option>Xi</option>
									<option>Omicron</option>
									<option>Pi</option>
								</select>
							</div>
							<div class="divider slate"></div>
						</div>
						<div class="columns is-centered is-vcentered is-mobile">
							<LeftArrow nextSignup="S1" @S1="isSignup1 = $event" @S2="isSignup2 = $event" @S3="isSignup3 = $event" @S4="isSignup4 = $event"/>
							<Dots :S1="isSignup1" :S2="isSignup2" :S3="isSignup3" :S4="isSignup4" />
							<RightArrow nextSignup="S3" @S1="isSignup1 = $event" @S2="isSignup2 = $event" @S3="isSignup3 = $event" @S4="isSignup4 = $event"/>
						</div>
						<AlreadyHaveAccount :chooseScreen="current_screen" @screenChanged="current_screen = $event"/>
					</div>
				</div>
				<!-- Uniqname, Password, Confirm Password -->
				<div v-if="isSignup3" key="signup-3">
					<div class='field' >

						<InputString label="Uniqname" t="string" :dataLabel="uniqname" @newLabel="uniqname = $event"/>
						<InputString label="Password" t="password" :dataLabel="password" @newLabel="password = $event"/>
						<InputString label="Confirm Password" t="password" :dataLabel="confirmPassword" @newLabel="confirmPassword = $event"/>
						<div class="columns is-centered is-vcentered is-mobile">
							<LeftArrow nextSignup="S2" @S1="isSignup1 = $event" @S2="isSignup2 = $event" @S3="isSignup3 = $event" @S4="isSignup4 = $event"/>
							<Dots :S1="isSignup1" :S2="isSignup2" :S3="isSignup3" :S4="isSignup4" />
							<RightArrow nextSignup="S4" @S1="isSignup1 = $event" @S2="isSignup2 = $event" @S3="isSignup3 = $event" @S4="isSignup4 = $event"/>
						</div>
						<AlreadyHaveAccount :chooseScreen="current_screen" @screenChanged="current_screen = $event"/>
					</div>
				</div>
				<!-- Notice -->
				<div v-if="isSignup4" key="signup-4">
					<div class='field' >
						<div class="fs-s2 fira-mono fw-bold pb2 has-text-centered">
							One Last Thing
						</div>
						<div class="control fira-sans fs-s4 is-expanded pb2 signup-button-mobile">
							If you are an Active or an Alumni, there will be a pending 
							process while we approve your identity.
							<br><br>
							If you are a Pledge or Rushee, welcome! You are able to 
							explore immediately, although you don't have access to 
							full functionality of the app.
						</div>
						<div class="columns is-centered is-vcentered is-mobile pb4">
							<LeftArrow nextSignup="S3" @S1="isSignup1 = $event" @S2="isSignup2 = $event" @S3="isSignup3 = $event" @S4="isSignup4 = $event"/>
							<Dots :S1="isSignup1" :S2="isSignup2" :S3="isSignup3" :S4="isSignup4" />
							<div class="column has-text-centered pointer fira-sans sky-blue-text fw-lb fs-s4" >
								<div class="control has-text-centered">
									<button v-on:click="signup()"
										class="button is-small is-rounded fs-s4 fira-sans-light-italic fw-lb sky-blue-button pointer signup-button-mobile"
										v-bind:class="{'is-loading' : firebaseRunning }"
									>
										Sign up
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			</transition>
		</div>
		</div>
	</div>
  </section>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import router from '@/router.js'
import store from '@/store.js'
import { auth, db } from '@/main.js'

import * as firebase from 'firebase/app';
import Dots from '@/components/login/dots.vue';
import AlreadyHaveAccount from '@/components/login/alreadyHaveAccount.vue';
import RightArrow from '@/components/login/rightArrow.vue';
import LeftArrow from '@/components/login/leftArrow.vue';
import InputString from '@/components/login/inputString.vue';
import ResetPassword from '@/components/login/resetPassword.vue';

import modalHeader from '@/components/login/modals/modal-error-title.vue';


export default {
  store,
  data: function() {
	return {
		uniqname: '',
		password: '',
		confirmPassword: '',
		tempMajor: '',
		loggedin: false,
		current_screen: 'landing',
		resetPasswordScreen: false,
		isSignup1: true,
		isSignup2: false,
		isSignup3: false,
		isSignup4: false,
		passwordsMatch: true,
		userVerifiedError: true,
		error_message: '',
		sent_email_verification: false,
		signup_error: false,
		firebaseRunning: false,
		timeToReload: 3,
		payload: {
			major: "",
			meetings_left: 0,
			firstname: "",
			lastname: "",
			points: 0,
			standing: '',
			year: '',
		},
	disablePledgeClass: false
	}
  },
  components: {
		Dots,
		AlreadyHaveAccount,
		RightArrow,
		LeftArrow,
		InputString,
		ResetPassword,
		modalHeader,
  },
  computed: {
	email: function(){
		return this.uniqname.toLowerCase() + "@umich.edu"
	}
  },
  methods: {
	login: function(){
		this.firebaseRunning = true;
		firebase.auth().signInWithEmailAndPassword(this.email, this.password)
		.then((credential) => {
			if (credential.user.emailVerified) {
				console.log("You're Verified!");
				console.log('Logged in');
				this.loggedin = true;
				this.firebaseRunning = false;
				router.push({ name: 'landing', params: { username: this.uniqname } })
			} else {
				this.firebaseRunning = false;
				console.log("You're not verified");
				this.toggleLackingVerification();
			}
		})
		.catch((error) => {
			this.firebaseRunning = false;
			console.log(error);
			this.displayGeneralError(error.code, error.message)
		});
	},

	signup: function(){
		console.log("Signup Initiated");
		this.firebaseRunning = true;
		if (this.checkPasswords()) {
			console.log("Passwords Match");
			auth.createUserWithEmailAndPassword(this.email, this.password)
			.then((credential) => {
				let user = credential.user;
				if (!user.emailVerified && user) {
					user.sendEmailVerification()
					.then(() => {
						this.displayVerficationEmail();
						console.log("Email verification Sent");
					})
					.catch((error) => {
						this.firebaseRunning = false;
						console.log("Email verification could not be sent");
						console.log(error);
					})
				}
			})
			.then(() => {
				console.log("New user: " + this.email + " created")
				this.addInfo();
			})
			.catch((error) => {
				this.firebaseRunning = false;
				console.log('Bad signup');
				console.log(this.signup_error);
				this.displayGeneralError(error.code, error.message);
			});
		} else {
			console.log("Passwords do not match");
			this.firebaseRunning = false;
		}
	},

	addInfo: function(){
		if (this.tempMajor !== 'Other') {
			this.payload.major = this.tempMajor
		}
		db.collection("users").doc(this.uniqname.toLowerCase()).set({
		name: this.payload.firstname + " " + this.payload.lastname,
		pledge_class: this.payload.pledge_class,
		standing: this.payload.standing,
		uniqname: this.uniqname.toLowerCase(),
		year: this.payload.year,
		major: this.payload.major,
		points: 0,
    meetings_left: 0,
    about: 'Lorem ipsum dolor amet vice truffaut street art, chillwave hot chicken plaid pabst jianbing salvia keytar. Keffiyeh irony kombucha four dollar toast 90s keytar, I am a lumbersexual flexitarian with a tousled hoodie. Vegan microdosing forage meggings. Succulents photo booth air plant forage leggings. Hoodie aesthetic squid, microdosing tumblr VHS food truck occupy cray try-hard af prism farm-to-table fashion axe shabby chic.',
    interests: 'Lorem ipsum dolor amet hoodie williamsburg brunch tilde roof party. Poutine vape chillwave butcher twee kitsch. Church-key keytar kickstarter franzen unicorn slow-carb. Knausgaard blog kinfolk migas heirloom enamel pin. Taiyaki brunch poutine selfies, single-origin coffee tofu pour-over iPhone sartorial schlitz authentic.',
    attended: [],
    imageURL: 'https://firebasestorage.googleapis.com/v0/b/ktpoints-68071.appspot.com/o/profile_pictures%2Fanon.jpg?alt=media&token=d247e41a-a235-4750-9e08-b78348e54e90'
		})
		.then(() => {
			console.log("New user registered!");
			this.firebaseRunning = false;
			router.push('/')
			// router.push({ name: 'landing', params: { username: this.uniqname } });
		})
		.catch(function(error) {
			console.error("Error writing document: ", error);
			this.firebaseRunning = false;
		});
	},
    resetPassword(){
			auth.sendPasswordResetEmail(this.email)
			.then(() => {
				window.alert("An email was sent");
				this.toggleResetPassword();
			}).catch((error) => {
				this.toggleResetPassword();
				this.displayGeneralError(error.code, error.message);
			});
		},
	resendEmail(){
			auth.currentUser.sendEmailVerification().then(function() {
			alert("We sent the email to: " + this.email + ". Pls check it out")
		}).catch(function(error) {
			console.log(error);
			alert("There was some trouble sending your email. Please talk to an admin")
		});
	},
	checkPasswords: function(){
		return this.passwordsMatch = (this.password === this.confirmPassword ? true : false);
	},
	displayGeneralError: function(code, message){
		this.error_message = message;
		this.signup_error = true;
	},
	displayVerficationEmail: function(){
		this.sent_email_verification = true;
	},
	togglePasswordError: function(){
		this.passwordsMatch = !this.passwordsMatch;
	},
	toggleLackingVerification: function(){
		this.userVerifiedError = !this.userVerifiedError;
	},
	toggleResetPassword(){
		this.resetPasswordScreen = !this.resetPasswordScreen;
	},
	disableGeneralError: function(){
		this.signup_error = !this.signup_error;
	},
	goToLogin: function(){
		if (this.$store.state.userAuth !== null){
			router.push('/landing');
		}
		this.current_screen = "login";
	},
	goToSignup: function(){
		this.current_screen = "signup";
	},
	refreshPage() {
		location.reload(true);
	}
  },

	watch: {
	'payload.standing': function(){
		if (this.payload.standing == 'Guest'){
			this.disablePledgeClass = true;
			this.payload.pledge_class = '';
		}
		else{
			this.disablePledgeClass = false;
    }
	},
  },

};
</script>

<style scoped>
  /* Add some padding on this component for mobile */
  #authenticate{
	padding-left: 10px;
	padding-right: 10px;
  }

  .slide-left-enter-active {
	transition: all .2s cubic-bezier(0.165, 0.84, 0.44, 1);
  }
  .slide-left-leave-active {
	transition: all .2s cubic-bezier(0.165, 0.84, 0.44, 1);
  }
  .slide-left-enter {
	transform: translateX(100%);
	opacity: 0;
  }
  .slide-left-leave-to {
	transform: translateX(-100%);
	opacity: 0;
  }
  .slide-right-enter-active {
	transition: all .2s cubic-bezier(0.165, 0.84, 0.44, 1);
  }
  .slide-right-leave-active {
	transition: all .2s cubic-bezier(0.165, 0.84, 0.44, 1);
  }
  .slide-right-enter {
	transform: translateX(-100%);
	opacity: 0;
  }
  .slide-right-leave-to {
	transform: translateX(100%);
	opacity: 0;
  }
</style>
