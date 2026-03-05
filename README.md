👨‍🍳 Chef de IA

Um aplicativo mobile desenvolvido com React Native que gera receitas automaticamente utilizando Inteligência Artificial.

O usuário informa os ingredientes disponíveis e a IA cria uma receita completa, formatada e organizada como um verdadeiro chef profissional.

📱 Demonstração

O app permite:

Inserir ingredientes

Gerar receitas automaticamente

Visualizar receita formatada com:

Nome do prato

Descrição

Lista de ingredientes

Modo de preparo

Tempo estimado

Nível de dificuldade

Sugestão de acompanhamento

🚀 Tecnologias Utilizadas

React Native

Expo

JavaScript

Axios

API de IA via Groq

Modelo LLM: LLaMA 3

🧠 Como funciona

O aplicativo envia os ingredientes do usuário para a API da Groq utilizando o endpoint:

POST /chat/completions

A IA recebe um prompt estruturado que define:

Personalidade de Chef

Regras de formatação

Estrutura obrigatória da resposta

A resposta é renderizada dinamicamente no app utilizando estados do React (useState).

🎨 Interface

Layout moderno com tema escuro

Scroll dinâmico para receitas longas

Renderização condicional

Feedback visual durante geração

⚠️ Observação de Segurança

Atualmente a API Key está armazenada diretamente no front-end para fins de estudo.

⚠️ Em produção, recomenda-se criar um backend para proteger a chave da API.

💡 Melhorias Futuras

Sistema de favoritos

Histórico de receitas

Exportar receita em PDF

Modo offline

Plano premium

👨‍💻 Autor

Yan Alves
Projeto desenvolvido para estudo de consumo de APIs e integração com IA.
