import { useState } from 'react'
import { Button } from './ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Slider } from './ui/slider'
import { Badge } from './ui/badge'
import { Progress } from './ui/progress'
import { ArrowLeft, ArrowRight, Info } from 'lucide-react'
import { Priority } from '../App'

interface PriorityConfigurationProps {
  onNext: (priorities: Priority[]) => void
}

const DEFAULT_PRIORITIES: Omit<Priority, 'weight'>[] = [
  {
    id: 'education',
    name: 'Educação',
    description: 'Políticas educacionais, investimento em escolas, qualidade do ensino'
  },
  {
    id: 'health',
    name: 'Saúde',
    description: 'Sistema de saúde pública, hospitais, prevenção e tratamento'
  },
  {
    id: 'economy',
    name: 'Economia',
    description: 'Crescimento econômico, emprego, políticas fiscais e monetárias'
  },
  {
    id: 'security',
    name: 'Segurança',
    description: 'Segurança pública, combate à criminalidade, políticas de segurança'
  },
  {
    id: 'environment',
    name: 'Meio Ambiente',
    description: 'Sustentabilidade, mudanças climáticas, preservação ambiental'
  },
  {
    id: 'infrastructure',
    name: 'Infraestrutura',
    description: 'Transporte, saneamento, energia, telecomunicações'
  },
  {
    id: 'social',
    name: 'Políticas Sociais',
    description: 'Programas sociais, redução da pobreza, assistência social'
  },
  {
    id: 'transparency',
    name: 'Transparência',
    description: 'Combate à corrupção, transparência pública, prestação de contas'
  }
]

export function PriorityConfiguration({ onNext }: PriorityConfigurationProps) {
  const [priorities, setPriorities] = useState<Priority[]>(
    DEFAULT_PRIORITIES.map(p => ({ ...p, weight: 5 }))
  )

  const handleWeightChange = (priorityId: string, weight: number) => {
    setPriorities(prev => 
      prev.map(p => p.id === priorityId ? { ...p, weight } : p)
    )
  }

  const handleContinue = () => {
    onNext(priorities)
  }

  const totalWeight = priorities.reduce((sum, p) => sum + p.weight, 0)
  const averageWeight = totalWeight / priorities.length

  const getWeightLabel = (weight: number) => {
    if (weight <= 2) return 'Baixa'
    if (weight <= 4) return 'Moderada'
    if (weight <= 7) return 'Alta'
    return 'Muito Alta'
  }

  const getWeightColor = (weight: number) => {
    if (weight <= 2) return 'bg-gray-500'
    if (weight <= 4) return 'bg-yellow-500'
    if (weight <= 7) return 'bg-blue-500'
    return 'bg-green-500'
  }

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            Configure Suas Prioridades
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Defina o peso de cada área política de acordo com sua importância pessoal. 
            Isso personalizará como avaliamos os políticos para você.
          </p>
        </div>

        {/* Progress Indicator */}
        <Card className="border-0 shadow-sm">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Progresso da Configuração</span>
              <span className="text-sm text-gray-500">Passo 1 de 3</span>
            </div>
            <Progress value={33} className="h-2" />
          </CardContent>
        </Card>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="border-0 shadow-sm">
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{priorities.length}</div>
                <div className="text-sm text-gray-600">Áreas Configuradas</div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-sm">
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-accent">{averageWeight.toFixed(1)}</div>
                <div className="text-sm text-gray-600">Peso Médio</div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-sm">
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-700">{priorities.filter(p => p.weight >= 7).length}</div>
                <div className="text-sm text-gray-600">Prioridades Altas</div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Priority Configuration */}
        <div className="grid gap-6">
          {priorities.map((priority) => (
            <Card key={priority.id} className="border-0 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg">{priority.name}</CardTitle>
                    <CardDescription className="mt-1">
                      {priority.description}
                    </CardDescription>
                  </div>
                  <Badge 
                    variant="secondary" 
                    className={`ml-4 ${getWeightColor(priority.weight)} text-white`}
                  >
                    {getWeightLabel(priority.weight)}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <span className="text-sm font-medium w-16">Peso:</span>
                    <div className="flex-1">
                      <Slider
                        value={[priority.weight]}
                        onValueChange={(value) => handleWeightChange(priority.id, value[0])}
                        max={10}
                        min={0}
                        step={1}
                        className="w-full"
                      />
                    </div>
                    <span className="text-lg font-bold w-8 text-center">
                      {priority.weight}
                    </span>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>Sem importância</span>
                    <span>Extremamente importante</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Help Section */}
        <Card className="border-0 shadow-sm bg-blue-50">
          <CardContent className="pt-6">
            <div className="flex items-start space-x-3">
              <Info className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div className="text-sm text-blue-800">
                <p className="font-medium mb-1">Como funciona a pontuação:</p>
                <p>
                  Cada político receberá uma pontuação de 0-100 baseada em suas ações e posicionamentos. 
                  As áreas com maior peso terão mais influência na pontuação final personalizada para você.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <Button variant="outline" disabled>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar
          </Button>
          <Button onClick={handleContinue} size="lg">
            Continuar
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  )
}