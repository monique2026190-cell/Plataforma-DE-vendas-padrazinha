-- Exclui as tabelas se elas já existirem para garantir um estado limpo
DROP TABLE IF EXISTS usuarios CASCADE;
DROP TABLE IF EXISTS cursos CASCADE;
DROP TABLE IF EXISTS comentarios CASCADE;

-- Cria a tabela de usuários
CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    google_id VARCHAR(255) UNIQUE NOT NULL, -- ID do Google para identificar o usuário
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    foto_perfil TEXT, -- URL da foto de perfil do Google
    perfil_completo BOOLEAN DEFAULT FALSE NOT NULL, -- Novo campo
    criado_em TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Cria a tabela de cursos
CREATE TABLE cursos (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    descricao TEXT NOT NULL,
    preco NUMERIC(10, 2) NOT NULL DEFAULT 0.00,
    capa_curso TEXT, -- URL da imagem de capa do curso
    usuario_id INTEGER NOT NULL, -- Chave estrangeira para a tabela de usuários
    criado_em TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    atualizado_em TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_usuario FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);

-- Cria a tabela de comentarios
CREATE TABLE comentarios (
    id SERIAL PRIMARY KEY,
    curso_id INTEGER NOT NULL,
    usuario_id INTEGER NOT NULL,
    comentario TEXT NOT NULL,
    criado_em TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_curso FOREIGN KEY (curso_id) REFERENCES cursos(id),
    CONSTRAINT fk_usuario FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);
