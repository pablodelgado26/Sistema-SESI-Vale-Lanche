// Configurações do Sistema de Controle de Vale-Lanche SESI

export const config = {
  // Informações da Instituição
  institution: {
    name: 'SESI',
    fullName: 'Serviço Social da Indústria',
    logo: '/logo-sesi.png', // Adicione seu logo aqui
  },

  // Configurações de Vale-Lanche
  voucher: {
    maxPerDay: 1, // Quantidade máxima de vale-lanche por dia
    resetDaily: true, // Se deve resetar automaticamente todo dia
    resetTime: '00:00', // Horário de reset (se resetDaily = true)
  },

  // Séries Disponíveis para Cadastro
  grades: [
    '6º Ano',
    '7º Ano',
    '8º Ano',
    '9º Ano',
    '1º Ano EM',
    '2º Ano EM',
    '3º Ano EM',
  ],

  // Prefixo dos Códigos QR
  qrCodePrefix: 'SESI',

  // Configurações do Scanner
  scanner: {
    fps: 10, // Frames por segundo
    qrBoxSize: { width: 250, height: 250 }, // Tamanho da área de scan
    facingMode: 'environment', // 'user' para câmera frontal, 'environment' para traseira
  },

  // Configurações de Foto
  photo: {
    maxSizeKB: 500, // Tamanho máximo da foto em KB
    acceptedFormats: 'image/*', // Formatos aceitos
    placeholder: '/placeholder-student.jpg',
  },

  // Cores do Sistema (CSS Variables)
  theme: {
    primaryColor: '#003d7a', // Azul SESI
    secondaryColor: '#0066cc', // Azul Claro
    accentColor: '#e30613', // Vermelho SESI
    successColor: '#10b981',
    warningColor: '#f59e0b',
    errorColor: '#ef4444',
  },

  // Configurações de Storage
  storage: {
    key: 'sesi-students', // Chave do localStorage
    autoBackup: false, // Auto backup em arquivo
    backupInterval: 86400000, // Intervalo de backup em ms (1 dia)
  },

  // Mensagens do Sistema
  messages: {
    studentNotFound: 'Aluno não encontrado. Verifique se o QR Code está correto.',
    voucherUsed: 'Vale-lanche já utilizado hoje.',
    voucherAvailable: 'Vale-lanche disponível.',
    successfulRegistration: 'Aluno cadastrado com sucesso!',
    deleteConfirmation: 'Tem certeza que deseja excluir',
    cameraPermissionDenied: 'Erro ao acessar a câmera. Verifique as permissões.',
  },

  // Funcionalidades Opcionais
  features: {
    enableEdit: true, // Permitir edição de alunos
    enableDelete: true, // Permitir exclusão de alunos
    enableBulkActions: true, // Ações em massa (dar/remover todos)
    enablePhotoUpload: true, // Upload de foto
    requirePhoto: false, // Foto obrigatória no cadastro
    enableExport: false, // Exportar dados (futuro)
    enableImport: false, // Importar dados (futuro)
  },

  // Validações
  validation: {
    minNameLength: 3,
    maxNameLength: 100,
    qrCodePattern: /^SESI\d{3,}$/, // Padrão: SESI seguido de 3+ dígitos
    uniqueQRCode: true,
  },
};

export default config;
