import { Button } from './ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { Progress } from './ui/progress'
import { 
  ArrowLeft, 
  ExternalLink, 
  Calendar,
  MapPin,
  Users,
  TrendingUp,
  FileText,
  Award
} from 'lucide-react'
import { Priority } from '../App'

interface PoliticianProfileProps {
  politicianId: string
  priorities: Priority[]
  onBack: () => void
}

const MOCK_POLITICIAN_DETAIL = {
  id: 'pol1',
  name: 'Ana Silva',
  party: 'Partido A',
  position: 'Deputada Federal',
  avatar: '/api/placeholder/128/128',
  score: 85,
  bio: 'Deputada Federal eleita em 2022, com foco em educação e transparência pública. Formada em Pedagogia pela USP e Mestre em Políticas Públicas.',
  location: 'São Paulo - SP',
  yearsInOffice: 2,
  followers: 45000,
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
      description: 'Apoiou projeto que aumenta em 15% o investimento em educação básica, priorizando escolas em regiões vulneráveis e formação de professores.',
      date: '2024-01-15',
      category: 'education',
      impact: 8,
      source: 'Câmara dos Deputados',
      link: 'https://example.com/votacao-1'
    },
    {
      id: 'a2',
      title: 'Apresentou projeto de transparência pública',
      description: 'Propôs lei que obriga divulgação de gastos públicos em tempo real através de portal online acessível.',
      date: '2024-01-10',
      category: 'transparency',
      impact: 9,
      source: 'Portal da Transparência',
      link: 'https://example.com/projeto-1'
    },
    {
      id: 'a3',
      title: 'Participou de audiência sobre saúde mental',
      description: 'Contribuiu para discussão sobre políticas de saúde mental nas escolas públicas.',
      date: '2024-01-08',
      category: 'health',
      impact: 7,
      source: 'Comissão de Educação',
      link: 'https://example.com/audiencia-1'
    }
  ],
  proposals: [
    {
      id: 'p1',
      title: 'PL 1234/2024 - Marco da Transparência Digital',
      description: 'Estabelece diretrizes para transparência digital nos órgãos públicos',
      status: 'Em tramitação',
      category: 'transparency'
    },
    {
      id: 'p2',
      title: 'PL 5678/2024 - Educação Inclusiva',
      description: 'Amplia recursos para educação especial e inclusiva',
      status: 'Aprovado na comissão',
      category: 'education'
    }
  ],
  voting_record: [
    {
      id: 'v1',
      title: 'Marco Civil da Internet - Atualização',
      vote: 'Favorável',
      date: '2024-01-20',
      category: 'transparency'
    },
    {
      id: 'v2',
      title: 'Orçamento da Educação 2024',
      vote: 'Favorável',
      date: '2024-01-18',
      category: 'education'
    },
    {
      id: 'v3',
      title: 'Reforma do Ensino Médio',
      vote: 'Contrário',
      date: '2024-01-15',
      category: 'education'
    }
  ]
}

