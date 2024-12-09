import { Analytics, getAnalytics } from 'firebase/analytics'; // Add this import statement for getAnalytics
import { FirebaseApp, initializeApp } from 'firebase/app';
import { Auth, getAuth } from 'firebase/auth';

const firebaseConfig = {
	apiKey: 'AIzaSyCeKaAgaJTGg05ingijSMGDuRSF0Z62mnc',
	authDomain: 'e-commerce-492d7.firebaseapp.com',
	projectId: 'e-commerce-492d7',
	storageBucket: 'e-commerce-492d7.appspot.com',
	messagingSenderId: '83304396038',
	appId: '1:83304396038:web:a48d653fd1054ea643da87',
	measurementId: 'G-G8VB7NWG92',
};

// Initialize Firebase
const app: FirebaseApp = initializeApp(firebaseConfig);
let analytics: Analytics | null = null;

// Check if we are on the client side before initializing analytics
if (typeof window !== 'undefined') {
	try {
		analytics = getAnalytics(app);
	} catch (error) {
		// Handle the error (analytics may not be supported in certain environments)
		console.error('Error initializing Firebase Analytics:', error);
	}
}

// Initialize Firebase Authentication and get a reference to the service
const auth: Auth = getAuth(app);

export { analytics, app, auth };
