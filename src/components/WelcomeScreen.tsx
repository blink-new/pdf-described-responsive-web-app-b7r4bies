import { Button } from './ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { Users, Target, BarChart3, Shield, Zap, Heart } from 'lucide-react'

interface WelcomeScreenProps {
  onNext: () => void
}

export function WelcomeScreen({ onNext }: WelcomeScreenProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-accent-50 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full space-y-8">
        {/* Hero Section */}
        <div className="text-center space-y-6">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Shield className="h-8 w-8 text-primary" />
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
              Monitoramento Cívico
            </h1>
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Transforme sua participação política em uma experiência personalizada, 
            dinâmica e relevante para seus valores e interesses.
          </p>
          <Badge variant="secondary" className="text-sm px-4 py-2">
            Plataforma Personalizada de Engajamento Cívico
          </Badge>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="text-center">
              <Target className="h-12 w-12 text-primary mx-auto mb-4" />
              <CardTitle className="text-lg">Prioridades Personalizadas</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center">
                Configure suas prioridades políticas e veja como cada político se alinha com seus valores
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="text-center">
              <BarChart3 className="h-12 w-12 text-accent mx-auto mb-4" />
              <CardTitle className="text-lg">Pontuação Dinâmica</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center">
                Acompanhe pontuações em tempo real baseadas nas ações e posicionamentos dos políticos
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="text-center">
              <Users className="h-12 w-12 text-primary mx-auto mb-4" />
              <CardTitle className="text-lg">Comparação Inteligente</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center">
                Compare políticos lado a lado com base em suas prioridades específicas
              </CardDescription>
            </CardContent>
          </Card>
        </div>

        {/* Key Benefits */}
        <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-center text-2xl">Como Funciona</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Zap className="h-6 w-6 text-accent mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Configuração Rápida</h3>
                    <p className="text-gray-600 text-sm">
                      Defina suas prioridades em minutos usando nosso sistema intuitivo de pesos
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Heart className="h-6 w-6 text-accent mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Relevância Pessoal</h3>
                    <p className="text-gray-600 text-sm">
                      Veja apenas o que importa para você, filtrado pelos seus valores
                    </p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Shield className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Transparência Total</h3>
                    <p className="text-gray-600 text-sm">
                      Metodologia aberta e fontes verificáveis para todas as pontuações
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <BarChart3 className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Dados em Tempo Real</h3>
                    <p className="text-gray-600 text-sm">
                      Atualizações automáticas baseadas em ações e posicionamentos recentes
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* CTA */}
        <div className="text-center">
          <Button 
            onClick={onNext}
            size="lg"
            className="px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Começar Configuração
          </Button>
          <p className="text-sm text-gray-500 mt-4">
            Leva apenas 3 minutos para personalizar sua experiência
          </p>
        </div>
      </div>
    </div>
  )
}