import { useState } from 'react'
import { WelcomeScreen } from './components/WelcomeScreen'
import { PriorityConfiguration } from './components/PriorityConfiguration'
import { PoliticianSelection } from './components/PoliticianSelection'
import { CivicDashboard } from './components/CivicDashboard'
import { PoliticianProfile } from './components/PoliticianProfile'
import { ComparisonTool } from './components/ComparisonTool'

export type Priority = {
  id: string
  name: string
  description: string
  weight: number
}

export type Politician = {
  id: string
  name: string
  party: string
  position: string
  avatar: string
  score: number
  scoreBreakdown: {
    [key: string]: number
  }
  recentActions: Action[]
}

export type Action = {
  id: string
  title: string
  description: string
  date: string
  category: string
  impact: number
  source: string
}

export type AppState = 'welcome' | 'priorities' | 'politicians' | 'dashboard' | 'profile' | 'comparison'

function App() {
  const [currentState, setCurrentState] = useState<AppState>('welcome')
  const [userPriorities, setUserPriorities] = useState<Priority[]>([])
  const [selectedPoliticians, setSelectedPoliticians] = useState<string[]>([])
  const [selectedPolitician, setSelectedPolitician] = useState<string | null>(null)
  const [comparisonPoliticians, setComparisonPoliticians] = useState<string[]>([])

  const handleStateChange = (newState: AppState) => {
    setCurrentState(newState)
  }

  const handlePrioritiesSet = (priorities: Priority[]) => {
    setUserPriorities(priorities)
    setCurrentState('politicians')
  }

  const handlePoliticiansSelected = (politicians: string[]) => {
    setSelectedPoliticians(politicians)
    setCurrentState('dashboard')
  }

  const handlePoliticianView = (politicianId: string) => {
    setSelectedPolitician(politicianId)
    setCurrentState('profile')
  }

  const handleComparison = (politicians: string[]) => {
    setComparisonPoliticians(politicians)
    setCurrentState('comparison')
  }

  const renderCurrentScreen = () => {
    switch (currentState) {
      case 'welcome':
        return <WelcomeScreen onNext={() => handleStateChange('priorities')} />
      case 'priorities':
        return <PriorityConfiguration onNext={handlePrioritiesSet} />
      case 'politicians':
        return (
          <PoliticianSelection
            priorities={userPriorities}
            onNext={handlePoliticiansSelected}
            onBack={() => handleStateChange('priorities')}
          />
        )
      case 'dashboard':
        return (
          <CivicDashboard
            priorities={userPriorities}
            selectedPoliticians={selectedPoliticians}
            onViewPolitician={handlePoliticianView}
            onCompare={handleComparison}
            onBack={() => handleStateChange('politicians')}
          />
        )
      case 'profile':
        return (
          <PoliticianProfile
            politicianId={selectedPolitician!}
            priorities={userPriorities}
            onBack={() => handleStateChange('dashboard')}
          />
        )
      case 'comparison':
        return (
          <ComparisonTool
            politicians={comparisonPoliticians}
            priorities={userPriorities}
            onBack={() => handleStateChange('dashboard')}
          />
        )
      default:
        return <WelcomeScreen onNext={() => handleStateChange('priorities')} />
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {renderCurrentScreen()}
    </div>
  )
}

export default App