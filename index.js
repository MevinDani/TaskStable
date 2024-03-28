/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import Form from './Form'
import { name as appName } from './app.json';
import TaskManagerHome from './components/TaskManagerHome';
import TaskDetails from './components/TaskDetails';
import Login from './components/Login';
import EmployeeTaskHome from './components/EmployeeTaskHome';
import MainApp from './MainApp';

AppRegistry.registerComponent(appName, () => MainApp);
