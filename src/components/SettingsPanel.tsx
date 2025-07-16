import React, { useState } from 'react'
import { X, User, Settings, Bell, Shield, Palette, Globe, LogOut, ChevronRight } from 'lucide-react'
import { Button } from './ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Switch } from './ui/switch'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Separator } from './ui/separator'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Badge } from './ui/badge'

interface SettingsPanelProps {
  isOpen: boolean
  onClose: () => void
}

type SettingsSection = 'profile' | 'preferences' | 'notifications' | 'privacy' | 'appearance' | 'language'

export default function SettingsPanel({ isOpen, onClose }: SettingsPanelProps) {
  const [activeSection, setActiveSection] = useState<SettingsSection>('profile')
  const [userProfile, setUserProfile] = useState({
    name: 'João Silva',
    email: 'joao.silva@email.com',
    location: 'São Paulo, SP',
    bio: 'Cidadão engajado em política e transparência governamental.'
  })

  const [preferences, setPreferences] = useState({
    emailNotifications: true,
    pushNotifications: false,
    weeklyDigest: true,
    politicianUpdates: true,
    scoreChanges: true,
    dataSharing: false,
    publicProfile: false,
    theme: 'light',
    language: 'pt-BR'
  })

  const settingsMenu = [
    { id: 'profile', label: 'Perfil', icon: User },
    { id: 'preferences', label: 'Preferências', icon: Settings },
    { id: 'notifications', label: 'Notificações', icon: Bell },
    { id: 'privacy', label: 'Privacidade', icon: Shield },
    { id: 'appearance', label: 'Aparência', icon: Palette },
    { id: 'language', label: 'Idioma', icon: Globe }
  ]

  const renderProfileSection = () => (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Avatar className="h-20 w-20">
          <AvatarImage src="/placeholder-avatar.jpg" />
          <AvatarFallback className="text-lg font-semibold bg-blue-100 text-blue-600">
            {userProfile.name.split(' ').map(n => n[0]).join('')}
          </AvatarFallback>
        </Avatar>
        <div>
          <h3 className="text-xl font-semibold">{userProfile.name}</h3>
          <p className="text-gray-600">{userProfile.email}</p>
          <Badge variant="secondary" className="mt-1">Usuário Verificado</Badge>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="name">Nome Completo</Label>
          <Input
            id="name"
            value={userProfile.name}
            onChange={(e) => setUserProfile(prev => ({ ...prev, name: e.target.value }))}
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={userProfile.email}
            onChange={(e) => setUserProfile(prev => ({ ...prev, email: e.target.value }))}
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="location">Localização</Label>
          <Input
            id="location"
            value={userProfile.location}
            onChange={(e) => setUserProfile(prev => ({ ...prev, location: e.target.value }))}
            className="mt-1"
            placeholder="Cidade, Estado"
          />
        </div>

        <div>
          <Label htmlFor="bio">Biografia</Label>
          <textarea
            id="bio"
            value={userProfile.bio}
            onChange={(e) => setUserProfile(prev => ({ ...prev, bio: e.target.value }))}
            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            rows={3}
            placeholder="Conte um pouco sobre você..."
          />
        </div>

        <Button className="w-full">Salvar Alterações</Button>
      </div>
    </div>
  )

  const renderNotificationsSection = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Configurações de Notificação</h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label>Notificações por Email</Label>
              <p className="text-sm text-gray-600">Receba atualizações importantes por email</p>
            </div>
            <Switch
              checked={preferences.emailNotifications}
              onCheckedChange={(checked) => 
                setPreferences(prev => ({ ...prev, emailNotifications: checked }))
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label>Notificações Push</Label>
              <p className="text-sm text-gray-600">Receba notificações no navegador</p>
            </div>
            <Switch
              checked={preferences.pushNotifications}
              onCheckedChange={(checked) => 
                setPreferences(prev => ({ ...prev, pushNotifications: checked }))
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label>Resumo Semanal</Label>
              <p className="text-sm text-gray-600">Receba um resumo das atividades semanais</p>
            </div>
            <Switch
              checked={preferences.weeklyDigest}
              onCheckedChange={(checked) => 
                setPreferences(prev => ({ ...prev, weeklyDigest: checked }))
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label>Atualizações de Políticos</Label>
              <p className="text-sm text-gray-600">Notificações sobre políticos que você segue</p>
            </div>
            <Switch
              checked={preferences.politicianUpdates}
              onCheckedChange={(checked) => 
                setPreferences(prev => ({ ...prev, politicianUpdates: checked }))
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label>Mudanças de Pontuação</Label>
              <p className="text-sm text-gray-600">Alertas quando pontuações mudarem significativamente</p>
            </div>
            <Switch
              checked={preferences.scoreChanges}
              onCheckedChange={(checked) => 
                setPreferences(prev => ({ ...prev, scoreChanges: checked }))
              }
            />
          </div>
        </div>
      </div>
    </div>
  )

  const renderPrivacySection = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Configurações de Privacidade</h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label>Compartilhamento de Dados</Label>
              <p className="text-sm text-gray-600">Permitir uso anônimo dos dados para pesquisas</p>
            </div>
            <Switch
              checked={preferences.dataSharing}
              onCheckedChange={(checked) => 
                setPreferences(prev => ({ ...prev, dataSharing: checked }))
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label>Perfil Público</Label>
              <p className="text-sm text-gray-600">Tornar seu perfil visível para outros usuários</p>
            </div>
            <Switch
              checked={preferences.publicProfile}
              onCheckedChange={(checked) => 
                setPreferences(prev => ({ ...prev, publicProfile: checked }))
              }
            />
          </div>
        </div>

        <Separator className="my-6" />

        <div className="space-y-4">
          <h4 className="font-medium">Gerenciar Dados</h4>
          <div className="space-y-2">
            <Button variant="outline" className="w-full justify-start">
              Baixar Meus Dados
            </Button>
            <Button variant="outline" className="w-full justify-start">
              Limpar Histórico de Navegação
            </Button>
            <Button variant="destructive" className="w-full justify-start">
              Excluir Conta
            </Button>
          </div>
        </div>
      </div>
    </div>
  )

  const renderAppearanceSection = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Aparência</h3>
        
        <div className="space-y-4">
          <div>
            <Label>Tema</Label>
            <Select
              value={preferences.theme}
              onValueChange={(value) => 
                setPreferences(prev => ({ ...prev, theme: value }))
              }
            >
              <SelectTrigger className="mt-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">Claro</SelectItem>
                <SelectItem value="dark">Escuro</SelectItem>
                <SelectItem value="system">Sistema</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-3 gap-3 mt-4">
            <div className="p-3 border rounded-lg cursor-pointer hover:border-blue-500 transition-colors">
              <div className="w-full h-12 bg-white border rounded mb-2"></div>
              <p className="text-xs text-center">Claro</p>
            </div>
            <div className="p-3 border rounded-lg cursor-pointer hover:border-blue-500 transition-colors">
              <div className="w-full h-12 bg-gray-900 rounded mb-2"></div>
              <p className="text-xs text-center">Escuro</p>
            </div>
            <div className="p-3 border rounded-lg cursor-pointer hover:border-blue-500 transition-colors">
              <div className="w-full h-12 bg-gradient-to-r from-white to-gray-900 rounded mb-2"></div>
              <p className="text-xs text-center">Sistema</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  const renderLanguageSection = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Idioma e Região</h3>
        
        <div className="space-y-4">
          <div>
            <Label>Idioma da Interface</Label>
            <Select
              value={preferences.language}
              onValueChange={(value) => 
                setPreferences(prev => ({ ...prev, language: value }))
              }
            >
              <SelectTrigger className="mt-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pt-BR">Português (Brasil)</SelectItem>
                <SelectItem value="en-US">English (US)</SelectItem>
                <SelectItem value="es-ES">Español</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Formato de Data</Label>
            <Select defaultValue="dd/mm/yyyy">
              <SelectTrigger className="mt-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="dd/mm/yyyy">DD/MM/AAAA</SelectItem>
                <SelectItem value="mm/dd/yyyy">MM/DD/AAAA</SelectItem>
                <SelectItem value="yyyy-mm-dd">AAAA-MM-DD</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Fuso Horário</Label>
            <Select defaultValue="america/sao_paulo">
              <SelectTrigger className="mt-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="america/sao_paulo">América/São Paulo (GMT-3)</SelectItem>
                <SelectItem value="america/new_york">América/Nova York (GMT-5)</SelectItem>
                <SelectItem value="europe/london">Europa/Londres (GMT+0)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  )

  const renderPreferencesSection = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Preferências Gerais</h3>
        
        <div className="space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Prioridades Cívicas</CardTitle>
              <CardDescription>
                Suas prioridades atuais que influenciam as pontuações
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full">
                Reconfigurar Prioridades
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Políticos Seguidos</CardTitle>
              <CardDescription>
                Gerencie a lista de políticos que você acompanha
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full">
                Gerenciar Lista
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Dados e Sincronização</CardTitle>
              <CardDescription>
                Configurações de backup e sincronização
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  Fazer Backup dos Dados
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  Restaurar Backup
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )

  const renderSectionContent = () => {
    switch (activeSection) {
      case 'profile':
        return renderProfileSection()
      case 'preferences':
        return renderPreferencesSection()
      case 'notifications':
        return renderNotificationsSection()
      case 'privacy':
        return renderPrivacySection()
      case 'appearance':
        return renderAppearanceSection()
      case 'language':
        return renderLanguageSection()
      default:
        return renderProfileSection()
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-end">
      <div className="w-full max-w-2xl bg-white h-full overflow-hidden flex">
        {/* Sidebar Menu */}
        <div className="w-64 bg-gray-50 border-r border-gray-200 p-4">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold">Configurações</h2>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>

          <nav className="space-y-1">
            {settingsMenu.map((item) => {
              const Icon = item.icon
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id as SettingsSection)}
                  className={`w-full flex items-center justify-between px-3 py-2 text-left rounded-lg transition-colors ${
                    activeSection === item.id
                      ? 'bg-blue-100 text-blue-700 font-medium'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Icon className="h-4 w-4" />
                    <span>{item.label}</span>
                  </div>
                  <ChevronRight className="h-4 w-4" />
                </button>
              )
            })}
          </nav>

          <Separator className="my-6" />

          <Button
            variant="ghost"
            className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
          >
            <LogOut className="h-4 w-4 mr-3" />
            Sair da Conta
          </Button>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6 overflow-y-auto">
          <div className="max-w-lg">
            {renderSectionContent()}
          </div>
        </div>
      </div>
    </div>
  )
}