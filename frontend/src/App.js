import React from 'react'
import Login from './authentication/Login'
import Signup from './authentication/Signup'
import Home from './Home/Home'
import { Routes, Route, BrowserRouter} from 'react-router-dom'
import ProtectedRoute from './authentication/ProtectedRoute'
import Attacks from './Attacks'
import Phishing from './labComponents/Attacks/PhishingLab'
import Learn from './learnComponents/Learn'
import Practice from './practiceComponents/Practice'
import ManInTheMiddelMCQ from './practiceComponents/MCQ/ManInTheMiddelMCQ'
import PhishingMCQ from './practiceComponents/MCQ/PhishingMCQ'
import SQLiMCQ from './practiceComponents/MCQ/SQLiMCQ'
import BruteForceMCQ from './practiceComponents/MCQ/BruteForceMCQ'
import ZeroDayExpoitMCQ from './practiceComponents/MCQ/ZeroDayExpoitMCQ'
import XSSMCQ from './practiceComponents/MCQ/XSSMCQ'
import DosMCQ from './practiceComponents/MCQ/DosMCQ'
import ReplayMCQ from './practiceComponents/MCQ/ReplayMCQ'
import FinalExam from './practiceComponents/MCQ/FinalExam'

import Lab from './labComponents/Lab'
import PhishingLab from './labComponents/Attacks/PhishingLab'
import BruteForceLab from './labComponents/Attacks/BruteForceLab'
import SQLiLab from './labComponents/Attacks/SQLiLab'
import MITMLab from './labComponents/Attacks/MITMLab'
import XSSLab from './labComponents/Attacks/XSSLab'
import ManintheMiddle from './attackExplanation/ManintheMiddle'
import PhishingAttack from './attackExplanation/PhishingAttack'
import SQLInjection from './attackExplanation/SQLInjection'
import BruteForceAttack from './attackExplanation/BruteForceAttack'
import ZeroDayExploit from './attackExplanation/ZeroDayExploit'
import CrossSiteScripting from './attackExplanation/CrossSiteScripting'
import DOSandDDOSAttack from './attackExplanation/DOSandDDOSAttack'
import ReplayAttack from './attackExplanation/ReplayAttack'
import Dashboard from './admin/Dashboard'
import Users from './admin/Users'
import AttacksDone from './admin/AttacksDone'
import UserProgress from './admin/UserProgress'
import EditProfile from './navbar components/EditProfile'
import HelpSupport from './navbar components/HelpSupport'

//Notes:  I added ProtectedRoute so that if an unauthenticated users goes to home page manually, It doesn't shows the screen for a split of a second

const App = () => {
  return(
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/signup' element={<Signup />}></Route>
      
        <Route path='/' element={<ProtectedRoute><Home /></ProtectedRoute>}> </Route>
        <Route path='/Dashboard' element={<ProtectedRoute><Dashboard /></ProtectedRoute>}> </Route>
        <Route path='/Users' element={<ProtectedRoute><Users /></ProtectedRoute>}> </Route>
        <Route path='/attacks-done' element={<ProtectedRoute><AttacksDone /></ProtectedRoute>}></Route>


        <Route path="/user-progress/:userId" element={<ProtectedRoute><UserProgress /></ProtectedRoute>}> </Route>


        <Route path='/learn' element={<ProtectedRoute><Learn /></ProtectedRoute>}></Route>
        <Route path='/practice' element={<ProtectedRoute><Practice /></ProtectedRoute>}></Route>
        <Route path='/lab' element={<ProtectedRoute><Lab /></ProtectedRoute>}></Route>
        <Route path='/attacks' element={<ProtectedRoute><Attacks /></ProtectedRoute>}></Route>



        <Route path='/attacks/phishing' element={ 
          <ProtectedRoute> 
            <Phishing />
          </ProtectedRoute>}>
        </Route>
        
        <Route path='practice/ManInTheMiddelMCQ' element={<ProtectedRoute><ManInTheMiddelMCQ /></ProtectedRoute>}></Route>
        <Route path='practice/PhishingMCQ' element={<ProtectedRoute><PhishingMCQ /></ProtectedRoute>}></Route>
        <Route path='practice/SQLiMCQ' element={<ProtectedRoute><SQLiMCQ /></ProtectedRoute>}></Route>
        <Route path='practice/BruteForceMCQ' element={<ProtectedRoute><BruteForceMCQ /></ProtectedRoute>}></Route>
        <Route path='practice/ZeroDayExpoitMCQ' element={<ProtectedRoute><ZeroDayExpoitMCQ /></ProtectedRoute>}></Route>
        <Route path='practice/XSSMCQ' element={<ProtectedRoute><XSSMCQ /></ProtectedRoute>}></Route>
        <Route path='practice/DosMCQ' element={<ProtectedRoute><DosMCQ /></ProtectedRoute>}></Route>
        <Route path='practice/ReplayMCQ' element={<ProtectedRoute><ReplayMCQ /></ProtectedRoute>}></Route>
        <Route path='/final-exam' element={<ProtectedRoute><FinalExam /></ProtectedRoute>}></Route>



        <Route path='/lab/phishingLab' element={<ProtectedRoute><PhishingLab showNav={true}/></ProtectedRoute>}></Route>
        <Route path='/lab/bruteForceLab' element={<ProtectedRoute><BruteForceLab showNav={true}/></ProtectedRoute>}></Route>
        <Route path='/lab/SQLiLab' element={<ProtectedRoute><SQLiLab showNav={true}/></ProtectedRoute>}></Route>
        <Route path='/lab/MITMLab' element={<ProtectedRoute><MITMLab showNav={true}/></ProtectedRoute>}></Route>
        <Route path='/lab/XSSLab' element={<ProtectedRoute><XSSLab showNav={true}/></ProtectedRoute>}></Route>

        <Route path='/learn/ManintheMiddle' element={<ProtectedRoute><ManintheMiddle /></ProtectedRoute>}></Route>
        <Route path='/learn/Phishing' element={<ProtectedRoute><PhishingAttack /></ProtectedRoute>}></Route>
        <Route path='/learn/SQLInjection' element={<ProtectedRoute><SQLInjection /></ProtectedRoute>}></Route>
        <Route path='/learn/BruteForceAttack' element={<ProtectedRoute><BruteForceAttack /></ProtectedRoute>}></Route>
        <Route path='/learn/ZeroDayExploit' element={<ProtectedRoute><ZeroDayExploit /></ProtectedRoute>}></Route>
        <Route path='/learn/CrossSiteScripting' element={<ProtectedRoute><CrossSiteScripting /></ProtectedRoute>}></Route>
        <Route path='/learn/DOSandDDOSAttack' element={<ProtectedRoute><DOSandDDOSAttack /></ProtectedRoute>}></Route>
        <Route path='/learn/ReplayAttack' element={<ProtectedRoute><ReplayAttack /></ProtectedRoute>}></Route>

        <Route path='/EditProfile' element={<ProtectedRoute><EditProfile /></ProtectedRoute>}></Route>
        <Route path='/HelpSupport' element={<ProtectedRoute><HelpSupport /></ProtectedRoute>}></Route>

      </Routes>
    </BrowserRouter>
  )
}
export default App