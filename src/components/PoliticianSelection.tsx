import { useState } from 'react'
import { Button } from './ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Checkbox } from './ui/checkbox'
import { Badge } from './ui/badge'
import { Progress } from './ui/progress'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { ArrowLeft, ArrowRight, Search, Filter } from 'lucide-react'
import { Input } from './ui/input'
import { Priority } from '../App'

interface PoliticianSelectionProps {
  priorities: Priority[]
  onNext: (selectedPoliticians: string[]) => void
  onBack: () => void
}

const MOCK_POLITICIANS = [
  {
    id: 'pol1',
    name: 'Ana Silva',
    party: 'Partido A',
    position: 'Deputada Federal',
    avatar: '/api/placeholder/64/64',
    estimatedScore: 85,
    strongAreas: ['Educação', 'Saúde']
  },
  {
    id: 'pol2',
    name: 'Carlos Santos',
    party: 'Partido B',
    position: 'Senador',
    avatar: '/api/placeholder/64/64',
    estimatedScore: 72,
    strongAreas: ['Economia', 'Infraestrutura']
  },
  {
    id: 'pol3',
    name: 'Maria Oliveira',
    party: 'Partido C',
    position: 'Deputada Estadual',
    avatar: '/api/placeholder/64/64',
    estimatedScore: 78,
    strongAreas: ['Meio Ambiente', 'Transparência']
  },
  {
    id: 'pol4',
    name: 'João Pereira',
    party: 'Partido D',
    position: 'Prefeito',
    avatar: '/api/placeholder/64/64',
    estimatedScore: 69,
    strongAreas: ['Segurança', 'Políticas Sociais']
  },
  {
    id: 'pol5',
    name: 'Lucia Costa',
    party: 'Partido E',
    position: 'Vereadora',
    avatar: '/api/placeholder/64/64',
    estimatedScore: 91,
    strongAreas: ['Educação', 'Transparência']
  },
  {
    id: 'pol6',
    name: 'Roberto Lima',
    party: 'Partido F',
    position: 'Deputado Federal',
    avatar: '/api/placeholder/64/64',
    estimatedScore: 64,
    strongAreas: ['Economia', 'Segurança']
  }
]

export function PoliticianSelection({ priorities, onNext, onBack }: PoliticianSelectionProps) {
  const [selectedPoliticians, setSelectedPoliticians] = useState<string[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [filterParty, setFilterParty] = useState('')

  const handlePoliticianToggle = (politicianId: string) => {
    setSelectedPoliticians(prev => 
      prev.includes(politicianId)
        ? prev.filter(id => id !== politicianId)
        : [...prev, politicianId]
    )
  }

  const handleContinue = () => {
    if (selectedPoliticians.length > 0) {
      onNext(selectedPoliticians)
    }
  }

  const filteredPoliticians = MOCK_POLITICIANS.filter(politician => {
    const matchesSearch = politician.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         politician.party.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         politician.position.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesParty = !filterParty || politician.party === filterParty
    return matchesSearch && matchesParty
  })

  const uniqueParties = [...new Set(MOCK_POLITICIANS.map(p => p.party))]

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600 bg-green-50'
    if (score >= 60) return 'text-yellow-600 bg-yellow-50'
    return 'text-red-600 bg-red-50'
  }

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            Selecione os Políticos
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Escolha os políticos que você gostaria de monitorar. As pontuações são estimadas 
            com base nas suas prioridades configuradas.
          </p>
        </div>

        {/* Progress Indicator */}
        <Card className="border-0 shadow-sm">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Progresso da Configuração</span>
              <span className="text-sm text-gray-500">Passo 2 de 3</span>
            </div>
            <Progress value={66} className="h-2" />
          </CardContent>
        </Card>

        {/* Search and Filter */}
        <Card className="border-0 shadow-sm">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Buscar por nome, partido ou cargo..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex items-center space-x-2">
                <Filter className="h-4 w-4 text-gray-400" />
                <select
                  value={filterParty}
                  onChange={(e) => setFilterParty(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md text-sm"
                >
                  <option value="">Todos os partidos</option>
                  {uniqueParties.map(party => (
                    <option key={party} value={party}>{party}</option>
                  ))}
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Selection Summary */}
        {selectedPoliticians.length > 0 && (
          <Card className="border-0 shadow-sm bg-primary-50">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-primary">
                    {selectedPoliticians.length} político(s) selecionado(s)
                  </h3>
                  <p className="text-sm text-primary-600">
                    Você pode selecionar quantos políticos desejar monitorar
                  </p>
                </div>
                <Badge variant="secondary" className="bg-primary text-white">
                  {selectedPoliticians.length}
                </Badge>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Politicians Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPoliticians.map((politician) => (
            <Card 
              key={politician.id} 
              className={`border-0 shadow-sm hover:shadow-md transition-all cursor-pointer ${
                selectedPoliticians.includes(politician.id) 
                  ? 'ring-2 ring-primary bg-primary-50' 
                  : ''
              }`}
              onClick={() => handlePoliticianToggle(politician.id)}
            >
              <CardHeader className="pb-4">
                <div className="flex items-start space-x-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={politician.avatar} alt={politician.name} />
                    <AvatarFallback className="text-lg">
                      {politician.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg leading-tight">
                          {politician.name}
                        </CardTitle>
                        <CardDescription className="mt-1">
                          {politician.position}
                        </CardDescription>
                        <Badge variant="outline" className="mt-2 text-xs">
                          {politician.party}
                        </Badge>
                      </div>
                      <Checkbox
                        checked={selectedPoliticians.includes(politician.id)}
                        onChange={() => handlePoliticianToggle(politician.id)}
                        className="mt-1"
                      />
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {/* Estimated Score */}
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Pontuação Estimada:</span>
                    <Badge className={`${getScoreColor(politician.estimatedScore)} border-0`}>
                      {politician.estimatedScore}/100
                    </Badge>
                  </div>

                  {/* Strong Areas */}
                  <div>
                    <span className="text-sm font-medium text-gray-700">Áreas Fortes:</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {politician.strongAreas.map((area) => (
                        <Badge key={area} variant="secondary" className="text-xs">
                          {area}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredPoliticians.length === 0 && (
          <Card className="border-0 shadow-sm">
            <CardContent className="pt-6 text-center">
              <p className="text-gray-500">
                Nenhum político encontrado com os filtros aplicados.
              </p>
            </CardContent>
          </Card>
        )}

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <Button variant="outline" onClick={onBack}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar
          </Button>
          <Button 
            onClick={handleContinue} 
            size="lg"
            disabled={selectedPoliticians.length === 0}
          >
            Continuar para Dashboard
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  )
}