# Recuperação de senha

**RF**

- O usuário deve poder recuperar sunha senha informando o seu e-mail
- O usuário deve receber um e-mail com instruções de repupereção de senha;
- O usuário deve poder resetar sua senha;

**RNF**

- Utilizar Mailtrap para testar envios em ambiente de dev;
- Utilizar Amazon SES para envios em produção;
- O envio de e-mails deve acontecer em segundo plano(background job);

**RN**

- O link enviado pro email para resetar senha, deve expirar em 2hs;
- O usuário presisa confirmar a nova senha ao resetar sua senha

# Atualização do perfil

**RF**

- O usuário deve poder atualizar seu nome, email e senha;

**RN**

- O usuário não pode alterar seu email para um email já utilizado;
_ Para atualizar sua senha, o usuário deve informar a senha antiga;
- Para atualizar sua senha, o usuário precisa confirmar a nova senha;

# Painel do prestador

**RF**

- O usuário deve poder listar seus agendamentos de um dia específico;
- O prestadpr deve receber uma notificação sempre que houver um novo agendamento;
- O prestador deve poder visualizar as notificações não lidas;

**RNF**

- Os agendamentos  do prestador no dia devem ser armazenados em cache;
- As notificaçoes do prestador devem ser armezenadas no MongoDB;
- As notificações dp prestador devem ser eviadas em tempo-real utilizando Socket.io;

**RN**

- A notificação deve ter um status de lida ou não-lida para que o prestador possa controlar;

# Agendamento de serviços

**RF**

- O usuário deve poder listar todos prestadores de serviço cadastrados;
- O usuario deve poder listar os dias de um mês com pelo menos um horário disponível de um prestador;
- O usuario deve poder listar horários disponíveis em um dia específico de um prestador;
- O usuario deve poder realizar um novo agendamento com um prestador;

**RNF**

- A listagem de prestadores deve ser armazenada em cache;

**RN**

- Cada agendamento deve duar 1h exatamente;
- Os agendamentos devem estar disponíveis entre 8h às 18hs (Primeiro às 8hs, último às 17hs);
- O usuario não pode agendar em um horário já ocupado;
- O usuario não pode agendar em um horário que já passou;
- O usuario não pode agendar serviços consigo mesmo;
