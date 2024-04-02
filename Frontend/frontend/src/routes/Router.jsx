
import { BrowserRouter , Routes , Route} from 'react-router-dom'
import DashBoard from '../component/dashBoard/DashBoard.jsx'
import NewUser from '../component/createUser/NewUser.jsx'
import Edit from '../component/updateUser/Edit.jsx'
const Router = () => {
  return (
    <BrowserRouter>
    <Routes>
        <Route path='/' element={<DashBoard/>}></Route>
        <Route path='/dashBoard' element={<DashBoard/>}></Route>
        <Route path='/dashBoard/addNewUser' element={<NewUser/>}></Route>
        <Route path='/dashBoard/updateUser/:id' element={<Edit/>}></Route>

    </Routes>
    </BrowserRouter>
  )
}

export default Router
