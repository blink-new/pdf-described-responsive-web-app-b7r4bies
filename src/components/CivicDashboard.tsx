import { useState } from 'react'
import { Button } from './ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { Progress } from './ui/progress'
import { 
  ArrowLeft, 
  Eye, 
  GitCompare, 
  TrendingUp, 
  TrendingDown, 
  Calendar,
  Award,
  AlertCircle,
  Settings
} from 'lucide-react'
import { Priority, Politician } from '../App'

interface CivicDashboardProps {
  priorities: Priority[]
  selectedPoliticians: string[]
  onViewPolitician: (politicianId: string) => void
  onCompare: (politicians: string[]) => void
  onBack: () => void
  onOpenSettings: () => void
}

const MOCK_POLITICIANS_DATA: Politician[] = [
  {
    id: 'pol1',
    name: 'Ana Silva',
    party: 'Partido A',
    position: 'Deputada Federal',
    avatar: '/api/placeholder/64/64',
    score: 85,
    scoreBreakdown: {
      education: 92,
      health: 88,
      economy: 75,
      security: 70,
      environment: 85,
      infrastructure: 80,
      social: 90,
      transparency: 95
    },
    recentActions: [
      {
        id: 'a1',
        title: 'Votou a favor do aumento do orçamento da educação',
        description: 'Apoiou projeto que aumenta em 15% o investimento em educação básica',
        date: '2024-01-15',
        category: 'education',
        impact: 8,
        source: 'Câmara dos Deputados'
      },
      {
        id: 'a2',
        title: 'Apresentou projeto de transparência pública',
        description: 'Propôs lei que obriga divulgação de gastos em tempo real',
        date: '2024-01-10',
        category: 'transparency',
        impact: 9,
        source: 'Portal da Transparência'
      }
    ]
  },
  {
    id: 'pol2',
    name: 'Carlos Santos',
    party: 'Partido B',
    position: 'Senador',
    avatar: '/api/placeholder/64/64',
    score: 72,
    scoreBreakdown: {
      education: 65,
      health: 70,
      economy: 85,
      security: 75,
      environment: 60,
      infrastructure: 90,
      social: 68,
      transparency: 65
    },
    recentActions: [
      {
        id: 'a3',
        title: 'Aprovou emenda para infraestrutura',
        description: 'Destinou R$ 50 milhões para obras de saneamento',
        date: '2024-01-12',
        category: 'infrastructure',
        impact: 7,
        source: 'Senado Federal'
      }
    ]
  },
  {
    id: 'pol5',
    name: 'Lucia Costa',
    party: 'Partido E',
    position: 'Vereadora',
    avatar: '/api/placeholder/64/64',
    score: 91,
    scoreBreakdown: {
      education: 95,
      health: 85,
      economy: 80,
      security: 75,
      environment: 90,
      infrastructure: 85,
      social: 95,
      transparency: 98
    },
    recentActions: [
      {
        id: 'a4',
        title: 'Criou programa de educação ambiental',
        description: 'Implementou projeto nas escolas municipais',
        date: '2024-01-14',
        category: 'environment',
        impact: 8,
        source: 'Câmara Municipal'
      }
    ]
  }
]

