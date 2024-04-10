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

AppRegistry.registerComponent(appName, () => MainApp);