export function PoliticianProfile({ politicianId, priorities, onBack }: PoliticianProfileProps) {
  const politician = MOCK_POLITICIAN_DETAIL

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

  const getVoteColor = (vote: string) => {
    if (vote === 'Favorável') return 'bg-green-100 text-green-800'
    if (vote === 'Contrário') return 'bg-red-100 text-red-800'
    return 'bg-gray-100 text-gray-800'
  }

  const getStatusColor = (status: string) => {
    if (status === 'Aprovado na comissão') return 'bg-green-100 text-green-800'
    if (status === 'Em tramitação') return 'bg-blue-100 text-blue-800'
    return 'bg-gray-100 text-gray-800'
  }

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <Button variant="outline" onClick={onBack}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar ao Dashboard
          </Button>
        </div>

        {/* Profile Header */}
        <Card className="border-0 shadow-lg">
          <CardContent className="pt-8">
            <div className="flex flex-col md:flex-row items-start md:items-center space-y-6 md:space-y-0 md:space-x-8">
              <Avatar className="h-32 w-32 mx-auto md:mx-0">
                <AvatarImage src={politician.avatar} alt={politician.name} />
                <AvatarFallback className="text-2xl">
                  {politician.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>

              <div className="flex-1 text-center md:text-left">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                  {politician.name}
                </h1>
                <p className="text-xl text-gray-600 mb-4">{politician.position}</p>
                <p className="text-gray-700 mb-4 max-w-2xl">{politician.bio}</p>
                
                <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm text-gray-600">
                  <div className="flex items-center space-x-1">
                    <MapPin className="h-4 w-4" />
                    <span>{politician.location}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-4 w-4" />
                    <span>{politician.yearsInOffice} anos no cargo</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Users className="h-4 w-4" />
                    <span>{politician.followers.toLocaleString()} seguidores</span>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <div className={`text-5xl font-bold ${getScoreColor(politician.score)} mb-2`}>
                  {politician.score}
                </div>
                <div className="text-gray-600 mb-2">Pontuação Geral</div>
                <Badge variant="outline" className="mb-4">
                  {politician.party}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Score Breakdown */}
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Award className="h-5 w-5" />
              <span>Pontuação por Área</span>
            </CardTitle>
            <CardDescription>
              Desempenho baseado nas suas prioridades configuradas
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {priorities.map(priority => {
                const score = politician.scoreBreakdown[priority.id] || 0
                return (
                  <div key={priority.id} className="text-center space-y-2">
                    <div className="font-medium text-gray-700">{priority.name}</div>
                    <div className={`text-3xl font-bold ${getScoreColor(score)}`}>
                      {score}
                    </div>
                    <Progress value={score} className="h-3" />
                    <div className="text-xs text-gray-500">
                      Peso: {priority.weight}/10
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Detailed Information */}
        <Tabs defaultValue="actions" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="actions">Ações Recentes</TabsTrigger>
            <TabsTrigger value="proposals">Projetos</TabsTrigger>
            <TabsTrigger value="voting">Histórico de Votações</TabsTrigger>
          </TabsList>

          <TabsContent value="actions" className="space-y-6">
            <div className="space-y-4">
              {politician.recentActions.map(action => (
                <Card key={action.id} className="border-0 shadow-sm hover:shadow-md transition-shadow">
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-2">{action.title}</h3>
                        <p className="text-gray-600 mb-4">{action.description}</p>
                        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                          <div className="flex items-center space-x-1">
                            <Calendar className="h-4 w-4" />
                            <span>{new Date(action.date).toLocaleDateString('pt-BR')}</span>
                          </div>
                          <Badge variant="outline" className="text-xs">
                            {action.source}
                          </Badge>
                          <Button variant="link" size="sm" className="p-0 h-auto">
                            <ExternalLink className="h-3 w-3 mr-1" />
                            Ver detalhes
                          </Button>
                        </div>
                      </div>
                      <div className="ml-4 text-center">
                        <Badge className={`${getScoreBadgeColor(action.impact * 10)} border-0 mb-2`}>
                          Impacto: {action.impact}/10
                        </Badge>
                        <div className="text-xs text-gray-500">
                          {priorities.find(p => p.id === action.category)?.name || action.category}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="proposals" className="space-y-6">
            <div className="space-y-4">
              {politician.proposals.map(proposal => (
                <Card key={proposal.id} className="border-0 shadow-sm">
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-2">{proposal.title}</h3>
                        <p className="text-gray-600 mb-4">{proposal.description}</p>
                        <div className="flex items-center space-x-4">
                          <Badge className={`${getStatusColor(proposal.status)} border-0`}>
                            {proposal.status}
                          </Badge>
                          <span className="text-sm text-gray-500">
                            {priorities.find(p => p.id === proposal.category)?.name || proposal.category}
                          </span>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        <FileText className="h-4 w-4 mr-2" />
                        Ver Projeto
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="voting" className="space-y-6">
            <div className="space-y-4">
              {politician.voting_record.map(vote => (
                <Card key={vote.id} className="border-0 shadow-sm">
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-2">{vote.title}</h3>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <div className="flex items-center space-x-1">
                            <Calendar className="h-4 w-4" />
                            <span>{new Date(vote.date).toLocaleDateString('pt-BR')}</span>
                          </div>
                          <span>{priorities.find(p => p.id === vote.category)?.name || vote.category}</span>
                        </div>
                      </div>
                      <Badge className={`${getVoteColor(vote.vote)} border-0`}>
                        {vote.vote}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}