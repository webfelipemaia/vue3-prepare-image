
# vue3-prepare-image

Aplicação Vue.js para manipulação de imagens com suporte a filtros manuais, destinada a preparar imagens para reconhecimento de texto por modelos de IA.

O principal objetivo do Vue3 Prepare Image é simplificar o processo de preparação de imagens para reconhecimento de texto, oferecendo ferramentas acessíveis e eficientes para usuários que trabalham com modelos de IA e necessitam de imagens de alta qualidade para seus projetos.

## Instalação

Instale my-project com npm

```bash
  git clone https://github.com/webfelipemaia/vue3-prepare-image.git
  cd vue3-prepare-image
  npm install
  npm run dev
```

Edite o arquivo de configuração

```bash
  cp .env.example .env
```

Abra com o seu editor de preferência e modifique. Após isso, reinicie a aplicação.

## Funcionalidades

- Upload de Imagens: Carregue imagens diretamente do seu dispositivo para iniciar o processo de preparação.
- Aplicação de Filtros: Utilize filtros manuais para ajustar brilho, contraste e outros parâmetros, melhorando a qualidade da imagem para reconhecimento de texto.
- Suporte a PDFs: Importe arquivos PDF e extraia as páginas como imagens para edição individual.
- Organização de Arquivos: Mantenha suas imagens organizadas em pastas específicas para imagens em tratamento e imagens já tratadas.

## Próximos passos

- Melhorar componente manipulação de arquivo .pdf
- Aplicar componentes Bootstrap em PdfExtractor
- Criar áreas (pastas) para armazenar imagens em tratamento e imagens tratadas
- Corrigir Sidebar (remover Offcanvas)
- Melhorar o conteúdo de Footer