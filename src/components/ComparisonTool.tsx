import { Button } from './ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Progress } from './ui/progress'
import { ArrowLeft, TrendingUp, TrendingDown, Minus } from 'lucide-react'
import { Priority } from '../App'

interface ComparisonToolProps {
  politicians: string[]
  priorities: Priority[]
  onBack: () => void
}

const MOCK_COMPARISON_DATA = {
  pol1: {
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
    strengths: ['Transparência', 'Educação', 'Políticas Sociais'],
    weaknesses: ['Segurança', 'Economia'],
    recentTrend: 'up'
  },
  pol2: {
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
    strengths: ['Infraestrutura', 'Economia', 'Segurança'],
    weaknesses: ['Meio Ambiente', 'Transparência'],
    recentTrend: 'stable'
  },
  pol5: {
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
    strengths: ['Transparência', 'Educação', 'Políticas Sociais'],
    weaknesses: ['Segurança'],
    recentTrend: 'up'
  }
}

export function ComparisonTool({ politicians, priorities, onBack }: ComparisonToolProps) {
  const comparisonData = politicians.map(id => MOCK_COMPARISON_DATA[id as keyof typeof MOCK_COMPARISON_DATA]).filter(Boolean)

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

  const getTrendIcon = (trend: string) => {
    if (trend === 'up') return <TrendingUp className="h-4 w-4 text-green-600" />
    if (trend === 'down') return <TrendingDown className="h-4 w-4 text-red-600" />
    return <Minus className="h-4 w-4 text-gray-600" />
  }

  const getBestInCategory = (category: string) => {
    return comparisonData.reduce((best, current) => {
      const currentScore = current.scoreBreakdown[category] || 0
      const bestScore = best.scoreBreakdown[category] || 0
      return currentScore > bestScore ? current : best
    })
  }

  const calculatePersonalizedScore = (politician: any) => {
    const totalWeight = priorities.reduce((sum, p) => sum + p.weight, 0)
    if (totalWeight === 0) return politician.score

    let weightedSum = 0
    priorities.forEach(priority => {
      const categoryScore = politician.scoreBreakdown[priority.id] || 0
      weightedSum += (categoryScore * priority.weight)
    })

    return Math.round(weightedSum / totalWeight)
  }

  const sortedByPersonalizedScore = [...comparisonData].sort((a, b) => 
    calculatePersonalizedScore(b) - calculatePersonalizedScore(a)
  )

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
              Comparação de Políticos
            </h1>
            <p className="text-lg text-gray-600 mt-2">
              Compare {comparisonData.length} políticos lado a lado
            </p>
          </div>
          <Button variant="outline" onClick={onBack}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar ao Dashboard
          </Button>
        </div>

        {/* Overall Ranking */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle>Ranking Personalizado</CardTitle>
            <CardDescription>
              Baseado nas suas prioridades configuradas
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {sortedByPersonalizedScore.map((politician, index) => {
                const personalizedScore = calculatePersonalizedScore(politician)
                return (
                  <div key={politician.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <Badge variant="outline" className="text-lg font-bold w-8 h-8 rounded-full flex items-center justify-center">
                        {index + 1}
                      </Badge>
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={politician.avatar} alt={politician.name} />
                        <AvatarFallback>
                          {politician.name.split(' ').map((n: string) => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold">{politician.name}</h3>
                        <p className="text-sm text-gray-600">{politician.position}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      {getTrendIcon(politician.recentTrend)}
                      <div className={`text-2xl font-bold ${getScoreColor(personalizedScore)}`}>
                        {personalizedScore}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Detailed Comparison */}
        <div className="grid gap-8">
          {/* Politicians Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {comparisonData.map(politician => (
              <Card key={politician.id} className="border-0 shadow-sm">
                <CardHeader className="text-center">
                  <Avatar className="h-20 w-20 mx-auto mb-4">
                    <AvatarImage src={politician.avatar} alt={politician.name} />
                    <AvatarFallback className="text-lg">
                      {politician.name.split(' ').map((n: string) => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <CardTitle className="text-lg">{politician.name}</CardTitle>
                  <CardDescription>{politician.position}</CardDescription>
                  <Badge variant="outline">{politician.party}</Badge>
                </CardHeader>
                <CardContent>
                  <div className="text-center mb-4">
                    <div className={`text-3xl font-bold ${getScoreColor(calculatePersonalizedScore(politician))}`}>
                      {calculatePersonalizedScore(politician)}
                    </div>
                    <div className="text-sm text-gray-500">Pontuação Personalizada</div>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <h4 className="font-medium text-green-700 mb-2">Pontos Fortes:</h4>
                      <div className="flex flex-wrap gap-1">
                        {politician.strengths.map((strength: string) => (
                          <Badge key={strength} variant="secondary" className="text-xs bg-green-100 text-green-800">
                            {strength}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium text-red-700 mb-2">Pontos Fracos:</h4>
                      <div className="flex flex-wrap gap-1">
                        {politician.weaknesses.map((weakness: string) => (
                          <Badge key={weakness} variant="secondary" className="text-xs bg-red-100 text-red-800">
                            {weakness}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Category Comparison */}
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle>Comparação por Categoria</CardTitle>
              <CardDescription>
                Desempenho detalhado em cada área de interesse
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                {priorities.map(priority => {
                  const bestPolitician = getBestInCategory(priority.id)
                  return (
                    <div key={priority.id} className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold">{priority.name}</h3>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-gray-500">Peso: {priority.weight}/10</span>
                          <Badge variant="outline" className="text-xs">
                            Melhor: {bestPolitician.name}
                          </Badge>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {comparisonData.map(politician => {
                          const score = politician.scoreBreakdown[priority.id] || 0
                          const isBest = politician.id === bestPolitician.id
                          return (
                            <div 
                              key={politician.id} 
                              className={`p-4 rounded-lg border-2 ${
                                isBest ? 'border-green-200 bg-green-50' : 'border-gray-200 bg-gray-50'
                              }`}
                            >
                              <div className="flex items-center justify-between mb-2">
                                <span className="font-medium">{politician.name}</span>
                                {isBest && (
                                  <Badge className="bg-green-100 text-green-800 border-0 text-xs">
                                    Melhor
                                  </Badge>
                                )}
                              </div>
                              <div className={`text-2xl font-bold ${getScoreColor(score)} mb-2`}>
                                {score}
                              </div>
                              <Progress value={score} className="h-2" />
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          {/* Summary Insights */}
          <Card className="border-0 shadow-sm bg-blue-50">
            <CardHeader>
              <CardTitle className="text-blue-900">Insights da Comparação</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6 text-blue-800">
                <div>
                  <h4 className="font-semibold mb-2">Melhor Desempenho Geral:</h4>
                  <p className="text-sm">
                    <strong>{sortedByPersonalizedScore[0].name}</strong> lidera com {calculatePersonalizedScore(sortedByPersonalizedScore[0])} pontos,
                    destacando-se em {sortedByPersonalizedScore[0].strengths.slice(0, 2).join(' e ')}.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Maior Diferença:</h4>
                  <p className="text-sm">
                    A maior diferença está em <strong>Transparência</strong>, onde há uma variação de até{' '}
                    {Math.max(...comparisonData.map(p => p.scoreBreakdown.transparency || 0)) - 
                     Math.min(...comparisonData.map(p => p.scoreBreakdown.transparency || 0))} pontos.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}