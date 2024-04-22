/**
 * @format
 */
// import 'react-native-gesture-handler';
import { AppRegistry } from 'react-native';
import App from './App';
import Form from './Form'
import { name as appName } from './app.json';
import TaskManagerHome from './components/TaskManagerHome';
import TaskDetails from './components/TaskDetails';
import Login from './components/Login';
import EmployeeTaskHome from './components/EmployeeTaskHome';
import MainApp from './MainApp';
import LocationModal from './components/LocationModal';
import Test from './components/Test';
import Test2 from './components/Test2';
import Doughnut from './components/Doughnut';
import StackedChart from './components/StackedChart';


// import firebase from 'firebase/app'; // Import Firebase
// import 'firebase/database'; // Import Firebase Database module
// import config from './fireBaseConfig' // Import Firebase configuration

import database from '@react-native-firebase/database';
import { Alert } from 'react-native';

// console.log(config)

// const databadeRef = database().ref('/')

// console.log('databadeRef', databadeRef)


database()
    .ref('/')
    .on('value', snapshot => {
        const data = snapshot.val();
        // Alert.alert('Updated Data', JSON.stringify(data));
        console.log('databaseData', data)
    }, error => {
        console.error('Error fetching data:', error);
        Alert.alert('Error', 'Failed to fetch data. Please try again later.');
    });




// Initialize Firebase
// if (!firebase.apps.length) {
//     firebase.initializeApp(config);
// }

AppRegistry.registerComponent(appName, () => MainApp);
