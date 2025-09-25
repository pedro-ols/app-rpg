# 🏰 A TAVERNA DO DRAGÃO DOURADO 🏰

Aplicativo profissional de gerenciamento de aventureiros RPG, desenvolvido com React Native, Expo e React Native Paper.

## 📋 Sobre o Projeto

Este aplicativo foi desenvolvido como parte de uma atividade acadêmica para refatorar um projeto simples em uma versão mais profissional e organizada, aplicando componentização, biblioteca de UI e melhorias de usabilidade.

### 🎯 Funcionalidades Principais

- ✅ **Cadastro de Aventureiros**: Registro completo com nome, história, classe, raça e nível
- ✅ **Recrutamento/Demissão**: Sistema de recrutamento para aventuras
- ✅ **Filtros Inteligentes**: Visualização por status (todos, em aventura, na taverna)
- ✅ **Busca Avançada**: Pesquisa por nome, classe ou raça
- ✅ **Confirmações Modais**: Diálogos elegantes para ações importantes
- ✅ **Notificações Toast**: Feedback visual diferenciado por tipo de ação

## 🚀 Tecnologias Utilizadas

- **React Native 0.81.4** - Framework principal
- **Expo SDK 54** - Plataforma de desenvolvimento
- **React Native Paper 5.14.5** - Biblioteca de componentes UI
- **Expo SQLite** - Banco de dados local (preparado para implementação)
- **React Native Safe Area Context** - Gerenciamento de áreas seguras
- **Expo Vector Icons** - Ícones personalizados

## 🏗️ Arquitetura do Projeto

```
app-rpg/
├── src/
│   └── components/
│       ├── Header.js              # Cabeçalho temático da aplicação
│       ├── AddCharacterForm.js    # Formulário de cadastro
│       ├── CharacterCard.js       # Card individual de aventureiro
│       ├── ConfirmationDialog.js  # Modal de confirmação reutilizável
│       ├── FilterBar.js           # Barra de filtros com chips
│       ├── SearchBar.js           # Campo de busca
│       └── ToastNotification.js   # Sistema de notificações
├── App.js                         # Componente principal com lógica
├── package.json
└── README.md
```

## 🎨 Melhorias Implementadas

### 1. **Sistema de Modals Profissionais**
**O que foi feito:**
- Substituição de modals customizados por componentes nativos do React Native Paper
- Criação do componente `ConfirmationDialog` reutilizável
- Uso de Portal para renderização adequada de overlays

**Por que foi feito:**
- Melhor acessibilidade e experiência do usuário
- Componentes nativos seguem padrões de design estabelecidos
- Código mais limpo e manutenível

**Valor agregado:**
- Interface mais polida e profissional
- Melhor performance na renderização de modals
- Maior consistência visual em toda a aplicação

### 2. **Filtros Visuais Aprimorados**
**O que foi feito:**
- Implementação de chips interativos do React Native Paper
- Contador dinâmico de personagens por categoria
- Estados visuais claros para filtro ativo/inativo

**Por que foi feito:**
- Melhorar a usabilidade com feedback visual imediato
- Fornecer informações contextuais (contadores)
- Seguir padrões modernos de UI/UX

**Valor agregado:**
- Navegação mais intuitiva entre categorias
- Informações úteis sempre visíveis
- Interface mais moderna e atrativa

### 3. **Sistema de Busca Inteligente**
**O que foi feito:**
- Campo de busca integrado usando Searchbar do Paper
- Busca por múltiplos campos (nome, classe, raça)
- Busca case-insensitive com resultados em tempo real

**Por que foi feito:**
- Facilitar localização de personagens específicos
- Melhorar usabilidade em listas grandes
- Seguir padrões de aplicações modernas

**Valor agregado:**
- Produtividade aumentada para gerenciar muitos personagens
- Experiência de usuário mais fluida
- Funcionalidade esperada em aplicações profissionais

### 4. **Animações Suaves e Responsivas**
**O que foi feito:**
- Animações de entrada para cards de personagens
- Feedback tátil em interações (scale animation)
- Transições suaves usando LayoutAnimation
- Animações personalizadas com Animated API

**Por que foi feito:**
- Criar uma experiência mais envolvente e polida
- Fornecer feedback visual para ações do usuário
- Seguir princípios modernos de design de interfaces

**Valor agregado:**
- Aplicação mais atrativa visualmente
- Melhor percepção de qualidade e profissionalismo
- Experiência de usuário mais satisfatória

### 5. **Sistema de Notificações Categorizado**
**O que foi feito:**
- Componente ToastNotification com tipos diferenciados
- Cores e ícones específicos para cada tipo de ação
- Mensagens contextuais e temáticas

**Por que foi feito:**
- Melhorar comunicação com o usuário
- Diferenciar tipos de ações (sucesso, erro, aviso)
- Manter consistência temática da aplicação

**Valor agregado:**
- Feedback mais claro e informativo
- Redução de confusão sobre resultados de ações
- Interface mais profissional e confiável

### 6. **Componentização Avançada**
**O que foi feito:**
- Separação completa de responsabilidades
- Componentes reutilizáveis e modulares
- Props tipificadas e bem documentadas

**Por que foi feito:**
- Facilitar manutenção e evolução do código
- Permitir reutilização de componentes
- Seguir melhores práticas de desenvolvimento React

**Valor agregado:**
- Código mais limpo e organizado
- Desenvolvimento mais rápido de novas features
- Facilidade para trabalho em equipe

## 📱 Como Executar

### Pré-requisitos
- Node.js (versão 18 ou superior)
- Expo CLI instalado globalmente
- Dispositivo físico com Expo Go ou emulador configurado

### Passos para execução
```bash
# Clone o repositório
git clone [URL_DO_REPOSITORIO]

# Navegue para o diretório
cd app-rpg

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npx expo start

# Escaneie o QR Code com o Expo Go (Android/iOS)
# ou pressione 'a' para abrir no emulador Android
```

## 📦 Build para Produção

### Configuração EAS Build
```bash
# Instale o EAS CLI
npm install -g @expo/eas-cli

# Configure o projeto
eas build:configure

# Gere o APK para Android
eas build --platform android --profile preview

# Para produção (Google Play Store)
eas build --platform android --profile production
```

## 🎮 Como Usar

1. **Cadastrar Aventureiro**: Preencha todos os campos obrigatórios no "Livro de Registros"
2. **Confirmar Cadastro**: Use o modal de confirmação para aceitar o novo aventureiro
3. **Filtrar Aventureiros**: Use os chips para visualizar diferentes categorias
4. **Buscar Específico**: Digite no campo de busca para localizar rapidamente
5. **Recrutar/Demitir**: Clique no ícone de status para alternar entre taverna/aventura
6. **Remover Aventureiro**: Clique no ícone de lixeira e confirme a ação

## 👥 Equipe de Desenvolvimento

- **Desenvolvedor Principal**: [Seu Nome]
- **Desenvolvedor Colaborador**: [Nome do Parceiro]

## 📄 Licença

Este projeto foi desenvolvido para fins acadêmicos como parte do curso de Desenvolvimento de Sistemas.