export function CivicDashboard({ 
  priorities, 
  selectedPoliticians, 
  onViewPolitician, 
  onCompare, 
  onBack,
  onOpenSettings 
}: CivicDashboardProps) {
  const [selectedForComparison, setSelectedForComparison] = useState<string[]>([])

  const politiciansData = MOCK_POLITICIANS_DATA.filter(p => 
    selectedPoliticians.includes(p.id)
  )

  const sortedPoliticians = [...politiciansData].sort((a, b) => b.score - a.score)

  const handleComparisonToggle = (politicianId: string) => {
    setSelectedForComparison(prev => 
      prev.includes(politicianId)
        ? prev.filter(id => id !== politicianId)
        : prev.length < 3 ? [...prev, politicianId] : prev
    )
  }

  const handleCompare = () => {
    if (selectedForComparison.length >= 2) {
      onCompare(selectedForComparison)
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600'
    if (score >= 60) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getScoreBadgeColor = (score: number) => {
    if (score >= 80) return 'bg-green-100 text-green-800'
    if (score >= 60) return 'bg-yellow-100 text-yellow-800'
    return 'bg-red-100 text-red-800'
  }

  const calculatePersonalizedScore = (politician: Politician) => {
    const totalWeight = priorities.reduce((sum, p) => sum + p.weight, 0)
    if (totalWeight === 0) return politician.score

    let weightedSum = 0
    priorities.forEach(priority => {
      const categoryScore = politician.scoreBreakdown[priority.id] || 0
      weightedSum += (categoryScore * priority.weight)
    })

    return Math.round(weightedSum / totalWeight)
  }

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
              Seu Dashboard Cívico
            </h1>
            <p className="text-lg text-gray-600 mt-2">
              Acompanhe os políticos selecionados com base nas suas prioridades
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm" onClick={onOpenSettings}>
              <Settings className="h-4 w-4 mr-2" />
              Configurações
            </Button>
            <Button variant="outline" onClick={onBack}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar
            </Button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="border-0 shadow-sm">
            <CardContent className="pt-6">
              <div className="flex items-center space-x-2">
                <Award className="h-8 w-8 text-primary" />
                <div>
                  <div className="text-2xl font-bold">{politiciansData.length}</div>
                  <div className="text-sm text-gray-600">Políticos Monitorados</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardContent className="pt-6">
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-8 w-8 text-green-600" />
                <div>
                  <div className="text-2xl font-bold">
                    {Math.round(politiciansData.reduce((sum, p) => sum + calculatePersonalizedScore(p), 0) / politiciansData.length)}
                  </div>
                  <div className="text-sm text-gray-600">Pontuação Média</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardContent className="pt-6">
              <div className="flex items-center space-x-2">
                <Calendar className="h-8 w-8 text-blue-600" />
                <div>
                  <div className="text-2xl font-bold">
                    {politiciansData.reduce((sum, p) => sum + p.recentActions.length, 0)}
                  </div>
                  <div className="text-sm text-gray-600">Ações Recentes</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardContent className="pt-6">
              <div className="flex items-center space-x-2">
                <AlertCircle className="h-8 w-8 text-yellow-600" />
                <div>
                  <div className="text-2xl font-bold">2</div>
                  <div className="text-sm text-gray-600">Alertas Ativos</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Comparison Tool */}
        {selectedForComparison.length > 0 && (
          <Card className="border-0 shadow-sm bg-blue-50">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-blue-900">
                    Comparação Selecionada ({selectedForComparison.length}/3)
                  </h3>
                  <p className="text-sm text-blue-700">
                    Selecione pelo menos 2 políticos para comparar
                  </p>
                </div>
                <div className="flex space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setSelectedForComparison([])}
                  >
                    Limpar
                  </Button>
                  <Button 
                    size="sm"
                    onClick={handleCompare}
                    disabled={selectedForComparison.length < 2}
                  >
                    <GitCompare className="h-4 w-4 mr-2" />
                    Comparar
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Main Content */}
        <Tabs defaultValue="ranking" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="ranking">Ranking Personalizado</TabsTrigger>
            <TabsTrigger value="actions">Ações Recentes</TabsTrigger>
            <TabsTrigger value="analysis">Análise Detalhada</TabsTrigger>
          </TabsList>

          <TabsContent value="ranking" className="space-y-6">
            <div className="grid gap-6">
              {sortedPoliticians.map((politician, index) => {
                const personalizedScore = calculatePersonalizedScore(politician)
                return (
                  <Card key={politician.id} className="border-0 shadow-sm hover:shadow-md transition-shadow">
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-3">
                            <Badge variant="outline" className="text-lg font-bold w-8 h-8 rounded-full flex items-center justify-center">
                              {index + 1}
                            </Badge>
                            <Avatar className="h-16 w-16">
                              <AvatarImage src={politician.avatar} alt={politician.name} />
                              <AvatarFallback>
                                {politician.name.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                          </div>
                          <div>
                            <h3 className="text-xl font-semibold">{politician.name}</h3>
                            <p className="text-gray-600">{politician.position}</p>
                            <Badge variant="outline" className="mt-1">
                              {politician.party}
                            </Badge>
                          </div>
                        </div>

                        <div className="flex items-center space-x-4">
                          <div className="text-center">
                            <div className={`text-3xl font-bold ${getScoreColor(personalizedScore)}`}>
                              {personalizedScore}
                            </div>
                            <div className="text-sm text-gray-500">Pontuação</div>
                          </div>

                          <div className="flex flex-col space-y-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => onViewPolitician(politician.id)}
                            >
                              <Eye className="h-4 w-4 mr-2" />
                              Ver Perfil
                            </Button>
                            <Button
                              variant={selectedForComparison.includes(politician.id) ? "default" : "outline"}
                              size="sm"
                              onClick={() => handleComparisonToggle(politician.id)}
                              disabled={!selectedForComparison.includes(politician.id) && selectedForComparison.length >= 3}
                            >
                              <GitCompare className="h-4 w-4 mr-2" />
                              {selectedForComparison.includes(politician.id) ? 'Selecionado' : 'Comparar'}
                            </Button>
                          </div>
                        </div>
                      </div>

                      {/* Score Breakdown */}
                      <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
                        {priorities.slice(0, 4).map(priority => {
                          const score = politician.scoreBreakdown[priority.id] || 0
                          return (
                            <div key={priority.id} className="text-center">
                              <div className="text-sm font-medium text-gray-700 mb-1">
                                {priority.name}
                              </div>
                              <div className={`text-lg font-bold ${getScoreColor(score)}`}>
                                {score}
                              </div>
                              <Progress value={score} className="h-2 mt-1" />
                            </div>
                          )
                        })}
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </TabsContent>

          <TabsContent value="actions" className="space-y-6">
            <div className="space-y-4">
              {politiciansData.flatMap(politician => 
                politician.recentActions.map(action => ({
                  ...action,
                  politicianName: politician.name,
                  politicianAvatar: politician.avatar
                }))
              ).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).map(action => (
                <Card key={action.id} className="border-0 shadow-sm">
                  <CardContent className="pt-6">
                    <div className="flex items-start space-x-4">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={action.politicianAvatar} alt={action.politicianName} />
                        <AvatarFallback>
                          {action.politicianName.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-semibold text-gray-900">{action.title}</h3>
                            <p className="text-gray-600 mt-1">{action.description}</p>
                            <div className="flex items-center space-x-4 mt-2">
                              <span className="text-sm text-gray-500">
                                {action.politicianName}
                              </span>
                              <span className="text-sm text-gray-500">
                                {new Date(action.date).toLocaleDateString('pt-BR')}
                              </span>
                              <Badge variant="outline" className="text-xs">
                                {action.source}
                              </Badge>
                            </div>
                          </div>
                          <Badge className={`${getScoreBadgeColor(action.impact * 10)} border-0`}>
                            Impacto: {action.impact}/10
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="analysis" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <CardTitle>Distribuição por Prioridades</CardTitle>
                  <CardDescription>
                    Como seus políticos se saem nas suas áreas prioritárias
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {priorities.map(priority => {
                      const avgScore = politiciansData.reduce((sum, p) => 
                        sum + (p.scoreBreakdown[priority.id] || 0), 0
                      ) / politiciansData.length
                      return (
                        <div key={priority.id} className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-sm font-medium">{priority.name}</span>
                              <span className="text-sm text-gray-500">
                                Peso: {priority.weight}/10
                              </span>
                            </div>
                            <Progress value={avgScore} className="h-2" />
                          </div>
                          <div className="ml-4 text-right">
                            <div className={`text-lg font-bold ${getScoreColor(avgScore)}`}>
                              {Math.round(avgScore)}
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <CardTitle>Tendências Recentes</CardTitle>
                  <CardDescription>
                    Mudanças nas pontuações dos últimos 30 dias
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {politiciansData.map(politician => (
                      <div key={politician.id} className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={politician.avatar} alt={politician.name} />
                            <AvatarFallback className="text-xs">
                              {politician.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <span className="font-medium">{politician.name}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <TrendingUp className="h-4 w-4 text-green-600" />
                          <span className="text-green-600 font-medium">+3</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}