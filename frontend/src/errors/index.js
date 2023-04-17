const errorMessages = {
  "auth/claims-too-large":
    "Os atributos do usuário excederam o tamanho permitido.",
  "auth/email-already-exists": "O endereço de email já está em uso.",
  "auth/email-already-in-use": "O endereço de email já está em uso.",
  "auth/id-token-expired":
    "O token de autenticação expirou. Faça login novamente.",
  "auth/id-token-revoked":
    "O token de autenticação foi revogado. Faça login novamente.",
  "auth/insufficient-permission":
    "O usuário atual não possui permissão para realizar essa ação.",
  "auth/internal-error":
    "O servidor de autenticação encontrou um erro interno. Tente novamente mais tarde.",
  "auth/invalid-argument": "Um ou mais argumentos fornecidos são inválidos.",
  "auth/invalid-claims": "Os atributos do usuário fornecidos são inválidos.",
  "auth/invalid-continue-uri": "O URI de continuação fornecido é inválido.",
  "auth/invalid-creation-time":
    "O tempo de criação do usuário fornecido é inválido.",
  "auth/invalid-disabled-field":
    "O campo de desabilitação do usuário fornecido é inválido.",
  "auth/invalid-display-name":
    "O nome de exibição do usuário fornecido é inválido.",
  "auth/invalid-dynamic-link-domain":
    "O domínio de link dinâmico fornecido é inválido.",
  "auth/invalid-email": "O endereço de email fornecido é inválido.",
  "auth/invalid-email-verified":
    "O status de verificação de email fornecido é inválido.",
  "auth/invalid-hash-algorithm": "O algoritmo de hash fornecido é inválido.",
  "auth/invalid-hash-block-size":
    "O tamanho do bloco do algoritmo de hash fornecido é inválido.",
  "auth/invalid-hash-derived-key-length":
    "O tamanho da chave derivada do algoritmo de hash fornecido é inválido.",
  "auth/invalid-hash-key": "A chave do algoritmo de hash fornecido é inválida.",
  "auth/invalid-hash-memory-cost":
    "O custo de memória do algoritmo de hash fornecido é inválido.",
  "auth/invalid-hash-parallelization":
    "O paralelismo do algoritmo de hash fornecido é inválido.",
  "auth/invalid-hash-rounds":
    "O número de rodadas do algoritmo de hash fornecido é inválido.",
  "auth/invalid-hash-salt-separator":
    "O separador de salt do algoritmo de hash fornecido é inválido.",
  "auth/invalid-id-token":
    "O token de autenticação fornecido é inválido. Faça login novamente.",
  "auth/invalid-last-sign-in-time":
    "O último horário de login fornecido é inválido.",
  "auth/invalid-page-token": "O token de página fornecido é inválido.",
  "auth/invalid-password": "A senha fornecida é inválida. Tente novamente.",
  "auth/wrong-password": "Senha incorreta",
  "auth/invalid-password-hash": "O hash de senha fornecido é inválido.",
  "auth/invalid-password-salt": "O salt de senha fornecido é inválido.",
  "auth/invalid-phone-number": "O número de telefone fornecido é inválido.",
  "auth/invalid-photo-url": "A URL da foto do usuário fornecida é inválida.",
  "auth/invalid-provider-data":
    "Os dados do provedor fornecidos são inválidos.",
  "auth/invalid-provider-id": "O ID do provedor fornecido é inválido.",
  "auth/invalid-oauth-responsetype":
    "O tipo de resposta OAuth fornecido é inválido.",
  "auth/invalid-session-cookie-duration":
    "A duração do cookie de sessão fornecida é inválida.",
  "auth/invalid-uid": "O UID fornecido é inválido.",
  "auth/invalid-user-import": "A importação do usuário fornecida é inválida.",
  "auth/maximum-user-count-exceeded":
    "O número máximo de usuários permitido foi excedido.",
  "auth/missing-android-pkg-name": "O nome do pacote Android está faltando.",
  "auth/missing-continue-uri": "O URI de continuação está faltando.",
  "auth/missing-hash-algorithm": "O algoritmo de hash está faltando.",
  "auth/missing-ios-bundle-id": "O ID do pacote iOS está faltando.",
  "auth/missing-uid": "O UID está faltando.",
  "auth/missing-oauth-client-secret":
    "O segredo do cliente OAuth está faltando.",
  "auth/operation-not-allowed":
    "A operação solicitada não é permitida para este usuário.",
  "auth/phone-number-already-exists": "O número de telefone já está em uso.",
  "auth/project-not-found": "O projeto de autenticação não foi encontrado.",
  "auth/reserved-claims":
    "Os atributos de reivindicação do usuário incluem reivindicações reservadas.",
  "auth/session-cookie-expired":
    "O cookie de sessão expirou. Faça login novamente.",
  "auth/session-cookie-revoked":
    "O cookie de sessão foi revogado. Faça login novamente.",
  "auth/uid-already-exists": "O UID fornecido já está em uso.",
  "auth/unauthorized-continue-uri": "O URI de continuação não está autorizado.",
  "auth/user-not-found": "Usuário não encontrado.",
  "auth/popup-closed-by-user": "Pop-up fechado pelo usuário",
};

const getErrorMessage = (error) => {
  if (errorMessages[error.code]) {
    return errorMessages[error.code];
  } else {
    console.error(error);
    return "Ocorreu um erro. Tente novamente mais tarde";
  }
};

export { getErrorMessage };
