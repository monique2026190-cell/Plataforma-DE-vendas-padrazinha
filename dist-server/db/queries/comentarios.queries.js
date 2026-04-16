export const queriesComentarios = {
    buscarComentariosPorCurso: 'SELECT c.id, c.comentario, u.nome, u.foto_perfil FROM comentarios c JOIN usuarios u ON c.usuario_id = u.id WHERE c.curso_id = $1 ORDER BY c.criado_em DESC',
    criarComentario: 'INSERT INTO comentarios (curso_id, usuario_id, comentario) VALUES ($1, $2, $3) RETURNING *',
};
